CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON public.invoices (user_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_parent_id ON public.menu_items (parent_id);
CREATE INDEX IF NOT EXISTS idx_messages_to_user_id ON public.messages (to_user_id);
CREATE INDEX IF NOT EXISTS idx_orders_product_id ON public.orders (product_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders (user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_user_id ON public.quiz_results (user_id);
CREATE INDEX IF NOT EXISTS idx_user_lookbooks_lookbook_id ON public.user_lookbooks (lookbook_id);

DROP INDEX IF EXISTS public.menu_items_position_order_idx;

DROP POLICY IF EXISTS "Users can read own data" ON public.users;
CREATE POLICY "Users can read own data"
  ON public.users FOR SELECT TO authenticated
  USING ((select auth.uid())::text = id);

DROP POLICY IF EXISTS "Users can update own data" ON public.users;
CREATE POLICY "Users can update own data"
  ON public.users FOR UPDATE TO authenticated
  USING ((select auth.uid())::text = id)
  WITH CHECK ((select auth.uid())::text = id);

DROP POLICY IF EXISTS "Allow public user registration" ON public.users;
CREATE POLICY "Allow public user registration"
  ON public.users FOR INSERT TO anon
  WITH CHECK (id IS NOT NULL);

DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT TO authenticated
  USING ((select auth.uid())::text = user_id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE TO authenticated
  USING ((select auth.uid())::text = user_id)
  WITH CHECK ((select auth.uid())::text = user_id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT TO authenticated
  WITH CHECK ((select auth.uid())::text = user_id);

DROP POLICY IF EXISTS "Users can read own orders" ON public.orders;
CREATE POLICY "Users can read own orders"
  ON public.orders FOR SELECT TO authenticated
  USING ((select auth.uid())::text = user_id);

DROP POLICY IF EXISTS "Users can create own orders" ON public.orders;
CREATE POLICY "Users can create own orders"
  ON public.orders FOR INSERT TO authenticated
  WITH CHECK ((select auth.uid())::text = user_id);

DROP POLICY IF EXISTS "Users can read own invoices" ON public.invoices;
CREATE POLICY "Users can read own invoices"
  ON public.invoices FOR SELECT TO authenticated
  USING ((select auth.uid())::text = user_id);

DROP POLICY IF EXISTS "Users can read own lookbook assignments" ON public.user_lookbooks;
CREATE POLICY "Users can read own lookbook assignments"
  ON public.user_lookbooks FOR SELECT TO authenticated
  USING ((select auth.uid())::text = user_id);

DROP POLICY IF EXISTS "Users can read own quiz results" ON public.quiz_results;
CREATE POLICY "Users can read own quiz results"
  ON public.quiz_results FOR SELECT TO authenticated
  USING ((select auth.uid())::text = user_id);

DROP POLICY IF EXISTS "Anyone can create quiz results" ON public.quiz_results;
CREATE POLICY "Anyone can create quiz results"
  ON public.quiz_results FOR INSERT TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Users can read own messages" ON public.messages;
CREATE POLICY "Users can read own messages"
  ON public.messages FOR SELECT TO authenticated
  USING ((select auth.uid())::text = to_user_id);

DROP POLICY IF EXISTS "Users can update own messages" ON public.messages;
CREATE POLICY "Users can update own messages"
  ON public.messages FOR UPDATE TO authenticated
  USING ((select auth.uid())::text = to_user_id)
  WITH CHECK ((select auth.uid())::text = to_user_id);

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;