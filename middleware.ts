import { auth0 } from './lib/auth0';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Let Auth0 handle all /auth/* routes (login, logout, callback, etc.)
  if (pathname.startsWith('/auth/')) {
    return auth0.middleware(request);
  }

  // Protect specific routes
  const protectedRoutes = ['/dashboard', '/profile', '/settings'];
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    try {
      const session = await auth0.getSession(request);

      if (!session || !session.user) {
        // Redirect to login if not authenticated, preserving intended page
        const loginUrl = new URL('/auth/login', request.url);
        loginUrl.searchParams.set('returnTo', pathname);
        return NextResponse.redirect(loginUrl);
      }
    } catch (error) {
      // Redirect to login if any error occurs while checking session
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  // Let all other requests pass through
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for static files and API routes
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
