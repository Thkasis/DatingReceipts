# Dating Receipts Website

The internet's largest database of dating disasters, audacity, and immediate icks. A mobile-first, dark mode website built with Next.js and deployed to Cloudflare.

## 🚩 Features

- **Mobile-First Design**: Optimized for TikTok/YouTube mobile traffic
- **Dark Mode**: Sleek dark theme with "Red Flag" aesthetic
- **UGC Collection**: Frictionless submission form for dating receipts
- **Newsletter Capture**: "Weekly Tea" email list signup
- **SEO/AEO Optimized**: Comprehensive meta tags and structured data
- **Cloudflare Deployment**: Static export optimized for Cloudflare Workers

## 🎨 Design System

- **Primary Color**: Red Flag Red (#FF3B30)
- **Background**: Dark Mode Black (#121212)
- **Typography**: 
  - Headlines: Oswald (Bold Sans-Serif)
  - Body: Courier Prime (Monospace)
- **Aesthetics**: Glitch effects, text bubbles, receipt textures

## 📁 Project Structure

```
DATING RECEIPTS/
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   ├── submit/            # Submission page
│   ├── about/             # About page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # UI primitives
│   ├── Navigation.tsx    # Site navigation
│   ├── HeroSection.tsx   # Homepage hero
│   ├── NewsletterSection.tsx
│   ├── SubmissionForm.tsx
│   └── Footer.tsx
├── lib/                  # Utilities
└── public/               # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to Cloudflare
npm run deploy
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
# Email Service (Resend)
RESEND_API_KEY=re_your_api_key_here

# Analytics
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=your_pixel_id

# Site URL
NEXT_PUBLIC_SITE_URL=https://datingreceipts.com
```

### Cloudflare Deployment

1. Install Wrangler CLI:
```bash
npm install -g wrangler
```

2. Login to Cloudflare:
```bash
wrangler login
```

3. Update `wrangler.toml` with your domain

4. Set secrets:
```bash
wrangler secret put RESEND_API_KEY
```

5. Deploy:
```bash
npm run build
npm run deploy
```

## 📝 Pages

### Home Page (`/`)
- Hero section with headline and CTAs
- Featured content (YouTube Shorts placeholders)
- Newsletter signup section

### Submit Page (`/submit`)
- Screenshot upload (multiple images)
- Context text field
- Audacity score slider (1-10)
- Legal consent checkbox

### About Page (`/about`)
- Mission statement
- Coming soon products (Card Game & AI Tool)

## 🎯 SEO/AEO Optimization

- Comprehensive meta tags
- Open Graph and Twitter Card support
- AI crawler optimization
- Structured data ready
- Mobile-first responsive design

## 📧 Email Integration

The site uses Resend for email services. Update the API routes in `app/api/` to integrate with your email provider.

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Cloudflare Workers

## 📄 License

Private project - All rights reserved

---

**Dating Receipts © 2025. Run, don't walk. 🚩**
