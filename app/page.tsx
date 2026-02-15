import CTASection from "@/components/CTASection";
import FeatureSection from "@/components/FeatureSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import PricingSection from "@/components/PricingSection";
import TestimonialSection from "@/components/TestimonialSection";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      {/* Global Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-emerald-100/50 blur-3xl"></div>
        <div className="absolute bottom-[20%] left-[-5%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] rounded-full bg-green-100/50 blur-3xl"></div>
        <div className="absolute top-[40%] right-[10%] w-[200px] h-[200px] rounded-full bg-blue-100/40 blur-3xl"></div>
        <div className="absolute top-[20%] left-[10%] w-16 md:w-24 h-16 md:h-24 rounded-full bg-yellow-100 blur-xl"></div>
        {/* Dot Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] opacity-25"></div>
      </div>

      <div className="relative z-10">
        <HeroSection />
        <HowItWorks />
        <FeatureSection />
        <PricingSection />
        <TestimonialSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
}
