/*
  # Create newsletter_subscribers table

  1. New Tables
    - `newsletter_subscribers`
      - Stores email subscribers gathered via newsletter and lead-magnet forms
      - `email` (text, primary key, lowercased)
      - `source` (text) indicates which form/lead magnet generated the signup
      - `created_at` timestamp

  2. Security
    - RLS enabled
    - No public policies; writes happen exclusively via service role
*/

CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  email text PRIMARY KEY,
  source text NOT NULL DEFAULT 'newsletter',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
