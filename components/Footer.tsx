/**
 * Footer Component - Dating Receipts
 * Brand voice footer with links
 */

import Link from "next/link";
import { Flag } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-muted bg-dark-surface py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Flag className="h-6 w-6 text-red-flag" />
              <span className="text-xl font-headline font-bold text-white">
                Dating Receipts
              </span>
            </Link>
            <p className="text-muted-foreground font-mono text-sm">
              The internet's Hall of Red Flags
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-headline font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-red-flag transition-colors font-mono text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/submit"
                  className="text-muted-foreground hover:text-red-flag transition-colors font-mono text-sm"
                >
                  Submit Receipt
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-red-flag transition-colors font-mono text-sm"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-headline font-bold mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-red-flag transition-colors font-mono text-sm"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@DATING_RECEIPTS/shorts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-red-flag transition-colors font-mono text-sm"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-red-flag transition-colors font-mono text-sm"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-muted pt-8 text-center">
          <p className="text-muted-foreground font-mono text-sm">
            Dating Receipts © {currentYear}. Run, don't walk. 🚩
          </p>
        </div>
      </div>
    </footer>
  );
}

