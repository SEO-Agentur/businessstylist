import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/db/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = (searchParams.get('email') || '').trim().toLowerCase();
    if (!email || !/.+@.+\..+/.test(email)) {
      return NextResponse.json({ exists: false, hasPassword: false });
    }

    const admin = getSupabaseAdmin();
    const { data } = await admin
      .from('users')
      .select('id, password')
      .ilike('email', email)
      .maybeSingle();

    return NextResponse.json({
      exists: !!data,
      hasPassword: !!data?.password,
    });
  } catch (err) {
    console.error('[check-email] error:', err);
    return NextResponse.json({ exists: false, hasPassword: false });
  }
}
