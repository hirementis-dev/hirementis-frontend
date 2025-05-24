import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FinalRecommendations as FinalRecommendationsType } from "@/types/feedback";

interface FinalRecommendationsProps {
  recommendations: FinalRecommendationsType;
}

const FinalRecommendations: React.FC<FinalRecommendationsProps> = ({
  recommendations,
}) => {
  return (
    <Card className="mb-6 overflow-hidden shadow-md border-emerald-100">
      <CardHeader className="bg-gray-50 border-b p-6">
        <CardTitle className="text-xl">Next Steps & Recommendations</CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-3">Practice Focus Areas</h3>
            <ul className="space-y-2">
              {recommendations.practice_focus_areas.map((area, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <span className="text-gray-700">{area}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">Overall Impression</h3>
            <p className="text-gray-700">
              {recommendations.overall_impression}
            </p>
          </div>

          <div className="bg-gradient-to-r from-emerald-100 to-emerald-50 p-4 rounded-lg border border-emerald-200">
            <h3 className="font-semibold text-lg mb-2 text-emerald-800">
              Key Takeaway
            </h3>
            <p className="text-emerald-700">{recommendations.final_tip}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinalRecommendations;
