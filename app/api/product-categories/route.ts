import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const locale = searchParams.get('locale') || 'en';

    const categories = await prisma.productCategory.findMany({
        include: {
            translations: true,
            _count: {
                select: { products: true }
            }
        },
        orderBy: { sortOrder: 'asc' }
    });

    const formatted = categories.map(cat => {
        const trans = cat.translations.find(t => t.locale === locale) || cat.translations.find(t => t.locale === 'en');
        return {
            id: cat.id,
            slug: cat.slug,
            icon: cat.icon,
            color: cat.color,
            sortOrder: cat.sortOrder,
            name: trans?.name || cat.slug,
            description: trans?.description || '',
            productCount: cat._count.products,
            translations: cat.translations,
        };
    });

    return NextResponse.json(formatted);
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const { slug, icon, color, sortOrder, translations } = body;

        const category = await prisma.productCategory.create({
            data: {
                slug,
                icon: icon || 'Package',
                color: color || 'from-blue-500 to-blue-600',
                sortOrder: sortOrder || 0,
                translations: {
                    create: translations.map((t: { locale: string; name: string; description?: string }) => ({
                        locale: t.locale,
                        name: t.name,
                        description: t.description || ''
                    }))
                }
            },
            include: { translations: true }
        });

        return NextResponse.json(category);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error creating category" }, { status: 500 });
    }
}

