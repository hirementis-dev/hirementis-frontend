import OpenAI from "openai";

export async function POST(request: Request) {
  const { transcript, job_desc } = await request.json();

  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");
    Response.json({ formattedTranscript });
  } catch (error) {}
}
