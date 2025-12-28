# Resend Email Setup for Dating Receipts

This guide explains how to set up Resend email sending for the Dating Receipts forms on Cloudflare Workers.

## Overview

The Dating Receipts website uses Resend to send emails when users submit forms:
- **Receipt Submissions** (`/api/submit`) - Users submit dating receipts with screenshots
- **Ghoster Reports** (`/api/ghosters`) - Users report ghosters with profile images

Both forms send:
1. **Notification email** to `sepehr.s@aidolsgroup.com` with form data and attachments
2. **Thank you email** to the user (if email provided) with info about Dating Receipts

## Setup Instructions

### 1. Get Your Resend API Key

1. Go to [Resend.com](https://resend.com) and sign in
2. Navigate to **API Keys** in the dashboard
3. Create a new API key or use existing one
4. Copy the API key (starts with `re_`)

**API Key:** `re_Zx2KhJKa_GWgKj5RDvDAvbVcERRdsAJaA`

### 2. Set Up Cloudflare Secrets

The Resend API key must be set as a Cloudflare Worker secret (not in `wrangler.toml`):

#### Option A: Using Wrangler CLI (Recommended)

```bash
# Navigate to project directory
cd "C:\Users\Ben\Desktop\PROJECTS\DATING RECEIPTS"

# Set the secret
npx wrangler secret put RESEND_API_KEY

# When prompted, paste your Resend API key:
# re_Zx2KhJKa_GWgKj5RDvDAvbVcERRdsAJaA
```

#### Option B: Using Cloudflare Dashboard

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages** → Your Worker (`dating-receipts`)
3. Go to **Settings** → **Variables and Secrets**
4. Under **Secrets**, click **Add secret**
5. Set:
   - **Variable name**: `RESEND_API_KEY`
   - **Value**: `re_Zx2KhJKa_GWgKj5RDvDAvbVcERRdsAJaA`

### 3. Verify Domain in Resend

Make sure `datingreceipts.com` is verified in Resend:

1. Go to Resend Dashboard → **Domains**
2. Add `datingreceipts.com` if not already added
3. Follow DNS verification steps
4. Wait for verification (usually takes a few minutes)

**Note:** If domain is not verified, emails may still work but will be sent from a Resend domain.

### 4. Local Development Setup

For local development with Next.js, create a `.env.local` file:

```bash
# .env.local
RESEND_API_KEY=re_Zx2KhJKa_GWgKj5RDvDAvbVcERRdsAJaA
```

The Next.js API routes (`app/api/submit/route.ts` and `app/api/ghosters/route.ts`) will use this for local testing.

## How It Works

### Development (Next.js)

- Forms submit to `/api/submit` or `/api/ghosters`
- Next.js API routes handle the requests
- Uses `process.env.RESEND_API_KEY` from `.env.local`
- Sends emails via Resend API with attachments

### Production (Cloudflare Workers)

- Forms submit to `/api/submit` or `/api/ghosters`
- Cloudflare Worker (`src/index.js`) intercepts API routes
- Uses `env.RESEND_API_KEY` from Cloudflare secrets
- Sends emails via Resend API with attachments
- Falls back to static assets for other routes

## Email Templates

### Notification Email (to sepehr.s@aidolsgroup.com)

- **Subject**: Varies by form type
- **Content**: Form submission details, attachments included
- **From**: `Dating Receipts <noreply@datingreceipts.com>`

### Thank You Email (to user, if email provided)

- **Subject**: "Thank You for Your Submission - Dating Receipts 🚩" or "Thank You for Reporting - Dating Receipts 👻"
- **Content**: Thank you message, info about Dating Receipts mission, what happens next
- **From**: `Dating Receipts <noreply@datingreceipts.com>`

## Testing

### Test Locally

1. Start Next.js dev server:
   ```bash
   npm run dev
   ```

2. Submit a form on `http://localhost:3000/submit` or `http://localhost:3000/ghosters`

3. Check console logs for email sending status

4. Verify emails received:
   - Check `sepehr.s@aidolsgroup.com` for notification
   - Check user email (if provided) for thank you

### Test in Production

1. Deploy to Cloudflare:
   ```bash
   npm run build
   npx wrangler deploy
   ```

2. Submit a form on the live site

3. Check Cloudflare Worker logs:
   ```bash
   npx wrangler tail
   ```

4. Verify emails received

## Troubleshooting

### Emails Not Sending

1. **Check API Key**: Verify `RESEND_API_KEY` is set correctly
   ```bash
   npx wrangler secret list
   ```

2. **Check Logs**: Look for errors in Cloudflare Worker logs
   ```bash
   npx wrangler tail
   ```

3. **Verify Domain**: Ensure `datingreceipts.com` is verified in Resend dashboard

4. **Check Rate Limits**: Resend has rate limits on free tier
   - Check Resend dashboard for usage and limits

### Attachments Not Working

- Ensure files are valid image files
- Check file size limits (Resend supports up to 25MB per email)
- Verify base64 encoding in logs

### CORS Errors

- CORS headers are already configured in both Next.js routes and Cloudflare Worker
- If issues persist, check browser console for specific errors

## Security Notes

- **Never commit** `RESEND_API_KEY` to git
- Use Cloudflare secrets for production (not environment variables in code)
- Regenerate API key if accidentally exposed
- Monitor Resend dashboard for suspicious activity

## API Key Format

The Resend API key should:
- Start with `re_`
- Be approximately 40-50 characters long
- Be kept secret and secure

If you see errors about invalid API key format, check that it starts with `re_`.

## Support

For Resend-specific issues:
- [Resend Documentation](https://resend.com/docs)
- [Resend Support](https://resend.com/support)

For Dating Receipts implementation:
- Check `src/index.js` for Cloudflare Worker code
- Check `app/api/submit/route.ts` and `app/api/ghosters/route.ts` for Next.js routes

