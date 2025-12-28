/**
 * Next.js Configuration for Dating Receipts Website
 * Optimized for Cloudflare Workers deployment with static export
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for Cloudflare Workers (only in production builds)
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  trailingSlash: true,
  
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },
  
  // Advanced image optimization configuration for SEO/AEO
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Note: For static export, images are served as-is and optimized by CDN
    unoptimized: true,
  },
  
  // Compression and performance
  compress: true,
  
  // Note: headers, redirects, and rewrites are handled by Cloudflare Workers
  // These configurations are moved to wrangler.toml or Cloudflare dashboard
};

module.exports = nextConfig;

