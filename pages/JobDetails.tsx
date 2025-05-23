"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { jobs } from "@/data/jobs";
import { redirect, useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/firebase/client";
import { useEffect } from 'react';

const JobDetails = () => {
  const params = useParams();
const id = params?.id as string;
  
useEffect(() => {
  if (!id) {
    redirect("/jobs");
  }
  }, [])


  const jobId = Number(id);

  const job = jobs.find((job) => job.id === jobId);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
          <p className="mb-6">
            The job you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/jobs">
            <Button>Back to Jobs</Button>
          </Link>
        </div>
      </div>
    );
  }

  const router = useRouter();

  const handleStartInterview = () => {
    const user = auth.currentUser;
    if (user && user.emailVerified) {
      router.push(`/interview/${job.id}`);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-24">
        <Link
          href="/jobs"
          className="text-emerald-600 hover:underline flex items-center mb-6 space-x-2"
        >
          <span className="mr-0.5">←</span> Back to Jobs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-8 border border-gray-200 bg-white">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-medium">{job.company}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 w-16 h-16 rounded-md flex items-center justify-center text-xl">
                    {job.company.substring(0, 2)}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full">
                    {job.type}
                  </span>
                  <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                    {job.level}
                  </span>
                  <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">
                    {job.industry}
                  </span>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-3">Job Description</h2>
                  <p className="text-gray-700">{job.description}</p>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-3">Requirements</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    {job.requirements.map((requirement, index) => (
                      <li key={index} className="text-gray-700">
                        {requirement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-3">Responsibilities</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    {job.responsibilities.map((responsibility, index) => (
                      <li key={index} className="text-gray-700">
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24 border border-gray-200 bg-white">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Job Summary</h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-gray-600">Company</p>
                    <p className="font-medium">{job.company}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Location</p>
                    <p className="font-medium">{job.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Job Type</p>
                    <p className="font-medium">{job.type}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Experience Level</p>
                    <p className="font-medium">{job.level}</p>
                  </div>
                  {job.salary && (
                    <div>
                      <p className="text-gray-600">Salary Range</p>
                      <p className="font-medium">{job.salary}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-gray-600">Posted Date</p>
                    <p className="font-medium">
                      {new Date(job.posted).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleStartInterview}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                >
                  Practice Interview Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
