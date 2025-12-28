/**
 * Product Teases Component - Dating Receipts About Page
 * Coming Soon products: Card Game & AI Tool
 */

"use client";

import { Button } from "@/components/ui/button";
import { CreditCard, Shield } from "lucide-react";

export function CardGameTease() {
  return (
    <div className="bg-dark-surface border border-muted rounded-lg p-8 md:p-12 animate-fade-up">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Blurred Image Placeholder */}
        <div className="relative w-full md:w-1/2">
          <div className="aspect-[3/4] bg-dark-elevated rounded-lg flex items-center justify-center border border-muted blur-sm">
            <CreditCard className="h-24 w-24 text-muted-foreground" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-dark-surface/80 backdrop-blur-sm rounded-lg p-4 border border-muted">
              <p className="text-muted-foreground font-mono text-sm">Coming 2026</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left">
          <CreditCard className="h-12 w-12 text-red-flag mx-auto md:mx-0 mb-4" />
          <h3 className="text-2xl md:text-3xl font-headline font-bold text-white mb-4">
            The Red Flag Card Game
          </h3>
          <p className="text-muted-foreground font-mono text-lg mb-6">
            Dropping 2026. Join the waitlist to be the first to know when it launches.
          </p>
          <Button variant="outline" className="w-full md:w-auto">
            Join Waitlist
          </Button>
        </div>
      </div>
    </div>
  );
}

export function AIToolTease() {
  return (
    <div className="bg-dark-surface border border-muted rounded-lg p-8 md:p-12 animate-fade-up" style={{ animationDelay: '0.1s' }}>
      <div className="flex flex-col md:flex-row-reverse items-center gap-8">
        {/* Placeholder */}
        <div className="relative w-full md:w-1/2">
          <div className="aspect-video bg-dark-elevated rounded-lg flex items-center justify-center border border-muted">
            <Shield className="h-24 w-24 text-muted-foreground" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left">
          <Shield className="h-12 w-12 text-red-flag mx-auto md:mx-0 mb-4" />
          <h3 className="text-2xl md:text-3xl font-headline font-bold text-white mb-4">
            The Red Flag Scanner
          </h3>
          <p className="text-muted-foreground font-mono text-lg mb-2">
            AI Profile Protection. Coming Soon.
          </p>
          <p className="text-muted-foreground font-mono text-sm">
            Get notified when we launch AI-powered profile scanning to help you spot red flags before you swipe.
          </p>
        </div>
      </div>
    </div>
  );
}
