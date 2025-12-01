'use client';

import Link from 'next/link';
import { Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

export default function Navbar() {
  const [isHomePage, setIsHomePage] = useState(true);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <Link href="/" className="flex items-center gap-2">
            <Car className="h-8 w-8 text-orange-500" />
            <span className="text-2xl font-heading font-bold text-primary">DriveMarket</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {isHomePage ? (
              <>
                <a href="#features" className="text-foreground hover:text-orange-500 transition-colors">
                  Features
                </a>
                <a href="/cars" className="text-foreground hover:text-orange-500 transition-colors">
                  Browse Cars
                </a>
                <a href="#about" className="text-foreground hover:text-orange-500 transition-colors">
                  About
                </a>
              </>
            ) : (
              <>
                <Link href="/" className="text-foreground hover:text-orange-500 transition-colors"> {/* FIXED */}
                  Home
                </Link>
                <Link href="/cars" className="text-foreground hover:text-orange-500 transition-colors"> {/* FIXED */}
                  Browse Cars
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" className="hidden sm:inline-flex">
              Sign In
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg">
              Get Started
            </Button>
          </div>

        </div>
      </div>
    </nav>
  );
}
