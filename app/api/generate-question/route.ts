import { OpenAI } from "openai";

const ai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  baseURL: process.env.NEXT_PUBLIC_GEMINI_API_BASE_URL,
});

export async function POST(request: Request) {
  const { question_amonut, job_desc } = await request.json();
  if (!question_amonut || !job_desc) {
    return Response.json({
      success: false,
      message: "question_amonut and job_desc are required",
    });
  }

  try {
    const result = await ai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: `You are an expert HR interviewer and assessment designer. Your task is to generate thoughtful, relevant, and clear interview questions based on a given Job Description (JD).

Instructions:
- Read and understand the JD provided by to you.
- Generate exactly ${question_amonut} questions tailored to assess a candidate's skills, experience, and suitability for the role described.
- Focus on key aspects such as required skills, responsibilities, tools/technologies, and behavioral traits mentioned in the job description.
- Avoid generic questions — make each question specific to the job description.

Output Format:
Return only the list of questions as a JSON array of strings, like:
["Question 1", "Question 2", "Question 3", "Question 4"]

Do not include any explanation or preamble. Only return the array.

Job Description:
${job_desc}
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
