import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Check } from "lucide-react";

const PricingSection: React.FC = () => {
  const pricingPlans = [
    {
      name: "Free",
      description: "Perfect for getting started",
      price: "$0",
      period: "forever",
      features: [
        "5 AI mock interviews per month",
        "Basic job roles library",
        "Standard AI feedback",
        "Limited question bank",
      ],
      buttonText: "Start Free",
      buttonVariant: "outline" as const,
      popular: false,
    },
    // {
    //   name: "Pro",
    //   description: "For serious job seekers",
    //   price: "$19",
    //   period: "per month",
    //   features: [
    //     "Unlimited AI mock interviews",
    //     "Full job roles library",
    //     "Advanced AI feedback",
    //     "Complete question bank",
    //     "Interview recordings",
    //     "Progress tracking",
    //   ],
    //   buttonText: "Get Pro",
    //   buttonVariant: "default" as const,
    //   popular: true,
    // },
    // {
    //   name: "Teams",
    //   description: "For career coaches & organizations",
    //   price: "$49",
    //   period: "per user/month",
    //   features: [
    //     "Everything in Pro",
    //     "Team management dashboard",
    //     "Custom interview scenarios",
    //     "Branded experience",
    //     "Analytics & reporting",
    //     "Dedicated support",
    //   ],
    //   buttonText: "Contact Sales",
    //   buttonVariant: "outline" as const,
    //   popular: false,
    // },
  ];

  return (
    <section id="pricing" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your needs. All plans include core
            features to help you ace your interviews
          </p>
        </div>

        <div className="max-w-sm mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`border ${
                plan.popular
                  ? "border-emerald-400 shadow-lg"
                  : "border-gray-200"
              } rounded-xl relative`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              <CardHeader className="pt-8 pb-4">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="text-gray-600">{plan.description}</p>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 ml-2">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant={plan.buttonVariant}
                  className={`w-full  ${
                    plan.popular
                      ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                      : ""
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">Need a custom solution?</p>
          <Button
            variant="link"
            className="text-emerald-600 hover:text-emerald-700"
          >
            Contact our sales team
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
