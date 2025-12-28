/**
 * Ghosters Page - Dating Receipts
 * Submit profiles of people who have ghosted you
 */

import GhostersForm from "@/components/GhostersForm";

export const metadata = {
  title: "Report a Ghoster",
  description: "Submit profiles of people who have ghosted you. Help others avoid being ghosted by the same people.",
};

export default function GhostersPage() {
  return (
    <div className="relative min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-white mb-4 animate-fade-up">
            Report a Ghoster
          </h1>
          <p className="text-muted-foreground text-lg font-mono animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Help others avoid being ghosted. Submit profiles of people who have ghosted you.
          </p>
        </div>
        <GhostersForm />
      </div>
    </div>
  );
}

