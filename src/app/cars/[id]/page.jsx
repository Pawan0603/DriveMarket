"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cars } from "@/data/cars";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import {
  ArrowLeft,
  MapPin,
  Gauge,
  Fuel,
  Car as CarIcon,
  Calendar,
  CheckCircle,
  Phone,
  Mail,
  MessageCircle,
  Maximize2,
  View as ViewIcon,
} from "lucide-react";

import { motion } from "framer-motion";

import EMICalculator from "@/components/EMICalculator";
import View360 from "@/components/View360";
import FullscreenCarousel from "@/components/FullscreenCarousel";

export default function CarDetail() {
  const { id } = useParams();

  const car = cars.find((c) => c.id === id);

  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [is360ViewOpen, setIs360ViewOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Car Not Found</h1>
          <Link href="/cars">
            <Button>Back to Listings</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back Button */}
            <Link
              href="/cars"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-orange-500 mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Listings
            </Link>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* LEFT SIDE */}
              <div className="lg:col-span-2 space-y-8">
                {/* IMAGE GALLERY */}
                <Card className="overflow-hidden border-border/50">
                  <div className="aspect-video bg-muted relative group">
                    <Image
                      src={car.images[selectedImageIndex]}
                      alt="Car"
                      fill
                      className="object-cover cursor-pointer"
                      onClick={() => setIsCarouselOpen(true)}
                    />

                    <div className="absolute top-4 left-4">
                      <Badge className="bg-orange-500 text-orange-foreground">
                        {car.condition}
                      </Badge>
                    </div>

                    {/* Fullscreen Button */}
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setIsCarouselOpen(true)}
                    >
                      <Maximize2 className="h-5 w-5" />
                    </Button>

                    {/* 360 Button */}
                    {car.view360Images && (
                      <Button
                        size="sm"
                        className="absolute bottom-4 right-4 bg-orange-500 hover:bg-orange-500/90 text-orange-foreground opacity-50 md:opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => setIs360ViewOpen(true)}
                      >
                        <ViewIcon className="h-4 w-4 mr-2" />
                        360° View
                      </Button>
                    )}
                  </div>

                  {/* Thumbnails */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-4">
                    {car.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`aspect-video relative overflow-hidden rounded-lg transition-all ${
                          idx === selectedImageIndex
                            ? "ring-4 ring-orange-500 scale-105"
                            : "ring-2 ring-border hover:ring-orange-500/50"
                        }`}
                      >
                        <Image
                          src={img}
                          alt="thumbnail"
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </Card>

                {/* CAR DETAILS */}
                <Card className="p-8 border-border/50">
                  <div className="mb-6">
                    <h1 className="text-xl md:text-4xl font-heading font-bold text-primary mb-2">
                      {car.year} {car.make} {car.model}
                    </h1>
                    <p className="text-2xl md:text-4xl font-heading font-bold text-orange-500">
                      ₹{car.price.toLocaleString('en-IN')}
                    </p>
                  </div>

                  {/* STATS */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 pb-8 border-b border-border">
                    <DetailItem icon={<Gauge />} label="Mileage" value={`${car.mileage} mi`} />
                    <DetailItem icon={<Calendar />} label="Year" value={car.year} />
                    <DetailItem icon={<Fuel />} label="Fuel" value={car.fuelType} />
                    <DetailItem icon={<CarIcon />} label="Transmission" value={car.transmission} />
                  </div>

                  {/* DESCRIPTION */}
                  <Section title="Description">
                    <p className="text-muted-foreground leading-relaxed">{car.description}</p>
                  </Section>

                  {/* FEATURES */}
                  <Section title="Features">
                    <div className="grid sm:grid-cols-2 gap-3">
                      {car.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-orange-500" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </Section>

                  {/* EXTRA DETAILS */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-secondary/30 rounded-lg">
                    <Detail label="Body Type" value={car.bodyType} />
                    <Detail label="Color" value={car.color} />
                    <div className="col-span-2">
                      <Detail label="Location" value={car.location} icon={<MapPin />} />
                    </div>
                  </div>
                </Card>

                {/* EMI CALCULATOR */}
                <EMICalculator carPrice={car.price} />
              </div>

              {/* RIGHT SIDEBAR */}
              <div className="lg:col-span-1 space-y-6">
                {/* SELLER INFO */}
                <Card className="p-6 border-border/50">
                  <h3 className="text-xl font-heading font-bold text-primary mb-4">
                    Seller Information
                  </h3>

                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                    <div className="h-14 w-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-semibold">
                      {car.seller.name.charAt(0)}
                    </div>

                    <div className="flex-1">
                      <p className="font-semibold text-primary">{car.seller.name}</p>

                      <div className="flex items-center gap-2">
                        <span className="text-orange-500">★ {car.seller.rating}</span>

                        {car.seller.verified && (
                          <Badge variant="secondary" className="text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-orange-500 hover:bg-orange-500/90 text-white">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Seller
                    </Button>

                    <Button variant="outline" className="w-full">
                      <Mail className="mr-2 h-4 w-4" />
                      Email Seller
                    </Button>
                  </div>
                </Card>

                {/* CONTACT FORM */}
                <Card className="p-6 border-border/50">
                  <h3 className="text-xl font-heading font-bold text-primary mb-4 flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-accent" />
                    Send Message
                  </h3>

                  <form className="space-y-4">
                    <FormInput id="name" label="Name" placeholder="Your name" />
                    <FormInput id="email" label="Email" placeholder="you@example.com" type="email" />
                    <FormInput id="phone" label="Phone" placeholder="(555) 123-4567" />
                    <FormTextarea id="message" label="Message" placeholder="I'm interested..." />

                    <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-500/90 text-white">
                      Send Message
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FULLSCREEN CAROUSEL */}
      <FullscreenCarousel
        images={car.images}
        isOpen={isCarouselOpen}
        onClose={() => setIsCarouselOpen(false)}
        initialIndex={selectedImageIndex}
      />

      {/* 360 VIEW */}
      {car.view360Images && (
        <View360
          images={car.view360Images}
          isOpen={is360ViewOpen}
          onClose={() => setIs360ViewOpen(false)}
        />
      )}
    </div>
  );
}

/* Helper Components */
function DetailItem({ icon, label, value }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <span className="text-lg font-semibold text-primary">{value}</span>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-heading font-bold text-primary mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Detail({ label, value, icon }) {
  return (
    <div>
      <span className="text-sm text-muted-foreground flex items-center gap-2">
        {icon}
        {label}
      </span>
      <p className="text-lg font-semibold text-primary">{value}</p>
    </div>
  );
}

function FormInput({ id, label, placeholder, type = "text" }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} placeholder={placeholder} />
    </div>
  );
}

function FormTextarea({ id, label, placeholder }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea id={id} rows={4} placeholder={placeholder} />
    </div>
  );
}
