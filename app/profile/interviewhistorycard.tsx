import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Calendar, ChevronRight, Star, Loader2 } from 'lucide-react';
import { auth, db } from '@/firebase/client';
import {
  collection,
  query,
  orderBy,
  getDocs,
  DocumentData,
  Timestamp,
} from "firebase/firestore";

interface Interview {
  id: string;
  position: string;
  company: string;
  date: string;
  score: number;
  status: string;
}

interface InterviewHistoryCardProps {
  formatDate?: (dateString: string) => string;
  getScoreColor?: (score: number) => string;
}

const InterviewHistoryCard = ({
  formatDate = (dateString: string) => new Date(dateString).toLocaleDateString(),
  getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  }
}: InterviewHistoryCardProps = {}) => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInterviews = async (userId: string) => {
    try {
      setLoading(true);
      setError(null);

      // Firestore V9+ modular syntax
      const interviewsRef = collection(db, "users", userId, "interviews");
      const q = query(interviewsRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const interviewsData: Interview[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data() as DocumentData;
        const jobData = data.job || {};
        const feedbackData = data.feedback || {};
        let dateStr = "";
        if (data.createdAt instanceof Timestamp) {
          dateStr = data.createdAt.toDate().toISOString();
        } else if (typeof data.createdAt === "string") {
          dateStr = data.createdAt;
        } else {
          dateStr = new Date().toISOString();
        }
        interviewsData.push({
          id: docSnap.id,
          position: jobData.title || jobData.position || 'Unknown Position',
          company: jobData.company || 'Unknown Company',
          date: dateStr,
          score: feedbackData.overallScore || feedbackData.score || 0,
          status: 'completed'
        });
      });

      setInterviews(interviewsData);
    } catch (err) {
      console.error('Error fetching interviews:', err);
      setError('Failed to load interview history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      fetchInterviews(currentUser.uid);
    } else {
      setLoading(false);
      setError("User not found.");
    }
  }, []);

  if (loading) {
    return (
      <Card className="border-mint-100">
        <CardHeader className="pb-2">
          <CardTitle className="flex justify-between items-center">
            <span>Interview History</span>
            <Link href="/jobs">
              <Button size="sm" className="bg-mint-500 hover:bg-mint-600 text-xs">
                Practice New Interview
              </Button>
            </Link>
          </CardTitle>
          <CardDescription>All your previous interview practices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-mint-500 mr-2" />
            <span className="text-gray-500">Loading interview history...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-mint-100">
        <CardHeader className="pb-2">
          <CardTitle className="flex justify-between items-center">
            <span>Interview History</span>
            <Link href="/jobs">
              <Button size="sm" className="bg-mint-500 hover:bg-mint-600 text-xs">
                Practice New Interview
              </Button>
            </Link>
          </CardTitle>
          <CardDescription>All your previous interview practices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-red-500 mb-2">{error}</div>
            <Button 
              onClick={() => {
                // You'll need to implement retry logic based on your auth system
                // Example: fetchInterviews(currentUserId)
              }}
              variant="outline"
              size="sm"
            >
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-mint-100">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>Interview History</span>
          <Link href="/jobs">
            <Button size="sm" className="bg-mint-500 hover:bg-mint-600 text-xs">
              Practice New Interview
            </Button>
          </Link>
        </CardTitle>
        <CardDescription>
          {interviews.length === 0 
            ? "No interview practices yet" 
            : `${interviews.length} interview${interviews.length === 1 ? '' : 's'} completed`
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {interviews.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="mb-2">No interview practices yet</p>
            <p className="text-sm">Start your first practice interview to see your history here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {interviews.map((interview) => (
              <Link 
                href={`/feedback/${interview.id}`} 
                key={interview.id}
                className="block"
              >
                <Card className="overflow-hidden hover:border-mint-300 transition-colors hover:shadow-md cursor-pointer">
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center mb-1">
                        <Briefcase className="h-4 w-4 text-gray-500 mr-1" />
                        <h3 className="font-medium">{interview.position}</h3>
                        <Badge className="ml-2 bg-gray-100 text-gray-700 hover:bg-gray-200">
                          {interview.company}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          {formatDate(interview.date)}
                        </div>
                        <div className="flex items-center">
                          <Star className="h-3.5 w-3.5 mr-1" />
                          <span className={`px-1.5 py-0.5 rounded-sm text-xs font-medium ${getScoreColor(interview.score)}`}>
                            Score: {interview.score}%
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InterviewHistoryCard;