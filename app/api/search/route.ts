import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get('q')?.toLowerCase().trim();
        const locale = searchParams.get('locale') || 'en';
        const limit = parseInt(searchParams.get('limit') || '10');

        if (!query || query.length < 2) {
            return NextResponse.json({ 
                products: [], 
                categories: [], 
                industries: [],
                pages: [] 
            });
        }

        // Search Products (SQLite uses LIKE which is case-insensitive by default)
        const products = await prisma.product.findMany({
            where: {
                OR: [
                    { sku: { contains: query } },
                    { translations: { some: { name: { contains: query } } } },
                    { translations: { some: { description: { contains: query } } } },
                ]
            },
            include: {
                translations: true,
                category: {
                    include: { translations: true }
                }
            },
            take: limit
        });

        // Search Product Categories
        const categories = await prisma.productCategory.findMany({
            where: {
                OR: [
                    { slug: { contains: query } },
                    { translations: { some: { name: { contains: query } } } },
                    { translations: { some: { description: { contains: query } } } },
                ]
            },
            include: { translations: true },
            take: limit
        });

        // Search Industry Categories (IndustryCategoryTranslation only has name, no description)
        const industries = await prisma.industryCategory.findMany({
            where: {
                OR: [
                    { slug: { contains: query } },
                    { translations: { some: { name: { contains: query } } } },
                ]
            },
            include: { translations: true },
            take: limit
        });

        // Static pages to search (with translations)
        const staticPages = [
            { 
                slug: 'about', 
                translations: {
                    en: { name: 'About Us', description: 'Learn about DryON Pakistan, our history, achievements and mission' },
                    fr: { name: 'À propos', description: 'Découvrez DryON Pakistan, notre histoire, nos réalisations et notre mission' },
                    es: { name: 'Sobre nosotros', description: 'Conozca DryON Pakistan, nuestra historia, logros y misión' },
                    ar: { name: 'من نحن', description: 'تعرف على DryON باكستان، تاريخنا وإنجازاتنا ومهمتنا' }
                },
                icon: 'Building2',
                href: '/about'
            },
            { 
                slug: 'products', 
                translations: {
                    en: { name: 'Products', description: 'Explore our complete range of moisture control solutions' },
                    fr: { name: 'Produits', description: 'Découvrez notre gamme complète de solutions de contrôle de l\'humidité' },
                    es: { name: 'Productos', description: 'Explore nuestra gama completa de soluciones de control de humedad' },
                    ar: { name: 'المنتجات', description: 'استكشف مجموعتنا الكاملة من حلول التحكم في الرطوبة' }
                },
                icon: 'Package',
                href: '/products'
            },
            { 
                slug: 'damage-prevention', 
                translations: {
                    en: { name: 'Moisture & Damage Prevention', description: 'Protect your cargo from moisture damage during shipping' },
                    fr: { name: 'Prévention de l\'humidité et des dommages', description: 'Protégez votre cargaison des dommages causés par l\'humidité' },
                    es: { name: 'Prevención de humedad y daños', description: 'Proteja su carga del daño por humedad durante el envío' },
                    ar: { name: 'منع الرطوبة والأضرار', description: 'حماية شحنتك من أضرار الرطوبة أثناء الشحن' }
                },
                icon: 'Droplets',
                href: '/damage-prevention'
            },
            { 
                slug: 'solutions-by-industry', 
                translations: {
                    en: { name: 'Solutions by Industry', description: 'Industry-specific moisture control solutions' },
                    fr: { name: 'Solutions par industrie', description: 'Solutions de contrôle de l\'humidité spécifiques à l\'industrie' },
                    es: { name: 'Soluciones por industria', description: 'Soluciones de control de humedad específicas para la industria' },
                    ar: { name: 'حلول حسب الصناعة', description: 'حلول التحكم في الرطوبة الخاصة بالصناعة' }
                },
                icon: 'Factory',
                href: '/solutions-by-industry'
            },
            { 
                slug: 'contact', 
                translations: {
                    en: { name: 'Contact Us', description: 'Get in touch with our team for inquiries and support' },
                    fr: { name: 'Contactez-nous', description: 'Contactez notre équipe pour toute demande et assistance' },
                    es: { name: 'Contáctenos', description: 'Póngase en contacto con nuestro equipo para consultas y soporte' },
                    ar: { name: 'اتصل بنا', description: 'تواصل مع فريقنا للاستفسارات والدعم' }
                },
                icon: 'Mail',
                href: '/contact'
            },
            { 
                slug: 'sustainability', 
                translations: {
                    en: { name: 'Sustainability', description: 'Our commitment to environmental sustainability and green practices' },
                    fr: { name: 'Durabilité', description: 'Notre engagement envers la durabilité environnementale' },
                    es: { name: 'Sostenibilidad', description: 'Nuestro compromiso con la sostenibilidad ambiental' },
                    ar: { name: 'الاستدامة', description: 'التزامنا بالاستدامة البيئية' }
                },
                icon: 'Leaf',
                href: '/about#sustainability'
            },
            { 
                slug: 'insights', 
                translations: {
                    en: { name: 'Insights', description: 'Industry news, tips and moisture control best practices' },
                    fr: { name: 'Actualités', description: 'Nouvelles de l\'industrie et meilleures pratiques' },
                    es: { name: 'Perspectivas', description: 'Noticias de la industria y mejores prácticas' },
                    ar: { name: 'رؤى', description: 'أخبار الصناعة وأفضل الممارسات' }
                },
                icon: 'Lightbulb',
                href: '/insights'
            },
        ];

        // Filter static pages based on query
        const matchingPages = staticPages.filter(page => {
            const translation = page.translations[locale as keyof typeof page.translations] || page.translations.en;
            return (
                page.slug.includes(query) ||
                translation.name.toLowerCase().includes(query) ||
                translation.description.toLowerCase().includes(query)
            );
        }).map(page => {
            const translation = page.translations[locale as keyof typeof page.translations] || page.translations.en;
            return {
                slug: page.slug,
                name: translation.name,
                description: translation.description,
                icon: page.icon,
                href: page.href
            };
        });

        // Format products with translations
        const formattedProducts = products.map(product => {
            const translation = product.translations.find(t => t.locale === locale) || product.translations[0];
            const categoryTranslation = product.category?.translations?.find(t => t.locale === locale) || product.category?.translations?.[0];
            return {
                id: product.id,
                sku: product.sku,
                name: translation?.name || product.sku,
                description: translation?.description || '',
                image: JSON.parse(product.images || '[]')[0] || '/images/product-placeholder.jpg',
                category: categoryTranslation?.name || product.category?.slug,
                href: `/products/${product.sku}`
            };
        });

        // Format categories with translations
        const formattedCategories = categories.map(cat => {
            const translation = cat.translations.find(t => t.locale === locale) || cat.translations[0];
            return {
                id: cat.id,
                slug: cat.slug,
                name: translation?.name || cat.slug,
                description: translation?.description || '',
                icon: cat.icon,
                color: cat.color,
                href: `/products?category=${cat.slug}`
            };
        });

        // Format industries with translations (IndustryCategoryTranslation only has name)
        const formattedIndustries = industries.map(ind => {
            const translation = ind.translations.find(t => t.locale === locale) || ind.translations[0];
            return {
                id: ind.id,
                slug: ind.slug,
                name: translation?.name || ind.slug,
                description: '', // IndustryCategoryTranslation doesn't have description field
                icon: ind.icon,
                color: ind.color,
                href: `/solutions-by-industry?industry=${ind.slug}`
            };
        });

        return NextResponse.json({
            products: formattedProducts,
            categories: formattedCategories,
            industries: formattedIndustries,
            pages: matchingPages
        });
    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json({ error: 'Search failed' }, { status: 500 });
    }
}

