"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary via-primary to-orange-300/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">
            Ready to Find Your Next Car?
          </h2>

          {/* Subtext */}
          <p className="text-xl text-white/90 mb-10">
            Join thousands of satisfied customers who found their perfect vehicle on DriveMarket.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <Link href="/cars">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white text-lg h-14 px-10 shadow-xl"
              >
                Start Browsing Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm text-lg h-14 px-10"
            >
              List Your Car
            </Button>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
