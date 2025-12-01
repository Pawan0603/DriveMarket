"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";

export default function CarFilters({ onFilterChange }) {
  return (
    <Card className="p-6 sticky top-24 border-border/50">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <SlidersHorizontal className="h-5 w-5 text-orange-500" />
        <h3 className="text-xl font-heading font-bold text-primary">Filters</h3>
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div>
          <Label htmlFor="search" className="text-sm font-medium mb-2 block">
            Search
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Make, model, or keyword..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Price Slider */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Price Range</Label>
          <div className="space-y-4">
            <Slider defaultValue={[50000]} max={100000} step={1000} />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>$0</span>
              <span>$100,000</span>
            </div>
          </div>
        </div>

        {/* Make Select */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Make</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="All makes" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All makes</SelectItem>
              <SelectItem value="toyota">Toyota</SelectItem>
              <SelectItem value="honda">Honda</SelectItem>
              <SelectItem value="bmw">BMW</SelectItem>
              <SelectItem value="tesla">Tesla</SelectItem>
              <SelectItem value="ford">Ford</SelectItem>
              <SelectItem value="mazda">Mazda</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Body Type Select */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Body Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="All types" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="sedan">Sedan</SelectItem>
              <SelectItem value="suv">SUV</SelectItem>
              <SelectItem value="hatchback">Hatchback</SelectItem>
              <SelectItem value="coupe">Coupe</SelectItem>
              <SelectItem value="wagon">Wagon</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Fuel Type Select */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Fuel Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="All types" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="petrol">Petrol</SelectItem>
              <SelectItem value="diesel">Diesel</SelectItem>
              <SelectItem value="electric">Electric</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Transmission Select */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Transmission</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="All types" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="automatic">Automatic</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Apply Button */}
        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          Apply Filters
        </Button>
      </div>
    </Card>
  );
}
