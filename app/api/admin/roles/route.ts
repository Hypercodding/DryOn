import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Role from "@/models/Role";
import RolePermission from "@/models/RolePermission";
import Permission from "@/models/Permission";
import AdminUser from "@/models/AdminUser";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await auth();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await connectDB();

        const roles = await Role.find({}).sort({ createdAt: 1 });

        if (roles.length === 0) {
            return NextResponse.json([]);
        }

        // Get all role permissions for all roles
        const roleIds = roles.map(r => r._id);
        const allRolePermissions = await RolePermission.find({ roleId: { $in: roleIds } })
            .populate('permissionId');

        // Add user count and role permissions to each role
        const rolesWithCount = await Promise.all(
            roles.map(async (role) => {
                const userCount = await AdminUser.countDocuments({ roleId: role._id });
                const rolePermissions = allRolePermissions
                    .filter(rp => rp.roleId.toString() === role._id.toString())
                    .map(rp => {
                        const rpObj = rp.toObject();
                        // permissionId is populated, so it's the full Permission object
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
                    .filter(rp => rp.permission !== null); // Filter out any with null permissions
                
                const roleObj = role.toObject();
                return {
                    ...roleObj,
                    rolePermissions,
                    _count: { users: userCount }
                };
            })
        );

        return NextResponse.json(rolesWithCount);
    } catch (error) {
        console.error('Error fetching roles:', error);
        return NextResponse.json({ error: "Failed to fetch roles" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        await connectDB();
        const body = await req.json();
        const { name, description, color, permissionIds } = body;

        const role = await Role.create({
            name,
            description: description || '',
            color: color || 'bg-gray-500',
        });

        // Create role permissions
        if (permissionIds && permissionIds.length > 0) {
            await RolePermission.insertMany(
                permissionIds.map((pid: string) => ({
                    roleId: role._id,
                    permissionId: pid
                }))
            );
        }

        // Get role permissions with populated permissions
        const rolePermissions = await RolePermission.find({ roleId: role._id })
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
        console.error(error);
        return NextResponse.json({ error: "Error creating role" }, { status: 500 });
    }
}

