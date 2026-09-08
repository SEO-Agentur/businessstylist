/*
# Create discount_codes table and add START code

1. New table
- `discount_codes` stores coupon/gift codes with fixed or percent discounts.
- Columns: code, description, discount_type (fixed/percent), discount_value_cents, discount_percent, applies_to_product_ids, active, valid_from, valid_until, max_redemptions, redemptions.

2. Initial data
- Code START: 70 € fixed discount on the "stilberatung" product, valid until 2026-09-30.

3. Security
- RLS enabled.
- Public (anon, authenticated) can SELECT active discount codes so the frontend can validate them.
- Only service role can INSERT/UPDATE/DELETE (server-side checkout route uses the admin client).
*/

CREATE TABLE IF NOT EXISTS discount_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL,
  description text,
  discount_type text NOT NULL DEFAULT 'fixed',
  discount_value_cents integer NOT NULL DEFAULT 0,
  discount_percent numeric(5,2) NOT NULL DEFAULT 0,
  applies_to_product_ids text[] NOT NULL DEFAULT '{}',
  active boolean NOT NULL DEFAULT true,
  valid_from timestamptz,
  valid_until timestamptz,
  max_redemptions integer,
  redemptions integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_discount_codes_code_upper ON discount_codes (upper(code));

ALTER TABLE discount_codes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read active discount codes" ON discount_codes;
CREATE POLICY "Public can read active discount codes" ON discount_codes FOR SELECT
  TO anon, authenticated USING (active = true);

INSERT INTO discount_codes (code, description, discount_type, discount_value_cents, discount_percent, applies_to_product_ids, active, valid_from, valid_until, max_redemptions, redemptions)
VALUES (
  'START',
  'Start-Rabatt: 70 € auf den Business Style Check (nur bis 30.09.2026)',
  'fixed',
  7000,
  0,
  ARRAY['stilberatung'],
  true,
  '2026-01-01T00:00:00Z',
  '2026-09-30T23:59:59Z',
  100,
  0
)
ON CONFLICT DO NOTHING;