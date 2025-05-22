"use client";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import VoiceAgent from "@/components/VoiceAgent";
import { jobs } from "@/data/jobs";
import { Mic, Video } from "lucide-react";
import { redirect } from "next/navigation";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import JobNotFound from "./components/JobNotFound";

const page = () => {
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
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

  const startInterview = () => {
    setIsInterviewStarted(true);
  };

  const endInterview = () => {
    setIsInterviewStarted(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-24">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Link
              href={`/jobs/${job.id}`}
              className="text-emerald-600 hover:underline flex items-center mb-2"
            >
              <span>←</span> Back to Job Details
            </Link>
            <h1 className="text-3xl font-bold">
              Interview Practice: {job.title}
            </h1>
            <p className="text-gray-600">
              {job.company} • {job.location}
            </p>
          </div>
        </div>

        <Card className="bg-white shadow-lg border-0 mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-3xl mb-4">
                AI
              </div>
              <h2 className="text-2xl font-bold">AI Interviewer</h2>
              <p className="text-gray-600 max-w-lg mt-2">
                I'll be your virtual interviewer today for the {job.title}{" "}
                position at {job.company}.
                {isInterviewStarted
                  ? " Let's start with your introduction."
                  : " Click the Start button when you're ready."}
              </p>
            </div>

            {isInterviewStarted ? (
              <div className="animate-fade-in">
                <div className="bg-emerald-50 rounded-lg p-6 mb-8">
                  <p className="font-medium mb-2">Current Question:</p>
                  <p className="text-lg">
                    Tell me about your experience as it relates to this{" "}
                    {job.title} role. What relevant skills and projects have you
                    worked on?
                  </p>
                </div>

                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <Mic className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="h-2 w-full max-w-md bg-emerald-100 rounded-full">
                    <div className="h-2 bg-emerald-500 rounded-full w-3/4 animate-pulse"></div>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-full">
                    <Video className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50 rounded-lg p-6 mb-8">
                <p className="text-center">
                  Click the Start Interview button when you're ready to begin
                  the interview.
                </p>
              </div>
            )}

            <div className="flex justify-center gap-4">
              {!isInterviewStarted ? (
                <Button
                  onClick={startInterview}
                  className="bg-emerald-500 hover:bg-emerald-600 px-8 text-white"
                >
                  Start Interview
                </Button>
              ) : (
                <Button
                  onClick={endInterview}
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50 px-8"
                >
                  End Interview
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {isInterviewStarted && (
          <Card className="border border-emerald-200">
            <CardContent className="p-6">
              <h3 className="font-bold mb-3">Interview Tips:</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Speak clearly and at a moderate pace</li>
                <li>
                  Structure your answers using the STAR method (Situation, Task,
                  Action, Result)
                </li>
                <li>
                  Emphasize skills and experiences relevant to the {job.title}{" "}
                  role
                </li>
                <li>
                  Prepare examples that highlight your achievements related to{" "}
                  {job.industry}
                </li>
                <li>
                  Ask thoughtful questions about the company and role at the end
                </li>
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default page;
