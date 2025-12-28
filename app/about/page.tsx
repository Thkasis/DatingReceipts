/**
 * About Page - Dating Receipts
 * Mission, Roadmap, Coming Soon Products
 */

// import { CardGameTease, AIToolTease } from "@/components/ProductTeases";

export const metadata = {
  title: "About Dating Receipts",
  description: "Learn about Dating Receipts mission to expose bad dating behavior and our upcoming products: The Red Flag Card Game and AI Profile Protection.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Mission Section */}
        <section className="mb-16 animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-white mb-6 text-center">
            Welcome to the Hall of Red Flags
          </h1>
          <div className="bg-dark-surface border border-muted rounded-lg p-8 md:p-12">
            <p className="text-foreground text-lg font-mono leading-relaxed mb-6">
              Dating Receipts is on a mission to expose bad dating behavior, one screenshot at a time. 
              We're building the internet's largest database of dating disasters, audacity, and immediate icks.
            </p>
            <p className="text-foreground text-lg font-mono leading-relaxed mb-6">
              Our goal? To help people recognize red flags early, laugh at the audacity, and ultimately 
              make better dating decisions. Because let's face it—we've all been there.
            </p>
            <p className="text-red-flag text-lg font-mono font-bold">
              Run, don't walk. 🚩
            </p>
          </div>
        </section>

        {/* Coming Soon Products */}
        {/* <section className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-white mb-8 text-center">
            Coming Soon
          </h2>
          
          <CardGameTease />
          <AIToolTease />
        </section> */}
      </div>
    </div>
  );
}

