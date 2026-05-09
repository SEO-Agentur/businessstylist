DROP TABLE IF EXISTS invoices CASCADE;

CREATE TABLE invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number text UNIQUE NOT NULL,
  email text NOT NULL,
  customer_name text DEFAULT '',
  product_name text NOT NULL,
  product_description text DEFAULT '',
  amount_cents integer NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'eur',
  tax_rate numeric(5,2) NOT NULL DEFAULT 19,
  stripe_session_id text UNIQUE,
  stripe_payment_intent_id text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  sent_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE SEQUENCE IF NOT EXISTS invoice_number_seq START 1000;

CREATE INDEX IF NOT EXISTS idx_invoices_email ON invoices(email);
CREATE INDEX IF NOT EXISTS idx_invoices_stripe_session ON invoices(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_invoices_created_at ON invoices(created_at DESC);

ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view own invoices"
  ON invoices FOR SELECT TO authenticated
  USING (email = (auth.jwt() ->> 'email'));
