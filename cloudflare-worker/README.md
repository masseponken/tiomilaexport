# Cloudflare Worker — OneDrive CORS Proxy

This worker fetches the Excel file from OneDrive and serves it with proper CORS headers so the GitHub Pages site can read it.

## Deployment Steps

1. Go to [workers.cloudflare.com](https://workers.cloudflare.com) and create a free account (or log in)
2. In the dashboard, go to **Workers & Pages** → **Create Worker**
3. Give it a name (e.g., `tiomila-proxy`)
4. Replace the default code with the contents of `worker.js` from this folder
5. Click **Deploy**
6. Your worker URL will be shown (e.g., `https://tiomila-proxy.your-subdomain.workers.dev`)
7. Copy this URL and update the `WORKER_URL` constant in `index.html`

## Free Tier Limits

Cloudflare Workers free tier allows **100,000 requests per day**, which is more than enough for this use case.
