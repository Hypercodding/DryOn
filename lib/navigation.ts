import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    // Supported locales
    locales: ['en', 'fr', 'es', 'ar'],
    
    // Default/fallback locale when no match is found
    defaultLocale: 'en',
    
    // Automatic locale detection based on Accept-Language header
    // This is enabled by default, but we make it explicit
    localeDetection: true,
    
    // Always show locale prefix in URL (e.g., /en/products, /fr/products)
    // 'always' - always include prefix
    // 'as-needed' - hide prefix for default locale
    localePrefix: 'always'
});

export const { Link, redirect, usePathname, useRouter } =
    createNavigation(routing);
