"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Gauge, Fuel, Car as CarIcon, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CarCard({ car, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/cars/${car.id}`}>
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-border/50 cursor-pointer">
          
          {/* IMAGE */}
          <div className="relative h-56 bg-muted overflow-hidden">
            <Image
              src={car.images[0]}
              alt={`${car.year} ${car.make} ${car.model}`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Condition Badge */}
            <div className="absolute top-4 left-4">
              <Badge className="bg-orange-500 text-accent-foreground">
                {car.condition}
              </Badge>
            </div>

            {/* Verified Badge */}
            {car.seller.verified && (
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-white/90 text-primary flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              </div>
            )}
          </div>

          {/* CONTENT */}
          <div className="p-6">
            {/* Title + Price */}
            <div className="mb-3">
              <h3 className="text-[18px] md:text-2xl font-heading font-bold text-primary mb-1 group-hover:text-orange-500 transition-colors">
                {car.year} {car.make} {car.model}
              </h3>
              <p className="text-[25px] md:text-3xl font-heading font-bold text-orange-500">
                ₹{car.price.toLocaleString('en-IN')}
              </p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Gauge className="h-4 w-4" />
                <span>{car.mileage.toLocaleString()} mi</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Fuel className="h-4 w-4" />
                <span>{car.fuelType}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CarIcon className="h-4 w-4" />
                <span>{car.transmission}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{car.location}</span>
              </div>
            </div>

            {/* Seller Info */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                  {car.seller.name.charAt(0)}
                </div>
                <span className="text-sm text-muted-foreground">
                  {car.seller.name}
                </span>
              </div>

              <span className="text-sm text-orange-500">
                ★ {car.seller.rating}
              </span>
            </div>
          </div>

        </Card>
      </Link>
    </motion.div>
  );
}
