import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CTASection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 animate-fade-in-up">
            Ready to{" "}
            <span className="text-emerald-600">Launch Your Career?</span>
          </h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-100">
            Join thousands of successful job seekers who have transformed their
            interview skills with HireMentis. Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
            <Link href="/jobs">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 h-14 rounded-full text-lg shadow-lg hover:shadow-emerald-500/30 transition-all"
              >
                Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
          <p className="mt-8 text-slate-600 text-sm animate-fade-in-up delay-300">
            No credit card required • Cancel anytime • Free plan available
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
