import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/db/supabase';
import { sendEmail } from '@/lib/email/service';

interface ChecklistDef {
  slug: string;
  title: string;
  filename: string;
  filePath: string;
}

const CHECKLISTS: ChecklistDef[] = [
  {
    slug: 'smart-casual',
    title: 'Smart Casual Checkliste',
    filename: 'smart-casual-checkliste.pdf',
    filePath: 'smart-casual-checkliste.pdf',
  },
  {
    slug: 'business-attire',
    title: 'Business Attire Checkliste',
    filename: 'smart-casual-checkliste.pdf',
    filePath: 'smart-casual-checkliste.pdf',
  },
  {
    slug: 'wardrobe-declutter',
    title: 'Wardrobe-Decluttering Checkliste',
    filename: 'smart-casual-checkliste.pdf',
    filePath: 'smart-casual-checkliste.pdf',
  },
];

export async function POST(request: NextRequest) {
  try {
    const { email, checklists } = await request.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Bitte gib eine gültige E-Mail-Adresse ein.' },
        { status: 400 }
      );
    }

    if (!Array.isArray(checklists) || checklists.length === 0) {
      return NextResponse.json(
        { error: 'Bitte wähle mindestens eine Checkliste aus.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const validSlugs = checklists.filter((slug: string) =>
      CHECKLISTS.some((c) => c.slug === slug)
    );

    if (validSlugs.length === 0) {
      return NextResponse.json(
        { error: 'Bitte wähle mindestens eine Checkliste aus.' },
        { status: 400 }
      );
    }

    const admin = getSupabaseAdmin();

    try {
      await admin.from('newsletter_subscribers').upsert(
        { email: normalizedEmail, source: `checklist:${validSlugs.join(',')}` },
        { onConflict: 'email' }
      );
    } catch (err) {
      console.error('[checklist] supabase persist failed (non-fatal):', err);
    }

    const downloadLinks = validSlugs.map((slug: string) => {
      const def = CHECKLISTS.find((c) => c.slug === slug)!;
      return { slug, title: def.title, url: `/${def.filePath}` };
    });

    try {
      const { sendEmail: doSend } = await import('@/lib/email/service');
      const html = `
<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #2d3e50; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="margin:0">Deine Checklisten sind bereit</h1>
  </div>
  <div style="background: #f9f7f4; padding: 30px; border-radius: 0 0 8px 8px;">
    <p>Hallo,</p>
    <p>vielen Dank für dein Interesse! Hier sind deine angeforderten Checklisten:</p>
    <ul>
      ${downloadLinks.map((l) => `<li><a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://businessstylist.de'}${l.url}">${l.title}</a></li>`).join('')}
    </ul>
    <p>Viel Erfolg mit deinem Business-Stil!</p>
    <p>Herzliche Grüße,<br>Anika Schmitz</p>
  </div>
</div>
</body></html>`.trim();

      await doSend({
        to: normalizedEmail,
        subject: 'Deine Checklisten von Businessstylist',
        html,
        text: `Deine angeforderten Checklisten: ${downloadLinks.map((l) => l.url).join(', ')}`,
        replyTo: 'kontakt@businessstylist.de',
      });
    } catch (err) {
      console.error('[checklist] email send failed (non-fatal):', err);
    }

    return NextResponse.json({
      success: true,
      downloads: downloadLinks,
      message: 'Deine Checklisten sind jetzt bereit zum Download.',
    });
  } catch (error: any) {
    console.error('[checklist] unhandled error:', error?.message || error);
    return NextResponse.json(
      { error: 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.' },
      { status: 500 }
    );
  }
}
