import type { Metadata } from "next";
import "@/app/globals.css";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
    title: "Admin Dashboard - DryON",
    description: "DryON Pakistan Admin Panel",
};

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    const showSidebar = !!session;

    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-slate-100 min-h-screen">
                <SessionProvider session={session}>
                    {showSidebar && <AdminSidebar />}
                    <main className={`
                        min-h-screen transition-all duration-300
                        ${showSidebar ? 'lg:ml-72' : ''}
                    `}>
                        {showSidebar && (
                            <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
                                <div className="px-6 lg:px-8 py-4 flex items-center justify-between">
                                    <div className="lg:hidden w-10" /> {/* Spacer for mobile menu button */}
                                    <h2 className="text-lg font-semibold text-slate-800 hidden lg:block">
                                        Welcome back! 👋
                                    </h2>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm text-slate-500">
                                            {new Date().toLocaleDateString('en-US', { 
                                                weekday: 'long', 
                                                year: 'numeric', 
                                                month: 'long', 
                                                day: 'numeric' 
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </header>
                        )}
                        <div className={showSidebar ? 'p-6 lg:p-8' : ''}>
                            {children}
                        </div>
                    </main>
                </SessionProvider>
            </body>
        </html>
    );
}
