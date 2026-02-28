/*
  # Allow user registration via RLS

  1. Changes
    - Add policy to allow public user registration (INSERT)
  
  2. Security
    - Anonymous users can insert new user records during registration
    - This is required for the signup API to work
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'users' 
    AND policyname = 'Allow public user registration'
  ) THEN
    CREATE POLICY "Allow public user registration"
      ON users FOR INSERT
      TO anon
      WITH CHECK (true);
  END IF;
END $$;
