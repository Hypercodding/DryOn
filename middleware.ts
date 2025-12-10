import createMiddleware from 'next-intl/middleware';
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { routing } from '@/lib/navigation';

const intlMiddleware = createMiddleware(routing);

export default auth((req) => {
    const { pathname } = req.nextUrl;

    // 1. Admin Route Protection
    if (pathname.startsWith('/admin')) {
        const isLoginPage = pathname === "/admin/login";
        const isLoggedIn = !!req.auth;

        if (!isLoggedIn && !isLoginPage) {
            return NextResponse.redirect(new URL("/admin/login", req.url));
        }

        if (isLoggedIn && isLoginPage) {
            return NextResponse.redirect(new URL("/admin", req.url));
        }

        return NextResponse.next();
    }

    // 2. Public Routes - Delegate to next-intl
    // The intlMiddleware handles redirection to /[locale] and locale detection
    return intlMiddleware(req);
});

export const config = {
    // Matcher:
    // 1. /admin prefixes
    // 2. / (root)
    // 3. /(en|fr|es|ar)/... (supported locales)
    // Exclude: /api, /_next, files with extensions
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/admin/:path*']
};
