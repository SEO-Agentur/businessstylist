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