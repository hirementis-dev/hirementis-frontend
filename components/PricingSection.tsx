import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Check, Info } from "lucide-react";
import Link from "next/link";

const PricingSection: React.FC = () => {
  const pricingPlans = [
    {
      name: "Free",
      description: "Perfect for getting started",
      price: "$0",
      period: "forever",
      features: [
        "1 AI mock interviews per month",
        "Basic job roles library",
        "Standard AI feedback",
        "Limited question bank",
      ],
      buttonText: "Start Free",
      buttonVariant: "outline" as const,
      popular: false,
      isContactSales: false,
    },
    {
      name: "Student",
      description: "For serious job seekers",
      price: "$7",
      period: "per month",
      features: [
        "Apply to actual Jobs",
        "5 AI mock interviews per month",
        "Full job roles library",
        "Advanced AI feedback",
        "Complete question bank",
        "Progress tracking",
      ],
      buttonText: "Get Pro",
      buttonVariant: "default" as const,
      popular: true,
      isContactSales: false,
    },
    {
      name: "Pro",
      description: "For serious job seekers",
      price: "$13",
      period: "per month",
      features: [
        "Apply to actual Jobs",
        "10 AI mock interviews per month",
        "Full job roles library",
        "Advanced AI feedback",
        "Complete question bank",
        "Progress tracking",
      ],
      buttonText: "Get Max",
      buttonVariant: "outline" as const,
      popular: false,
      isContactSales: false,
    },
    {
      name: "Enterprise",
      description: "For large organizations",
      price: "$99",
      period: "per month",
      features: [
        "50 Candidate interview",
        "Advanced analytics & insights",
        "Custom integrations",
        "White-label solution",
        "Priority support",
        "Training & onboarding",
        "SLA guarantees",
      ],
      buttonText: "Contact Sales",
      buttonVariant: "secondary" as const,
      popular: false,
      isContactSales: true,
    },
  ];

  return (
    <section id="pricing" className="py-24 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-emerald-600 uppercase bg-emerald-100/50 rounded-full">
            Flexible Plans
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
            Simple, <span className="text-emerald-600">Transparent</span>{" "}
            Pricing
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Choose the plan that fits your needs. All plans include core
            features to help you ace your interviews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`relative flex flex-col rounded-3xl transition-all duration-300 animate-fade-in-up overflow-visible ${
                plan.popular
                  ? "border-2 border-emerald-500 shadow-xl scale-105 z-10 bg-white"
                  : "border-none shadow-md hover:shadow-xl bg-white hover:-translate-y-1"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide shadow-lg border-2 border-white z-20">
                  Most Popular
                </div>
              )}

              <CardHeader className="pt-8 pb-4 px-6">
                <h3
                  className={`text-xl font-bold ${plan.popular ? "text-emerald-600" : "text-slate-900"}`}
                >
                  {plan.name}
                </h3>
                <p className="text-sm text-slate-500">{plan.description}</p>
              </CardHeader>
              <CardContent className="pb-4 flex-1 px-6">
                <div className="mb-6 flex items-baseline">
                  <span className="text-4xl font-extrabold text-slate-900">
                    {plan.price}
                  </span>
                  <span className="text-slate-500 ml-2 text-sm">
                    {plan.period}
                  </span>
                </div>
                <div className="h-px w-full bg-slate-100 mb-6"></div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div
                        className={`mt-0.5 mr-3 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-500"}`}
                      >
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="text-sm text-slate-600 leading-tight">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto px-6 pb-8">
                {plan.isContactSales ? (
                  <a href="mailto:suprabhat.work@gmail.com" className="w-full">
                    <Button
                      variant="ghost"
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold h-12 rounded-xl"
                    >
                      {plan.buttonText}
                    </Button>
                  </a>
                ) : (
                  <Link href="/jobs" className="w-full">
                    <Button
                      variant={plan.popular ? "default" : "outline"}
                      className={`w-full h-12 rounded-xl font-bold transition-all duration-300 ${
                        plan.popular
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 hover:shadow-emerald-300"
                          : "border-2 border-slate-200 text-slate-700 hover:border-emerald-200 hover:text-emerald-600 hover:bg-emerald-50"
                      }`}
                    >
                      {plan.buttonText}
                    </Button>
                  </Link>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
