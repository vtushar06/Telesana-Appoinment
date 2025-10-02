"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Check, Zap, Crown } from "lucide-react";

const Pricing = () => {
  const pricingPlans = [
    {
      name: "Starter",
      price: "$9.99",
      period: "month",
      credits: "10 Credits",
      features: [
        "10 video consultations",
        "Basic health tracking",
        "Email support",
        "Mobile app access"
      ],
      icon: <Zap className="h-5 w-5" />,
      popular: false
    },
    {
      name: "Professional",
      price: "$19.99",
      period: "month", 
      credits: "25 Credits",
      features: [
        "25 video consultations",
        "Advanced health analytics",
        "Priority support",
        "Multiple device sync",
        "Prescription management"
      ],
      icon: <Crown className="h-5 w-5" />,
      popular: true
    },
    {
      name: "Premium",
      price: "$39.99",
      period: "month",
      credits: "Unlimited Credits", 
      features: [
        "Unlimited consultations",
        "24/7 premium support",
        "Family account sharing",
        "Advanced health insights",
        "Personal health coordinator"
      ],
      icon: <Crown className="h-5 w-5" />,
      popular: false
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {pricingPlans.map((plan, index) => (
        <Card 
          key={index}
          className={`relative border-blue-900/30 shadow-lg bg-gradient-to-b from-blue-950/30 to-transparent ${
            plan.popular ? 'ring-2 ring-blue-400 scale-105' : ''
          }`}
        >
          {plan.popular && (
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-400 text-blue-950">
              Most Popular
            </Badge>
          )}
          
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center mb-2 text-blue-400">
              {plan.icon}
            </div>
            <CardTitle className="text-xl font-bold text-white">{plan.name}</CardTitle>
            <div className="text-3xl font-bold text-blue-400">
              {plan.price}
              <span className="text-sm text-gray-400">/{plan.period}</span>
            </div>
            <p className="text-blue-300 font-medium">{plan.credits}</p>
          </CardHeader>
          
          <CardContent className="pt-0">
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center text-gray-300">
                  <Check className="h-4 w-4 text-blue-400 mr-3 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button 
              className={`w-full ${
                plan.popular 
                  ? 'bg-blue-400 hover:bg-blue-500 text-blue-950' 
                  : 'bg-blue-950/50 hover:bg-blue-900 text-white border border-blue-400'
              }`}
              onClick={() => {
                // Temporary placeholder - replace with actual payment logic later
                alert(`Selected ${plan.name} plan - Payment integration coming soon!`);
              }}
            >
              Choose {plan.name}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Pricing;
