// Cloudflare Worker — CORS proxy for OneDrive Excel file
// Deploy this to Cloudflare Workers (free tier)

// OneDrive sharing link
const ONEDRIVE_SHARE_URL = 'https://1drv.ms/x/c/c36f54b46bb663f1/IQDsgilrgapiSaqwfWqe2P-DAUiSDowrmpmmy3qWaxWOy30?e=ln3QVS';

function shareUrlToDownloadUrl(shareUrl) {
  // Encode the sharing URL to base64url format for the OneDrive API
  const base64 = btoa(shareUrl)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  return `https://api.onedrive.com/v1.0/shares/u!${base64}/root/content`;
}

export default {
  async fetch(request) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': '*',
        },
      });
    }

    try {
      const downloadUrl = shareUrlToDownloadUrl(ONEDRIVE_SHARE_URL);
      const response = await fetch(downloadUrl, { redirect: 'follow' });

      if (!response.ok) {
        return new Response('Failed to fetch file from OneDrive', {
          status: response.status,
          headers: { 'Access-Control-Allow-Origin': '*' },
        });
      }

      const fileData = await response.arrayBuffer();

      return new Response(fileData, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
    } catch (err) {
      return new Response('Error: ' + err.message, {
        status: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
    }
  },
};
