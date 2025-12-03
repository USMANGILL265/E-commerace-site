
import { NextResponse } from 'next/server';
import { JWTVerify } from './helper/jwt';

export async function middleware(req) {
  const token = req.cookies.get('GillToken')?.value;
  const pathname = req.nextUrl.pathname;

  const isLoginPage = pathname === '/login';
  const isAdminPath = pathname.startsWith('/admin');


  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token) {
    const payload = await JWTVerify(token);

    if (!payload) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    if (isLoginPage) {
      return NextResponse.redirect(
        new URL(payload.isAdmin ? '/admin' : '/', req.url)
      );
    }

    if (isAdminPath && payload.isAdmin !== true) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/admin', '/admin/:path*'],
};
