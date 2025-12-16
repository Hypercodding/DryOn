import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    try {
        const body = await req.json();
        const { name, description, color, permissionIds } = body;

        // First delete all existing role permissions
        await prisma.rolePermission.deleteMany({
            where: { roleId: id }
        });

        // Then create new role permissions
        const role = await prisma.role.update({
            where: { id },
            data: {
                name,
                description,
                color,
                rolePermissions: {
                    create: permissionIds?.map((pid: string) => ({
                        permission: { connect: { id: pid } }
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
        return NextResponse.json({ error: "Error updating role" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    try {
        await prisma.role.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error deleting role" }, { status: 500 });
    }
}

