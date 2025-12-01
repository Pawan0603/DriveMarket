"use client";

import { Shield, Search, DollarSign, Clock, CheckCircle, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Search,
    title: "Easy Search",
    description: "Find your perfect car with advanced filters and smart search options.",
  },
  {
    icon: Shield,
    title: "Verified Sellers",
    description: "All sellers are verified to ensure safe and trustworthy transactions.",
  },
  {
    icon: DollarSign,
    title: "Best Prices",
    description: "Competitive pricing with transparent history and no hidden fees.",
  },
  {
    icon: Clock,
    title: "Quick Process",
    description: "Buy or sell in minutes with our streamlined platform.",
  },
  {
    icon: CheckCircle,
    title: "Quality Assured",
    description: "Every vehicle undergoes thorough inspection and verification.",
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "Our team is here to help you every step of the way.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-primary mb-4">
            Why Choose DriveMarket?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We make buying and selling second-hand cars simple, safe, and transparent.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-8 h-full hover:shadow-lg transition-shadow duration-300 border-border/50">
                <div className="flex flex-col items-start gap-4">
                  
                  {/* Icon Box */}
                  <div className="p-3 bg-orange-500/10 rounded-lg">
                    <feature.icon className="h-8 w-8 text-orange-500" />
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-primary mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
