/**
 * Featured Content Section - Dating Receipts Homepage
 * Top 3 YouTube Shorts (placeholder for now)
 */

"use client";

export default function FeaturedContent() {
  // Placeholder for YouTube Shorts embedding
  // In production, these would be actual YouTube embed URLs
  const featuredShorts = [
    { id: 1, title: "Top Red Flag #1" },
    { id: 2, title: "Top Red Flag #2" },
    { id: 3, title: "Top Red Flag #3" },
  ];

  return (
    <section className="py-16 px-4 bg-dark-surface">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-white mb-12 text-center">
          Featured Receipts
        </h2>
        
        {/* Mobile-first vertical layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredShorts.map((short, index) => (
            <div
              key={short.id}
              className="bg-dark-elevated border border-muted rounded-lg p-6 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Placeholder for YouTube Short embed */}
              <div className="aspect-[9/16] bg-dark-bg rounded-lg mb-4 flex items-center justify-center border border-muted">
                <p className="text-muted-foreground font-mono text-sm">
                  {short.title}
                </p>
              </div>
              <h3 className="text-white font-headline font-bold text-lg mb-2">
                {short.title}
              </h3>
              <p className="text-muted-foreground font-mono text-sm">
                Watch on YouTube Shorts
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

