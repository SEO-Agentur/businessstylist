/*
  # Add password column to users table

  1. Changes
    - Add `password` column to `users` table for password-based authentication
    - Column is nullable to support future OAuth integrations
    - Add `email_verified` timestamp column for email verification tracking
  
  2. Security
    - Password will be hashed using bcrypt before storage
    - No changes to existing RLS policies
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'password'
  ) THEN
    ALTER TABLE users ADD COLUMN password text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'email_verified'
  ) THEN
    ALTER TABLE users ADD COLUMN email_verified timestamptz;
  END IF;
END $$;
