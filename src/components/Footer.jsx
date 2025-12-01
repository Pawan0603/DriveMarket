"use client";

import Link from "next/link";
import { Car } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          {/* Logo + Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Car className="h-8 w-8 text-accent" />
              <span className="text-2xl font-heading font-bold">DriveMarket</span>
            </div>
            <p className="text-white/70">
              Your trusted marketplace for quality second-hand cars.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-white/70">
              <li>
                <Link href="#" className="hover:text-accent transition-colors">Browse Cars</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors">Sell Your Car</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-heading font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-white/70">
              <li>
                <Link href="#" className="hover:text-accent transition-colors">Help Center</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors">Safety Tips</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-heading font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-white/70">
              <li>support@drivemarket.com</li>
              <li>1-800-DRIVE-MKT</li>
              <li>Mon-Fri: 9AM - 6PM</li>
            </ul>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="border-t border-white/10 pt-8 text-center text-white/60">
          <p>&copy; 2024 DriveMarket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
