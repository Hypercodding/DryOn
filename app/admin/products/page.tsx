import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Edit, Trash2, Plus } from "lucide-react";

export default async function ProductList() {
    const session = await auth();
    if (!session) redirect("/admin/login");

    const products = await prisma.product.findMany({
        include: {
            translations: true
        }
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-navy">Products</h1>
                <Link
                    href="/admin/products/new"
                    className="bg-primary hover:bg-teal-600 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Product
                </Link>
            </div>

            <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-bold text-navy">SKU</th>
                            <th className="p-4 font-bold text-navy">Name (EN)</th>
                            <th className="p-4 font-bold text-navy">Translations</th>
                            <th className="p-4 font-bold text-navy text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-gray-500">
                                    No products found. Click "Add Product" to create one.
                                </td>
                            </tr>
                        ) : (
                            products.map(product => {
                                const enTrans = product.translations.find(t => t.locale === 'en');
                                return (
                                    <tr key={product.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                                        <td className="p-4 font-medium">{product.sku}</td>
                                        <td className="p-4">{enTrans?.name || '-'}</td>
                                        <td className="p-4">
                                            <div className="flex gap-1">
                                                {['en', 'fr', 'es', 'ar'].map(lang => {
                                                    const hasLang = product.translations.some(t => t.locale === lang);
                                                    return (
                                                        <span
                                                            key={lang}
                                                            className={`text-xs px-2 py-0.5 rounded ${hasLang ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}
                                                        >
                                                            {lang}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/admin/products/${product.id}`} className="text-blue-500 hover:text-blue-700 p-1">
                                                    <Edit className="w-5 h-5" />
                                                </Link>
                                                {/* TODO: Add Delete Action with API */}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
