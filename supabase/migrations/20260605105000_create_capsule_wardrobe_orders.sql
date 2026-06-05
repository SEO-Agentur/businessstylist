CREATE TABLE IF NOT EXISTS capsule_wardrobe_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  name text NOT NULL,
  stripe_session_id text,
  status text NOT NULL DEFAULT 'pending',
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE capsule_wardrobe_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_full_access_capsule_wardrobe" ON capsule_wardrobe_orders
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "select_own_capsule_wardrobe" ON capsule_wardrobe_orders
  FOR SELECT TO authenticated USING (email = current_setting('request.jwt.claims', true)::jsonb->>'email');

CREATE INDEX idx_capsule_wardrobe_orders_email ON capsule_wardrobe_orders (email);
CREATE INDEX idx_capsule_wardrobe_orders_stripe ON capsule_wardrobe_orders (stripe_session_id);
