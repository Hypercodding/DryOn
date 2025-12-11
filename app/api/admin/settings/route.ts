import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const settings = await prisma.setting.findMany({
        orderBy: [{ group: 'asc' }, { key: 'asc' }]
    });

    // Group by category
    const grouped = settings.reduce((acc, setting) => {
        if (!acc[setting.group]) {
            acc[setting.group] = [];
        }
        acc[setting.group].push(setting);
        return acc;
    }, {} as Record<string, typeof settings>);

    return NextResponse.json({ settings, grouped });
}

export async function PUT(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const { settings } = body; // Array of { key, value }

        for (const setting of settings) {
            await prisma.setting.update({
                where: { key: setting.key },
                data: { value: setting.value }
            });
        }

        // Log activity
        await prisma.activityLog.create({
            data: {
                userId: (session.user as any).id,
                action: 'updated',
                module: 'settings',
                details: JSON.stringify({ keys: settings.map((s: { key: string }) => s.key) }),
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error updating settings" }, { status: 500 });
    }
}

