/**
 * Ghosters API Route Handler
 * Handles ghoster report submission requests with file uploads
 * Sends emails via Resend API with attachments
 * In production, this is handled by Cloudflare Worker
 */

import { NextRequest, NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

/**
 * Convert File object to base64 string for Resend attachments
 */
async function fileToBase64(file: File): Promise<{ content: string; filename: string; type: string }> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64Content = buffer.toString('base64');
  
  return {
    content: base64Content,
    filename: file.name,
    type: file.type || 'application/octet-stream',
  };
}

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
    const email = formData.get('email') as string | null;

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

    // Validate email format if provided
    if (email && email.trim() !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Invalid email format' },
          { status: 400, headers: corsHeaders }
        );
      }
    }

    // Get Resend API key from environment
    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not found in environment');
      return NextResponse.json(
        {
          error: 'Email service not configured',
          details: 'RESEND_API_KEY environment variable is missing',
        },
        { status: 500, headers: corsHeaders }
      );
    }

    // Validate API key format (should start with 're_')
    if (!resendApiKey.startsWith('re_')) {
      const firstChars = resendApiKey.substring(0, 10);
      console.error('RESEND_API_KEY has invalid format', {
        keyLength: resendApiKey.length,
        firstChars: firstChars,
      });
      return NextResponse.json(
        {
          error: 'Email service configuration error',
          details: `RESEND_API_KEY format is invalid. Expected to start with 're_', but got: ${firstChars}... (length: ${resendApiKey.length})`,
        },
        { status: 500, headers: corsHeaders }
      );
    }

    // Convert files to base64 for attachments
    const attachments = profileImages.length > 0
      ? await Promise.all(profileImages.map((file) => fileToBase64(file)))
      : [];

    // Prepare attachment data for Resend API
    const resendAttachments = attachments.map((att, index) => ({
      filename: att.filename || `profile-image-${index + 1}.png`,
      content: att.content,
    }));

    // Send notification email to sepehr.s@aidolsgroup.com
    const notificationEmailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Ghoster Report - Dating Receipts</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: white; padding: 30px; border-radius: 8px; margin-bottom: 30px;">
            <h2 style="color: #1f2937; margin: 0 0 20px 0;">New Ghoster Report 👻</h2>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #374151; margin: 0 0 10px 0; font-size: 16px;">Report Details</h3>
              ${profileName ? `<p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 5px 0;"><strong>Profile Name / Username:</strong> ${profileName}</p>` : ''}
              ${platform ? `<p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 5px 0;"><strong>Platform / App:</strong> ${platform}</p>` : ''}
              <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 5px 0;">
                <strong>Number of Images:</strong> ${profileImages.length}
              </p>
              ${email ? `<p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 5px 0;"><strong>Reporter Email:</strong> <a href="mailto:${email}" style="color: #dc2626; text-decoration: none;">${email}</a></p>` : ''}
            </div>

            ${context ? `
            <div style="margin-bottom: 20px;">
              <h3 style="color: #374151; margin: 0 0 10px 0; font-size: 16px;">What Happened?</h3>
              <div style="background: #f9fafb; padding: 15px; border-radius: 6px; border-left: 4px solid #dc2626;">
                <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${context}</p>
              </div>
            </div>
            ` : ''}

            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
              <p style="color: #6b7280; font-size: 12px; line-height: 1.5; margin: 0;">
                <strong>Submitted:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/Toronto', dateStyle: 'full', timeStyle: 'long' })}
              </p>
              ${email ? `<p style="color: #6b7280; font-size: 12px; line-height: 1.5; margin: 10px 0 0 0;"><a href="mailto:${email}" style="color: #dc2626; text-decoration: none;">Reply to ${email}</a></p>` : ''}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send thank you email to user (if email provided)
    const thankYouEmailHtml = email ? `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Reporting - Dating Receipts</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: white; padding: 30px; border-radius: 8px; margin-bottom: 30px;">
            <h1 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">Thank You for Reporting! 👻</h1>
            
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              We've received your ghoster report and truly appreciate you taking the time to help protect others in the dating community.
            </p>
            
            <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
              <h3 style="color: #991b1b; margin: 0 0 10px 0; font-size: 16px;">About Dating Receipts</h3>
              <p style="color: #4b5563; font-size: 14px; line-height: 1.8; margin: 0 0 10px 0;">
                Dating Receipts is on a mission to better the dating world by creating awareness, accountability, and community. We believe that by sharing these experiences anonymously, we can help others navigate the modern dating landscape with more awareness and less heartache.
              </p>
              <p style="color: #4b5563; font-size: 14px; line-height: 1.8; margin: 0;">
                Your report helps us build a safer, more transparent dating environment. By reporting ghosters, you're helping others avoid the same fate and creating accountability in the dating world.
              </p>
            </div>

            <div style="background: #fff7ed; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
              <h3 style="color: #9a3412; margin: 0 0 10px 0; font-size: 16px;">What Happens Next?</h3>
              <ul style="margin: 0; padding-left: 20px; color: #4b5563; font-size: 14px; line-height: 1.8;">
                <li style="margin-bottom: 8px;">Our team reviews all ghoster reports</li>
                <li style="margin-bottom: 8px;">Reports help us identify patterns and protect the community</li>
                <li style="margin-bottom: 8px;">All reports remain anonymous</li>
                <li style="margin-bottom: 8px;">You're making a difference in the dating world!</li>
              </ul>
            </div>

            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
              <p style="color: #6b7280; font-size: 14px; line-height: 1.5; margin: 0 0 10px 0;">
                Keep fighting the good fight,<br/>
                <strong>The Dating Receipts Team</strong>
              </p>
              <p style="color: #6b7280; font-size: 14px; line-height: 1.5; margin: 10px 0 0 0;">
                <a href="https://datingreceipts.com" style="color: #dc2626; text-decoration: none;">Visit Dating Receipts</a>
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    ` : null;

    // Send emails via Resend API
    const resendApiUrl = 'https://api.resend.com/emails';
    
    let notificationError = null;
    let confirmationError = null;
    
    // Send notification email to admin
    try {
      const subject = profileName 
        ? `New Ghoster Report - ${profileName}${platform ? ` (${platform})` : ''}`
        : `New Ghoster Report${platform ? ` - ${platform}` : ''}`;

      const notificationResponse = await fetch(resendApiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Dating Receipts <noreply@datingreceipts.com>',
          to: ['sepehr.s@aidolsgroup.com'],
          subject: subject,
          html: notificationEmailHtml,
          attachments: resendAttachments.length > 0 ? resendAttachments : undefined,
        }),
      });

      if (!notificationResponse.ok) {
        const errorData = await notificationResponse.text();
        let parsedError;
        try {
          parsedError = JSON.parse(errorData);
        } catch {
          parsedError = { message: errorData, status: notificationResponse.status };
        }
        notificationError = {
          status: notificationResponse.status,
          statusText: notificationResponse.statusText,
          error: parsedError,
        };
        console.error('Failed to send notification email:', JSON.stringify(notificationError, null, 2));
      } else {
        const successData = await notificationResponse.json();
        console.log('Notification email sent successfully:', successData);
      }
    } catch (error) {
      notificationError = {
        error: error instanceof Error ? error.message : 'Unknown error',
        type: 'network_error',
      };
      console.error('Exception sending notification email:', error);
    }

    // Send thank you email to user (if email provided)
    if (email && email.trim() !== '' && thankYouEmailHtml) {
      try {
        const confirmationResponse = await fetch(resendApiUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Dating Receipts <noreply@datingreceipts.com>',
            to: [email],
            subject: 'Thank You for Reporting - Dating Receipts 👻',
            html: thankYouEmailHtml,
          }),
        });

        if (!confirmationResponse.ok) {
          const errorData = await confirmationResponse.text();
          let parsedError;
          try {
            parsedError = JSON.parse(errorData);
          } catch {
            parsedError = { message: errorData, status: confirmationResponse.status };
          }
          confirmationError = {
            status: confirmationResponse.status,
            statusText: confirmationResponse.statusText,
            error: parsedError,
          };
          console.error('Failed to send thank you email:', JSON.stringify(confirmationError, null, 2));
        } else {
          const successData = await confirmationResponse.json();
          console.log('Thank you email sent successfully:', successData);
        }
      } catch (error) {
        confirmationError = {
          error: error instanceof Error ? error.message : 'Unknown error',
          type: 'network_error',
        };
        console.error('Exception sending thank you email:', error);
      }
    }

    // If notification failed, return error
    if (notificationError) {
      return NextResponse.json(
        {
          error: 'Failed to send notification email',
          details: notificationError,
        },
        { status: 500, headers: corsHeaders }
      );
    }

    // If only confirmation failed, log but still return success (notification was sent)
    if (confirmationError) {
      console.warn('Thank you email failed but notification was sent. Admin was notified.');
    }

    console.log('Ghoster report processed successfully:', {
      profileName,
      platform,
      imageCount: profileImages.length,
      emailProvided: !!email,
      notificationSent: !notificationError,
      confirmationSent: !confirmationError,
      timestamp: new Date().toISOString(),
    });

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

