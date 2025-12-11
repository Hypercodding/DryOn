import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const locale = searchParams.get('locale');
    const categorySlug = searchParams.get('category');
    const industrySlug = searchParams.get('industry');

    const where: Record<string, unknown> = {};
    
    if (categorySlug) {
        const category = await prisma.productCategory.findUnique({ where: { slug: categorySlug } });
        if (category) where.categoryId = category.id;
    }
    
    if (industrySlug) {
        const industry = await prisma.industryCategory.findUnique({ where: { slug: industrySlug } });
        if (industry) where.industryId = industry.id;
    }

    const products = await prisma.product.findMany({
        where,
        include: {
            translations: true,
            category: {
                include: { translations: true }
            },
            industry: {
                include: { translations: true }
            }
        }
    });

    if (locale) {
        const formatted = products.map(p => {
            const trans = p.translations.find(t => t.locale === locale) || p.translations.find(t => t.locale === 'en');
            const catTrans = p.category?.translations.find(t => t.locale === locale) || p.category?.translations.find(t => t.locale === 'en');
            const indTrans = p.industry?.translations.find(t => t.locale === locale) || p.industry?.translations.find(t => t.locale === 'en');
            
            return {
                ...p,
                translations: undefined,
                translation: trans,
                name: trans?.name,
                description: trans?.description,
                categoryName: catTrans?.name || p.category?.slug,
                categorySlug: p.category?.slug,
                industryName: indTrans?.name || p.industry?.slug,
                industrySlug: p.industry?.slug,
            };
        });
        return NextResponse.json(formatted);
    }

    return NextResponse.json(products);
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const { sku, categoryId, industryId, featured, images, containerPoints, translations } = body;

        const product = await prisma.product.create({
            data: {
                sku,
                categoryId: categoryId || null,
                industryId: industryId || null,
                featured: featured || false,
                images: JSON.stringify(images),
                containerPoints: typeof containerPoints === 'string' ? containerPoints : JSON.stringify(containerPoints),
                translations: {
                    create: translations.map((t: { locale: string; name: string; description?: string }) => ({
                        locale: t.locale,
                        name: t.name,
                        description: t.description || ""
                    }))
                }
            }
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error creating product" }, { status: 500 });
    }
}
