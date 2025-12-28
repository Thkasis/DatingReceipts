/**
 * Ghosters API Route Handler
 * Handles ghoster report submission requests with file uploads
 * In production, this is handled by Cloudflare Worker
 */

import { NextRequest, NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const profileImages = formData.getAll('profileImages') as File[];
    const profileName = formData.get('profileName') as string;
    const platform = formData.get('platform') as string;
    const context = formData.get('context') as string;
    const legalConsent = formData.get('legalConsent') as string;

    if (!profileImages || profileImages.length === 0) {
      if (!profileName || profileName.trim() === '') {
        return NextResponse.json(
          { error: 'Please provide at least a profile name or image' },
          { status: 400, headers: corsHeaders }
        );
      }
    }

    if (legalConsent !== 'true') {
      return NextResponse.json(
        { error: 'Legal consent is required' },
        { status: 400, headers: corsHeaders }
      );
    }

    // In production, upload files to Cloudflare R2, AWS S3, or similar
    // and store submission data in a database
    console.log('Ghoster report submission:', {
      profileName,
      platform,
      imageCount: profileImages.length,
      context,
      legalConsent,
    });

    // TODO: Upload files to storage
    // TODO: Store submission in database
    // TODO: Send notification email

    return NextResponse.json(
      {
        success: true,
        message: 'Ghoster report submitted successfully',
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error processing ghoster report:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

