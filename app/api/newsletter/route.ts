/**
 * Newsletter API Route Handler
 * Handles newsletter subscription requests
 * In production, this is handled by Cloudflare Worker
 */

import { NextRequest, NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400, headers: corsHeaders }
      );
    }

    // In production, integrate with your email service (Resend, Mailchimp, etc.)
    // For now, we'll just log it
    console.log('Newsletter subscription:', email);

    // TODO: Integrate with email service
    // Example with Resend:
    // const resendApiKey = process.env.RESEND_API_KEY;
    // if (resendApiKey) {
    //   await fetch('https://api.resend.com/emails', {
    //     method: 'POST',
    //     headers: {
    //       Authorization: `Bearer ${resendApiKey}`,
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       from: 'Dating Receipts <noreply@datingreceipts.com>',
    //       to: [email],
    //       subject: 'Welcome to the Weekly Tea! 🚩',
    //       html: '<p>Welcome to Dating Receipts Weekly Tea newsletter...</p>',
    //     }),
    //   });
    // }

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed to newsletter',
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error processing newsletter subscription:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

