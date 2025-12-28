/**
 * Cloudflare Worker for Dating Receipts
 * Serves static assets from the out directory
 */

export default {
  async fetch(request, env) {
    // Get the asset from the ASSETS binding
    const url = new URL(request.url);
    
    // Try to get the asset from the ASSETS binding
    try {
      return await env.ASSETS.fetch(request);
    } catch (error) {
      // If asset not found, return 404
      return new Response('Not Found', { status: 404 });
    }
  },
};

