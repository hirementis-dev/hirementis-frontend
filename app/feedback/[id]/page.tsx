"use client";
import InterviewFeedback from "@/pages/InterviewFeedback";
import React from "react";
import { useParams } from "next/navigation";

function page() {
  const params = useParams();
  const id = params?.id;
  // console.log("Feedback ID:", id);
  return (
    <div>
      <InterviewFeedback id={String(id)} />
    </div>
  );
}

export default page;
