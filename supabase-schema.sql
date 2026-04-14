-- Run this in your Supabase SQL editor (Dashboard → SQL Editor → New Query)

-- Contact form submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  phone      TEXT,
  subject    TEXT NOT NULL DEFAULT 'General Inquiry',
  message    TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for faster queries by email and date
CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_submissions(created_at DESC);

-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Disable Row Level Security for service role access (backend only)
-- These tables are only accessed server-side via the service role key
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (your backend uses this)
CREATE POLICY "Service role full access - contacts"
  ON contact_submissions FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access - newsletter"
  ON newsletter_subscribers FOR ALL
  USING (auth.role() = 'service_role');
