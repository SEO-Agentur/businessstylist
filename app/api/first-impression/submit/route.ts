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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.parse(body);

    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from('first_impression_submissions')
      .insert(parsed);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    if (err?.name === 'ZodError') {
      return NextResponse.json({ error: 'Ungültige Daten', details: err.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Interner Fehler' }, { status: 500 });
  }
}
