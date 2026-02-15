import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-emerald-600 uppercase bg-emerald-100/50 rounded-full">
            Simple Process
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
            From Setup to <span className="text-emerald-600">Success</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Our streamlined process ensures you spend less time configuring and
            more time practicing your interview skills.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main Video/Showcase Area */}
          {/* Main Video/Showcase Area */}
          <div className="relative max-w-5xl mx-auto mb-24 group">
            {/* Ambient Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-[6px] border-white/20 bg-slate-950 animate-fade-in-up delay-100">
              <video
                controls
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                src={"/intro.mp4"}
              />
            </div>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Select Job Profile",
                desc: "Choose from our extensive library of roles or customize your own target position.",
                color: "bg-emerald-100 text-emerald-600",
              },
              {
                step: "02",
                title: "Practice Mock Interview",
                desc: "Engage with our AI in a realistic voice-based conversation tailored to your role.",
                color: "bg-blue-100 text-blue-600",
              },
              {
                step: "03",
                title: "Get Actionable Feedback",
                desc: "Receive instant performance analysis and tips to improve your answers.",
                color: "bg-orange-100 text-orange-600",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white group rounded-2xl animate-fade-in-up"
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
                <CardContent className="p-8">
                  <div
                    className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-6 font-bold text-xl group-hover:scale-110 transition-transform duration-300`}
                  >
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
