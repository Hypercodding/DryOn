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

        // Role & permission based access control for admin routes
        if (isLoggedIn) {
            const user: any = req.auth?.user || {};
            const role: string = user.role || '';
            const permissions: string[] = Array.isArray(user.permissions) ? user.permissions : [];

            // Super Admin and Admin can access all admin pages
            const isFullAdmin = role === 'Super Admin' || role === 'Admin';

            if (!isFullAdmin) {
                // Map admin routes to permission modules
                const routeModuleMap: { prefix: string; module: string }[] = [
                    { prefix: '/admin/users', module: 'users' },
                    { prefix: '/admin/roles', module: 'roles' },
                    { prefix: '/admin/settings', module: 'settings' },
                    { prefix: '/admin/inquiries', module: 'inquiries' },
                    { prefix: '/admin/logs', module: 'logs' },
                    { prefix: '/admin/products', module: 'products' },
                    { prefix: '/admin/categories', module: 'categories' },
                    { prefix: '/admin/industries', module: 'industries' },
                ];

                const matched = routeModuleMap.find(({ prefix }) =>
                    pathname === prefix || pathname.startsWith(prefix + '/')
                );

                if (matched) {
                    const requiredPermission = `${matched.module}.read`;
                    const hasPermission = permissions.includes(requiredPermission);

                    if (!hasPermission) {
                        // If user doesn't have access to this module, send them to the dashboard
                        return NextResponse.redirect(new URL("/admin", req.url));
                    }
                }
            }
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
