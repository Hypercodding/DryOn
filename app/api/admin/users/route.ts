import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import AdminUser from "@/models/AdminUser";
import ActivityLog from "@/models/ActivityLog";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();

    const users = await AdminUser.find({})
        .populate('roleId')
        .sort({ createdAt: -1 })
        .select('-password');

    return NextResponse.json(users);
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        await connectDB();
        const body = await req.json();
        const { email, password, name, roleId, isActive } = body;

        const hashedPassword = await bcrypt.hash(password, 10);

        // Validate roleId - only set if it's a valid ObjectId string
        const validRoleId = roleId && 
            typeof roleId === 'string' && 
            roleId.trim() !== '' && 
            mongoose.Types.ObjectId.isValid(roleId)
            ? roleId 
            : undefined;

        const user = await AdminUser.create({
            email,
            password: hashedPassword,
            name: name || '',
            roleId: validRoleId,
            isActive: isActive ?? true,
        });

        await user.populate('roleId');

        // Log activity
        await ActivityLog.create({
            userId: (session.user as any).id || user._id,
            action: 'created',
            module: 'users',
            details: JSON.stringify({ email: user.email }),
        });

        const { password: _, ...userObj } = user.toObject();
        return NextResponse.json(userObj);
    } catch (error: any) {
        console.error('Error creating user:', error);
        const errorMessage = error?.message?.includes('Cast to ObjectId') 
            ? 'Invalid role selected. Please select a valid role.'
            : 'Error creating user';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

