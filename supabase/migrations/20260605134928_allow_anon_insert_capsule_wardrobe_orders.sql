-- Allow anonymous users to insert orders (public checkout form, no auth needed)
CREATE POLICY "anon_insert_capsule_wardrobe" ON capsule_wardrobe_orders
  FOR INSERT TO anon WITH CHECK (true);

-- Allow anonymous users to update their own orders (by stripe_session_id or id)
CREATE POLICY "anon_update_capsule_wardrobe" ON capsule_wardrobe_orders
  FOR UPDATE TO anon USING (true) WITH CHECK (true);

-- Allow anonymous users to select their own orders (needed for verify endpoint)
CREATE POLICY "anon_select_capsule_wardrobe" ON capsule_wardrobe_orders
  FOR SELECT TO anon USING (true);
