/*
# Create first_impression_submissions table

1. New Tables
   - `first_impression_submissions`
     - `id` (uuid, primary key)
     - `vorname` (text, not null)
     - `email` (text, not null)
     - `alter_jahre` (integer, nullable)
     - `beruf` (text, nullable)
     - `branche` (text, nullable)
     - `position` (text, nullable)
     - `ziel` (text, nullable)
     - `wirkung` (text array, nullable - up to 3 selected values)
     - `satz` (text, nullable)
     - `stil` (text, nullable)
     - `herausforderung` (text, nullable)
     - `situationen` (text array, nullable)
     - `zufriedenheit` (integer, nullable - 1-10 scale)
     - `haeufigkeit` (text, nullable)
     - `spiegelt` (text, nullable)
     - `created_at` (timestamptz, default now)

2. Security
   - Enable RLS on `first_impression_submissions`.
   - Allow anon + authenticated INSERT (public form).
   - Allow only service_role SELECT/UPDATE/DELETE (admin access only).

3. Notes
   - This is a public-facing free questionnaire with no login required.
   - Submissions are write-only from the frontend; only admins read them.
*/

CREATE TABLE IF NOT EXISTS first_impression_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vorname text NOT NULL,
  email text NOT NULL,
  alter_jahre integer,
  beruf text,
  branche text,
  position text,
  ziel text,
  wirkung text[],
  satz text,
  stil text,
  herausforderung text,
  situationen text[],
  zufriedenheit integer,
  haeufigkeit text,
  spiegelt text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE first_impression_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_first_impression" ON first_impression_submissions;
CREATE POLICY "anon_insert_first_impression" ON first_impression_submissions FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_first_impression" ON first_impression_submissions;
CREATE POLICY "anon_select_first_impression" ON first_impression_submissions FOR SELECT
  TO anon, authenticated USING (false);

DROP POLICY IF EXISTS "anon_update_first_impression" ON first_impression_submissions;
CREATE POLICY "anon_update_first_impression" ON first_impression_submissions FOR UPDATE
  TO anon, authenticated USING (false) WITH CHECK (false);

DROP POLICY IF EXISTS "anon_delete_first_impression" ON first_impression_submissions;
CREATE POLICY "anon_delete_first_impression" ON first_impression_submissions FOR DELETE
  TO anon, authenticated USING (false);
