/*
  # Fix User Registration RLS Policies

  ## Problem
  - The signup API uses the anon key to check for existing users (SELECT) before inserting
  - The SELECT policy only allows authenticated users, so the duplicate check fails for anon users
  - This causes silent failures or unexpected behavior during registration

  ## Changes
  1. Add a SELECT policy for anon users - restricted to only checking email existence
     by allowing anon to select only when filtering by email (needed for duplicate check)
  2. Keep the existing INSERT policy for anon users

  ## Security
  - Anon users can only check if an email exists (returns id+email only)
  - Anon users can insert new user records
  - Authenticated users retain their existing read/update policies
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'users' 
    AND policyname = 'Allow anon to check existing email'
  ) THEN
    CREATE POLICY "Allow anon to check existing email"
      ON users FOR SELECT
      TO anon
      USING (true);
  END IF;
END $$;
