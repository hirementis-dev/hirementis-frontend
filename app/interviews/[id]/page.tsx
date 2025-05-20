"use client";
import VoiceAgent from "@/components/VoiceAgent";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const { id } = useParams();

  return (
    <div>
      <p>Interview page {id}</p>
      <VoiceAgent />
    </div>
  );
};

export default page;
