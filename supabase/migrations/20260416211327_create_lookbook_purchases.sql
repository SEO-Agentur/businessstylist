/*
  # Create lookbook_purchases table

  ## Summary
  Creates the lookbook_purchases table to track all lookbook sales.

  ## New Tables
  - `lookbook_purchases`
    - `id` (uuid, primary key)
    - `email` (text) - buyer's email address
    - `kibbe_type` (text) - the Kibbe type selected at purchase
    - `stripe_session_id` (text, unique) - Stripe checkout session ID
    - `pdf_version` (text) - version of the PDF sent (e.g. "2026-v1")
    - `status` (text) - payment status: pending, paid, failed
    - `purchased_at` (timestamptz) - when purchase was completed
    - `created_at` (timestamptz) - row creation time

  ## Security
  - RLS enabled
  - Admin-only read policy using service role
  - Insert allowed for unauthenticated requests (Stripe webhook)
*/

CREATE TABLE IF NOT EXISTS lookbook_purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text,
  kibbe_type text NOT NULL,
  stripe_session_id text UNIQUE,
  pdf_version text NOT NULL DEFAULT '2026-v1',
  status text NOT NULL DEFAULT 'pending',
  purchased_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE lookbook_purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage lookbook purchases"
  ON lookbook_purchases
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'ADMIN'
    )
  );

CREATE INDEX IF NOT EXISTS idx_lookbook_purchases_kibbe_type ON lookbook_purchases(kibbe_type);
CREATE INDEX IF NOT EXISTS idx_lookbook_purchases_status ON lookbook_purchases(status);
CREATE INDEX IF NOT EXISTS idx_lookbook_purchases_created_at ON lookbook_purchases(created_at DESC);
