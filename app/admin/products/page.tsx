import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductTranslation from "@/models/ProductTranslation";
import ProductCategoryTranslation from "@/models/ProductCategoryTranslation";
import IndustryCategoryTranslation from "@/models/IndustryCategoryTranslation";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Edit, Plus } from "lucide-react";
import DeleteProductButton from "./DeleteProductButton";

export default async function ProductList() {
    const session = await auth();
    if (!session) redirect("/admin/login");

    await connectDB();

    const products = await Product.find({})
        .populate('categoryId')
        .populate('industryId')
        .sort({ createdAt: -1 });

    const productIds = products.map(p => p._id);
    const translations = await ProductTranslation.find({ productId: { $in: productIds } });
    const categoryIds = products.map(p => p.categoryId).filter(Boolean);
    const industryIds = products.map(p => p.industryId).filter(Boolean);
    const categoryTranslations = await ProductCategoryTranslation.find({ productCategoryId: { $in: categoryIds } });
    const industryTranslations = await IndustryCategoryTranslation.find({ industryCategoryId: { $in: industryIds } });

    const productsWithTranslations = products.map(product => {
        const productTrans = translations.filter(t => t.productId.toString() === product._id.toString());
        const category = product.categoryId as any;
        const industry = product.industryId as any;
        const catTrans = category ? categoryTranslations.filter(t => t.productCategoryId.toString() === category._id.toString()) : [];
        const indTrans = industry ? industryTranslations.filter(t => t.industryCategoryId.toString() === industry._id.toString()) : [];
        
        return {
            ...product.toObject(),
            id: product._id.toString(),
            translations: productTrans,
            category: category ? {
                ...category.toObject(),
                translations: catTrans
            } : null,
            industry: industry ? {
                ...industry.toObject(),
                translations: indTrans
            } : null
        };
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-secondary">Products</h1>
                <Link
                    href="/admin/products/new"
                    className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Product
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-bold text-secondary">SKU</th>
                            <th className="p-4 font-bold text-secondary">Name (EN)</th>
                            <th className="p-4 font-bold text-secondary">Category</th>
                            <th className="p-4 font-bold text-secondary">Industry</th>
                            <th className="p-4 font-bold text-secondary">Featured</th>
                            <th className="p-4 font-bold text-secondary text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-gray-500">
                                    No products found. Click &quot;Add Product&quot; to create one.
                                </td>
                            </tr>
                        ) : (
                            productsWithTranslations.map(product => {
                                const enTrans = product.translations.find((t: any) => t.locale === 'en');
                                const catTrans = product.category?.translations.find((t: any) => t.locale === 'en');
                                const indTrans = product.industry?.translations.find((t: any) => t.locale === 'en');
                                
                                return (
                                    <tr key={product.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                                        <td className="p-4 font-medium font-mono text-sm">{product.sku}</td>
                                        <td className="p-4">{enTrans?.name || '-'}</td>
                                        <td className="p-4">
                                            {product.category ? (
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                                    {catTrans?.name || product.category.slug}
                                                </span>
                                            ) : (
                                                <span className="text-gray-400 text-sm">-</span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            {product.industry ? (
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                                                    {indTrans?.name || product.industry.slug}
                                                </span>
                                            ) : (
                                                <span className="text-gray-400 text-sm">-</span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            {product.featured ? (
                                                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                                                    Yes
                                                </span>
                                            ) : (
                                                <span className="text-gray-400 text-sm">No</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link 
                                                    href={`/admin/products/${product.id}`} 
                                                    className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </Link>
                                                <DeleteProductButton productId={product.id} productName={enTrans?.name || product.sku} />
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
