import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const LOOKBOOK_COOKIE = 'lookbook_access';
const LOOKBOOK_COOKIE_VALUE = 'cyrus-ok';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/typenanalyse' || pathname.startsWith('/typenanalyse/')) {
    const newPath = pathname.replace('/typenanalyse', '/kibbe-body-type-test');
    return NextResponse.redirect(new URL(newPath, request.url), 301);
  }

  if (pathname === '/lookbook' || pathname.startsWith('/lookbook/')) {
    const cookie = request.cookies.get(LOOKBOOK_COOKIE);
    if (cookie?.value !== LOOKBOOK_COOKIE_VALUE) {
      const gateUrl = new URL('/lookbook-gate', request.url);
      gateUrl.searchParams.set('next', pathname);
      const res = NextResponse.redirect(gateUrl);
      res.headers.set('X-Robots-Tag', 'noindex, nofollow');
      return res;
    }
    const res = NextResponse.next();
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/typenanalyse',
    '/typenanalyse/:path*',
    '/lookbook',
    '/lookbook/:path*',
  ],
};
