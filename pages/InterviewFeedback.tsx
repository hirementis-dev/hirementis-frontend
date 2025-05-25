"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Loader } from "@/components/Loader";
import InterviewSummary from "@/components/interview-feedback/InterviewSummary";
import ScorecardSection from "@/components/interview-feedback/ScorecardSection";
import QuestionFeedbackAccordion from "@/components/interview-feedback/QuestionFeedbackAccordion";
import FinalRecommendations from "@/components/interview-feedback/FinalRecommendations";
import FeedbackActions from "@/components/interview-feedback/FeedbackActions";
import { Badge } from "@/components/ui/badge";
import { useFeedback } from "@/hooks/useFeedback";
import { useRouter } from "next/navigation";

const InterviewFeedback = ({ id }: { id: string }) => {
  const router = useRouter();

  useEffect(() => {
    if (!id) {
      router.push("/");
    }
  }, [id]);

  const { isLoading, feedbackData, getScoreValue, scoreColor } =
    useFeedback(id);

  if (isLoading) {
    return <Loader loading={true} message="Loading interview feedback..." />;
  }
  if (!feedbackData || !feedbackData.success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 to-white">
        <div className="container mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Feedback Not Found</h1>
            <p className="mb-6">
              We couldn't find the interview feedback you're looking for.
            </p>
            <Link href="/jobs">
              <Button>Back to Jobs</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { feedback } = feedbackData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 to-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mb-6">
          <Link
            href="/profile"
            className="text-emerald-600 hover:underline flex items-center mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Profile
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Interview Feedback
              </h1>
              <p className="text-gray-600 mt-1">
                Backend Developer Position - Interview #{id}
              </p>
            </div>
            <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">
              Completed
            </Badge>
          </div>
        </div>

        <InterviewSummary
          summary={feedback.interview_summary}
          getScoreValue={getScoreValue}
          scoreColor={scoreColor}
        />

        <ScorecardSection
          scorecard={feedback.scorecard}
          getScoreValue={getScoreValue}
          scoreColor={scoreColor}
        />

        <QuestionFeedbackAccordion
          questions={feedback.per_question_feedback}
          scoreColor={scoreColor}
        />

        <FinalRecommendations
          recommendations={feedback.final_recommendations}
        />

        <FeedbackActions id={String(id)} />
      </div>
    </div>
  );
};

export default InterviewFeedback;
