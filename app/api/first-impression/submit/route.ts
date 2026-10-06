import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/db/supabase';
import { sendEmail } from '@/lib/email/service';
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
const BUCKET = 'first-impression-photos';
const NOTIFY_EMAIL = 'info@businessstylist.de';

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildEmailHtml(
  data: z.infer<typeof schema>,
  photoLinks: { name: string; url: string }[]
): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#8C8F95;font-size:13px;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td><td style="padding:6px 0;font-size:14px;vertical-align:top;">${escapeHtml(value) || '—'}</td></tr>`;

  const arr = (a?: string[]) => (a && a.length ? a.join(', ') : '');

  const photoRows = photoLinks.length
    ? photoLinks
        .map(
          (p) =>
            `<p style="margin:8px 0;"><a href="${p.url}" style="color:#1E2B3C;text-decoration:underline;">${escapeHtml(p.name)}</a></p>`
        )
        .join('')
    : '<p style="color:#8C8F95;">Keine Fotos hochgeladen.</p>';

  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#16181C;background:#F4F3F0;margin:0;padding:24px;">
  <div style="max-width:600px;margin:0 auto;background:#fff;padding:32px;">
    <h1 style="font-size:22px;font-weight:300;margin:0 0 24px;letter-spacing:-0.02em;">Neue First-Impression-Analyse</h1>
    <table style="border-collapse:collapse;width:100%;margin-bottom:28px;">
      ${row('Vorname', data.vorname)}
      ${row('E-Mail', data.email)}
      ${row('Alter', data.alter_jahre != null ? String(data.alter_jahre) : '')}
      ${row('Beruf', data.beruf || '')}
      ${row('Branche', data.branche || '')}
      ${row('Position', data.position || '')}
      ${row('Berufliches Ziel', data.ziel || '')}
      ${row('Gewünschte Wirkung', arr(data.wirkung))}
      ${row('Satzergänzung', data.satz || '')}
      ${row('Aktueller Stil', data.stil || '')}
      ${row('Herausforderung', data.herausforderung || '')}
      ${row('Situationen', arr(data.situationen))}
      ${row('Zufriedenheit', data.zufriedenheit != null ? `${data.zufriedenheit}/10` : '')}
      ${row('Häufigkeit', data.haeufigkeit || '')}
      ${row('Spiegelt Kompetenz wider', data.spiegelt || '')}
    </table>
    <h2 style="font-size:16px;font-weight:400;margin:0 0 12px;">Fotos</h2>
    ${photoRows}
  </div>
</body></html>`;
}

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
      wirkung: formData.getAll('wirkung').length > 0 ? (formData.getAll('wirkung') as string[]) : undefined,
      satz: (formData.get('satz') as string) || undefined,
      stil: (formData.get('stil') as string) || undefined,
      herausforderung: (formData.get('herausforderung') as string) || undefined,
      situationen: formData.getAll('situationen').length > 0 ? (formData.getAll('situationen') as string[]) : undefined,
      zufriedenheit: formData.get('zufriedenheit') ? Number(formData.get('zufriedenheit')) : null,
      haeufigkeit: (formData.get('haeufigkeit') as string) || undefined,
      spiegelt: (formData.get('spiegelt') as string) || undefined,
    };

    const parsed = schema.parse(payload);

    const files = formData.getAll('fotos').filter(
      (f): f is File => f instanceof File && f.size > 0
    );

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
    const photoLinks: { name: string; url: string }[] = [];
    const submissionId = crypto.randomUUID();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const path = `${submissionId}/photo-${i + 1}.${ext}`;

      const arrayBuffer = await file.arrayBuffer();
      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(path, arrayBuffer, { contentType: file.type, upsert: false });

      if (uploadError) {
        console.error('Photo upload failed:', uploadError);
        continue;
      }

      photoPaths.push(path);

      const { data: urlData } = await supabase.storage
        .from(BUCKET)
        .createSignedUrl(path, 60 * 24 * 7);

      if (urlData?.signedUrl) {
        photoLinks.push({ name: file.name, url: urlData.signedUrl });
      }
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

    try {
      await sendEmail({
        to: NOTIFY_EMAIL,
        replyTo: parsed.email,
        subject: `Neue First-Impression-Analyse von ${parsed.vorname}`,
        html: buildEmailHtml(parsed, photoLinks),
        text: `Neue First-Impression-Analyse von ${parsed.vorname} (${parsed.email}).\n\nFotos: ${photoLinks.length > 0 ? photoLinks.map((p) => p.url).join('\n') : 'Keine Fotos hochgeladen.'}`,
      });
    } catch (emailErr) {
      console.error('Notification email failed:', emailErr);
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
