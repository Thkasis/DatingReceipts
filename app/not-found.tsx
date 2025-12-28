/**
 * 404 Not Found Page - Dating Receipts
 * Custom error page with brand voice
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-headline font-bold text-red-flag mb-4 animate-glitch">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-headline font-bold text-white mb-4">
          Ghosted.
        </h2>
        <p className="text-muted-foreground text-lg font-mono mb-8 max-w-md mx-auto">
          This page doesn't exist, just like his emotional maturity.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/">
            <Button className="btn-red-flag">
              Go Home
            </Button>
          </Link>
          <Link href="/submit">
            <Button className="btn-ghost">
              Submit Receipt
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

