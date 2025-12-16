import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const roles = await prisma.role.findMany({
        include: {
            rolePermissions: {
                include: { permission: true }
            },
            _count: { select: { users: true } }
        },
        orderBy: { createdAt: 'asc' }
    });

    return NextResponse.json(roles);
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const { name, description, color, permissionIds } = body;

        const role = await prisma.role.create({
            data: {
                name,
                description: description || '',
                color: color || 'bg-gray-500',
                rolePermissions: {
                    create: permissionIds?.map((id: string) => ({
                        permission: { connect: { id } }
                    })) || []
                }
            },
            include: { 
                rolePermissions: {
                    include: { permission: true }
                }
            }
        });

        return NextResponse.json(role);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error creating role" }, { status: 500 });
    }
}

