"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "100K+", label: "Cars Listed" },
  { value: "15K+", label: "Cars Sold" },
  { value: "98%", label: "Satisfaction Rate" },
];

export default function Stats() {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-heading font-bold text-orange-500 mb-2">
                {stat.value}
              </div>

              <div className="text-white/80 text-lg">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
