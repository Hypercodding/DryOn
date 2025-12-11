import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const industry = await prisma.industryCategory.findUnique({
        where: { id },
        include: { translations: true }
    });

    if (!industry) {
        return NextResponse.json({ error: "Industry not found" }, { status: 404 });
    }

    return NextResponse.json(industry);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    try {
        const body = await req.json();
        const { slug, icon, color, sortOrder, translations } = body;

        // Delete existing translations and recreate
        await prisma.industryCategoryTranslation.deleteMany({
            where: { industryCategoryId: id }
        });

        const industry = await prisma.industryCategory.update({
            where: { id },
            data: {
                slug,
                icon,
                color,
                sortOrder,
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
        return NextResponse.json({ error: "Error updating industry" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    try {
        await prisma.industryCategory.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error deleting industry" }, { status: 500 });
    }
}

