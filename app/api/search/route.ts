import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import ProductTranslation from '@/models/ProductTranslation';
import ProductCategory from '@/models/ProductCategory';
import ProductCategoryTranslation from '@/models/ProductCategoryTranslation';
import IndustryCategory from '@/models/IndustryCategory';
import IndustryCategoryTranslation from '@/models/IndustryCategoryTranslation';

export async function GET(req: Request) {
    try {
        await connectDB();
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

        // Search Products - find by SKU or translations
        const productTranslations = await ProductTranslation.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        }).limit(limit);

        const skuProducts = await Product.find({
            sku: { $regex: query, $options: 'i' }
        }).limit(limit);

        const productIds = [
            ...productTranslations.map(t => t.productId),
            ...skuProducts.map(p => p._id)
        ];

        const uniqueProductIds = [...new Set(productIds.map(id => id.toString()))];
        const products = await Product.find({
            _id: { $in: uniqueProductIds }
        })
        .populate('categoryId')
        .limit(limit);

        // Get translations for products
        const productIdsForTrans = products.map(p => p._id);
        const allProductTranslations = await ProductTranslation.find({
            productId: { $in: productIdsForTrans }
        });

        // Get category translations
        const categoryIds = products
            .map(p => p.categoryId)
            .filter(Boolean)
            .map((c: any) => c._id);
        const categoryTranslations = await ProductCategoryTranslation.find({
            productCategoryId: { $in: categoryIds }
        });

        // Attach translations to products
        const productsWithTranslations = products.map(product => {
            const translations = allProductTranslations.filter(t => t.productId.toString() === product._id.toString());
            const category = product.categoryId as any;
            const catTranslations = category ? categoryTranslations.filter(t => t.productCategoryId.toString() === category._id.toString()) : [];
            return {
                ...product.toObject(),
                translations,
                category: category ? {
                    ...category.toObject(),
                    translations: catTranslations
                } : null
            };
        });

        // Search Product Categories
        const categoryTrans = await ProductCategoryTranslation.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        }).limit(limit);

        const slugCategories = await ProductCategory.find({
            slug: { $regex: query, $options: 'i' }
        }).limit(limit);

        const categoryIdsForSearch = [
            ...categoryTrans.map(t => t.productCategoryId),
            ...slugCategories.map(c => c._id)
        ];

        const uniqueCategoryIds = [...new Set(categoryIdsForSearch.map(id => id.toString()))];
        const categories = await ProductCategory.find({
            _id: { $in: uniqueCategoryIds }
        }).limit(limit);

        const allCategoryTranslations = await ProductCategoryTranslation.find({
            productCategoryId: { $in: uniqueCategoryIds }
        });

        const categoriesWithTranslations = categories.map(category => {
            const translations = allCategoryTranslations.filter(t => t.productCategoryId.toString() === category._id.toString());
            return {
                ...category.toObject(),
                translations
            };
        });

        // Search Industry Categories
        const industryTrans = await IndustryCategoryTranslation.find({
            name: { $regex: query, $options: 'i' }
        }).limit(limit);

        const slugIndustries = await IndustryCategory.find({
            slug: { $regex: query, $options: 'i' }
        }).limit(limit);

        const industryIdsForSearch = [
            ...industryTrans.map(t => t.industryCategoryId),
            ...slugIndustries.map(i => i._id)
        ];

        const uniqueIndustryIds = [...new Set(industryIdsForSearch.map(id => id.toString()))];
        const industries = await IndustryCategory.find({
            _id: { $in: uniqueIndustryIds }
        }).limit(limit);

        const allIndustryTranslations = await IndustryCategoryTranslation.find({
            industryCategoryId: { $in: uniqueIndustryIds }
        });

        const industriesWithTranslations = industries.map(industry => {
            const translations = allIndustryTranslations.filter(t => t.industryCategoryId.toString() === industry._id.toString());
            return {
                ...industry.toObject(),
                translations
            };
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
        const formattedProducts = productsWithTranslations.map(product => {
            const translation = product.translations.find((t: any) => t.locale === locale) || product.translations[0];
            const categoryTranslation = product.category?.translations?.find((t: any) => t.locale === locale) || product.category?.translations?.[0];
            return {
                id: product._id.toString(),
                sku: product.sku,
                name: translation?.name || product.sku,
                description: translation?.description || '',
                image: JSON.parse(product.images || '[]')[0] || '/images/product-placeholder.jpg',
                category: categoryTranslation?.name || product.category?.slug,
                href: `/products/${product.sku}`
            };
        });

        // Format categories with translations
        const formattedCategories = categoriesWithTranslations.map(cat => {
            const translation = cat.translations.find((t: any) => t.locale === locale) || cat.translations[0];
            return {
                id: cat._id.toString(),
                slug: cat.slug,
                name: translation?.name || cat.slug,
                description: translation?.description || '',
                icon: cat.icon,
                color: cat.color,
                href: `/products?category=${cat.slug}`
            };
        });

        // Format industries with translations (IndustryCategoryTranslation only has name)
        const formattedIndustries = industriesWithTranslations.map(ind => {
            const translation = ind.translations.find((t: any) => t.locale === locale) || ind.translations[0];
            return {
                id: ind._id.toString(),
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
        return NextResponse.json({ error: 'Search failed' }, { status: 500 });
    }
}

