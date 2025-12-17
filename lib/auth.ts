import NextAuth, { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectDB from '@/lib/mongodb';
import AdminUser from '@/models/AdminUser';
import Role from '@/models/Role';
import RolePermission from '@/models/RolePermission';
import Permission from '@/models/Permission';
import ActivityLog from '@/models/ActivityLog';
import bcrypt from 'bcryptjs';

export const authConfig: NextAuthConfig = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                try {
                    await connectDB();

                    const user = await AdminUser.findOne({ email: credentials.email as string })
                        .populate('roleId');

                    if (!user || !user.isActive) {
                        return null;
                    }

                    const passwordsMatch = await bcrypt.compare(
                        credentials.password as string,
                        user.password
                    );

                    if (!passwordsMatch) {
                        return null;
                    }

                    // Get role permissions
                    const role = user.roleId as any;
                    let permissions: string[] = [];

                    if (role?._id) {
                        const rolePermissions = await RolePermission.find({ roleId: role._id })
                            .populate('permissionId');
                        permissions = rolePermissions
                            .map((rp: any) => rp.permissionId?.name)
                            .filter(Boolean);
                    }

                    // Update last login
                    await AdminUser.findByIdAndUpdate(user._id, { lastLoginAt: new Date() });

                    // Log the login
                    await ActivityLog.create({
                        userId: user._id,
                        action: 'login',
                        module: 'auth',
                        details: JSON.stringify({ email: user.email }),
                    });

                    return { 
                        id: user._id.toString(), 
                        email: user.email, 
                        name: user.name,
                        role: role?.name || 'User',
                        permissions
                    };
                } catch (error) {
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/admin/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = (user as any).id;
                token.role = (user as any).role;
                token.permissions = (user as any).permissions;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id;
                (session.user as any).role = token.role;
                (session.user as any).permissions = token.permissions;
            }
            return session;
        }
    },
    session: {
        strategy: 'jwt'
    }
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

// Helper function to check permissions
export async function checkPermission(session: any, permission: string): Promise<boolean> {
    if (!session?.user?.permissions) return false;
    return (session.user.permissions as string[]).includes(permission);
}

// Helper function to check if user has any of the required permissions
export async function hasAnyPermission(session: any, permissions: string[]): Promise<boolean> {
    if (!session?.user?.permissions) return false;
    return permissions.some(p => (session.user.permissions as string[]).includes(p));
}
