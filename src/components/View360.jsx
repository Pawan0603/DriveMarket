"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function View360({ images = [], isOpen, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef(null);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  const beginDrag = (clientX) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  const dragMove = (clientX) => {
    if (!isDragging) return;

    const deltaX = clientX - startX;
    const sensitivity = 5;

    if (Math.abs(deltaX) > sensitivity) {
      const direction = deltaX > 0 ? -1 : 1;
      const newIndex =
        (currentImageIndex + direction + images.length) % images.length;

      setCurrentImageIndex(newIndex);
      setStartX(clientX);
    }
  };

  const endDrag = () => {
    setIsDragging(false);
  };

  useEffect(() => {  // Preload images for smoother transitions in 360 view
    images.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [images]);


  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm"
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-background to-transparent p-4 sm:p-6 z-10">
          <div className="container mx-auto flex items-center justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary">
                360° View
              </h2>
              <p className="text-sm text-muted-foreground">
                Drag horizontally to rotate
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

        {/* Main Viewer */}
        <div
          ref={containerRef}
          className="h-full w-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
          onMouseDown={(e) => beginDrag(e.clientX)}
          onMouseMove={(e) => dragMove(e.clientX)}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          onTouchStart={(e) => beginDrag(e.touches[0].clientX)}
          onTouchMove={(e) => dragMove(e.touches[0].clientX)}
          onTouchEnd={endDrag}
        >
          <div
            key={currentImageIndex}
            className="relative w-full h-full flex items-center justify-center p-4 sm:p-8"
          >
            <div className="relative max-w-full max-h-full w-auto h-auto">
             <Image
                src={images[currentImageIndex]}
                alt={`360 view ${currentImageIndex + 1}`}
                width={1200}
                height={800}
                draggable={false}
                className="object-contain pointer-events-none"
              />
            </div>
          </div>
          {/* <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0 }}
            className="relative w-full h-full flex items-center justify-center p-4 sm:p-8"
          >
            <div className="relative max-w-full max-h-full w-auto h-auto">
              <Image
                src={images[currentImageIndex]}
                alt={`360 view ${currentImageIndex + 1}`}
                width={1200}
                height={800}
                draggable={false}
                className="object-contain pointer-events-none"
              />
            </div>
          </motion.div> */}
        </div>

        {/* Footer Indicator */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent p-4 sm:p-6 z-10">
          <div className="container mx-auto text-center">
            <span className="text-sm font-semibold text-primary">
              {currentImageIndex + 1} / {images.length}
            </span>

            <div className="flex gap-1 sm:gap-2 justify-center mt-3 pb-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`h-1.5 sm:h-2 rounded-full transition-all ${idx === currentImageIndex
                    ? "w-8 sm:w-12 bg-accent"
                    : "w-1.5 sm:w-2 bg-muted hover:bg-muted-foreground/60"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
