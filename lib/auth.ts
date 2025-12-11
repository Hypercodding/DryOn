import NextAuth, { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
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

                const user = await prisma.adminUser.findUnique({
                    where: { email: credentials.email as string },
                    include: { 
                        role: {
                            include: { permissions: true }
                        }
                    }
                });

                if (!user || !user.isActive) return null;

                const passwordsMatch = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (passwordsMatch) {
                    // Update last login
                    await prisma.adminUser.update({
                        where: { id: user.id },
                        data: { lastLoginAt: new Date() }
                    });

                    // Log the login
                    await prisma.activityLog.create({
                        data: {
                            userId: user.id,
                            action: 'login',
                            module: 'auth',
                            details: JSON.stringify({ email: user.email }),
                        }
                    });

                    return { 
                        id: user.id, 
                        email: user.email, 
                        name: user.name,
                        role: user.role?.name || 'User',
                        permissions: user.role?.permissions.map(p => p.name) || []
                    };
                }

                return null;
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
