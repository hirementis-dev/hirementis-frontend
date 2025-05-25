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
              <AccordionTrigger className="px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors">
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
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-gray-500">
                      Your Answer Summary:
                    </h4>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-md border border-gray-100">
                      {question.candidate_answer_summary}
                    </p>
                    <h4 className="text-sm font-semibold text-gray-500">
                      Actual Answer:
                    </h4>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-md border border-gray-100">
                      {question.actual_answer}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-gray-500">
                        Expected Points:
                      </h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {question.expected_ideal_points.map((point, i) => (
                          <li key={i} className="text-sm">
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-gray-500">
                        Missed Points:
                      </h4>
                      {question.evaluation.missed_points.length > 0 ? (
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          {question.evaluation.missed_points.map((point, i) => (
                            <li key={i} className="text-sm">
                              {point}
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
                    <div className="flex space-x-4">
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                        {question.evaluation.coverage}
                      </Badge>
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
