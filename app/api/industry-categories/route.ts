import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const locale = searchParams.get('locale') || 'en';

    const industries = await prisma.industryCategory.findMany({
        include: {
            translations: true,
            _count: {
                select: { products: true }
            }
        },
        orderBy: { sortOrder: 'asc' }
    });

    const formatted = industries.map(ind => {
        const trans = ind.translations.find(t => t.locale === locale) || ind.translations.find(t => t.locale === 'en');
        return {
            id: ind.id,
            slug: ind.slug,
            icon: ind.icon,
            color: ind.color,
            sortOrder: ind.sortOrder,
            name: trans?.name || ind.slug,
            productCount: ind._count.products,
            translations: ind.translations,
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

        const industry = await prisma.industryCategory.create({
            data: {
                slug,
                icon: icon || 'Factory',
                color: color || 'bg-gray-500',
                sortOrder: sortOrder || 0,
                translations: {
                    create: translations.map((t: { locale: string; name: string }) => ({
                        locale: t.locale,
                        name: t.name
                    }))
                }
            },
            include: { translations: true }
        });

        return NextResponse.json(industry);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error creating industry" }, { status: 500 });
    }
}

