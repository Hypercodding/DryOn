import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import ContactInquiry from "@/models/ContactInquiry";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();

    const inquiries = await ContactInquiry.find({}).sort({ createdAt: -1 });

    return NextResponse.json(inquiries);
}

