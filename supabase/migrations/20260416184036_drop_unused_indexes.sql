/*
  # Drop Unused Indexes

  ## Summary
  Remove seven indexes that have never been used in queries.
  Unused indexes waste storage and slow down write operations
  (INSERT/UPDATE/DELETE) with no read benefit.

  ## Indexes Removed
  - `idx_user_lookbooks_lookbook_id` on `public.user_lookbooks (lookbook_id)`
  - `idx_invoices_user_id` on `public.invoices (user_id)`
  - `idx_menu_items_parent_id` on `public.menu_items (parent_id)`
  - `idx_messages_to_user_id` on `public.messages (to_user_id)`
  - `idx_orders_product_id` on `public.orders (product_id)`
  - `idx_orders_user_id` on `public.orders (user_id)`
  - `idx_quiz_results_user_id` on `public.quiz_results (user_id)`
*/

DROP INDEX IF EXISTS public.idx_user_lookbooks_lookbook_id;
DROP INDEX IF EXISTS public.idx_invoices_user_id;
DROP INDEX IF EXISTS public.idx_menu_items_parent_id;
DROP INDEX IF EXISTS public.idx_messages_to_user_id;
DROP INDEX IF EXISTS public.idx_orders_product_id;
DROP INDEX IF EXISTS public.idx_orders_user_id;
DROP INDEX IF EXISTS public.idx_quiz_results_user_id;
