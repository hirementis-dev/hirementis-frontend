import OpenAI from "openai";
import { getFirestore } from "firebase-admin/firestore";
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { db } from "@/firebase/admin";
import InterviewFeedbackGenerator from "@/lib/generate-feedback";

export async function POST(request: Request) {
  const { transcript, job, userId, interviewId, interviewQs, userName } =
    await request.json();

  if (!transcript || !job || !interviewId || !userId) {
    return Response.json({
      success: false,
      message:
        "interview transcript, job data, user id and interview id is required",
    });
  }

  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    const generator = new InterviewFeedbackGenerator(
      job as any,
      formattedTranscript,
      interviewQs,
      userName
    );

    const result = await generator.generateCompleteFeedback();
    // return Response.json({ result });
    if (userId && interviewId) {
      await db
        .collection("users")
        .doc(userId)
        .collection("interviews")
        .doc(interviewId)
        .set({
          job: job,
          transcript,
          feedback: result,
          createdAt: new Date(),
        });
    }

    return Response.json({
      success: true,
      feedback: result,
    });
  } catch (error) {
    console.error("Error formatting transcript:", error);
    return Response.json({
      success: false,
      message: "Failed to generate or save feedback.",
      error: error,
    });
  }
}

export async function GET() {
  return Response.json({ message: "All righty !!" });
}
