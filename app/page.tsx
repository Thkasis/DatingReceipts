/**
 * Home Page - Dating Receipts
 * The Funnel: Hero, Featured Content, Newsletter Signup
 */

import HeroSection from "@/components/HeroSection";
import FeaturedContent from "@/components/FeaturedContent";
import NewsletterSection from "@/components/NewsletterSection";

export default function HomePage() {
  return (
    <div className="relative">
      <HeroSection />
      <FeaturedContent />
      <NewsletterSection />
    </div>
  );
}

