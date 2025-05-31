"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import InterviewSummary from "@/components/interview-feedback/InterviewSummary";
import ScorecardSection from "@/components/interview-feedback/ScorecardSection";
import QuestionFeedbackAccordion from "@/components/interview-feedback/QuestionFeedbackAccordion";
import FinalRecommendations from "@/components/interview-feedback/FinalRecommendations";
import FeedbackActions from "@/components/interview-feedback/FeedbackActions";
import { Badge } from "@/components/ui/badge";
import { useFeedback } from "@/hooks/useFeedback";
import { useRouter } from "next/navigation";
import FullScreenLoader from "@/components/FullScreenLoader";
import { flattenDataAndExportToCSV } from "@/utils/flattenDataAndExportToCSV";

const InterviewFeedback = ({ id }: { id: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      router.push("/");
    }
  }, [id]);

  const { isLoading, feedbackData, getScoreValue, scoreColor } =
    useFeedback(id);

  if (isLoading) {
    return (
      <FullScreenLoader isLoading={true} text="Loading interview feedback..." />
    );
  }
  if (!feedbackData || !feedbackData.success) {
    return (
      <div className="min-h-screen flex flex-col justify-center">
        <div className="container mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Feedback Not Found</h1>
            <p className="mb-6">
              We couldn't find the interview feedback you're looking for.
            </p>
            <Link href="/jobs">
              <Button className="bg-emerald-500 hover:bg-emerald-600">
                Back to Jobs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { feedback, job, createdAt } = feedbackData;
  return (
    <div className="min-h-screen">
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
                {job?.title || "Position"} - Interview #{id}
              </p>
              <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white mt-3">
                Completed
              </Badge>
            </div>
            <div>
              <Button
                onClick={() => {
                  setLoading(true);
                  flattenDataAndExportToCSV({ job, feedback });
                  setLoading(false);
                }}
                disabled={loading}
                className="bg-emerald-300 sm:font-semibold text-gray-900 hover:bg-emerald-400"
                variant="default"
              >
                {loading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Export as CSV"
                )}
              </Button>
            </div>
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

        <FeedbackActions createdAt={createdAt} id={String(id)} />
      </div>
    </div>
  );
};

export default InterviewFeedback;
