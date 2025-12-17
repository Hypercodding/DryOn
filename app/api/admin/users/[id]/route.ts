import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import AdminUser from "@/models/AdminUser";
import Role from "@/models/Role";
import RolePermission from "@/models/RolePermission";
import Permission from "@/models/Permission";
import ActivityLog from "@/models/ActivityLog";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await connectDB();

    const user = await AdminUser.findById(id)
        .populate({
            path: 'roleId',
            model: Role,
            populate: {
                path: 'rolePermissions',
                model: RolePermission,
                populate: {
                    path: 'permissionId',
                    model: Permission
                }
            }
        });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { password, ...userObj } = user.toObject();
    return NextResponse.json(userObj);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    try {
        await connectDB();
        const body = await req.json();
        const { email, password, name, roleId, isActive } = body;

        const updateData: Record<string, unknown> = {
            email,
            name,
            roleId: roleId || undefined,
            isActive,
        };

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const user = await AdminUser.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        ).populate('roleId');

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Log activity
        await ActivityLog.create({
            userId: (session.user as any).id || id,
            action: 'updated',
            module: 'users',
            details: JSON.stringify({ email: user.email }),
        });

        const { password: _, ...userObj } = user.toObject();
        return NextResponse.json(userObj);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error updating user" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    try {
        await connectDB();
        const user = await AdminUser.findById(id);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        await AdminUser.findByIdAndDelete(id);

        // Log activity
        await ActivityLog.create({
            userId: (session.user as any).id || id,
            action: 'deleted',
            module: 'users',
            details: JSON.stringify({ email: user.email }),
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error deleting user" }, { status: 500 });
    }
}

