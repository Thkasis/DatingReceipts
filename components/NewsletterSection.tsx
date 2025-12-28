/**
 * Newsletter Section - Dating Receipts Homepage
 * The Hook: Email capture for "Weekly Tea" newsletter
 */

"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { Mail, Check } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setEmail("");
        toast.success("Welcome to the Weekly Tea! 🚩");
      } else {
        toast.error(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section id="newsletter" className="py-20 px-4 bg-dark-bg">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="bg-dark-surface border border-muted rounded-lg p-12">
            <Check className="h-16 w-16 text-red-flag mx-auto mb-6 animate-fade-up" />
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-white mb-4">
              You're In! 🚩
            </h2>
            <p className="text-muted-foreground font-mono text-lg">
              Check your inbox every Friday for the 5 worst texts of the week.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="newsletter" className="py-20 px-4 bg-dark-bg">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-dark-surface border border-muted rounded-lg p-8 md:p-12">
          <div className="text-center mb-8">
            <Mail className="h-12 w-12 text-red-flag mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-white mb-4">
              Don't Date Alone
            </h2>
            <p className="text-muted-foreground font-mono text-lg mb-2">
              Get the 5 worst texts of the week sent to your inbox every Friday.
            </p>
            <p className="text-red-flag font-mono text-sm">
              Join the Weekly Tea ☕
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                variant="default"
                size="lg"
                disabled={isSubmitting}
                className="sm:w-auto"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground font-mono text-center">
              No spam. Just red flags. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

