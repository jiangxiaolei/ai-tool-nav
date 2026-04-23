# Deployment Guide

## Push to GitHub

### Option 1: Using GitHub CLI (Recommended)

```bash
# Install GitHub CLI if not already installed
# Ubuntu/Debian
sudo apt update && sudo apt install gh

# Authenticate
gh auth login

# Create new repository
gh repo create ai-tool-nav --public --source=. --remote=origin --push
```

### Option 2: Using Git Directly

```bash
# Create a new repository on GitHub.com (manually or via API)
# Then add the remote and push

git remote add origin https://github.com/YOUR_USERNAME/ai-tool-nav.git
git branch -M main
git push -u origin main
```

### Option 3: Using GitHub API

```bash
# Create repository via API (requires GitHub token)
curl -X POST \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/user/repos \
  -d '{"name":"ai-tool-nav","description":"AI Tools Discovery Platform","private":false}'

# Then push
git remote add origin https://github.com/YOUR_USERNAME/ai-tool-nav.git
git push -u origin main
```

## Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Or connect your GitHub repo at [vercel.com](https://vercel.com)

## Deploy to Other Platforms

### Netlify
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next` or use Next.js plugin

### Railway
1. Connect GitHub repository
2. Auto-detects Next.js
3. Deploys automatically

## Environment Variables

No environment variables required for basic deployment. The app uses static JSON data.

For future enhancements (if adding API routes):
- `NEXT_PUBLIC_API_URL` - Backend API URL
- `DATABASE_URL` - Database connection string

## Performance Tips

- Enable compression
- Use CDN for static assets
- Enable ISR for dynamic pages
- Configure proper caching headers
