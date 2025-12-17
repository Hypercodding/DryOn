import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import ActivityLog from "@/models/ActivityLog";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const module = searchParams.get('module');

    const query = module ? { module } : {};

    const [logs, total] = await Promise.all([
        ActivityLog.find(query)
            .populate('userId', 'name email')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit),
        ActivityLog.countDocuments(query)
    ]);

    return NextResponse.json({
        logs,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit)
        }
    });
}

