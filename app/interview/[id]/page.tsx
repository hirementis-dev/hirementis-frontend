"use client";
import VoiceAgent from "@/components/VoiceAgent";
import Interview from "@/pages/Interview";
import { useParams } from "next/navigation";
import React, { use } from "react";

const page = () => {
  const params = useParams();
  const id = params?.id;
  if (!id && isNaN(Number(id))) {
    return <div>Invalid ID</div>;
  }

  return (
    <div>
      <Interview id={Number(id)} />
    </div>
  );
};

export default page;
