"use client";
import React from "react";
import Vapi from "@vapi-ai/web";
import { Button } from "@/components/ui/button";
import { interviewer } from "@/utils/vapi/prompt";

const VAPI_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
const vapi = new Vapi(VAPI_PUBLIC_KEY!);

const VoiceAgent = () => {
  const handleInterviewStart = async () => {
    const VAPI_ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!;
    await vapi.start(VAPI_ASSISTANT_ID, interviewer);
  };

  return <Button onClick={handleInterviewStart}>Start the interview</Button>;
};

export default VoiceAgent;
