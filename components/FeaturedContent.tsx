/**
 * Featured Content Section - Dating Receipts Homepage
 * Top 3 YouTube Shorts embedded videos
 */

"use client";

export default function FeaturedContent() {
  // Featured YouTube Shorts videos
  const featuredShorts = [
    {
      id: "eFUJJwVFlAY",
      title: "Featured Receipt #1",
      url: "https://youtube.com/shorts/eFUJJwVFlAY",
    },
    {
      id: "g524x6pdRuI",
      title: "Featured Receipt #2",
      url: "https://youtube.com/shorts/g524x6pdRuI",
    },
    {
      id: "Rw36TBvc_zI",
      title: "Featured Receipt #3",
      url: "https://youtube.com/shorts/Rw36TBvc_zI",
    },
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
              {/* YouTube Short embed */}
              <div className="aspect-[9/16] bg-dark-bg rounded-lg mb-4 overflow-hidden border border-muted">
                <iframe
                  src={`https://www.youtube.com/embed/${short.id}`}
                  title={short.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
              <h3 className="text-white font-headline font-bold text-lg mb-2">
                {short.title}
              </h3>
              <a
                href={short.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-flag hover:text-red-flag-dark font-mono text-sm transition-colors"
              >
                Watch on YouTube Shorts →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

