import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Star, Users, Briefcase } from "lucide-react";
import Image from "next/image";

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden text-slate-900 py-12 md:py-20 lg:py-24">
      <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="animate-fade-in-up inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs md:text-sm font-semibold mb-2 md:mb-4 shadow-sm mt-12">
          <span className="flex h-2 w-2 rounded-full bg-emerald-600"></span>
          New Generation Interviewing
        </div>

        {/* Main Heading */}
        <h1 className="font-space animate-fade-in-up delay-100 text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 max-w-4xl">
          Master Your Interview <br />
          <span className="relative inline-block mt-2">
            <span className="relative z-10">Before It Happens</span>
            <span className="absolute bottom-2 left-0 w-full h-3 md:h-4 bg-emerald-200/60 -rotate-2 -z-0"></span>
          </span>
        </h1>

        {/* Subheading */}
        <p className="animate-fade-in-up delay-200 text-base md:text-xl text-slate-600 max-w-2xl mb-8 md:mb-10 leading-relaxed">
          Join thousands of professionals who switched to AI-driven preparation.
          Get instant feedback, confidence analysis, and curated industry
          questions.
        </p>

        {/* Action Buttons */}
        <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4 mb-12 md:mb-16 w-full justify-center px-4 md:px-0">
          <Link href="/jobs" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto h-12 md:h-14 px-8 rounded-full text-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-emerald-500/30 transition-all"
            >
              Start For Free
            </Button>
          </Link>
          <Link href="#demo" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto h-12 md:h-14 px-8 rounded-full text-lg border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
            >
              View Job Library
            </Button>
          </Link>
        </div>

        {/* Stats / Social Proof */}
        <div className="animate-fade-in-up delay-500 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-16 border-t border-slate-200 pt-8 md:pt-10 w-full max-w-4xl">
          <div className="flex flex-col items-center gap-1">
            <div className="text-2xl md:text-3xl font-bold text-slate-900">
              98%
            </div>
            <div className="text-xs md:text-sm font-medium text-slate-500 uppercase tracking-wide">
              Success Rate
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="text-2xl md:text-3xl font-bold text-slate-900">
              50k+
            </div>
            <div className="text-xs md:text-sm font-medium text-slate-500 uppercase tracking-wide">
              Active Users
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="text-2xl md:text-3xl font-bold text-slate-900">
              200+
            </div>
            <div className="text-xs md:text-sm font-medium text-slate-500 uppercase tracking-wide">
              Companies
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="text-2xl md:text-3xl font-bold text-slate-900">
              4.9
            </div>
            <div className="flex items-center text-yellow-400 gap-1">
              <Star className="fill-current w-4 h-4" />
              <Star className="fill-current w-4 h-4" />
              <Star className="fill-current w-4 h-4" />
              <Star className="fill-current w-4 h-4" />
              <Star className="fill-current w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Hero Image - Path to Grow */}
        {/* Hero Image - Path to Grow */}
        <div className="animate-fade-in-up delay-700 mt-12 md:mt-16 w-full max-w-5xl relative group">
          <div className="absolute inset-0 bg-emerald-100/50 rounded-2xl blur-3xl -z-10 group-hover:bg-emerald-200/50 transition-colors duration-500"></div>
          <Image
            src="/sucess.png"
            alt="Path to success"
            width={1200}
            height={600}
            className="w-full h-auto object-contain rounded-2xl border border-slate-200/60 shadow-2xl"
            priority
          />
        </div>

        {/* Floating cards visuals for decoration */}
        {/* <div className="absolute top-[20%] left-[5%] hidden 2xl:block animate-bounce duration-[4000ms]">
          <div className="bg-white p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 w-64 rotate-[-6deg]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                <Users size={20} />
              </div>
              <div>
                <div className="font-bold text-slate-800">Mock Interview</div>
                <div className="text-xs text-slate-400">
                  In Progress • 12:40
                </div>
              </div>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-orange-500"></div>
            </div>
          </div>
        </div> */}

        {/* <div className="absolute bottom-[20%] right-[5%] hidden 2xl:block animate-bounce duration-[5000ms]">
          <div className="bg-white p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 w-64 rotate-[6deg]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Briefcase size={20} />
              </div>
              <div>
                <div className="font-bold text-slate-800">Job Offer</div>
                <div className="text-xs text-slate-400">Google Inc.</div>
              </div>
            </div>
            <div className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded inline-block">
              Congratulations!
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default HeroSection;
