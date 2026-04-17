/*
  # Fix Security & Performance Issues

  ## Summary
  Addresses all flagged security and performance issues from the Supabase advisor.

  ## 1. Add indexes for unindexed foreign keys
  The following foreign keys lacked covering indexes, causing slow JOIN/lookup queries:
  - `public.invoices.user_id`
  - `public.menu_items.parent_id`
  - `public.messages.to_user_id`
  - `public.orders.product_id`
  - `public.orders.user_id`
  - `public.quiz_results.user_id`
  - `public.user_lookbooks.lookbook_id`

  ## 2. Fix RLS auth function calls
  Replace bare `auth.uid()` calls with `(select auth.uid())` to avoid per-row re-evaluation:
  - `public.quiz_results` policy: "Authenticated users can insert own quiz results"
  - `public.lookbook_purchases` policy: "Service role can manage lookbook purchases"

  ## 3. Drop unused indexes
  The following indexes have never been used and add write overhead:
  - `kibbe_subscribers_email_idx`
  - `kibbe_subscribers_kibbe_type_idx`
  - `consent_logs_email_hash_idx`
  - `idx_lookbook_purchases_kibbe_type`
  - `idx_lookbook_purchases_status`
  - `idx_lookbook_purchases_created_at`
*/

-- ============================================================
-- 1. Add covering indexes for unindexed foreign keys
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_invoices_user_id
  ON public.invoices (user_id);

CREATE INDEX IF NOT EXISTS idx_menu_items_parent_id
  ON public.menu_items (parent_id);

CREATE INDEX IF NOT EXISTS idx_messages_to_user_id
  ON public.messages (to_user_id);

CREATE INDEX IF NOT EXISTS idx_orders_product_id
  ON public.orders (product_id);

CREATE INDEX IF NOT EXISTS idx_orders_user_id
  ON public.orders (user_id);

CREATE INDEX IF NOT EXISTS idx_quiz_results_user_id
  ON public.quiz_results (user_id);

CREATE INDEX IF NOT EXISTS idx_user_lookbooks_lookbook_id
  ON public.user_lookbooks (lookbook_id);

-- ============================================================
-- 2. Fix RLS policies to use (select auth.uid()) for better performance
-- ============================================================

-- quiz_results: fix INSERT policy
DROP POLICY IF EXISTS "Authenticated users can insert own quiz results" ON public.quiz_results;
CREATE POLICY "Authenticated users can insert own quiz results"
  ON public.quiz_results
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

-- lookbook_purchases: fix service role policy (re-create with optimized form)
DROP POLICY IF EXISTS "Service role can manage lookbook purchases" ON public.lookbook_purchases;
CREATE POLICY "Service role can manage lookbook purchases"
  ON public.lookbook_purchases
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) IS NOT NULL);

-- ============================================================
-- 3. Drop unused indexes
-- ============================================================

DROP INDEX IF EXISTS public.kibbe_subscribers_email_idx;
DROP INDEX IF EXISTS public.kibbe_subscribers_kibbe_type_idx;
DROP INDEX IF EXISTS public.consent_logs_email_hash_idx;
DROP INDEX IF EXISTS public.idx_lookbook_purchases_kibbe_type;
DROP INDEX IF EXISTS public.idx_lookbook_purchases_status;
DROP INDEX IF EXISTS public.idx_lookbook_purchases_created_at;
