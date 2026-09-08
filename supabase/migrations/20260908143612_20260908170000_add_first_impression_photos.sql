/*
# Store private photos for first-impression analyses

1. New column
- `first_impression_submissions.photo_paths` stores the private storage paths for the submitted outfit photos.

2. Storage
- Create the private `first-impression-photos` bucket for analysis photos.
- Photos are not publicly readable; the server-side submission route uploads them with its privileged client.

3. Security
- Keep the existing row-level security rules on `first_impression_submissions` unchanged.
- The bucket remains private so a guessed file path cannot expose a customer's photo.

4. Notes
- Existing submissions remain valid because the new column is nullable.
- The application validates file type and size before storage.
*/

ALTER TABLE public.first_impression_submissions
  ADD COLUMN IF NOT EXISTS photo_paths text[];

INSERT INTO storage.buckets (id, name, public)
VALUES ('first-impression-photos', 'first-impression-photos', false)
ON CONFLICT (id) DO UPDATE SET public = false;