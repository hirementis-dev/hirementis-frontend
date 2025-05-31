import OpenAI from "openai";
import { getFirestore } from "firebase-admin/firestore";
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { db } from "@/firebase/admin";
import InterviewFeedbackGenerator from "@/lib/generate-feedback";

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

// const client = new OpenAI({
//   apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
//   // baseURL: process.env.NEXT_PUBLIC_GEMINI_API_BASE_URL,
// });

export async function POST(request: Request) {
  const { transcript, job, userId, interviewId, interviewQs } =
    await request.json();
  // console.log({ transcript, job, userId, interviewId, interviewQs });

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

    //     const result = await client.chat.completions.create({
    //       model: "gpt-4o-mini",
    //       messages: [
    //         {
    //           role: "system",
    //           content: `
    // You are a senior interview coach with 12+ years of experience helping professionals land their dream jobs. You've worked with candidates across tech, finance, healthcare, and consulting, and you're known for giving honest, personalized feedback that leads to real improvement.

    // You just observed a mock interview session between a candidate and Reva (an AI interviewer from HireMentis). Now you're sitting down with the candidate for a one-on-one feedback session—just like in your private coaching practice. If no user response is found for a question, do not fabricate an answer. Instead, state that the question was unanswered and skip evaluation for that item.

    // YOUR COACHING INPUTS:

    // JOB DETAILS:
    // Position: ${job.title} at ${job.company}
    // Location: ${job.location}
    // Employment Type: ${job.type}
    // Experience Level: ${job.level}
    // Industry: ${job.industry}
    // Role Description: ${job.description}

    // KEY REQUIREMENTS:
    // ${job.requirements.map((item: string) => `- ${item}`).join("\n")}

    // MAIN RESPONSIBILITIES:
    // ${job.responsibilities.map((item: string) => `- ${item}`).join("\n")}

    // INTERVIEW TRANSCRIPT:
    // ${formattedTranscript}

    // QUESTIONS COVERED:
    // ${interviewQs.map((item: string) => `- ${item}`).join("\n")}

    // YOUR COACHING APPROACH

    // Tone & Style:
    // - Write like you're talking directly to the candidate in a private coaching session
    // - Use "you"—make it personal, warm, and human
    // - Be encouraging but honest, like a mentor who truly wants them to improve
    // - Reference specific things they actually said (do not paraphrase or rewrite)
    // - Balance constructive criticism with authentic praise
    // - Sound like an experienced coach, not a formal evaluator

    // Analysis Method:
    // - Pay close attention to what the candidate actually said (do not improve or summarize it)
    // - Analyze their answers against the expectations of this specific role
    // - Evaluate clarity, structure, and ability to tie responses to real examples
    // - Identify repeated strengths and patterns across multiple answers
    // - Use the STAR method when applicable (Situation, Task, Action, Result)
    // - If the candidate skipped a question or gave a weak answer, still complete the ideal response so they learn what good looks like

    // Feedback Philosophy:
    // - "Here's what I noticed..." instead of "Candidates should..."
    // - "Your answer about X really stood out because..."
    // - "I'd love to see you expand on..." instead of "You need to..."
    // - "One thing that could strengthen your response..."
    // - "You clearly have the experience, but let's work on how you present it..."

    // Remember: You're not summarizing for a report—you're helping this person grow. Make it feel like they just had a powerful coaching session with someone who really *listened* and cares about helping them succeed.

    // FEEDBACK STRUCTURE
    // Generate your coaching feedback in this strict JSON format:

    // {
    //   "interview_summary": {
    //     "overall_analysis": "Write a personal paragraph about their overall performance—what stood out, how they came across, and any consistent themes",
    //     "notable_strengths": ["List specific strengths observed in their responses"],
    //     "areas_for_improvement": ["Personal areas where you would coach them to improve"],
    //     "overall_rating": "float (0.0 to 10.0) based on answer he pro"
    //   },
    //   "scorecard": {
    //     "technical_skills": {
    //       "score": "number (0 to 10)",
    //       "commentary": "Evaluate their technical competency based on their responses—mention correctness, relevance, and completeness"
    //     },
    //     "problem_solving": {
    //       "score": "number (0 to 10)",
    //       "commentary": "Assess how well they demonstrated logical thinking, approach to problem breakdown, or frameworks used"
    //     },
    //     "communication": {
    //       "score": "number (0 to 10)",
    //       "commentary": "Evaluate structure, clarity, tone, and effectiveness of their communication"
    //     },
    //     "confidence": {
    //       "score": "number (0 to 10)",
    //       "commentary": "Assess how confident and composed they seemed based on their answers"
    //     }
    //   },
    //   "per_question_feedback": [
    //     {
    //       "question_id": "number",
    //       "question": "Exact question from transcript (no paraphrasing)",
    //       "candidate_answer": "Exact answer from the transcript (verbatim, no rewriting)",
    //       "actual_answer": "A strong, ideal response for this specific question",
    //       "expected_ideal_points": ["Key things a great candidate would mention"],
    //       "evaluation": {
    //         "score": "number (0 to 10)",
    //         "coverage": "How well their answer matched what you'd expect for this job",
    //         "missed_points": ["Specific points they didn't mention but should have"],
    //         "depth": "Evaluate their thoroughness, clarity of thought, and whether they showed real insight or just surface-level knowledge"
    //       },
    //       "recommendation": "Personal coaching suggestion: 'Next time, try...' or 'I'd suggest...'"
    //     }
    //   ],
    //   "final_recommendations": {
    //     "practice_focus_areas": ["Specific areas they should focus on before the real interview"],
    //     "overall_impression": "Your honest take on whether they seem ready for this role—and if not, what’s missing",
    //     "final_tip": "End with an encouraging but actionable takeaway—one thing they can do that would make a real difference"
    //   }
    // }
    // `,
    //         },
    //         // {
    //         //   role: "user",
    //         //   content: "Go ahead and generate the relevant feedback",
    //         // },
    //       ],
    //       response_format: { type: "json_object" },
    //     });

    const generator = new InterviewFeedbackGenerator(
      job as any,
      formattedTranscript,
      interviewQs
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
      // res,
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
`

`;

// async function endInterview() {
//   setIsInterviewStarted(false);
//   vapi.stop();
//   setLoading({
//     state: true,
//     message: "Generating feedback for you...",
//   });

//   if (!job) {
//     console.error("Job details not available");
//     toast.error("Interview details are missing. Please try again.");
//     setLoading({ state: false });
//     return;
//   }

//   try {
//     const user = auth.currentUser;
//     if (!user) return;

//     const formattedTranscript = messages
//       .map(
//         (sentence: { role: string; content: string }) =>
//           `${sentence.role}: ${sentence.content}`
//       )
//       .join("\n");

//     const generator = new InterviewFeedbackGenerator(
//       job as any,
//       formattedTranscript,
//       interviewQuestions
//     );

//     const result = await generator.generateCompleteFeedback();

//     // let res;
//     if (auth.currentUser?.uid && interviewId) {
//       await db
//         .collection("users")
//         .doc(auth?.currentUser?.uid || user?.uid)
//         .collection("interviews")
//         .doc(interviewId)
//         .set({
//           job,
//           messages,
//           feedback: result,
//           createdAt: new Date(),
//         });
//     }

//     setLoading({
//       state: false,
//     });
//     router.replace(`/feedback/${interviewId}`);
//     // return {
//     //   feedback: result,
//     //   res,
//     // };
//   } catch (error) {}
// }
