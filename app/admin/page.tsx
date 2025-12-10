import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
    const session = await auth();
    if (!session) redirect("/admin/login");

    return (
        <div>
            <h1 className="text-2xl font-bold text-navy mb-4">Dashboard Overview</h1>
            <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                <p className="text-gray-600">Welcome to the Cargo Protection Admin Panel.</p>
                <p className="mt-2 text-sm text-gray-400">Select an item from the sidebar to manage content.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                    <h3 className="font-bold text-lg text-navy">Total Products</h3>
                    <p className="text-3xl font-bold text-teal-600 mt-2">0</p>
                </div>
                <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                    <h3 className="font-bold text-lg text-navy">Active Locales</h3>
                    <p className="text-3xl font-bold text-teal-600 mt-2">4</p>
                </div>
                <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                    <h3 className="font-bold text-lg text-navy">System Status</h3>
                    <p className="text-lg font-bold text-green-500 mt-2">Operational</p>
                </div>
            </div>
        </div>
    );
}
