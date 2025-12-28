/**
 * Navigation Component - Dating Receipts
 * Mobile-first navigation with dark mode styling
 */

"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-muted bg-dark-bg/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Flag className="h-6 w-6 text-red-flag group-hover:animate-pulse-red" />
            <span className="text-xl font-headline font-bold text-white">
              Dating Receipts
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-foreground hover:text-red-flag transition-colors font-mono text-sm"
            >
              Home
            </Link>
            <Link
              href="/submit"
              className="text-foreground hover:text-red-flag transition-colors font-mono text-sm"
            >
              Submit Receipt
            </Link>
            <Link
              href="/ghosters"
              className="text-foreground hover:text-red-flag transition-colors font-mono text-sm"
            >
              Ghosters
            </Link>
            <Link
              href="/about"
              className="text-foreground hover:text-red-flag transition-colors font-mono text-sm"
            >
              About
            </Link>
            <Link href="/submit">
              <Button variant="default" size="sm">
                Expose Him
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground hover:text-red-flag transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-muted animate-slide-up">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-foreground hover:text-red-flag transition-colors font-mono"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/submit"
                className="text-foreground hover:text-red-flag transition-colors font-mono"
                onClick={() => setIsOpen(false)}
              >
                Submit Receipt
              </Link>
              <Link
                href="/ghosters"
                className="text-foreground hover:text-red-flag transition-colors font-mono"
                onClick={() => setIsOpen(false)}
              >
                Ghosters
              </Link>
              <Link
                href="/about"
                className="text-foreground hover:text-red-flag transition-colors font-mono"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link href="/submit" onClick={() => setIsOpen(false)}>
                <Button variant="default" className="w-full">
                  Expose Him
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

