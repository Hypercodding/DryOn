import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const locale = searchParams.get('locale');

    const products = await prisma.product.findMany({
        include: {
            translations: true
        }
    });

    if (locale) {
        const formatted = products.map(p => {
            const trans = p.translations.find(t => t.locale === locale) || p.translations.find(t => t.locale === 'en');
            return {
                ...p,
                translations: undefined, // remove full list
                translation: trans,
                name: trans?.name, // convenient flatten
                description: trans?.description
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
        const { sku, images, containerPoints, translations } = body;

        const product = await prisma.product.create({
            data: {
                sku,
                images: JSON.stringify(images),
                containerPoints: typeof containerPoints === 'string' ? containerPoints : JSON.stringify(containerPoints),
                translations: {
                    create: translations.map((t: any) => ({
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
