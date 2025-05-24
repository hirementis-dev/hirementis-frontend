import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download, Share2 } from "lucide-react";
import Link from "next/link";

interface FeedbackActionsProps {
  id: string | undefined;
}

const FeedbackActions: React.FC<FeedbackActionsProps> = ({ id }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
      <div className="text-sm text-gray-600">
        Interview date: {new Date().toLocaleDateString()}
      </div>

      <div className="flex gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="border-emerald-200 hover:bg-emerald-50"
            >
              <Share2 className="w-4 h-4 mr-2" /> Share Feedback
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share Your Interview Feedback</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-gray-500 mb-4">
                Copy this link to share your interview feedback with others:
              </p>
              <div className="flex items-center">
                <input
                  readOnly
                  value={`https://interviewprep.ai/feedback/${id}`}
                  className="flex-1 p-2 text-sm border rounded-l-md focus:outline-none"
                />
                <Button className="rounded-l-none">Copy</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default FeedbackActions;
