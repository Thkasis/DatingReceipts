/**
 * Root Layout for Dating Receipts Website
 * Mobile-first, dark mode, SEO/AEO optimized
 */

import type { Metadata, Viewport } from "next";
import { Inter, Oswald, Courier_Prime } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-courier",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#121212",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://datingreceipts.com"),
  title: {
    default: "Dating Receipts - The Internet's Hall of Red Flags",
    template: "%s | Dating Receipts",
  },
  description: "The internet's largest database of dating disasters, audacity, and immediate icks. Submit your receipts and join the Weekly Tea newsletter for the worst texts of the week.",
  keywords: [
    "dating receipts",
    "red flags",
    "dating disasters",
    "bad dating stories",
    "dating app screenshots",
    "dating fails",
    "toxic dating",
    "dating red flags",
    "worst dating texts",
    "dating horror stories",
  ],
  authors: [{ name: "Dating Receipts" }],
  creator: "Dating Receipts",
  publisher: "Dating Receipts",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://datingreceipts.com",
    siteName: "Dating Receipts",
    title: "Dating Receipts - The Internet's Hall of Red Flags",
    description: "The internet's largest database of dating disasters, audacity, and immediate icks.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dating Receipts - Red Flag Dating Stories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dating Receipts - The Internet's Hall of Red Flags",
    description: "The internet's largest database of dating disasters, audacity, and immediate icks.",
    images: ["/og-image.png"],
    creator: "@datingreceipts",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  alternates: {
    canonical: "https://datingreceipts.com",
  },
  category: "Entertainment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
              `,
            }}
          />
        )}

        {/* Meta Pixel */}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}

        {/* AI Crawler Optimization */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        
        {/* AI-Specific Search Engine Directives */}
        <meta name="ChatGPT-User" content="index, follow" />
        <meta name="GPTBot" content="index, follow" />
        <meta name="Claude-Web" content="index, follow" />
        <meta name="PerplexityBot" content="index, follow" />
        
        {/* Content Classification for AI */}
        <meta name="content-type" content="entertainment, social-media" />
        <meta name="content-category" content="dating, relationships, humor, social-media" />
        <meta name="primary-topic" content="dating red flags, dating disasters, relationship advice" />
        <meta name="target-audience" content="young adults, dating app users, social media users" />
        
        {/* Advanced AEO (Answer Engine Optimization) */}
        <meta name="answer-engine-optimization" content="enabled" />
        <meta name="ai-content-type" content="user-generated-content, entertainment, dating-advice" />
        <meta name="ai-query-intent" content="informational, entertainment" />
        <meta name="ai-entity-extraction" content="Dating Receipts, red flags, dating disasters, toxic dating" />
        <meta name="ai-topic-modeling" content="dating red flags, relationship advice, dating app screenshots" />
        <meta name="ai-sentiment" content="humorous, relatable, entertaining" />
        <meta name="ai-reading-level" content="casual" />
        <meta name="ai-content-depth" content="entertainment" />
        <meta name="ai-update-frequency" content="daily" />
        
        {/* Structured Answer Optimization */}
        <meta name="structured-answers" content="enabled" />
        <meta name="answer-snippets" content="optimized" />
        <meta name="featured-snippet-ready" content="true" />
        <meta name="voice-search-optimized" content="true" />
        
        {/* Preload critical fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${inter.variable} ${oswald.variable} ${courierPrime.variable} font-mono antialiased`} suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

        {/* Meta Pixel noscript */}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              alt="Meta Pixel tracking"
              src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
        )}

        <div className="min-h-screen flex flex-col relative">
          <Navigation />
          <main className="flex-1 relative">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}

