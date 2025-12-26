# Blog Public Frontend

A React-based blog reader frontend for public viewing of author posts.

## Deployment Instructions

### Vercel Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will automatically detect the Vite configuration

3. **Set Environment Variable**
   - Go to project settings in Vercel
   - Navigate to Environment Variables
   - Add: `VITE_API_BASE_URL` = `https://blog-api-backend-three.vercel.app/api`
   - Redeploy the project

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

3. Set your API URL in `.env`:
   ```
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

### Build for Production

```bash
npm run build
```

The output will be in the `dist/` directory.

## Features

- Public viewing of author blogs
- Comment functionality for logged-in readers
- Author listing page
- Responsive design
- Authentication (login/signup)