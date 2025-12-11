import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const category = await prisma.productCategory.findUnique({
        where: { id },
        include: { translations: true }
    });

    if (!category) {
        return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(category);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    try {
        const body = await req.json();
        const { slug, icon, color, sortOrder, translations } = body;

        // Delete existing translations and recreate
        await prisma.productCategoryTranslation.deleteMany({
            where: { productCategoryId: id }
        });

        const category = await prisma.productCategory.update({
            where: { id },
            data: {
                slug,
                icon,
                color,
                sortOrder,
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
        return NextResponse.json({ error: "Error updating category" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    try {
        await prisma.productCategory.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error deleting category" }, { status: 500 });
    }
}

