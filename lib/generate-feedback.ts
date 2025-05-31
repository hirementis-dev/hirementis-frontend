import { client } from "@/lib/openai.sdk";
import { InterviewFeedbackResult, LLMResponse } from "@/types/feedback";
import { Job } from "@/types/feedback";

interface Transcript {
  role: string;
  content: string;
}

class InterviewFeedbackGenerator {
  private jobDetails: Job;
  private transcript: String;
  private questions: string[];

  constructor(jobDetails: Job, transcript: String, questions: string[]) {
    this.jobDetails = jobDetails;
    this.transcript = transcript;
    this.questions = questions;
  }

  async generateInterviewSummary() {
    const prompt = `
    As a senior interview coach, analyze this candidate's overall performance:
    
    Job Data: 
    Position: ${this.jobDetails.title} at ${this.jobDetails.company}
    Employment Type: ${this.jobDetails.type}
    Experience Level: ${this.jobDetails.level}
    Industry: ${this.jobDetails.industry}
    Role Description: ${this.jobDetails.description}

    KEY REQUIREMENTS:
    ${
      this.jobDetails.requirements?.map((item) => `- ${item}`).join("\n") ||
      "Not specified"
    }
    
    Focus on:
    - Overall impression and themes
    - Observable strengths across all answers
    - Areas needing improvement
    - Overall rating (0-10)

    Analyze their overall performance, noting:
    - How they came across as a candidate
    - Consistent themes and patterns
    - Observable strengths across answers
    - Areas where coaching would help
    - Overall readiness for this specific role
    
    Interview transcript or conversation: 
    ${this.transcript}
    
    Return only JSON:
    {
      "overall_analysis": "string",
      "notable_strengths": ["array of strings"],
      "areas_for_improvement": ["array of strings"], 
      "overall_rating": "float (0.0 to 10.0)"
    }`;

    return await this.callLLM(prompt);
  }

  async generateScorecard() {
    const prompt = `
   As a senior interview coach, evaluate this candidate's or user performance across key dimensions for this job post:
    Position: ${this.jobDetails.title} at ${this.jobDetails.company}
    Employment Type: ${this.jobDetails.type}
    Experience Level: ${this.jobDetails.level}
    Industry: ${this.jobDetails.industry}
    Role Description: ${this.jobDetails.description}
    
    KEY REQUIREMENTS:
    ${this.jobDetails.requirements
      .map((item: string) => `- ${item}`)
      .join("\n")}

    MAIN RESPONSIBILITIES:
    ${this.jobDetails.responsibilities
      .map((item: string) => `- ${item}`)
      .join("\n")}

    Transcript: 
    ${this.transcript}
    
    Score each area 0-10 with detailed specific commentary and give the responsse as you are directly helping or talking to user or candidate:
    
    Return only JSON:
    {
      "technical_skills": {"score": number, "commentary": "string"},
      "problem_solving": {"score": number, "commentary": "string"},
      "communication": {"score": number, "commentary": "string"},
      "confidence": {"score": number, "commentary": "string"}
    }`;

    return await this.callLLM(prompt);
  }

  async generateQuestionFeedback() {
    const questionFeedback = [];

    for (let i = 0; i < this.questions.length; i++) {
      const question = this.questions[i];

      const candidateAnswer = await this.extractAnswerForQuestion(question, i);

      const prompt = `
      As an interview coach, evaluate this single Q&A for this job post: 
      Position: ${this.jobDetails.title} at ${this.jobDetails.company}
      Employment Type: ${this.jobDetails.type}
      Experience Level: ${this.jobDetails.level}
      Industry: ${this.jobDetails.industry}
      Role Description: ${this.jobDetails.description}
      
      Question: "${question}"
      Candidate Answer: "${candidateAnswer}"
      Job Requirements:   
      ${this.jobDetails.requirements
        .map((item: string) => `- ${item}`)
        .join("\n")}
      
    Your task is to provide detailed feedback:
    1. Provide an ideal answer for this specific question and role
    2. Identify key points a strong candidate should mention
    3. Evaluate how well their answer matched expectations
    4. Note specific missed opportunities
    5. Assess depth and insight demonstrated
    6. Give personal coaching recommendation
      
     Return ONLY this JSON object — DO NOT wrap it in an array:
      {
        "question_id": ${i + 1},
        "question": "${question}",
        "candidate_answer": "${candidateAnswer}",
        "actual_answer": "ideal response for this role",
        "expected_ideal_points": ["key points array"],
        "evaluation": {
          "score": number,
          "coverage": "coverage analysis",
          "missed_points": ["missed points array"],
          "depth": "depth evaluation"
        },
        "recommendation": "coaching suggestion"
      }`;

      const feedback = await this.callLLM(prompt);
      questionFeedback.push(Array.isArray(feedback) ? feedback[0] : feedback);
    }

    return questionFeedback;
  }

