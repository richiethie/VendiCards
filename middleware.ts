import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { repairsOffered } from './lib/siteFlags';

export function middleware(request: NextRequest) {
  if (!repairsOffered && request.nextUrl.pathname.startsWith('/repairs')) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/repairs', '/repairs/:path*'],
};
