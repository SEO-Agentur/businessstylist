/*
  # Create email_log table

  1. New Tables
    - `email_log`
      - Records every outbound email attempt (success or failure)
      - `id` (uuid PK), `to_address`, `subject`, `status` (sent/failed),
        `provider` (smtp/resend), `error_message`, `created_at`

  2. Security
    - RLS enabled
    - No public policies; only the service role (which bypasses RLS) writes or
      reads from this table.
*/

CREATE TABLE IF NOT EXISTS public.email_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  to_address text NOT NULL,
  subject text NOT NULL,
  status text NOT NULL DEFAULT 'sent',
  provider text NOT NULL DEFAULT 'smtp',
  error_message text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS email_log_created_at_idx ON public.email_log (created_at DESC);

ALTER TABLE public.email_log ENABLE ROW LEVEL SECURITY;
