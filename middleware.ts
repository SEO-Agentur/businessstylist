import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect old typenanalyse URLs to new kibbe-body-type-test URLs
  if (pathname === '/typenanalyse' || pathname.startsWith('/typenanalyse/')) {
    const newPath = pathname.replace('/typenanalyse', '/kibbe-body-type-test');
    return NextResponse.redirect(new URL(newPath, request.url), 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/typenanalyse', '/typenanalyse/:path*'],
};
