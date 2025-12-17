import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Role from "@/models/Role";
import RolePermission from "@/models/RolePermission";
import Permission from "@/models/Permission";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    try {
        await connectDB();
        const body = await req.json();
        const { name, description, color, permissionIds } = body;

        // First delete all existing role permissions
        await RolePermission.deleteMany({ roleId: id });

        // Update role
        const role = await Role.findByIdAndUpdate(
            id,
            { name, description, color },
            { new: true }
        );

        if (!role) {
            return NextResponse.json({ error: "Role not found" }, { status: 404 });
        }

        // Create new role permissions
        if (permissionIds && permissionIds.length > 0) {
            await RolePermission.insertMany(
                permissionIds.map((pid: string) => ({
                    roleId: id,
                    permissionId: pid
                }))
            );
        }

        // Get role permissions with populated permissions
        const rolePermissions = await RolePermission.find({ roleId: id })
            .populate('permissionId');

        // Transform permissionId to permission for frontend compatibility
        const transformedRolePermissions = rolePermissions
            .map(rp => {
                const rpObj = rp.toObject();
                const permission = rpObj.permissionId;
                
                // Ensure permission object is properly structured (check if it's a populated document)
                const isPopulatedPermission = permission && 
                    typeof permission === 'object' && 
                    'name' in permission && 
                    'module' in permission && 
                    'action' in permission;
                
                const permissionObj = isPopulatedPermission ? {
                    id: (permission as any)._id?.toString() || (permission as any).id?.toString() || String(permission),
                    name: (permission as any).name || 'Unknown',
                    description: (permission as any).description || '',
                    module: (permission as any).module || '',
                    action: (permission as any).action || ''
                } : null;

                return {
                    id: rpObj._id.toString(),
                    roleId: rpObj.roleId.toString(),
                    permissionId: permission?._id?.toString() || permission?.id?.toString() || (typeof permission === 'string' ? permission : null) || rpObj.permissionId?.toString(),
                    permission: permissionObj,
                    createdAt: rpObj.createdAt
                };
            })
            .filter(rp => rp.permission !== null);

        const roleObj = {
            ...role.toObject(),
            rolePermissions: transformedRolePermissions
        };

        return NextResponse.json(roleObj);
    } catch (error) {
        return NextResponse.json({ error: "Error updating role" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    try {
        await connectDB();
        await Role.findByIdAndDelete(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Error deleting role" }, { status: 500 });
    }
}

