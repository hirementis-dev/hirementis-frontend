import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const TestimonialSection: React.FC = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      position: "Product Manager",
      company: "BharatCore Labs",
      image: "https://avatar.iran.liara.run/public/80",
      stars: 5,
      text: "HireMentis prepared me thoroughly for the Product Manager role. The AI-driven feedback was so detailed that my responses became far more impactful and structured.",
    },
    {
      name: "Rohit Gupta",
      position: "Software Engineer",
      company: "InnoVista Systems",
      image: "https://avatar.iran.liara.run/public/48",
      stars: 4,
      text: "The platform’s data-structures and system-design questions were exactly what I faced in my campus drive, and the AI tips helped me articulate answers clearly.",
    },
    {
      name: "Ananya Singh",
      position: "Marketing Specialist",
      company: "UrbanPalate",
      image: "https://avatar.iran.liara.run/public/88",
      stars: 5,
      text: "I used to get nervous in interviews, but HireMentis’s realistic mock sessions completely changed my game. Practicing HR drills helped me express myself with clarity.",
    },
  ];

  const renderStars = (count: number) => {
    return Array(count)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ));
  };

  return (
    <section id="testimonials" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-emerald-600 uppercase bg-emerald-100/50 rounded-full animate-fade-in-up">
            Success Stories
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 animate-fade-in-up delay-100">
            Loved by <span className="text-emerald-600">Job Seekers</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto animate-fade-in-up delay-200">
            Hear from professionals who landed their dream jobs using
            HireMentis.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-none shadow-sm hover:shadow-xl bg-slate-50 rounded-2xl transition-all duration-300 animate-fade-in-up hover:-translate-y-1 relative group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-8">
                <Quote className="absolute top-8 right-8 w-10 h-10 text-emerald-100 group-hover:text-emerald-200 transition-colors duration-300" />

                <div className="flex mb-4 space-x-1">
                  {renderStars(testimonial.stars)}
                </div>

                <p className="text-slate-600 mb-8 italic leading-relaxed relative z-10">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full ring-2 ring-emerald-100 p-0.5">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {testimonial.position} @ {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
