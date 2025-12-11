import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const users = await prisma.adminUser.findMany({
        include: {
            role: true,
        },
        orderBy: { createdAt: 'desc' }
    });

    // Remove password from response
    const safeUsers = users.map(({ password, ...user }) => user);
    return NextResponse.json(safeUsers);
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const { email, password, name, roleId, isActive } = body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.adminUser.create({
            data: {
                email,
                password: hashedPassword,
                name: name || '',
                roleId,
                isActive: isActive ?? true,
            },
            include: { role: true }
        });

        // Log activity
        await prisma.activityLog.create({
            data: {
                userId: (session.user as any).id || user.id,
                action: 'created',
                module: 'users',
                details: JSON.stringify({ email: user.email }),
            }
        });

        const { password: _, ...safeUser } = user;
        return NextResponse.json(safeUser);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error creating user" }, { status: 500 });
    }
}

