CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON public.invoices (user_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_parent_id ON public.menu_items (parent_id);
CREATE INDEX IF NOT EXISTS idx_messages_to_user_id ON public.messages (to_user_id);
CREATE INDEX IF NOT EXISTS idx_orders_product_id ON public.orders (product_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders (user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_user_id ON public.quiz_results (user_id);
CREATE INDEX IF NOT EXISTS idx_user_lookbooks_lookbook_id ON public.user_lookbooks (lookbook_id);

DROP POLICY IF EXISTS "Authenticated users can insert own quiz results" ON public.quiz_results;
CREATE POLICY "Authenticated users can insert own quiz results"
  ON public.quiz_results FOR INSERT TO authenticated
  WITH CHECK ((select auth.uid())::text = user_id);

DROP POLICY IF EXISTS "Service role can manage lookbook purchases" ON public.lookbook_purchases;
CREATE POLICY "Service role can manage lookbook purchases"
  ON public.lookbook_purchases FOR INSERT TO authenticated
  WITH CHECK ((select auth.uid()) IS NOT NULL);

DROP INDEX IF EXISTS public.kibbe_subscribers_email_idx;
DROP INDEX IF EXISTS public.kibbe_subscribers_kibbe_type_idx;
DROP INDEX IF EXISTS public.consent_logs_email_hash_idx;
DROP INDEX IF EXISTS public.idx_lookbook_purchases_kibbe_type;
DROP INDEX IF EXISTS public.idx_lookbook_purchases_status;
DROP INDEX IF EXISTS public.idx_lookbook_purchases_created_at;