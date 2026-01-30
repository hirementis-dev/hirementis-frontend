import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Book,
  Video,
  Star,
  Users,
  Calendar,
  Clock,
  Zap,
  Target,
  Award,
} from "lucide-react";

const FeatureSection: React.FC = () => {
  const features = [
    {
      icon: <Video className="h-6 w-6 text-white" />,
      bg: "bg-emerald-500",
      title: "Realistic AI Interviews",
      description:
        "Practice with our lifelike AI interviewer that asks relevant questions and responds to your answers naturally.",
    },
    {
      icon: <Target className="h-6 w-6 text-white" />,
      bg: "bg-blue-500",
      title: "Industry-Specific Questions",
      description:
        "Access thousands of questions curated for different industries, roles, and seniority levels.",
    },
    {
      icon: <Zap className="h-6 w-6 text-white" />,
      bg: "bg-orange-500",
      title: "Instant AI Feedback",
      description:
        "Get personalized feedback on your responses, including content, delivery, and areas for improvement.",
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      bg: "bg-purple-500",
      title: "Behavioral Analysis",
      description:
        "Receive insights on your communication skills, confidence level, and overall interview performance.",
    },
    {
      icon: <Calendar className="h-6 w-6 text-white" />,
      bg: "bg-pink-500",
      title: "Interview Scheduling",
      description:
        "Set up regular practice sessions and track your progress with our comprehensive dashboard.",
    },
    {
      icon: <Clock className="h-6 w-6 text-white" />,
      bg: "bg-indigo-500",
      title: "Time Management",
      description:
        "Learn to deliver concise and impactful responses within appropriate time frames.",
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-emerald-600 uppercase bg-emerald-100/50 rounded-full animate-fade-in-up">
            Power Packed
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 animate-fade-in-up delay-100">
            Everything You Need to{" "}
            <span className="text-emerald-600">Excel</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto animate-fade-in-up delay-200">
            HireMentis combines cutting-edge AI technology with expert interview
            knowledge to give you the competitive edge.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-slate-50 border-none shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8">
                <div
                  className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-emerald-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
