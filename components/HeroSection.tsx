/**
 * Hero Section - Dating Receipts Homepage
 * The Funnel: Headline, CTA, Social Proof
 */

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flag, Ghost } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-bg to-dark-surface opacity-50" />
      <div className="absolute inset-0 bg-receipt-texture opacity-30" />
      
      {/* Content */}
      <div className="container mx-auto max-w-4xl relative z-10 text-center">
        {/* Red Flag Icon */}
        <div className="mb-8 animate-fade-up">
          <Flag className="h-16 w-16 text-red-flag mx-auto animate-pulse-red" />
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold text-white mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          Welcome to the{" "}
          <span className="text-red-flag relative inline-block">
            Hall of Red Flags
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-red-flag/30 animate-pulse-red" />
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-lg md:text-xl text-muted-foreground font-mono mb-12 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
          The internet's largest database of dating disasters, audacity, and immediate icks.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <Link href="/submit">
            <Button variant="default" size="lg" className="group">
              Submit Your Receipt
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/ghosters">
            <Button variant="outline" size="lg" className="group">
              <Ghost className="mr-2 h-5 w-5" />
              Report a Ghoster
            </Button>
          </Link>
          {/* Newsletter link hidden for now */}
          {/* <Link href="#newsletter">
            <Button variant="outline" size="lg">
              Join the Newsletter
            </Button>
          </Link> */}
        </div>

        {/* Social Proof */}
        <div className="animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <p className="text-sm text-muted-foreground font-mono mb-4">
            As seen on
          </p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="text-foreground font-mono text-sm">TikTok</div>
            <a
              href="https://www.youtube.com/@DATING_RECEIPTS/shorts"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-red-flag font-mono text-sm transition-colors"
            >
              YouTube
            </a>
            <div className="text-foreground font-mono text-sm">Instagram</div>
          </div>
        </div>
      </div>
    </section>
  );
}

