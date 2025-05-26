export interface QuestionEvaluation {
  score: number;
  coverage: string;
  missed_points: string[];
  depth: string;
}

export interface QuestionFeedback {
  question_id: number;
  question: string;
  candidate_answer: string;
  candidate_answer_summary?: string;
  expected_ideal_points: string[];
  evaluation: QuestionEvaluation;
  recommendation: string;
  actual_answer?: string;
}

export interface ScoreItem {
  score: number;
  commentary: string;
}

export interface Scorecard {
  technical_skills: ScoreItem;
  problem_solving: ScoreItem;
  communication: ScoreItem;
  confidence: ScoreItem;
  jd_alignment: ScoreItem;
}

export interface InterviewSummary {
  overall_analysis: string;
  notable_strengths: string[];
  areas_for_improvement: string[];
  overall_rating: number;
}

export interface FinalRecommendations {
  practice_focus_areas: string[];
  overall_impression: string;
  final_tip: string;
}

export interface FeedbackData {
  success: boolean;
  job: any;
  createdAt: any;
  feedback: {
    interview_summary: InterviewSummary;
    scorecard: Scorecard;
    per_question_feedback: QuestionFeedback[];
    final_recommendations: FinalRecommendations;
  };
}
