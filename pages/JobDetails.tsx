"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { jobs } from "@/data/jobs";
import { redirect, useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/firebase/client";
import { toast } from "sonner";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Calendar,
  Briefcase,
  Clock,
  CheckCircle2,
  ListChecks,
  Lock,
} from "lucide-react";

const JobDetails = () => {
  const params = useParams();
  const id = params?.id as string;

  const [showKeyPrompt, setShowKeyPrompt] = useState(false);
  const [secretKey, setSecretKey] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!id) {
      redirect("/jobs");
    }
  }, [id]);

  const jobId = Number(id);
  const job = jobs.find((job) => job.id === jobId);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
        <div className="text-center space-y-4">
          <div className="bg-red-50 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
            <Briefcase className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Job Not Found</h1>
          <p className="text-gray-500 max-w-sm mx-auto">
            The job opportunity you are looking for might have been removed or
            is no longer available.
          </p>
          <Link href="/jobs">
            <Button variant="outline" className="mt-4 gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Jobs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleStartInterview = () => {
    const user = auth.currentUser;
    if (!user || !user.emailVerified) {
      router.push("/login");
    } else {
      setShowKeyPrompt(true);
      setSecretKey("");
    }
  };

  const handleKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (secretKey === process.env.NEXT_PUBLIC_SECRET_KEY) {
      setShowKeyPrompt(false);
      localStorage.setItem("interview-secret-key", secretKey);
      router.push(`/interview/${job.id}`);
    } else {
      toast.error("Invalid secret key.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans pb-20">
      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-3xl opacity-50 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl opacity-50 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        <Link
          href="/jobs"
          className="inline-flex items-center text-sm text-gray-500 hover:text-emerald-600 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Jobs
        </Link>

        {/* Header Block */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

          <div className="relative flex flex-col md:flex-row gap-6 md:items-start md:justify-between">
            <div className="flex gap-6">
              <div className="hidden md:flex w-20 h-20 rounded-2xl bg-gray-50 border border-gray-100 items-center justify-center text-3xl font-bold text-gray-700 shadow-sm flex-shrink-0">
                {job.company.substring(0, 2).toUpperCase()}
              </div>
              <div className="space-y-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-2">
                    {job.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-emerald-600" />
                      <span className="font-medium text-gray-700">
                        {job.company}
                      </span>
                    </div>
                    <span className="hidden md:inline text-gray-300">|</span>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      <span>{job.location}</span>
                    </div>
                    <span className="hidden md:inline text-gray-300">|</span>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-emerald-600" />
                      <span>
                        Posted {new Date(job.posted).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                    <Briefcase className="w-3.5 h-3.5 mr-1.5" />
                    {job.type}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100">
                    {job.level}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-50 text-purple-700 border border-purple-100">
                    {job.industry}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex md:flex-col gap-3 md:items-end mt-4 md:mt-0">
              <Button
                onClick={handleStartInterview}
                className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 px-8 py-6 text-lg rounded-xl transition-all hover:scale-105"
              >
                Practice Interview
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Description Card */}
            <Card className="border-none shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  About the Role
                </h2>
                <div className="prose prose-emerald max-w-none text-gray-600 leading-relaxed">
                  <p>{job.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Requirements & Responsibilities */}
            <Card className="border-none shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardContent className="p-8 space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <ListChecks className="w-5 h-5" />
                    </div>
                    Key Responsibilities
                  </h2>
                  <ul className="space-y-3">
                    {job.responsibilities.map((res, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="h-px bg-gray-100 w-full" />

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    Requirements & Skills
                  </h2>
                  <ul className="space-y-3">
                    {job.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                        <span className="text-gray-600">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Summary Card */}
              <Card className="border-none shadow-lg shadow-gray-200/50 bg-white rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                    Job Overview
                  </h3>

                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                          Company
                        </p>
                        <p className="text-sm font-semibold text-gray-900 mt-0.5">
                          {job.company}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                          Employment Type
                        </p>
                        <p className="text-sm font-semibold text-gray-900 mt-0.5">
                          {job.type}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Briefcase className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                          Experience Level
                        </p>
                        <p className="text-sm font-semibold text-gray-900 mt-0.5">
                          {job.level}
                        </p>
                      </div>
                    </div>

                    {job.salary && (
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 flex items-center justify-center text-gray-400 mt-0.5 font-serif font-bold">
                          $
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                            Salary Range
                          </p>
                          <p className="text-sm font-semibold text-gray-900 mt-0.5">
                            {job.salary}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                      <p className="text-xs text-emerald-800 leading-relaxed">
                        <span className="font-bold block mb-1">
                          📢 Practice Mode
                        </span>
                        Use this listing to simulate a real interview experience
                        and get instant feedback on your answers.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Button (Mobile Only/Extra) */}
              <div className="block lg:hidden">
                <Button
                  onClick={handleStartInterview}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 rounded-xl text-lg shadow-md"
                >
                  Practice Interview Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secret Key Modal */}
      {showKeyPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 transform transition-all scale-100">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Enter Access Key
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                This feature is currently in private beta. Please enter your
                secret key to continue with the practice interview.
              </p>
            </div>

            <form onSubmit={handleKeySubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-400"
                  placeholder="Enter your secret key..."
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  onClick={() => setShowKeyPrompt(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200/50 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-500/25"
                >
                  Start Session
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
