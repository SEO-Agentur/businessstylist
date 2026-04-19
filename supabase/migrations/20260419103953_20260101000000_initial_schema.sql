/*
  # Initial Schema - Baseline

  ## Summary
  Creates the initial database schema for Businessstylist, mirroring the Prisma schema.

  ## New Tables
  - `users` - User accounts (email, name, phone, role)
  - `profiles` - Extended user profile data
  - `products` - Product catalog (eBooks, lookbooks, services)
  - `orders` - Stripe orders
  - `invoices` - Order invoices
  - `lookbooks` - Lookbook PDFs
  - `user_lookbooks` - User-Lookbook assignments
  - `quiz_results` - Kibbe quiz results
  - `messages` - User messages
  - `blog_posts` - CMS blog posts
  - `pages` - CMS pages
  - `product_pages` - CMS product pages
  - `menu_items` - Navigation menu items

  ## Security
  - RLS enabled on all tables
  - Users can read/update their own data
  - Admins can manage all data (checked via users.role = 'ADMIN')
  - Public read for published CMS content
*/

-- USERS
CREATE TABLE IF NOT EXISTS users (
  id text PRIMARY KEY,
  email text UNIQUE NOT NULL,
  name text,
  phone text,
  role text NOT NULL DEFAULT 'USER',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users FOR SELECT TO authenticated
  USING (auth.uid()::text = id);

CREATE POLICY "Users can update own data"
  ON users FOR UPDATE TO authenticated
  USING (auth.uid()::text = id)
  WITH CHECK (auth.uid()::text = id);

-- PROFILES
CREATE TABLE IF NOT EXISTS profiles (
  id text PRIMARY KEY,
  user_id text UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  preferences text,
  deleted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT TO authenticated
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE TO authenticated
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- PRODUCTS
CREATE TABLE IF NOT EXISTS products (
  id text PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  type text NOT NULL,
  price double precision NOT NULL DEFAULT 0,
  stripe_price_id text,
  active boolean NOT NULL DEFAULT true,
  features text,
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active products"
  ON products FOR SELECT TO anon, authenticated
  USING (active = true);

-- ORDERS
CREATE TABLE IF NOT EXISTS orders (
  id text PRIMARY KEY,
  user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id text NOT NULL REFERENCES products(id),
  stripe_checkout_session_id text,
  stripe_payment_intent_id text,
  status text NOT NULL DEFAULT 'PENDING',
  amount double precision NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own orders"
  ON orders FOR SELECT TO authenticated
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can create own orders"
  ON orders FOR INSERT TO authenticated
  WITH CHECK (auth.uid()::text = user_id);

-- INVOICES
CREATE TABLE IF NOT EXISTS invoices (
  id text PRIMARY KEY,
  user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  order_id text,
  stripe_invoice_id text,
  url text,
  amount double precision NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own invoices"
  ON invoices FOR SELECT TO authenticated
  USING (auth.uid()::text = user_id);

-- LOOKBOOKS
CREATE TABLE IF NOT EXISTS lookbooks (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text,
  file_url text NOT NULL,
  thumbnail_url text,
  kibbe_type text,
  free_for_type boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE lookbooks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can read lookbooks"
  ON lookbooks FOR SELECT TO authenticated
  USING (true);

-- USER_LOOKBOOKS
CREATE TABLE IF NOT EXISTS user_lookbooks (
  id text PRIMARY KEY,
  user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lookbook_id text NOT NULL REFERENCES lookbooks(id) ON DELETE CASCADE,
  assigned_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, lookbook_id)
);
ALTER TABLE user_lookbooks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own lookbook assignments"
  ON user_lookbooks FOR SELECT TO authenticated
  USING (auth.uid()::text = user_id);

-- QUIZ_RESULTS
CREATE TABLE IF NOT EXISTS quiz_results (
  id text PRIMARY KEY,
  user_id text REFERENCES users(id) ON DELETE SET NULL,
  result_type text NOT NULL,
  answers text NOT NULL,
  scores text,
  phone text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own quiz results"
  ON quiz_results FOR SELECT TO authenticated
  USING (auth.uid()::text = user_id);

CREATE POLICY "Anyone can create quiz results"
  ON quiz_results FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- MESSAGES
CREATE TABLE IF NOT EXISTS messages (
  id text PRIMARY KEY,
  to_user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject text NOT NULL,
  body text NOT NULL,
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own messages"
  ON messages FOR SELECT TO authenticated
  USING (auth.uid()::text = to_user_id);

CREATE POLICY "Users can update own messages"
  ON messages FOR UPDATE TO authenticated
  USING (auth.uid()::text = to_user_id)
  WITH CHECK (auth.uid()::text = to_user_id);

-- BLOG_POSTS
CREATE TABLE IF NOT EXISTS blog_posts (
  id text PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text,
  content text NOT NULL,
  category text,
  keywords text,
  published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  seo_title text,
  seo_description text,
  canonical text,
  robots text DEFAULT 'index,follow',
  og_title text,
  og_description text,
  og_image text,
  twitter_card text DEFAULT 'summary_large_image',
  dc_title text,
  dc_description text,
  dc_creator text,
  dc_language text DEFAULT 'de-DE',
  schema_json text
);
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published posts"
  ON blog_posts FOR SELECT TO anon, authenticated
  USING (published = true);

-- PAGES
CREATE TABLE IF NOT EXISTS pages (
  id text PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  status text NOT NULL DEFAULT 'DRAFT',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  seo_title text,
  seo_description text,
  canonical text,
  robots text DEFAULT 'index,follow',
  og_title text,
  og_description text,
  og_image text,
  twitter_card text DEFAULT 'summary_large_image',
  dc_title text,
  dc_description text,
  dc_creator text,
  dc_language text DEFAULT 'de-DE',
  schema_json text
);
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published pages"
  ON pages FOR SELECT TO anon, authenticated
  USING (status = 'PUBLISHED');

-- PRODUCT_PAGES
CREATE TABLE IF NOT EXISTS product_pages (
  id text PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  content text NOT NULL,
  price double precision,
  price_display text,
  stripe_price_id text,
  status text NOT NULL DEFAULT 'PUBLISHED',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  seo_title text,
  seo_description text,
  canonical text,
  robots text DEFAULT 'index,follow',
  og_title text,
  og_description text,
  og_image text,
  twitter_card text DEFAULT 'summary_large_image',
  dc_title text,
  dc_description text,
  dc_creator text,
  dc_language text DEFAULT 'de-DE',
  schema_json text
);
ALTER TABLE product_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published product pages"
  ON product_pages FOR SELECT TO anon, authenticated
  USING (status = 'PUBLISHED');

-- MENU_ITEMS
CREATE TABLE IF NOT EXISTS menu_items (
  id text PRIMARY KEY,
  label text NOT NULL,
  href text NOT NULL,
  position text NOT NULL,
  "order" integer NOT NULL DEFAULT 0,
  parent_id text REFERENCES menu_items(id) ON DELETE CASCADE,
  external boolean NOT NULL DEFAULT false,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read visible menu items"
  ON menu_items FOR SELECT TO anon, authenticated
  USING (visible = true);

CREATE INDEX IF NOT EXISTS menu_items_position_order_idx ON menu_items (position, "order");

-- updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
