"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { jobs } from "@/data/jobs";
import {
  MapPin,
  Clock,
  Briefcase,
  Search,
  Filter,
  Sparkles,
  Building2,
} from "lucide-react";

const Jobs = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredJobs = jobs.filter((job) => {
    const query = searchQuery.toLowerCase();
    return (
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.description.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query) ||
      job.industry.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans">
      {/* Abstract Background Decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl opacity-50 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl opacity-50 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/50 text-emerald-700 text-sm font-medium border border-emerald-200">
            <Sparkles className="w-4 h-4" />
            <span>New Opportunities Added Daily</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Find Your{" "}
            <span className="text-transparent bg-clip-text bg-emerald-600">
              Dream Career
            </span>
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore exclusive job opportunities curated for your growth. Prepare
            for interviews and take the next step in your professional journey.
          </p>

          {/* Search Bar Visual */}
          <div className="flex items-center max-w-lg mx-auto bg-white p-2 rounded-2xl shadow-lg border border-gray-100 transform transition-all hover:scale-[1.01] focus-within:ring-2 focus-within:ring-emerald-500/20">
            <Search className="w-5 h-5 text-gray-400 ml-3" />
            <input
              type="text"
              placeholder="Search by role, company, or skills..."
              className="flex-1 px-4 py-2 bg-transparent border-none outline-none text-gray-700 placeholder:text-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-sm cursor-pointer">
              Search
            </button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-4 flex items-center justify-center text-center">
            <p className="text-emerald-800 text-sm md:text-base font-medium">
              ✨ Practice Mode: These are sample listings created by Team
              HireMentis for your interview preparation.
            </p>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="group block h-full"
              >
                <Card className="h-full bg-white border-gray-200/60 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden relative">
                  <CardContent className="p-6 flex flex-col h-full">
                    {/* Card Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-lg font-bold text-gray-700 shadow-sm group-hover:scale-105 transition-transform duration-300">
                          {job.company.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-emerald-600 transition-colors">
                            {job.title}
                          </h3>
                          <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
                            <Building2 className="w-3.5 h-3.5" />
                            <span>{job.company}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6 flex-grow">
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {job.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100/50">
                        <Briefcase className="w-3 h-3 mr-1" />
                        {job.type}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100/50">
                        {job.level}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100/50">
                        {job.industry}
                      </span>
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {new Date(job.posted).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">
                No jobs found matching "{searchQuery}"
              </p>
              <p className="text-sm">
                Try using different keywords or checking for spelling errors.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
