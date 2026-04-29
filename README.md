# Tiomila Export

A simple static website that displays data from an Excel file hosted on OneDrive. The data is fetched live on every page load, so any changes made to the Excel file are immediately visible after a browser refresh.

## How it works

1. A **Cloudflare Worker** (free) acts as a CORS proxy to fetch the Excel file from OneDrive
2. **GitHub Pages** hosts a single HTML page that calls the worker, parses the Excel file with SheetJS, and renders all sheets as tabbed tables

## Setup

### Step 1: Deploy the Cloudflare Worker

1. Create a free account at [workers.cloudflare.com](https://workers.cloudflare.com)
2. In the Cloudflare dashboard, go to **Workers & Pages** → **Create Worker**
3. Name it something like `tiomila-proxy`
4. Replace the default code with the contents of `cloudflare-worker/worker.js`
5. Click **Deploy**
6. Note your worker URL (e.g., `https://tiomila-proxy.your-subdomain.workers.dev`)

### Step 2: Configure the site

1. Open `index.html`
2. Find the line: `const WORKER_URL = 'https://your-worker.your-subdomain.workers.dev';`
3. Replace it with your actual Cloudflare Worker URL from Step 1

### Step 3: Enable GitHub Pages

1. Go to your repository **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Choose `main` branch and `/ (root)` folder
4. Click **Save**
5. Your site will be live at `https://masseponken.github.io/tiomilaexport/`

## Updating the Excel file

Simply edit the Excel file on OneDrive as usual. The next time anyone loads or refreshes the web page, they will see the updated data. No redeployment needed.
