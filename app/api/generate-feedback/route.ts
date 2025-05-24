import OpenAI from "openai";
import { getFirestore } from "firebase-admin/firestore";
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { db } from "@/firebase/admin";

// Initialize Firebase Admin if not already initialized
// if (!getApps().length) {
//   initializeApp({
//     credential: cert({
//       projectId: process.env.FIREBASE_PROJECT_ID,
//       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//       privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//     }),
//   });
// }
const adminDb = getFirestore();

const client = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  baseURL: process.env.NEXT_PUBLIC_GEMINI_API_BASE_URL,
});

export async function POST(request: Request) {
  const { transcript, job, userId, interviewId } = await request.json();

  if (!transcript || !job) {
    return Response.json({
      success: false,
      message: "interview transcript and job data is required",
    });
  }

  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    const result = await client.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: `
        You are a senior interview coach and hiring advisor. Your task is to analyze a mock interview transcript between a candidate and a voice interviewer ("Reva" from HireMentis), and provide structured, professional feedback to help the candidate improve.

You are given two inputs:
1. Job Data – Includes title, company, responsibilities, requirements, and other role-specific info.
2. Interview Transcript – Includes a list of interview questions asked and the candidate’s exact answers.

JOB DATA:
- title: ${job.title}
- company: ${job.company}
- location: ${job.location}
- type: ${job.type}
- level: ${job.level}
- description: ${job.description}
- industry: ${job.industry}
- requirements:
  ${job.requirements.map((item: string) => `- ${item}`).join("\n")}
- responsibilities:
  ${job.responsibilities.map((item: string) => `- ${item}`).join("\n")} 

TRANSCRIPT:
${formattedTranscript}


Based on these, generate a detailed feedback JSON with the following structure:

STRICT JSON OUTPUT SCHEMA FORMAT:
{
  "interview_summary": {
    "overall_analysis": "string (a paragraph summarizing performance)",
    "notable_strengths": ["string(list of key strengths)"],
    "areas_for_improvement": ["string(list of key improvement points)"],
    "overall_rating": "number (float from 0.0 to 10.0)"
  },
  "scorecard": {
    "technical_skills": {
      "score": "number (0 to 10)",
      "commentary": "string (brief analysis)"
    },
    "problem_solving": {
      "score": "number (0 to 10)",
      "commentary": "string"
    },
    "communication": {
      "score": "number (0 to 10)",
      "commentary": "string"
    },
    "confidence": {
      "score": "number (0 to 10)",
      "commentary": "string"
    },
  },
  "per_question_feedback": [
    {
      "question_id": "number",
      "question": "string (verbatim question text)",
      "candidate_answer_summary": "string (short recap of the candidate's response)",
      "expected_ideal_points": ["string(key concepts expected in the answer)"],
      "evaluation": {
        "score": "number (0 to 10)",
        "coverage": "string (summary of how well answer covered expectations)",
        "missed_points": ["string(points the candidate missed)"],
        "depth": "string (brief comment on depth of answer)"
      },
      "recommendation": "string (a tip or suggestion for this question)"
    }
  ],
  "final_recommendations": {
    "practice_focus_areas": ["string(areas to study/practice more)"],
    "overall_impression": "string (final judgment about readiness for the role)",
    "final_tip": "string (motivational or actionable closing tip)"
  }
}


Rules:
- Only use the candidate’s actual answers as provided — do not reword or expand them.
- Feedback should be based strictly on the job description and conversation content.
- Be honest, professional, and helpful — this will be shown to the user.
- The question_feedback must be an array of objects, each with the exact structure above.
- Avoid generic feedback — personalize it based on each answer.
        `,
        },
      ],
      response_format: { type: "json_object" },
    });

    const parsedFeedback = JSON.parse(
      result.choices[0].message.content || "[]"
    );

    // Save feedback to Firestore
    // You must provide userId and interviewId in the request body
    if (userId && interviewId) {
      await db
        .collection("users")
        .doc(userId)
        .collection("interviews")
        .doc(interviewId)
        .set({
          job,
          transcript,
          feedback: parsedFeedback,
          createdAt: new Date(),
        });
    }
    return Response.json({
      success: true,
      feedback: parsedFeedback,
    });
  } catch (error) {
    console.error("Error formatting transcript:", error);
    return Response.json({
      success: false,
      message: "Failed to generate or save feedback.",
    });
  }
}

export async function GET() {
  return Response.json({ message: "All righty !!" });
}
