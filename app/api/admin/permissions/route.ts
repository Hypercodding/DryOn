import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Permission from "@/models/Permission";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();

    const permissions = await Permission.find({}).sort({ module: 1, action: 1 });

    // Group by module
    const grouped = permissions.reduce((acc, perm) => {
        if (!acc[perm.module]) {
            acc[perm.module] = [];
        }
        acc[perm.module].push(perm);
        return acc;
    }, {} as Record<string, typeof permissions>);

    return NextResponse.json({ permissions, grouped });
}

