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