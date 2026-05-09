CREATE OR REPLACE FUNCTION public.next_invoice_number()
RETURNS text LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE nextval_int bigint;
BEGIN
  nextval_int := nextval('invoice_number_seq');
  RETURN 'R-' || to_char(now(), 'YYYY') || '-' || lpad(nextval_int::text, 5, '0');
END;
$$;
REVOKE ALL ON FUNCTION public.next_invoice_number() FROM public;
GRANT EXECUTE ON FUNCTION public.next_invoice_number() TO service_role;

CREATE TABLE IF NOT EXISTS discount_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  description text DEFAULT '',
  discount_type text NOT NULL DEFAULT 'fixed',
  discount_value_cents integer NOT NULL DEFAULT 0,
  discount_percent numeric(5,2) NOT NULL DEFAULT 0,
  applies_to_product_ids text[] NOT NULL DEFAULT '{}'::text[],
  active boolean NOT NULL DEFAULT true,
  valid_from timestamptz,
  valid_until timestamptz,
  max_redemptions integer,
  redemptions integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_discount_codes_code_upper ON discount_codes (upper(code));
ALTER TABLE discount_codes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read active discount codes" ON discount_codes;
CREATE POLICY "Public can read active discount codes" ON discount_codes FOR SELECT TO anon, authenticated
  USING (active = true
    AND (valid_from IS NULL OR valid_from <= now())
    AND (valid_until IS NULL OR valid_until >= now())
    AND (max_redemptions IS NULL OR redemptions < max_redemptions));
INSERT INTO discount_codes (code, description, discount_type, discount_value_cents, applies_to_product_ids, active)
VALUES ('TEST50', 'Rabatt 50 Euro auf die Einzel-Stilberatung', 'fixed', 5000, ARRAY['stilberatung-single'], true)
ON CONFLICT (code) DO NOTHING;

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  subject text NOT NULL DEFAULT '',
  message text NOT NULL,
  ip_address text DEFAULT '',
  user_agent text DEFAULT '',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can submit a contact message" ON contact_messages;
CREATE POLICY "Anyone can submit a contact message" ON contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE TABLE IF NOT EXISTS public.email_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  to_address text NOT NULL,
  subject text NOT NULL,
  status text NOT NULL DEFAULT 'sent',
  provider text NOT NULL DEFAULT 'smtp',
  error_message text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS email_log_created_at_idx ON public.email_log (created_at DESC);
ALTER TABLE public.email_log ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  email text PRIMARY KEY,
  source text NOT NULL DEFAULT 'newsletter',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
