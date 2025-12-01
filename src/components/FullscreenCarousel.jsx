"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function FullscreenCarousel({
  images = [],
  isOpen,
  onClose,
  initialIndex = 0,
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e) => {
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((i) => (i + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/98 backdrop-blur-sm"
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-background to-transparent p-4 sm:p-6">
          <div className="container mx-auto flex items-center justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary">
                Image Gallery
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {currentIndex + 1} of {images.length}
              </p>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={onClose}
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </div>
        </div>

        {/* Main Image */}
        <div className="h-full w-full flex items-center justify-center p-4 sm:p-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <div className="relative max-w-full max-h-full w-auto h-auto">
                <Image
                  src={images[currentIndex]}
                  alt={`Image ${currentIndex + 1}`}
                  width={1200}
                  height={800}
                  className="object-contain rounded-lg"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevious}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-background/80 backdrop-blur-sm"
          disabled={images.length <= 1}
        >
          <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-background/80 backdrop-blur-sm"
          disabled={images.length <= 1}
        >
          <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
        </Button>

        {/* Thumbnail Strip */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-background to-transparent p-4 sm:p-6">
          <div className="container mx-auto">
            <div className="flex gap-2 sm:gap-4 justify-center overflow-x-auto pb-2 scrollbar-hide">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden transition-all ${
                    idx === currentIndex
                      ? "ring-4 ring-accent scale-110"
                      : "ring-2 ring-border opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
