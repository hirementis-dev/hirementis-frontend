import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { QuestionFeedback } from "@/types/feedback";
import { Badge } from "@/components/ui/badge";
import Markdown from "react-markdown";
import { Sparkle, TriangleAlert } from "lucide-react";

interface QuestionFeedbackAccordionProps {
  questions: QuestionFeedback[];
  scoreColor: (score: number) => string;
}

const QuestionFeedbackAccordion: React.FC<QuestionFeedbackAccordionProps> = ({
  questions,
  scoreColor,
}) => {
  return (
    <Card className="mb-6 overflow-hidden shadow-md border-emerald-100">
      <CardHeader className="bg-gray-50 border-b p-6">
        <CardTitle className="text-xl">Question Analysis</CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <Accordion type="single" collapsible className="space-y-4">
          {questions.map((question, index) => (
            <AccordionItem
              key={index}
              value={`question-${question.question_id}`}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="px-4 py-3 bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors">
                <div className="flex items-center justify-between w-full text-left">
                  <div className="flex-1">
                    <h3 className="font-medium">{question.question}</h3>
                  </div>
                  <Badge
                    className={`ml-4 ${
                      question.evaluation.score >= 8
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : question.evaluation.score >= 6
                        ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                        : question.evaluation.score >= 4
                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                        : "bg-red-100 text-red-800 hover:bg-red-100"
                    }`}
                  >
                    Score: {question.evaluation.score}/10
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3 bg-white">
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-gray-600">
                      Your Answer:
                    </h4>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-md border border-gray-100">
                      {question.candidate_answer ||
                        question.candidate_answer_summary ||
                        "No answer provided."}
                    </p>
                    <h4 className="text-sm font-semibold text-gray-600">
                      Actual Answer:
                    </h4>
                    <div className="text-gray-700 bg-gray-50 p-3 rounded-md border border-gray-100">
                      <Markdown>{question.actual_answer}</Markdown>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-gray-600">
                        Expected Points:
                      </h4>
                      <ul className="list-none list-inside text-gray-700 space-y-1">
                        {question.expected_ideal_points.map((point, i) => (
                          <li
                            key={i}
                            className="text-sm flex items-center space-x-4"
                          >
                            <span>
                              <Sparkle className="text-emerald-600" size={14} />
                            </span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-gray-500">
                        Missed Points:
                      </h4>
                      {question.evaluation.missed_points.length > 0 ? (
                        <ul className="list-none list-inside text-gray-700 space-y-1">
                          {question.evaluation.missed_points.map((point, i) => (
                            <li
                              key={i}
                              className="text-sm flex items-center space-x-4"
                            >
                              <span>
                                <TriangleAlert
                                  className="text-orange-600"
                                  size={14}
                                />
                              </span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-green-600">
                          No major points missed!
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-gray-500">
                      Coverage & Depth:
                    </h4>
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="p-2 bg-gray-50 text-gray-800 hover:bg-gray-100 rounded-md text-xs sm:text-sm">
                        {question.evaluation.coverage}
                      </div>
                      <p className="text-sm text-gray-600">
                        {question.evaluation.depth}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1 bg-emerald-50 p-3 rounded-md border border-emerald-100">
                    <h4 className="text-sm font-semibold text-emerald-700">
                      Recommendation:
                    </h4>
                    <p className="text-emerald-700">
                      {question.recommendation}
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default QuestionFeedbackAccordion;
