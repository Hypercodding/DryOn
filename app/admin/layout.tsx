import type { Metadata } from "next";
import "@/app/globals.css";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
    title: "Admin Dashboard - DryOn",
    description: "Admin panel",
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
            <body className={`bg-gray-50 ${showSidebar ? 'flex' : ''}`}>
                {showSidebar && <AdminSidebar />}
                <main className={showSidebar ? "flex-1 ml-64 min-h-screen p-8" : "min-h-screen"}>
                    {children}
                </main>
            </body>
        </html>
    );
}
