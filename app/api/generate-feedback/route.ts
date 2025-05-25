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

const client = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  baseURL: process.env.NEXT_PUBLIC_GEMINI_API_BASE_URL,
});

export async function POST(request: Request) {
  const { transcript, job, userId, interviewId, interviewQs } =
    await request.json();

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
       You are a senior interview coach and hiring advisor. Your role is to evaluate a mock interview conducted between a candidate and a voice-based AI interviewer ("Reva" from HireMentis). Your goal is to deliver clear, structured, and actionable feedback to help the candidate improve their performance.

You are given three inputs:
1. Job Data: Includes title, company, responsibilities, requirements, and other role-specific info.
2. Interview Transcript: Includes a whole conversation between Reva(AI interviwer) and candidate
3. Questions: a list of question that is asked during the interview by Reva.

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

QUESTIONS:
${interviewQs.map((item: string) => `- ${item}`).join("\n")}

Rules:
- Only use the candidate’s actual answers as provided — do not reword or expand them.
- Feedback should be based strictly on the job description and conversation content.
- Be honest, professional, and helpful — this will be shown to the user.
- The question_feedback must be an array of objects, each with the exact structure above.
- Avoid generic feedback — personalize it based on each answer.
- As transcript is a raw converstaion, you have to find out the exact question asked by Reva(AI interviewr) and exact answer given by candidate, and you do not have to change the candidate answer, after finding out question you have anlyze and and give your feedback on it as above suggested with proper JSON format, you also have the all the question provided to you, so it will be easy to find out the questions.
- The question above provided to you is the questions, on that you have to give feedback and if candidate did not give answer of any question, add a relevant message

Based on above data, you have to generate a detailed feedback JSON with the following structure:
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
      "candidate_answer": "string (short recap of the candidate's response)",
      "actual_answer": "The actual answer for the question, that will be perfect for the question to reply with"
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
        `,
        },
      ],
      response_format: { type: "json_object" },
    });

    const parsedFeedback = JSON.parse(
      result.choices[0].message.content || "[]"
    );

    let res;
    if (userId && interviewId) {
      res = await db
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
      res,
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
