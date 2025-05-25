import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialSection: React.FC = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      position: "Product Manager at BharatCore Labs",
      image: "https://avatar.iran.liara.run/public/80",
      stars: 5,
      text: "HireMentis prepared me thoroughly for the Product Manager role at BharatCore Labs. The AI-driven feedback was so detailed that my responses became far more impactful and structured. I walked into the real interview brimming with confidence, It's really help me,Thanks to HireMentis.",
    },
    {
      name: "Rohit Gupta",
      position: "Software Engineer at InnoVista Systems",
      image: "https://avatar.iran.liara.run/public/48",
      stars: 4,
      text: "After just two weeks on HireMentis, my technical interview performance shot up. The platform’s data-structures and system-design questions were exactly what I faced in my InnoVista Systems campus drive, and the AI tips helped me articulate answers clearly. I couldn’t have been more ready",
    },
    {
      name: "Ananya Singh",
      position: " Marketing Specialist at UrbanPalate Innovations",
      image: "https://avatar.iran.liara.run/public/88",
      stars: 5,
      text: "I used to get nervous in interviews, but HireMentis’s realistic mock sessions completely changed my game. Practicing HR drills—like explaining my strengths and weaknesses—helped me express myself with clarity. It's really help me, Thanks to HireMentis.",
    },
  ];

  const renderStars = (count: number) => {
    return Array(count)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      ));
  };

  return (
    <section id="testimonials" className="section-padding bg-emerald-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Users <span className="gradient-text">Love the Results</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Thousands of job seekers have successfully prepared for their
            interviews with our platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-emerald-100 bg-white">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {renderStars(testimonial.stars)}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden mr-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.position}
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
