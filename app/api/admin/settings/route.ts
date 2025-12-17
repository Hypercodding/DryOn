import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Setting from "@/models/Setting";
import ActivityLog from "@/models/ActivityLog";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();

    const settings = await Setting.find({}).sort({ group: 1, key: 1 });

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
        await connectDB();
        const body = await req.json();
        const { settings } = body; // Array of { key, value }

        for (const setting of settings) {
            await Setting.findOneAndUpdate(
                { key: setting.key },
                { value: setting.value },
                { upsert: true }
            );
        }

        // Log activity
        await ActivityLog.create({
            userId: (session.user as any).id,
            action: 'updated',
            module: 'settings',
            details: JSON.stringify({ keys: settings.map((s: { key: string }) => s.key) }),
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error updating settings" }, { status: 500 });
    }
}

