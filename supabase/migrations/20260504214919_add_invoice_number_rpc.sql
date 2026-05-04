/*
  # RPC-Funktion für Rechnungsnummern

  1. Funktionen
    - `next_invoice_number()`: liefert die nächste Rechnungsnummer
      als formatierten String (R-YYYY-00000), basierend auf der
      Sequenz `invoice_number_seq`.
  2. Zugriff
    - SECURITY DEFINER, damit sie von `service_role` aus dem
      Webhook sicher aufgerufen werden kann.
*/

CREATE OR REPLACE FUNCTION public.next_invoice_number()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  nextval_int bigint;
BEGIN
  nextval_int := nextval('invoice_number_seq');
  RETURN 'R-' || to_char(now(), 'YYYY') || '-' || lpad(nextval_int::text, 5, '0');
END;
$$;

REVOKE ALL ON FUNCTION public.next_invoice_number() FROM public;
GRANT EXECUTE ON FUNCTION public.next_invoice_number() TO service_role;
