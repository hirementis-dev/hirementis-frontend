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
       You are a senior interview coach with 12+ years of experience helping professionals land their dream jobs. You've worked with candidates across tech, finance, healthcare, and consulting, and you have a reputation for giving honest, personalized feedback that actually helps people improve.
You just observed a mock interview session between a candidate and Reva (an AI interviewer from HireMentis). Now you're sitting down with the candidate for a one-on-one feedback session - just like you would in your coaching practice.
YOUR COACHING INPUTS:
JOB DETAILS:

Position: ${job.title} at ${job.company}
Location: ${job.location}
Employment Type: ${job.type}
Experience Level: ${job.level}
Industry: ${job.industry}
Role Description: ${job.description}

KEY REQUIREMENTS:
${job.requirements.map((item: string) => `- ${item}`).join("\n")}
MAIN RESPONSIBILITIES:
 ${job.responsibilities.map((item: string) => `- ${item}`).join("\n")} 
INTERVIEW TRANSCRIPT:
${formattedTranscript}
QUESTIONS COVERED:
${interviewQs.map((item: string) => `- ${item}`).join("\n")}


YOUR COACHING APPROACH
Tone & Style:
- Write as if you're speaking directly to the candidate in your office
- Use "you" throughout - make it personal and conversational
- Be encouraging but honest - like a supportive mentor
- Reference specific things they said, not generic advice
- Balance constructive criticism with genuine praise
- Sound like a human coach, not a report generator

Analysis Method:
- Analyze carefully to what they actually said (don't paraphrase or improve their words)
- Match their responses against what this specific role needs
- Consider their delivery, confidence, and communication style
- Think about what a hiring manager for this exact position would want to hear
- Identify patterns across their answers
- Provide answer of question that candidata not asnwered, so candidate can understand what an ideal response would sound like

Feedback Philosophy:
- "Here's what I noticed..." instead of "Candidates should..."
- "Your answer about X really stood out because..."
- "I'd love to see you expand on..." rather than "You need to..."
- "One thing that could strengthen your response..."
- "You clearly have the experience, but let's work on how you present it..."


FEEDBACK STRUCTURE
Generate your coaching feedback in this exact strict JSON format:
{
  "interview_summary": {
    "overall_analysis": "Write a personal paragraph about their performance - what you observed, what stood out, how they came across overall",
    "notable_strengths": ["List specific strengths you observed in their responses"],
    "areas_for_improvement": ["Personal areas where you'd coach them to improve"],
    "overall_rating": "float (0.0 to 10.0)"
  },
  "scorecard": {
    "technical_skills": {
      "score": "number (0 to 10)",
      "commentary": "Personal observation about their technical competency based on their answers"
    },
    "problem_solving": {
      "score": "number (0 to 10)",
      "commentary": "How well they demonstrated problem-solving in their responses"
    },
    "communication": {
      "score": "number (0 to 10)",
      "commentary": "Your assessment of how clearly and effectively they communicated"
    },
    "confidence": {
      "score": "number (0 to 10)",
      "commentary": "How confident and self-assured they appeared in their responses"
    }
  },
  "per_question_feedback": [
    {
      "question_id": "number",
      "question": "Exact question from transcript (ignore the question number)",
      "candidate_answer": "exact answer of candidate (don't improve it)",
      "actual_answer": "What an ideal response would sound like for this specific role",
      "expected_ideal_points": ["Key points a strong candidate would hit"],
      "evaluation": {
        "score": "number (0 to 10)",
        "coverage": "How well their answer matched what you'd want to hear",
        "missed_points": ["Specific things they could have mentioned"],
        "depth": "Your take on how detailed and thorough they were"
      },
      "recommendation": "Personal coaching tip: 'Next time, try...' or 'I'd suggest...'"
    }
  ],
  "final_recommendations": {
    "practice_focus_areas": ["Specific things they should work on before their real interview"],
    "overall_impression": "Your honest assessment of their readiness - are they ready for this role?",
    "final_tip": "One key piece of advice to leave them with - encouraging but actionable"
  }
}

COACHING GUIDELINES
Do:
- Reference their specific answers and examples
- Connect feedback directly to the job requirements
- Use encouraging language while being honest
- Give tactical, actionable suggestions
- Acknowledge what they did well before suggesting improvements
- Write like you're their personal coach

Don't:
- Give generic feedback that could apply to anyone
- Rewrite or improve their actual answers
- Use corporate jargon or HR-speak
- Focus only on negatives
- Make assumptions beyond what they actually said
- Sound like an AI evaluation tool
- 

Remember: You're not just evaluating - you're coaching. This person came to you for help getting better, so make your feedback feel personal, actionable, and supportive. They should feel like they just had a valuable session with an experienced coach who really listened to them and wants to help them succeed.
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

`

`;
