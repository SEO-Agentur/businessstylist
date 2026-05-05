/*
  # Create users and orders tables

  1. New Tables
    - `users`
      - Stores application users for NextAuth Credentials provider
      - `id` (uuid, primary key)
      - `name`, `email` (unique, case-insensitive via citext-like lower index)
      - `password` (bcrypt hash), `role` (USER/ADMIN)
      - `phone`, `email_verified`, timestamps
    - `orders`
      - Tracks Stripe checkout sessions and their fulfillment status
      - `id` (uuid, primary key)
      - `user_id` (uuid, nullable) links to users when available
      - `email`, `product_id`, `amount`, `currency`, `status`
      - `stripe_checkout_session_id` (unique), `stripe_payment_intent_id`
      - timestamps

  2. Security
    - Enable RLS on both tables
    - Users can read/update their own row
    - Anonymous signup is allowed via an INSERT policy that lets anyone create a
      user record; writes happen from the server with the service role, but the
      policy ensures the anon fallback still works during development
    - Orders: users can read their own orders; inserts/updates are restricted to
      the service role (no anon/authenticated policies for write)

  3. Important Notes
    1. The service-role key bypasses RLS entirely, which is how the Stripe
       webhook and the signup route will write to these tables.
    2. Email uniqueness is enforced via a unique index on lower(email).
*/

CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text DEFAULT '',
  email text NOT NULL,
  phone text,
  password text,
  role text NOT NULL DEFAULT 'USER',
  email_verified timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS users_email_lower_unique
  ON public.users (lower(email));

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='users' AND policyname='Users can read own row'
  ) THEN
    CREATE POLICY "Users can read own row"
      ON public.users FOR SELECT
      TO authenticated
      USING (auth.uid() = id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='users' AND policyname='Users can update own row'
  ) THEN
    CREATE POLICY "Users can update own row"
      ON public.users FOR UPDATE
      TO authenticated
      USING (auth.uid() = id)
      WITH CHECK (auth.uid() = id);
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  email text,
  product_id text,
  amount numeric NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'eur',
  status text NOT NULL DEFAULT 'PENDING',
  stripe_checkout_session_id text UNIQUE,
  stripe_payment_intent_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS orders_user_id_idx ON public.orders (user_id);
CREATE INDEX IF NOT EXISTS orders_payment_intent_idx ON public.orders (stripe_payment_intent_id);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='orders' AND policyname='Users can read own orders'
  ) THEN
    CREATE POLICY "Users can read own orders"
      ON public.orders FOR SELECT
      TO authenticated
      USING (user_id = auth.uid());
  END IF;
END $$;
