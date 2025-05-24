import { OpenAI } from "openai";

const ai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  baseURL: process.env.NEXT_PUBLIC_GEMINI_API_BASE_URL,
});

// const QUESTION_GENERATION_PROMPT =

export async function POST(request: Request) {
  const {
    question_amount = 5,
    title,
    level,
    type,
    company,
    industry,
    description,
    requirements = [],
    responsibilities = [],
  } = await request.json();

  try {
    const result = await ai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: `
You are an expert HR interviewer and assessment designer. Your task is to generate thoughtful, specific, and relevant interview questions based on a given job description and its structured details.

🎯 Objective:
Generate exactly ${question_amount} high-quality questions to evaluate a candidate’s readiness and fit for the role.

📌 Focus Areas:
- Role Title: ${title}
- Experience Level: ${level}
- Employment Type: ${type}
- Company: ${company}
- Industry: ${industry}
- Core Job Description: ${description}

- Key Requirements: 
${requirements.map((item: string) => `- ${item}`).join("\n")}

- Key Responsibilities: 
${responsibilities.map((item: string) => `- ${item}`).join("\n")} 

✅ Guidelines:
- Use the provided job data to craft questions that assess:
  - Required technical skills and tools (from “requirements”)
  - Practical understanding of the role’s responsibilities
  - Candidate’s experience level and fit
  - Behavioral and situational responses relevant to the role
- Questions should feel realistic, like those asked in actual interviews for this role.
- Phrase questions professionally and clearly.
- Do not include duplicate or generic questions.

🚫 Avoid:
- Vague or unrelated questions
- Repetition
- Hypothetical tech that’s not mentioned in the job description

📤 Output Format:
Return only the questions in a valid JSON array of strings, like:
["Question 1", "Question 2", "Question 3", "Question 4"]
`,
        },
      ],
      response_format: { type: "json_object" },
    });

    return Response.json(
      {
        success: true,
        questions: JSON.parse(
          result.choices[0].message.content !== null
            ? result.choices[0].message.content
            : "[]"
        ),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("error while generating questions", error);
    return Response.json({
      success: false,
      message: "Error while generating questions",
    });
  }
}
