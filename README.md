# Academy P&E — Website

A full-stack Next.js website for Academy of Progress & Establishment, with a working contact form, newsletter signup, email notifications, and Supabase database — deployable to Vercel in minutes.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **Email**: Resend
- **Deployment**: Vercel

---

## Local Development

### 1. Install dependencies
```bash
npm install
```

### 2. Set up Supabase

1. Go to [supabase.com](https://supabase.com) → Create a new project (free tier works)
2. Once created, go to **SQL Editor** → paste contents of `supabase-schema.sql` → Run
3. Go to **Settings → API** and copy:
   - **Project URL** → `SUPABASE_URL`
   - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Set up Resend

1. Go to [resend.com](https://resend.com) → Sign up (free tier: 3,000 emails/month)
2. Create an API key → copy it as `RESEND_API_KEY`
3. (Optional for production) Verify your sending domain under **Domains**

### 4. Create environment file
```bash
cp .env.local.example .env.local
```
Then fill in your values:
```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RESEND_API_KEY=re_your_key
ADMIN_EMAIL=you@yourdomain.com
ADMIN_PASSWORD=choose-a-strong-password
```

### 5. Run locally
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)

---

## Deploy to Vercel

### Option A — Vercel CLI (fastest)
```bash
npm i -g vercel
vercel
```
Follow prompts, then add env vars:
```bash
vercel env add SUPABASE_URL
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add RESEND_API_KEY
vercel env add ADMIN_EMAIL
vercel env add ADMIN_PASSWORD
```
Then deploy:
```bash
vercel --prod
```

### Option B — GitHub + Vercel Dashboard

1. Push this project to a GitHub repo:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/academy-pe.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your GitHub repo

3. Before deploying, click **Environment Variables** and add:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`

4. Click **Deploy** — done! 🎉

---

## Project Structure

```
academy-pe/
├── app/
│   ├── layout.tsx          # Root layout (fonts, metadata)
│   ├── globals.css         # Global styles + CSS variables
│   ├── page.tsx            # Home / landing page
│   ├── contact/
│   │   └── page.tsx        # Contact page
│   └── api/
│       ├── contact/
│       │   └── route.ts    # POST /api/contact
│       └── newsletter/
│           └── route.ts    # POST /api/newsletter
├── components/
│   ├── Navbar.tsx
│   └── Footer.tsx
├── lib/
│   └── supabase.ts         # Supabase client
├── supabase-schema.sql     # Run this in Supabase SQL editor
├── .env.local.example      # Copy to .env.local and fill in
└── next.config.mjs
```

## API Endpoints

### `POST /api/contact`
Saves the submission to Supabase and sends two emails: notification to admin, confirmation to user.

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 555 000 0000",
  "subject": "Digital Transformation",
  "message": "Hello..."
}
```

### `POST /api/newsletter`
Upserts email into `newsletter_subscribers` and sends a welcome email.

**Body:**
```json
{ "email": "john@example.com" }
```

---

## Customization

- **Colors**: Edit CSS variables in `app/globals.css` (`:root` block)
- **Contact info**: Update address/phone/email in `app/contact/page.tsx`
- **Email sender**: Update `from:` fields in the API routes (requires verified domain in Resend)
- **Admin email**: Set `ADMIN_EMAIL` environment variable
