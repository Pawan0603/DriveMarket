"use client";

import { motion } from "framer-motion";
import { UserPlus, Search, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Account",
    description: "Sign up in seconds and get access to thousands of quality vehicles.",
    step: "01",
  },
  {
    icon: Search,
    title: "Search & Compare",
    description: "Browse listings with detailed info, photos, and verified seller ratings.",
    step: "02",
  },
  {
    icon: CheckCircle,
    title: "Buy or Sell",
    description: "Complete your transaction securely with our trusted platform.",
    step: "03",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-[27px] md:text-4xl sm:text-5xl font-heading font-bold text-primary mb-4">
            How It Works
          </h2>
          <p className="text-[18px] md:text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Get started in three simple steps and find your dream car today.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              <div className="flex flex-col items-center text-center">
                
                {/* Icon Box */}
                <div className="relative mb-6">
                  <div className="absolute -top-6 -right-6 text-6xl font-heading font-bold text-orange-500/10">
                    {step.step}
                  </div>

                  <div className="relative p-6 bg-orange-500/10 rounded-2xl">
                    <step.icon className="h-12 w-12 text-orange-500" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-heading font-bold text-primary mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-16 left-full h-0.5 bg-orange-500/20"
                  style={{
                    width: "calc(100% - 8rem)",
                    left: "calc(50% + 4rem)",
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