  async generateFinalRecommendations() {
    const prompt = `
    As a senior interview coach, provide final recommendations based on this candidate's interview performance:

    JOB: ${this.jobDetails.title} at ${this.jobDetails.company}
    INDUSTRY: ${this.jobDetails.industry}
    LEVEL: ${this.jobDetails.level}
    Role Description: ${this.jobDetails.description}

    KEY REQUIREMENTS:
    ${this.jobDetails.requirements
      .map((item: string) => `- ${item}`)
      .join("\n")}

    MAIN RESPONSIBILITIES:
    ${this.jobDetails.responsibilities
      .map((item: string) => `- ${item}`)
      .join("\n")}

    INTERVIEW TRANSCRIPT OR CONVERSATION:
    ${this.transcript}

    Based on what you observed, provide:
    1. Specific practice areas they should focus on before their real interview
    2. Your honest assessment of their readiness for this role
    3. One actionable tip that would make the biggest difference

    Be encouraging but honest - like a mentor who truly wants them to succeed.

    Return ONLY this JSON structure:
    {
      "practice_focus_areas": ["Specific practice area 1", "Specific practice area 2", "Specific practice area 3"],
      "overall_impression": "Your honest take on whether they seem ready for this role and what's missing if not",
      "final_tip": "One encouraging but actionable takeaway that would make a real difference"
    }`;
    return await this.callLLM(prompt);
  }

  async generateCompleteFeedback(): Promise<InterviewFeedbackResult> {
    try {
      const [summary, scorecard, questionFeedback, recommendations] =
        await Promise.all([
          this.generateInterviewSummary(),
          this.generateScorecard(),
          this.generateQuestionFeedback(),
          this.generateFinalRecommendations(),
        ]);

      const completeFeedback = {
        interview_summary: summary,
        scorecard: scorecard,
        per_question_feedback: questionFeedback,
        final_recommendations: recommendations,
      };

      return completeFeedback;
    } catch (error) {
      console.error("Error generating feedback:", error);
      throw new Error("Failed to generate complete feedback");
    }
  }

  async extractAnswerForQuestion(
    question: string,
    index: number
  ): Promise<any> {
    const prompt = `
You're an expert assistant.

I have an interview transcript below. Each entry contains a conversation between reva (AI Assistant) and the candidate's response.

Given the following question:
"${question}"

Your job is to extract the 'exact answer' (word-by-word) provided by the candidate for this question from the transcript.

If there is no exact answer, return "Answer not found".

Transcript:
${this.transcript}

Return only a JSON:
{
  "exact_answer": "string"
}
`;

    const response: LLMResponse = await this.callLLM(prompt);
    return response?.exact_answer || { exact_answer: "Answer not found" };
  }

  async callLLM(prompt: string): Promise<any> {
    try {
      const response = await client.chat.completions.create({
        model: "gemini-2.0-flash",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: "Complete the task" },
        ],
        response_format: { type: "json_object" },
      });
      const parsedFeedback = JSON.parse(
        response.choices[0].message.content || "[]"
      );
      return parsedFeedback;
    } catch (error) {
      console.error("Got error while talking to LLM", error);
    }
  }
}

export default InterviewFeedbackGenerator;
