import { NextResponse } from 'next/server';

const LOOKBOOK_PASSWORD = 'Cyrus';
const COOKIE_NAME = 'lookbook_access';
const COOKIE_VALUE = 'cyrus-ok';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password !== LOOKBOOK_PASSWORD) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAME, COOKIE_VALUE, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: COOKIE_MAX_AGE,
    });
    return response;
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
