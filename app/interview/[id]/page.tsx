"use client";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { jobs } from "@/data/jobs";
import { Camera, CameraOff, CircleUserRound, Mic, MicOff } from "lucide-react";
import { redirect } from "next/navigation";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import JobNotFound from "./components/JobNotFound";
import axios from "axios";
import Vapi from "@vapi-ai/web";
const VAPI_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
const vapi = new Vapi(VAPI_PUBLIC_KEY!);
import { interviewer } from "@/utils/vapi/prompt";
import { toast } from "sonner";
import { nanoid } from "nanoid";
import { auth } from "@/firebase/client";
import { onAuthStateChanged, User } from "firebase/auth";
import Image from "next/image";
import ConfirmationDialog from "./components/ConfiramtionDialog";
import { useUserStore } from "@/hooks/userUser";

interface LoaderState {
  state: boolean;
  message?: string;
}

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Page = () => {
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [interviewQuestions, setInterviewQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<LoaderState>({
    state: false,
    message: "Setting up interview...",
  });
  const [micActive, setMicActive] = useState(true);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const videoStreamRef = useRef<MediaStream | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const [interviewId, setInterviewId] = useState<string | null>();
  const [user, setUser] = useState<User | null>(null);
  const [showConfirmationDialog, setShowConfirmationDialog] =
    useState<boolean>(false);
  const [error, setError] = useState({ state: true, error: {} });
  const { user: userState } = useUserStore();

  const params = useParams();
  const id = params?.id;
  if (!id) {
    redirect("/jobs");
  }
  const jobId = Number(id);
  const job = jobs.find((job) => job.id === jobId);

  if (!job) {
    return <JobNotFound />;
  }

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
      setMicActive(true);
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
    };

    const onMessage = (message: any) => {
      if (message.type == "transcript" && message.transcriptType == "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => {
      console.log("speech start");
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("speech end");
      setIsSpeaking(false);
    };

    const onError = (err: any) => {
      setError({ ...error, state: true, error: err });
      toast.info(err?.err?.msg || "intreview ended");
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  const setupInterview = async () => {
    setLoading({ state: true, message: "Setting up interview..." });
    try {
      const body = {
        question_amonut: 5,
        title: job.title,
        level: job.level,
        type: job.type,
        company: job.company,
        industry: job.industry,
        description: job.description,
        requirements: job.requirements,
        responsibilities: job.responsibilities,
      };
      const result = await axios.post("/api/generate-question", body);
      if (result.data?.success) {
        setInterviewQuestions(result.data?.questions);
      }
      setLoading({ state: false });
    } catch (error) {
      setLoading({ state: false });
    }
  };

  const startInterview = async () => {
    setInterviewId(nanoid());
    await setupInterview();
    setLoading({
      state: true,
      message: "Reva is getting ready to take your interview..",
    });
  
    const VAPI_ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!;
console.log(VAPI_ASSISTANT_ID,VAPI_PUBLIC_KEY)
    const interviewQs = interviewQuestions
      .map((item: string) => `- ${item}`)
      .join("\n");

    await vapi.start(VAPI_ASSISTANT_ID, {
      ...interviewer,
      variableValues: {
        questions: interviewQs,
        job_desc: job.description || "",
        job_title: job.title || "",
        job_company: job.company || "",
        job_location: job.location || "",
        job_type: job.type || "",
        job_level: job.level || "",
        job_industry: job.industry || "",
        userName: user?.displayName || "",
      },
    });
    setLoading({ state: false });
    setIsInterviewStarted(true);
  };

  const endInterview = async () => {
    setIsInterviewStarted(false);
    vapi.stop();
    if (error.state) {
      redirect("/profile");
    }
    setLoading({
      state: true,
      message: "Generating feedback for you...",
    });
    const user = auth.currentUser;
    const result = await axios.post("/api/generate-feedback", {
      transcript: messages,
      job,
      interviewQs: interviewQuestions,
      interviewId,
      userId: user?.uid,
    });
    setLoading({
      state: false,
    });
    redirect(`/feedback/${interviewId}`);
  };

  useEffect(() => {
    const setupCamera = async () => {
      if (videoStreamRef.current) {
        videoStreamRef.current.getTracks().forEach((track) => track.stop());
        videoStreamRef.current = null;
      }

      if (!cameraActive) return;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoStreamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    setupCamera();

    return () => {
      if (videoStreamRef.current) {
        videoStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraActive]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser && firebaseUser.emailVerified) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const setupMic = async () => {
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach((track) => track.stop());
        audioStreamRef.current = null;
      }

      if (!micActive) return;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: micActive,
        });
        audioStreamRef.current = stream;

        if (audioStreamRef.current.active) {
          setMicActive(true);
        }
      } catch (err) {
        console.error("Error accessing microphone:", err);
      }
    };

    setupMic();

    return () => {
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [micActive]);

  const toggleMic = () => {
    setMicActive(!micActive);
    if (isInterviewStarted) {
      vapi.setMuted(micActive);
    }
  };

  const toggleCamera = () => {
    setCameraActive(!cameraActive);
  };

  useEffect(() => {
    if (messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role === "assistant") {
      if (
        lastMessage.content.includes("I'll go ahead and end the interview now.")
      ) {
        setShowConfirmationDialog(true);
      }
    }
  }, [messages]);

  async function handleEndInterview() {
    setShowConfirmationDialog(false);
    await vapi.send({
      type: "add-message",
      message: {
        role: "system",
        content: "The interview has ended.",
      },
    });
    endInterview();
    console.log("Ending interview...");
  }

  function handleCancel() {
    setShowConfirmationDialog(false);
    vapi.say("Let's continue the interview.", false);
  }

  return loading.state ? (
    <Loader loading={loading.state} message={loading.message} />
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 to-white">
      <div>
        <ConfirmationDialog
          open={showConfirmationDialog}
          message="Are you sure you want to end the interview?"
          onSubmit={handleEndInterview}
          onCancel={handleCancel}
        />
      </div>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Link
              href={`/jobs/${job.id}`}
              className="text-emerald-600 hover:underline flex items-center mb-2"
            >
              ← Back to Job Details
            </Link>
            <h1 className="text-3xl font-bold">
              Interview Practice: {job.title}
            </h1>
            <p className="text-gray-600">
              {job.company} • {job.location}
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <Card className="shadow-lg border border-emerald-100 overflow-hidden max-h-screen">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="h-[350px] flex-1 flex flex-col items-center justify-center border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                    <h3 className="text-xl mb-4 text-center font-medium">
                      Reva
                    </h3>
                    <div className="flex items-center justify-center relative w-28 h-28">
                      {isSpeaking && (
                        <div className="absolute inset-0 rounded-full bg-emerald-400 opacity-75 animate-ping"></div>
                      )}
                      <div className="relative w-24 h-24 font-semibold rounded-full bg-emerald-50 flex items-center justify-center text-4xl border border-emerald-200 text-emerald-600 shadow-inner">
                        AI
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                    {cameraActive ? (
                      <div>
                        <video
                          ref={videoRef}
                          autoPlay
                          muted
                          className="w-full h-full rounded-lg object-cover"
                        />
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-xl mb-4 text-center font-medium">
                          You
                        </h3>
                        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 shadow-inner">
                          {userState?.profilePicture || user?.photoURL ? (
                            <div className="w-full h-full rounded-full overflow-hidden">
                              <Image
                                src={
                                  userState?.profilePicture ||
                                  user?.photoURL ||
                                  ""
                                }
                                alt={
                                  userState?.displayName ||
                                  user?.displayName ||
                                  "User Avatar"
                                }
                                width={100}
                                height={100}
                              />
                            </div>
                          ) : (
                            <CircleUserRound
                              size={"54"}
                              className="text-zinc-500"
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="border-t bg-gray-50 p-4 flex justify-center gap-4">
                <Button
                  className={`rounded-full ${
                    micActive
                      ? "bg-emerald-100 hover:bg-emerald-200 text-neutral-500-400"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                  size="lg"
                  onClick={toggleMic}
                >
                  {micActive ? <Mic /> : <MicOff />}
                </Button>

                <Button
                  className={`rounded-full ${
                    cameraActive
                      ? "bg-emerald-100 hover:bg-emerald-200 text-neutral-500-400"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                  size="lg"
                  onClick={toggleCamera}
                >
                  {!cameraActive ? <CameraOff /> : <Camera />}
                </Button>

                {isInterviewStarted ? (
                  <Button
                    variant="destructive"
                    size="lg"
                    onClick={endInterview}
                    className="px-6 text-slate-200 hover:bg-red-500"
                  >
                    End Interview
                  </Button>
                ) : (
                  <Button
                    onClick={startInterview}
                    size="lg"
                    className="bg-emerald-500 hover:bg-emerald-600 px-8"
                  >
                    Start Interview
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>

          <div className="lg:w-1/3">
            <Card className="bg-white shadow-md border border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">
                  Please read these instructions before beginning your
                  interview.
                </h3>
                {isInterviewStarted ? (
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      You are now in an interview for the{" "}
                      <strong>{job.title}</strong> position at{" "}
                      <strong>{job.company}</strong>.
                    </p>
                    <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                      <li>
                        Ensure your device microphone and camera are working
                        properly for clear audio and video quality.
                      </li>
                      <li>
                        Speak clearly and at a moderate pace, maintaining good
                        eye contact with the camera.
                      </li>
                      <li>
                        Position yourself in a well-lit, quiet environment with
                        minimal background distractions.
                      </li>
                      <li>
                        Have a glass of water nearby and take brief pauses if
                        needed to collect your thoughts.
                      </li>
                      <li>
                        Listen carefully to each question and take a moment to
                        think before responding.
                      </li>
                      <li>
                        Structure your answers using the STAR method (Situation,
                        Task, Action, Result) for behavioral questions.
                      </li>
                      <li>
                        Emphasize skills and experiences directly relevant to
                        the {job.title} role and {job.industry} industry.
                      </li>
                      <li>
                        Ask thoughtful questions about the company culture, team
                        dynamics, and growth opportunities.
                      </li>
                      <li>
                        Maintain professional body language and dress
                        appropriately for the role.
                      </li>
                      <li>
                        If you don't understand a question, politely ask for
                        clarification rather than guessing.
                      </li>
                      <li>
                        End each answer with confidence and be prepared to
                        elaborate if asked follow-up questions.
                      </li>
                    </ol>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-800">
                        <strong>Tip:</strong> This is a practice session. Use it
                        to refine your responses and build confidence for your
                        actual interview.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-700">
                    <p className="mb-4">
                      Welcome to your interview practice session for the{" "}
                      <strong>{job.title}</strong> position at{" "}
                      <strong>{job.company}</strong>.
                    </p>
                    <p className="mb-4">
                      Our AI interviewer will ask you questions relevant to this
                      role and evaluate your responses. Click "Start Interview"
                      when you're ready to begin.
                    </p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">
                        Before You Start:
                      </h4>
                      <ol className="list-decimal pl-5 space-y-1 text-sm text-yellow-700">
                        <li>Test your microphone and camera functionality</li>
                        <li>
                          Find a quiet, well-lit space with stable internet
                          connection
                        </li>
                        <li>
                          Have your resume and job description readily available
                        </li>
                        <li>
                          Prepare examples of your key achievements and
                          experiences
                        </li>
                        <li>Research the company and role thoroughly</li>
                      </ol>
                    </div>
                    <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-center space-x-3">
                        <p className="text-gray-700 font-medium">
                          All the best for your Interview.
                          <span className="text-gray-500 font-normal ml-2">
                            by Team HireMentis
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
