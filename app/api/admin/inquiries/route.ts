import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const inquiries = await prisma.contactInquiry.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(inquiries);
}

