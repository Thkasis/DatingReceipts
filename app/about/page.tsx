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
            
            <h2 className="text-2xl md:text-3xl font-headline font-bold text-white mb-4 mt-8">
              Why We Track Ghosters
            </h2>
            <p className="text-foreground text-lg font-mono leading-relaxed mb-6">
              Ghosting isn't just rude—it's emotionally damaging. When someone disappears without explanation, 
              it leaves you questioning what went wrong, replaying conversations, and wondering if you did something wrong. 
              We're building a community-driven database to help people identify repeat ghosters before they invest time and emotions.
            </p>
            <p className="text-foreground text-lg font-mono leading-relaxed mb-6">
              By reporting ghosters, you're not seeking revenge—you're protecting others from the same emotional 
              rollercoaster. Together, we can create accountability and help people make more informed decisions about 
              who they choose to invest their time in.
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

