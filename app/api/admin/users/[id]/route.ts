import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    const user = await prisma.adminUser.findUnique({
        where: { id },
        include: { role: { include: { permissions: true } } }
    });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { password: _, ...safeUser } = user;
    return NextResponse.json(safeUser);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    try {
        const body = await req.json();
        const { email, password, name, roleId, isActive } = body;

        const updateData: Record<string, unknown> = {
            email,
            name,
            roleId,
            isActive,
        };

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const user = await prisma.adminUser.update({
            where: { id },
            data: updateData,
            include: { role: true }
        });

        // Log activity
        await prisma.activityLog.create({
            data: {
                userId: (session.user as any).id || id,
                action: 'updated',
                module: 'users',
                details: JSON.stringify({ email: user.email }),
            }
        });

        const { password: _, ...safeUser } = user;
        return NextResponse.json(safeUser);
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
        const user = await prisma.adminUser.delete({
            where: { id }
        });

        // Log activity
        await prisma.activityLog.create({
            data: {
                userId: (session.user as any).id || id,
                action: 'deleted',
                module: 'users',
                details: JSON.stringify({ email: user.email }),
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error deleting user" }, { status: 500 });
    }
}

