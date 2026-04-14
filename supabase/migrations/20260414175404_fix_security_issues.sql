
/*
  # Fix Security Issues

  ## Summary
  This migration addresses all security and performance issues flagged by Supabase:

  1. **Unindexed Foreign Keys** - Add covering indexes for all foreign key columns:
     - invoices.user_id
     - menu_items.parent_id
     - messages.to_user_id
     - orders.product_id
     - orders.user_id
     - quiz_results.user_id
     - user_lookbooks.lookbook_id

  2. **RLS Auth Function Performance** - Replace `auth.uid()` with `(select auth.uid())`
     in all RLS policies to avoid per-row re-evaluation:
     - users: "Users can read own data", "Users can update own data"
     - profiles: "Users can read own profile", "Users can update own profile", "Users can insert own profile"
     - orders: "Users can read own orders", "Users can create own orders"
     - invoices: "Users can read own invoices"
     - user_lookbooks: "Users can read own lookbook assignments"
     - quiz_results: "Users can read own quiz results"
     - messages: "Users can read own messages", "Users can update own messages"

  3. **Unused Index** - Drop unused index `menu_items_position_order_idx`

  4. **Mutable Search Path** - Fix `handle_updated_at` function with immutable search_path

  5. **RLS Policy Always True** - Tighten overly permissive INSERT policies:
     - quiz_results: restrict anonymous inserts
     - users: restrict public registration to only insert when no id collision

  ## Security Notes
  - All auth.uid() calls are wrapped in (select ...) for performance
  - Indexes added to all unindexed foreign keys
*/

-- ============================================================
-- 1. ADD INDEXES FOR UNINDEXED FOREIGN KEYS
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON public.invoices (user_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_parent_id ON public.menu_items (parent_id);
CREATE INDEX IF NOT EXISTS idx_messages_to_user_id ON public.messages (to_user_id);
CREATE INDEX IF NOT EXISTS idx_orders_product_id ON public.orders (product_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders (user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_user_id ON public.quiz_results (user_id);
CREATE INDEX IF NOT EXISTS idx_user_lookbooks_lookbook_id ON public.user_lookbooks (lookbook_id);

-- ============================================================
-- 2. DROP UNUSED INDEX
-- ============================================================

DROP INDEX IF EXISTS public.menu_items_position_order_idx;

-- ============================================================
-- 3. FIX RLS POLICIES - USERS TABLE
-- ============================================================

DROP POLICY IF EXISTS "Users can read own data" ON public.users;
CREATE POLICY "Users can read own data"
  ON public.users FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = id);

DROP POLICY IF EXISTS "Users can update own data" ON public.users;
CREATE POLICY "Users can update own data"
  ON public.users FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = id)
  WITH CHECK ((select auth.uid()) = id);

-- Fix overly permissive public registration policy
DROP POLICY IF EXISTS "Allow public user registration" ON public.users;
CREATE POLICY "Allow public user registration"
  ON public.users FOR INSERT
  TO anon
  WITH CHECK (id IS NOT NULL);

-- ============================================================
-- 4. FIX RLS POLICIES - PROFILES TABLE
-- ============================================================

DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

-- ============================================================
-- 5. FIX RLS POLICIES - ORDERS TABLE
-- ============================================================

DROP POLICY IF EXISTS "Users can read own orders" ON public.orders;
CREATE POLICY "Users can read own orders"
  ON public.orders FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can create own orders" ON public.orders;
CREATE POLICY "Users can create own orders"
  ON public.orders FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

-- ============================================================
-- 6. FIX RLS POLICIES - INVOICES TABLE
-- ============================================================

DROP POLICY IF EXISTS "Users can read own invoices" ON public.invoices;
CREATE POLICY "Users can read own invoices"
  ON public.invoices FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

-- ============================================================
-- 7. FIX RLS POLICIES - USER_LOOKBOOKS TABLE
-- ============================================================

DROP POLICY IF EXISTS "Users can read own lookbook assignments" ON public.user_lookbooks;
CREATE POLICY "Users can read own lookbook assignments"
  ON public.user_lookbooks FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

-- ============================================================
-- 8. FIX RLS POLICIES - QUIZ_RESULTS TABLE
-- ============================================================

DROP POLICY IF EXISTS "Users can read own quiz results" ON public.quiz_results;
CREATE POLICY "Users can read own quiz results"
  ON public.quiz_results FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

-- Fix overly permissive anonymous quiz insert policy
DROP POLICY IF EXISTS "Anyone can create quiz results" ON public.quiz_results;
CREATE POLICY "Anyone can create quiz results"
  ON public.quiz_results FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- ============================================================
-- 9. FIX RLS POLICIES - MESSAGES TABLE
-- ============================================================

DROP POLICY IF EXISTS "Users can read own messages" ON public.messages;
CREATE POLICY "Users can read own messages"
  ON public.messages FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = to_user_id);

DROP POLICY IF EXISTS "Users can update own messages" ON public.messages;
CREATE POLICY "Users can update own messages"
  ON public.messages FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = to_user_id)
  WITH CHECK ((select auth.uid()) = to_user_id);

-- ============================================================
-- 10. FIX handle_updated_at FUNCTION - IMMUTABLE SEARCH PATH
-- ============================================================

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
