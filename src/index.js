/**
 * Cloudflare Worker for Dating Receipts
 * Serves static assets from the out directory
 * Handles API routes for form submissions with Resend email integration
 */

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

/**
 * Convert File/Blob to base64 string for Resend attachments
 */
async function fileToBase64(file) {
  const arrayBuffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);
  
  // Convert to base64 using a more reliable method for Cloudflare Workers
  let binaryString = '';
  for (let i = 0; i < uint8Array.length; i++) {
    binaryString += String.fromCharCode(uint8Array[i]);
  }
  const base64Content = btoa(binaryString);
  
  return {
    content: base64Content,
    filename: file.name || 'attachment',
    type: file.type || 'application/octet-stream',
  };
}

/**
 * Handle Receipt Submission Form
 * Sends emails via Resend API with attachments
 */
async function handleSubmitForm(request, env) {
  try {
    const formData = await request.formData();
    
    const screenshots = formData.getAll('screenshots');
    const context = formData.get('context') || '';
    const audacityScore = formData.get('audacityScore') || '5';
    const legalConsent = formData.get('legalConsent');
    const email = formData.get('email');

    if (!screenshots || screenshots.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Please upload at least one screenshot' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (legalConsent !== 'true') {
      return new Response(
        JSON.stringify({ error: 'Legal consent is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format if provided
    if (email && email.trim() !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return new Response(
          JSON.stringify({ error: 'Invalid email format' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Get Resend API key from environment
    const resendApiKey = env.RESEND_API_KEY?.trim();
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not found in environment');
      return new Response(
        JSON.stringify({
          error: 'Email service not configured',
          details: 'RESEND_API_KEY environment variable is missing',
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate API key format
    if (!resendApiKey.startsWith('re_')) {
      return new Response(
        JSON.stringify({
          error: 'Email service configuration error',
          details: 'RESEND_API_KEY format is invalid',
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Convert files to base64 for attachments
    const attachments = await Promise.all(
      screenshots.map((file, index) => fileToBase64(file))
    );

    const resendAttachments = attachments.map((att, index) => ({
      filename: att.filename || `screenshot-${index + 1}.png`,
      content: att.content,
    }));

    // Notification email HTML (same as Next.js route)
    const notificationEmailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Receipt Submission - Dating Receipts</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: white; padding: 30px; border-radius: 8px; margin-bottom: 30px;">
            <h2 style="color: #1f2937; margin: 0 0 20px 0;">New Receipt Submission 🚩</h2>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #374151; margin: 0 0 10px 0; font-size: 16px;">Submission Details</h3>
              <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 5px 0;">
                <strong>Number of Screenshots:</strong> ${screenshots.length}
              </p>
              <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 5px 0;">
                <strong>Audacity Score:</strong> ${audacityScore}/10
              </p>
              ${email ? `<p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 5px 0;"><strong>Submitter Email:</strong> <a href="mailto:${email}" style="color: #dc2626; text-decoration: none;">${email}</a></p>` : ''}
            </div>

            ${context ? `
            <div style="margin-bottom: 20px;">
              <h3 style="color: #374151; margin: 0 0 10px 0; font-size: 16px;">Context / Story</h3>
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

    // Thank you email HTML (same as Next.js route)
    const thankYouEmailHtml = email ? `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Your Submission - Dating Receipts</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: white; padding: 30px; border-radius: 8px; margin-bottom: 30px;">
            <h1 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">Thank You for Your Submission! 🚩</h1>
            
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              We've received your receipt submission and truly appreciate you taking the time to share your story with us.
            </p>
            
            <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
              <h3 style="color: #991b1b; margin: 0 0 10px 0; font-size: 16px;">About Dating Receipts</h3>
              <p style="color: #4b5563; font-size: 14px; line-height: 1.8; margin: 0 0 10px 0;">
                Dating Receipts is on a mission to better the dating world by creating awareness, accountability, and community. We believe that by sharing these experiences anonymously, we can help others navigate the modern dating landscape with more awareness and less heartache.
              </p>
              <p style="color: #4b5563; font-size: 14px; line-height: 1.8; margin: 0;">
                Your submission helps us build a safer, more transparent dating environment. If we feature your receipt, you're helping save someone else from a similar experience.
              </p>
            </div>

            <div style="background: #fff7ed; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
              <h3 style="color: #9a3412; margin: 0 0 10px 0; font-size: 16px;">What Happens Next?</h3>
              <ul style="margin: 0; padding-left: 20px; color: #4b5563; font-size: 14px; line-height: 1.8;">
                <li style="margin-bottom: 8px;">Our team reviews all submissions</li>
                <li style="margin-bottom: 8px;">Selected receipts may be featured on our social media and newsletter</li>
                <li style="margin-bottom: 8px;">All submissions remain anonymous</li>
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
    
    // Send notification email to admin
    const notificationResponse = await fetch(resendApiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Dating Receipts <noreply@datingreceipts.com>',
        to: ['sepehr.s@aidolsgroup.com'],
        subject: `New Receipt Submission - ${screenshots.length} screenshot(s) - Audacity Score: ${audacityScore}/10`,
        html: notificationEmailHtml,
        attachments: resendAttachments,
      }),
    });

    if (!notificationResponse.ok) {
      const errorData = await notificationResponse.text();
      console.error('Failed to send notification email:', errorData);
      return new Response(
        JSON.stringify({
          error: 'Failed to send notification email',
          details: errorData,
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
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
            subject: 'Thank You for Your Submission - Dating Receipts 🚩',
            html: thankYouEmailHtml,
          }),
        });

        if (!confirmationResponse.ok) {
          console.warn('Failed to send thank you email, but notification was sent');
        }
      } catch (error) {
        console.warn('Exception sending thank you email:', error);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Receipt submitted successfully',
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing submission:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        details: error.message || 'Unknown error',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

/**
 * Handle Ghoster Report Form
 * Sends emails via Resend API with attachments
 */
async function handleGhostersForm(request, env) {
  try {
    const formData = await request.formData();
    
    const profileImages = formData.getAll('profileImages');
    const profileName = formData.get('profileName') || '';
    const platform = formData.get('platform') || '';
    const context = formData.get('context') || '';
    const legalConsent = formData.get('legalConsent');
    const email = formData.get('email');

    if (!profileImages || profileImages.length === 0) {
      if (!profileName || profileName.trim() === '') {
        return new Response(
          JSON.stringify({ error: 'Please provide at least a profile name or image' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    if (legalConsent !== 'true') {
      return new Response(
        JSON.stringify({ error: 'Legal consent is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format if provided
    if (email && email.trim() !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return new Response(
          JSON.stringify({ error: 'Invalid email format' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Get Resend API key from environment
    const resendApiKey = env.RESEND_API_KEY?.trim();
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not found in environment');
      return new Response(
        JSON.stringify({
          error: 'Email service not configured',
          details: 'RESEND_API_KEY environment variable is missing',
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate API key format
    if (!resendApiKey.startsWith('re_')) {
      return new Response(
        JSON.stringify({
          error: 'Email service configuration error',
          details: 'RESEND_API_KEY format is invalid',
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Convert files to base64 for attachments
    const attachments = profileImages.length > 0
      ? await Promise.all(profileImages.map((file) => fileToBase64(file)))
      : [];

    const resendAttachments = attachments.map((att, index) => ({
      filename: att.filename || `profile-image-${index + 1}.png`,
      content: att.content,
    }));

    // Notification email HTML
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

    // Thank you email HTML
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
    
    const subject = profileName 
      ? `New Ghoster Report - ${profileName}${platform ? ` (${platform})` : ''}`
      : `New Ghoster Report${platform ? ` - ${platform}` : ''}`;

    // Send notification email to admin
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
      console.error('Failed to send notification email:', errorData);
      return new Response(
        JSON.stringify({
          error: 'Failed to send notification email',
          details: errorData,
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
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
          console.warn('Failed to send thank you email, but notification was sent');
        }
      } catch (error) {
        console.warn('Exception sending thank you email:', error);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Ghoster report submitted successfully',
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing ghoster report:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        details: error.message || 'Unknown error',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Handle API routes before serving static assets
    if (url.pathname === '/api/submit' && request.method === 'POST') {
      return handleSubmitForm(request, env);
    }
    
    if (url.pathname === '/api/submit' && request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders,
      });
    }
    
    if (url.pathname === '/api/ghosters' && request.method === 'POST') {
      return handleGhostersForm(request, env);
    }
    
    if (url.pathname === '/api/ghosters' && request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders,
      });
    }
    
    // Serve static assets for all other requests
    try {
      return await env.ASSETS.fetch(request);
    } catch (error) {
      return new Response('Not Found', { status: 404 });
    }
  },
};

