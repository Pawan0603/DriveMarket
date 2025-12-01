"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function EMICalculator({ carPrice }) {
  const [loanAmount, setLoanAmount] = useState(carPrice * 0.8);
  const [downPayment, setDownPayment] = useState(carPrice * 0.2);
  const [duration, setDuration] = useState(48); // months
  const interestRate = 8.5; // Annual interest rate

  useEffect(() => {
    setLoanAmount(carPrice - downPayment);
  }, [downPayment, carPrice]);

  const calculateEMI = () => {
    const monthlyRate = interestRate / 12 / 100;
    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, duration)) /
      (Math.pow(1 + monthlyRate, duration) - 1);
    return Math.round(emi);
  };

  const calculateTotalInterest = () => {
    const emi = calculateEMI();
    return Math.round(emi * duration - loanAmount);
  };

  const calculateTotalAmount = () => {
    return calculateEMI() * duration;
  };

  const emi = calculateEMI();
  const totalInterest = calculateTotalInterest();
  const principalPercentage =
    (loanAmount / (loanAmount + totalInterest)) * 100;

  return (
    <Card className="p-6 border-border/50">
      <h3 className="text-2xl font-heading font-bold text-primary mb-6">
        EMI calculator
      </h3>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Side - EMI Display */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              EMI starting from
            </p>

            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-heading font-bold bg-gradient-to-r from-orange-500 to-orange-500/50 bg-clip-text text-transparent">
                ₹{emi.toLocaleString()}
              </span>
              <span className="text-lg text-orange-500">per month</span>
            </div>
          </div>

          {/* Gauge Chart */}
          <div className="relative h-40 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 200 120">
              {/* Background arc */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                // stroke="hsl(var(--muted))"
                stroke="#e5e5e5"
                strokeWidth="20"
                strokeLinecap="round"
              />

              {/* Principal arc */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                // stroke="hsl(var(--accent))"
                stroke="#fb923c"
                strokeWidth="20"
                strokeLinecap="round"
                strokeDasharray={`${
                  (principalPercentage / 100) * 251.2
                } 251.2`}
              />
            </svg>
          </div>

          {/* Legend */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-muted" />
                <span className="text-sm text-muted-foreground">
                  Principal Loan Amount
                </span>
              </div>
              <span className="font-semibold text-primary">
                ₹{loanAmount.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-orange-500" />
                <span className="text-sm text-muted-foreground">
                  Total Interest Payable
                </span>
              </div>
              <span className="font-semibold text-primary">
                ₹{totalInterest.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-primary" />
                <span className="text-sm font-semibold text-primary">
                  Total Amount Payable
                </span>
              </div>
              <span className="font-bold text-primary">
                ₹{calculateTotalAmount().toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side - Sliders */}
        <div className="space-y-6">
          {/* Loan Amount */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold text-primary">
                Loan Amount
              </Label>
              <span className="text-lg font-bold text-orange-500">
                ₹{loanAmount.toLocaleString('en-IN')}
              </span>
            </div>

            <Slider
              value={[loanAmount]}
              onValueChange={(value) => {
                setLoanAmount(value[0]);
                setDownPayment(carPrice - value[0]);
              }}
              min={100000}
              max={carPrice}
              step={10000}
              className="[&_.bg-primary]:bg-orange-500"
            />

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>₹1,00,000</span>
              <span>₹{carPrice.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Down Payment */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold text-primary">
                Down Payment*
              </Label>
              <span className="text-lg font-bold text-orange-500">
                ₹{downPayment.toLocaleString('en-IN')}
              </span>
            </div>

            <Slider
              value={[downPayment]}
              onValueChange={(value) => {
                setDownPayment(value[0]);
                setLoanAmount(carPrice - value[0]);
              }}
              min={0}
              max={carPrice * 0.9}
              step={10000}
              className="[&_.bg-primary]:bg-orange-500"
            />

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>₹0</span>
              <span>
                ₹{Math.round(carPrice * 0.9).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold text-primary">
                Duration of Loan
              </Label>
              <span className="text-lg font-bold text-orange-500">
                {duration} Months
              </span>
            </div>

            <Slider
              value={[duration]}
              onValueChange={(value) => setDuration(value[0])}
              min={12}
              max={84}
              step={6}
              className="[&_.bg-primary]:bg-orange-500"
            />

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>12 Months</span>
              <span>84 Months</span>
            </div>
          </div>

          {/* CTA Button */}
          <Button className="w-full bg-orange-500 hover:bg-orange-500/90 text-orange-foreground h-12 text-white font-semibold mt-4">
            <span className="mr-2">●</span> CHECK ELIGIBILITY
          </Button>

          {/* Disclaimer */}
          <div className="space-y-2 text-xs text-muted-foreground pt-2">
            <p>*Processing fee and other loan charges are not included.</p>

            <p>
              <span className="font-semibold">Disclaimer:</span> Applicable
              rate of interest can vary based on credit profile.  
              Loan approval is at finance partner’s discretion.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
