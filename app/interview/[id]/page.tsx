"use client";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { jobs } from "@/data/jobs";
import { Camera, CodeSquare, Mic, MicOff, Video, X } from "lucide-react";
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
import { AssistantOverrides } from "@vapi-ai/web/dist/api";

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
  const [micActive, setMicActive] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const videoStreamRef = useRef<MediaStream | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);

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

    const onCallEnd = async () => {
      setCallStatus(CallStatus.FINISHED);
      const res = await axios.post("/generate-feedback", {
        transcript: messages,
      });
      console.log(res.data);
    };

    const onMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
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

    const onError = (error: Error) => {
      console.log("Error:", error);
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
    await setupInterview();
    setLoading({
      state: true,
      message: "Reva is getting ready to take your interview..",
    });
    const VAPI_ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!;
    const basePrompt = interviewer.model?.messages?.[0]?.content;

    if (!basePrompt) {
      console.error("Base prompt is missing");
      return;
    }

    const interviewQs = interviewQuestions
      .map((item: string) => `- ${item}`)
      .join("\n");

    const customizedPrompt = basePrompt
      .replace("{{questions}}", interviewQs)
      .replace("{{job_description}}", job.description);

    console.log(customizedPrompt);

    await vapi.start(VAPI_ASSISTANT_ID, {
      ...interviewer,
      variableValues: {
        questions: interviewQs,
        job_desc: job.description,
      },
    });
    setLoading({ state: false });
    setIsInterviewStarted(true);
  };

  const endInterview = () => {
    setIsInterviewStarted(false);
    vapi.stop();
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
    const setupMic = async () => {
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach((track) => track.stop());
        audioStreamRef.current = null;
      }

      if (!micActive) return;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        audioStreamRef.current = stream;

        console.log("Microphone stream active");
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
  };

  const toggleCamera = () => {
    setCameraActive(!cameraActive);
  };
  console.log(videoRef);

  return loading.state ? (
    <Loader loading={loading.state} message={loading.message} />
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 to-white">
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
                  <div className="w-[500px] h-[350px] flex-1 flex flex-col items-center justify-center border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                    <h3 className="text-xl mb-4 text-center font-medium">
                      Reva
                    </h3>
                    <div className="flex items-center justify-center relative w-28 h-28">
                      {isSpeaking && (
                        <div className="absolute inset-0 rounded-full bg-emerald-400 opacity-75 animate-ping"></div>
                      )}
                      <div className="relative w-28 h-28 rounded-full bg-emerald-50 flex items-center justify-center text-4xl border border-emerald-200 text-emerald-600 shadow-inner">
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
                          Candidate
                        </h3>
                        <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 shadow-inner">
                          <svg
                            width="64"
                            height="64"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <circle cx="12" cy="8" r="5" />
                            <path d="M20 21a8 8 0 1 0-16 0" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="border-t bg-gray-50 p-4 flex justify-center gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  className={`${
                    micActive
                      ? "bg-emerald-100 border-emerald-400 text-emerald-700"
                      : "border-gray-300 bg-emerald-50"
                  } hover:bg-emerald-100 transition-all`}
                  onClick={toggleMic}
                >
                  {!micActive ? (
                    <MicOff
                      className={`h-6 w-6 ${
                        micActive ? "text-emerald-600" : ""
                      }`}
                    />
                  ) : (
                    <Mic
                      className={`h-6 w-6 ${
                        micActive ? "text-emerald-600" : ""
                      }`}
                    />
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className={`${
                    cameraActive
                      ? "bg-emerald-50 border-emerald-400 text-emerald-700"
                      : "border-gray-300"
                  } hover:bg-emerald-100 transition-all`}
                  onClick={toggleCamera}
                >
                  <Camera
                    className={`h-6 w-6 ${
                      cameraActive ? "text-emerald-600" : ""
                    }`}
                  />
                </Button>

                {isInterviewStarted ? (
                  <Button
                    variant="destructive"
                    size="lg"
                    onClick={endInterview}
                    className="px-6"
                  >
                    <X className="mr-1" />
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
                <h3 className="text-xl font-bold mb-4">Instructions</h3>
                {isInterviewStarted ? (
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      You are now in an interview for the{" "}
                      <strong>{job.title}</strong> position at{" "}
                      <strong>{job.company}</strong>.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>Speak clearly and at a moderate pace</li>
                      <li>
                        Structure your answers using the STAR method (Situation,
                        Task, Action, Result)
                      </li>
                      <li>
                        Emphasize skills and experiences relevant to the{" "}
                        {job.title} role
                      </li>
                      <li>
                        Prepare examples that highlight your achievements
                        related to {job.industry}
                      </li>
                      <li>
                        Ask thoughtful questions about the company and role
                      </li>
                    </ul>
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
                      role. Click "Start Interview" when you're ready to begin.
                    </p>
                    <p>
                      Make sure your microphone and camera are properly set up
                      before starting.
                    </p>
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
