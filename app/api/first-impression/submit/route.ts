import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/db/supabase';
import { z } from 'zod';

const schema = z.object({
  vorname: z.string().min(1),
  email: z.string().email(),
  alter_jahre: z.number().int().min(16).max(99).nullable().optional(),
  beruf: z.string().optional(),
  branche: z.string().optional(),
  position: z.string().optional(),
  ziel: z.string().optional(),
  wirkung: z.array(z.string()).max(3).optional(),
  satz: z.string().optional(),
  stil: z.string().optional(),
  herausforderung: z.string().optional(),
  situationen: z.array(z.string()).optional(),
  zufriedenheit: z.number().int().min(1).max(10).nullable().optional(),
  haeufigkeit: z.string().optional(),
  spiegelt: z.string().optional(),
});

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB per file
const MAX_PHOTOS = 5;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const payload = {
      vorname: (formData.get('vorname') as string) || '',
      email: (formData.get('email') as string) || '',
      alter_jahre: formData.get('alter_jahre') ? Number(formData.get('alter_jahre')) : null,
      beruf: (formData.get('beruf') as string) || undefined,
      branche: (formData.get('branche') as string) || undefined,
      position: (formData.get('position') as string) || undefined,
      ziel: (formData.get('ziel') as string) || undefined,
      wirkung: formData.getAll('wirkung').length > 0 ? formData.getAll('wirkung') as string[] : undefined,
      satz: (formData.get('satz') as string) || undefined,
      stil: (formData.get('stil') as string) || undefined,
      herausforderung: (formData.get('herausforderung') as string) || undefined,
      situationen: formData.getAll('situationen').length > 0 ? formData.getAll('situationen') as string[] : undefined,
      zufriedenheit: formData.get('zufriedenheit') ? Number(formData.get('zufriedenheit')) : null,
      haeufigkeit: (formData.get('haeufigkeit') as string) || undefined,
      spiegelt: (formData.get('spiegelt') as string) || undefined,
    };

    const parsed = schema.parse(payload);

    const files = formData.getAll('fotos').filter(
      (f): f is File => f instanceof File && f.size > 0
    );

    if (files.length === 0) {
      return NextResponse.json(
        { error: 'Bitte lade mindestens ein Foto hoch.' },
        { status: 400 }
      );
    }

    if (files.length > MAX_PHOTOS) {
      return NextResponse.json(
        { error: `Du kannst maximal ${MAX_PHOTOS} Fotos hochladen.` },
        { status: 400 }
      );
    }

    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: 'Bitte lade nur JPG-, PNG- oder WebP-Bilder hoch.' },
          { status: 400 }
        );
      }
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: 'Jedes Foto darf maximal 10 MB groß sein.' },
          { status: 400 }
        );
      }
    }

    const supabase = getSupabaseAdmin();
    const photoPaths: string[] = [];
    const submissionId = crypto.randomUUID();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const path = `${submissionId}/photo-${i + 1}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('first-impression-photos')
        .upload(path, file, { contentType: file.type, upsert: false });

      if (uploadError) {
        console.error('Photo upload failed:', uploadError);
        return NextResponse.json(
          { error: 'Die Fotos konnten nicht gespeichert werden. Bitte versuche es erneut.' },
          { status: 500 }
        );
      }

      photoPaths.push(path);
    }

    const { error } = await supabase.from('first_impression_submissions').insert({
      ...parsed,
      photo_paths: photoPaths,
    });

    if (error) {
      console.error('Submission insert failed:', error);
      return NextResponse.json(
        { error: 'Die Angaben konnten nicht gespeichert werden. Bitte versuche es erneut.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    if (err?.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Bitte überprüfe deine Angaben und versuche es erneut.' },
        { status: 400 }
      );
    }
    console.error('First impression submit error:', err);
    return NextResponse.json(
      { error: 'Beim Absenden ist ein Fehler aufgetreten. Bitte versuche es erneut.' },
      { status: 500 }
    );
  }
}
