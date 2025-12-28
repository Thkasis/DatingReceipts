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
          <p className="text-muted-foreground text-lg font-mono animate-fade-up mb-6" style={{ animationDelay: '0.1s' }}>
            Help others avoid being ghosted. Submit profiles of people who have ghosted you.
          </p>
          <div className="bg-dark-surface border border-muted rounded-lg p-6 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-foreground font-mono text-sm leading-relaxed mb-4">
              Ghosting isn't just a minor inconvenience—it's a pattern of behavior that shows a lack of respect 
              and emotional maturity. When someone disappears without explanation after building a connection, 
              it leaves you questioning yourself and wondering what went wrong.
            </p>
            <p className="text-foreground font-mono text-sm leading-relaxed">
              By reporting ghosters, you're helping others avoid investing their time and emotions in people 
              who have a history of disappearing. This isn't about revenge—it's about creating accountability 
              and protecting the community from repeat offenders. Your report could save someone else from the 
              same emotional rollercoaster.
            </p>
          </div>
        </div>
        <GhostersForm />
      </div>
    </div>
  );
}

