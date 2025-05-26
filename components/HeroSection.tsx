import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection: React.FC = () => {
  return (
    <section className="bg-hero-gradient min-h-screen flex items-center justify-center section-padding pt-32">
      <div className="max-w-[950px] mx-auto px-4">
        <div className="flex flex-col items-center text-center pb-44 py-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Ace Your Next Interview with{" "}
            <span className="gradient-text">AI-Powered Practice</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Prepare for any job interview with personalized AI feedback,
            realistic mock interviews, and expert-curated questions tailored to
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
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 border-2 border-white flex items-center justify-center text-xs text-white font-medium">
                JD
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-purple-500 border-2 border-white flex items-center justify-center text-xs text-white font-medium">
                SM
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 border-2 border-white flex items-center justify-center text-xs text-white font-medium">
                KT
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 border-2 border-white flex items-center justify-center text-xs text-white font-medium">
                +5
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
