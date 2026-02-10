# Cloudflare Pages Deployment Guide

This guide explains how to deploy your personal website to Cloudflare Pages using Wrangler CLI.

## Prerequisites

- Node.js and npm installed
- Cloudflare account (free tier works great!)
- Git repository (optional, for automatic deployments)

## Quick Start

### 1. Authenticate with Cloudflare

```bash
npx wrangler login
```

This will open your browser for OAuth authentication. Grant access to continue.

### 2. Create Cloudflare Pages Project (First Time Only)

```bash
npx wrangler pages project create personal-website
```

When prompted:
- **Project name:** `personal-website` (or your preferred name)
- **Production branch:** `main`

### 3. Build and Deploy

```bash
# Build the site
npm run build

# Deploy to Cloudflare Pages
npm run deploy
```

Or do both in one command:

```bash
npm run deploy:prod
```

Your site will be live at: `https://personal-website-xxx.pages.dev`

## Deployment Scripts

### `npm run deploy`
Deploys the pre-built `dist/` folder to Cloudflare Pages as a preview deployment.

**Use when:** You want to test changes on Cloudflare's infrastructure before production.

### `npm run deploy:prod`
Builds the site (`npm run build`) and deploys to production (main branch).

**Use when:** You're ready to push changes to production.

### `npm run pages:dev`
Runs the site locally using Cloudflare Workers environment on port 8788.

**Use when:** You want to test how the site will behave on Cloudflare's edge before deploying.

```bash
npm run build
npm run pages:dev
# Visit http://localhost:8788
```

## Custom Domain Setup

### 1. Deploy Your Site First

Make sure your site is deployed and accessible at the Cloudflare Pages URL.

### 2. Add Custom Domain

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** → **personal-website**
3. Click **Custom domains** tab
4. Click **Set up a custom domain**
5. Enter `www.gauravkumarkarki.com`
6. Follow the DNS configuration instructions

### 3. DNS Configuration

If your domain is on Cloudflare:
- A CNAME record will be automatically created

If your domain is elsewhere:
- Add a CNAME record:
  - **Name:** `www`
  - **Value:** `personal-website-xxx.pages.dev`
  - **TTL:** Auto or 3600

### 4. SSL/TLS

SSL certificates are automatically provisioned by Cloudflare. Your site will be available at:
- ✅ `https://www.gauravkumarkarki.com`

## Automatic Deployments (Optional)

For automatic deployments on every git push:

### 1. Connect Git Repository

1. Go to Cloudflare Dashboard → Pages
2. Click **Create a project**
3. Connect your Git provider (GitHub, GitLab, Bitbucket)
4. Select your repository
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (or leave empty)

### 2. Benefits

- Every push to `main` triggers a production deployment
- Pull requests get preview deployments
- Automatic build logs and deployment history
- Easy rollback to previous versions

## Project Configuration

### `wrangler.toml`

```toml
name = "personal-website"
compatibility_date = "2024-01-01"
pages_build_output_dir = "./dist"

[site]
bucket = "./dist"
```

- **name:** Your project identifier
- **pages_build_output_dir:** Where Astro builds the site
- **bucket:** Directory containing static assets

## Troubleshooting

### Build Fails

**Problem:** Build works locally but fails on Cloudflare

**Solution:**
1. Check Node.js version compatibility (use LTS version)
2. Ensure all dependencies are in `package.json`
3. Verify build command is `npm run build`

### 404 Errors

**Problem:** Pages show 404 after deployment

**Solution:**
1. Run `npm run build` locally and check `dist/` structure
2. Verify all dynamic routes are built (e.g., `dist/blog/building-with-astro/index.html`)
3. Clear Cloudflare cache in dashboard

### Missing Assets

**Problem:** Images or resume PDF not loading

**Solution:**
1. Ensure files are in `/public/` directory (not `/src/assets/`)
2. Use absolute paths: `/resume.pdf` (not `./resume.pdf`)
3. Check browser console for 404 errors
4. Verify files exist in deployed `dist/` folder

### Custom Domain Not Working

**Problem:** Domain shows error or doesn't resolve

**Solution:**
1. Verify DNS records are correct (CNAME to Pages URL)
2. Wait for DNS propagation (up to 48 hours)
3. Check SSL certificate status in Cloudflare Dashboard
4. Ensure domain is added to Pages project

## Performance

Cloudflare Pages provides:
- ✅ Global CDN (200+ locations)
- ✅ Automatic HTTPS
- ✅ HTTP/2 & HTTP/3
- ✅ Automatic compression (Gzip/Brotli)
- ✅ DDoS protection
- ✅ Edge caching

Your site already benefits from:
- Static site generation (no server processing)
- Optimized images (Sharp)
- Minimal JavaScript (<20KB)
- Efficient CSS

Expected Lighthouse scores: **95+** across all metrics

## Cost

**Cloudflare Pages Free Tier:**
- ✅ Unlimited sites
- ✅ Unlimited requests
- ✅ Unlimited bandwidth
- ✅ 500 builds/month
- ✅ 1 concurrent build

**Perfect for a personal website!** The free tier is more than sufficient.

## Support

### Useful Commands

```bash
# Check Wrangler version
npx wrangler --version

# Check authentication status
npx wrangler whoami

# List Pages projects
npx wrangler pages project list

# View deployment logs
# (in Cloudflare Dashboard → Pages → Deployments)
```

### Documentation

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)
- [Astro Deployment Guide](https://docs.astro.build/en/guides/deploy/)

## Next Steps

1. ✅ Wrangler installed and configured
2. 🔲 Authenticate: `npx wrangler login`
3. 🔲 Create project: `npx wrangler pages project create`
4. 🔲 Deploy: `npm run deploy:prod`
5. 🔲 Configure custom domain
6. 🔲 (Optional) Set up Git integration for auto-deployments

Your modern, interactive personal website is ready to go live! 🚀
