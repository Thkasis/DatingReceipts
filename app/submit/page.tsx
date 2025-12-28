/**
 * Submission Page - Dating Receipts
 * The "Gold Mine" - Frictionless UGC collection
 */

import SubmissionForm from "@/components/SubmissionForm";

export const metadata = {
  title: "Submit Your Receipt",
  description: "Share your dating disasters with the world. Upload screenshots, rate the audacity, and help us expose bad dating behavior.",
};

export default function SubmitPage() {
  return (
    <div className="relative min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-white mb-4 animate-fade-up">
            Submit Your Receipt
          </h1>
          <p className="text-muted-foreground text-lg font-mono animate-fade-up mb-6" style={{ animationDelay: '0.1s' }}>
            Help us build the internet's largest database of dating disasters
          </p>
          <div className="bg-dark-surface border border-muted rounded-lg p-6 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-foreground font-mono text-sm leading-relaxed">
              Every screenshot you submit helps someone else recognize red flags before it's too late. 
              Whether it's unsolicited nudes, manipulative behavior, or just pure audacity—your receipts 
              become warnings for others. By sharing these moments, you're not just venting—you're creating 
              a public service that saves people time, energy, and heartache.
            </p>
          </div>
        </div>
        <SubmissionForm />
      </div>
    </div>
  );
}

