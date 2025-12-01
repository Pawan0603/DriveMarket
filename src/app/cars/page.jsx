"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import CarFilters from "@/components/CarFilters";
import { cars } from "@/data/cars";
import { motion } from "framer-motion";

export default function CarListings() {
  const [filteredCars] = useState(cars);

  return (
    <div className="min-h-screen bg-background">

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-primary mb-4">
              Browse Our Collection
            </h1>
            <p className="text-xl text-muted-foreground">
              Find your perfect second-hand car from our verified listings
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1 hidden md:block">
              <CarFilters onFilterChange={() => {}} />
            </aside>

            <main className="lg:col-span-3">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-muted-foreground">
                  Showing{" "}
                  <span className="font-semibold text-primary">
                    {filteredCars.length}
                  </span>{" "}
                  vehicles
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {filteredCars.map((car, index) => (
                  <CarCard key={car.id} car={car} index={index} />
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
