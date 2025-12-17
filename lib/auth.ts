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
    secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
    trustHost: true, // Required for Vercel deployments
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log('[AUTH] CredentialsProvider.authorize called', {
                    email: credentials?.email,
                });

                if (!credentials?.email || !credentials?.password) {
                    console.error('[AUTH] Missing credentials', {
                        hasEmail: !!credentials?.email,
                        hasPassword: !!credentials?.password,
                    });
                    return null;
                }

                try {
                    console.log('[AUTH] Connecting to MongoDB...');
                    await connectDB();
                    console.log('[AUTH] MongoDB connection OK');

                    console.log('[AUTH] Looking up admin user by email...');
                    const user = await AdminUser.findOne({ email: credentials.email as string })
                        .populate('roleId');

                    if (!user) {
                        console.error('[AUTH] No admin user found for email', {
                            email: credentials.email,
                        });
                        return null;
                    }

                    if (!user.isActive) {
                        console.error('[AUTH] Admin user is not active', {
                            email: user.email,
                        });
                        return null;
                    }

                    console.log('[AUTH] Comparing password hash...');
                    const passwordsMatch = await bcrypt.compare(
                        credentials.password as string,
                        user.password
                    );

                    if (!passwordsMatch) {
                        console.error('[AUTH] Password mismatch for user', {
                            email: user.email,
                        });
                        return null;
                    }

                    // Get role permissions
                    const role = user.roleId as any;
                    let permissions: string[] = [];

                    if (role?._id) {
                        console.log('[AUTH] Loading role permissions', {
                            roleId: String(role._id),
                            roleName: role.name,
                        });
                        const rolePermissions = await RolePermission.find({ roleId: role._id })
                            .populate('permissionId');
                        permissions = rolePermissions
                            .map((rp: any) => rp.permissionId?.name)
                            .filter(Boolean);
                        console.log('[AUTH] Loaded permissions count', {
                            count: permissions.length,
                        });
                    } else {
                        console.warn('[AUTH] User has no roleId populated', {
                            email: user.email,
                            roleId: role?._id,
                        });
                    }

                    // Update last login (don't fail if this fails)
                    try {
                        console.log('[AUTH] Updating lastLoginAt for user', {
                            userId: String(user._id),
                        });
                        await AdminUser.findByIdAndUpdate(user._id, { lastLoginAt: new Date() });
                    } catch (updateError) {
                        console.error('[AUTH] Failed to update last login', {
                            error: updateError,
                        });
                    }

                    // Log the login (don't fail if this fails)
                    try {
                        console.log('[AUTH] Creating ActivityLog entry for login', {
                            userId: String(user._id),
                        });
                        await ActivityLog.create({
                            userId: user._id,
                            action: 'login',
                            module: 'auth',
                            details: JSON.stringify({ email: user.email }),
                        });
                    } catch (logError) {
                        console.error('[AUTH] Failed to log activity', {
                            error: logError,
                        });
                    }

                    console.log('[AUTH] Login successful, returning session user', {
                        id: String(user._id),
                        email: user.email,
                        role: role?.name || 'User',
                        permissionsCount: permissions.length,
                    });

                    return { 
                        id: user._id.toString(), 
                        email: user.email, 
                        name: user.name,
                        role: role?.name || 'User',
                        permissions
                    };
                } catch (error: any) {
                    console.error('[AUTH] Unexpected error in authorize', {
                        message: error?.message,
                        stack: error?.stack,
                        name: error?.name,
                    });
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
