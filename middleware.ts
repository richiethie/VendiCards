import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { repairsOffered } from './lib/siteFlags';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/grand-opening')) {
    return NextResponse.redirect(new URL('/fondy-card-show', request.url));
  }

  if (!repairsOffered && request.nextUrl.pathname.startsWith('/repairs')) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/repairs', '/repairs/:path*', '/grand-opening', '/grand-opening/:path*'],
};
