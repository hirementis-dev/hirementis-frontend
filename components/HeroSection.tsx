import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection: React.FC = () => {
  return (
    <section className="bg-hero-gradient min-h-screen flex items-center justify-center section-padding pt-20">
      <div className="max-w-[900px] mx-auto px-4">
        <div className="flex flex-col items-center text-center pb-44 py-16">
          <div className="mb-6 text-xs px-3 py-1 flex items-center justify-center gap-1 bg-emerald-100 rounded-full shadow-md">
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 128 128"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M64 26C31.7271 47.0162 15.5202 101 64 101C112.48 101 96.2728 47.0162 64 26Z"
                  fill="#FF9601"
                />
                <path
                  d="M64.0001 96C38.5001 96 56.5001 64 64.0001 60C71.5 64 89.5001 96 64.0001 96Z"
                  fill="#FFC803"
                />
                <path
                  d="M64 96C49.5 96.5 45.3054 82.2617 49.5 74C52.4768 81.7736 65.919 88.6666 64 96Z"
                  fill="#FFC803"
                />
                <path
                  d="M69.1942 95.071C83.2743 91.5711 79.7736 78.7209 75.9297 68.4508C71.952 75.7088 65.3357 88.5461 69.1942 95.071Z"
                  fill="#FFC803"
                />
              </svg>
            </span>
            <p className="text-sm text-emerald-700">
              Practice. Improve. Crack It.
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Ace Your Next Interview with{" "}
            <span className="gradient-text">AI-Powered Practice</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Prepare for any job interview with personalized AI feedback,
            realistic mock interviews, and expert curated questions tailored to
            your industry.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/jobs">
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-8"
              >
                Start Practicing Free
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-300 text-emerald-700 hover:text-emerald-700 hover:bg-emerald-50"
              >
                Watch Demo
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="flex -space-x-4">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 border-2 border-white flex items-center justify-center text-xs text-white font-medium">
                JD
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-purple-400 to-purple-500 border-2 border-white flex items-center justify-center text-xs text-white font-medium">
                SM
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 border-2 border-white flex items-center justify-center text-xs text-white font-medium">
                KT
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 border-2 border-white flex items-center justify-center text-xs text-white font-medium">
                +97
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Trusted by <span className="font-semibold">100+</span> job seekers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
