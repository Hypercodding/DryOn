import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const { sku, images, containerPoints, translations } = body;

        // Transaction to update product and replace translations
        const product = await prisma.$transaction(async (tx) => {
            const p = await tx.product.update({
                where: { id: params.id },
                data: {
                    sku,
                    images: JSON.stringify(images),
                    containerPoints: typeof containerPoints === 'string' ? containerPoints : JSON.stringify(containerPoints),
                }
            });

            if (translations && Array.isArray(translations)) {
                // Delete existing and recreate
                await tx.productTranslation.deleteMany({
                    where: { productId: params.id }
                });

                for (const t of translations) {
                    await tx.productTranslation.create({
                        data: {
                            productId: params.id,
                            locale: t.locale,
                            name: t.name,
                            description: t.description || ""
                        }
                    });
                }
            }

            return p;
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error updating product" }, { status: 500 });
    }
}

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        await prisma.product.delete({
            where: { id: params.id }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Error deleting product" }, { status: 500 });
    }
}
