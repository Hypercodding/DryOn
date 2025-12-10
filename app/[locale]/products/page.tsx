import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { Link } from '@/lib/navigation';
// import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function ProductsPage(props: {
    params: Promise<{ locale: string }>;
}) {
    const params = await props.params;

    const {
        locale
    } = params;

    const t = await getTranslations('ProductsPage');

    const products = await prisma.product.findMany({
        include: {
            translations: true
        }
    });

    return (
        <div className="min-h-screen bg-gray-50 font-sans pt-20">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-[#0F172A] to-[#00897B] text-white py-20 px-4 mb-12">
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl font-extrabold mb-4 tracking-tight drop-shadow-md">
                        {t('title')}
                    </h1>
                    <p className="text-xl max-w-2xl mx-auto opacity-90 font-light">
                        {t('description')}
                    </p>
                </div>
                {/* Decorative curve or shape could go here */}
            </div>

            <div className="container mx-auto px-4 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => {
                        const translation =
                            product.translations.find(tr => tr.locale === locale) ||
                            product.translations.find(tr => tr.locale === 'en') ||
                            product.translations[0];

                        return (
                            <Link
                                key={product.id}
                                href={`/products/${product.sku}`}
                                className="group block h-full"
                            >
                                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full border border-gray-100 flex flex-col">
                                    {/* Image Area */}
                                    <div className="h-64 bg-[#E0EAE8] relative flex items-center justify-center overflow-hidden group-hover:bg-[#d0dfdc] transition-colors">
                                        <span className="text-gray-400 font-medium tracking-wider group-hover:scale-105 transition-transform">
                                            {/* Placeholder for real image */}
                                            PRODUCT IMAGE
                                        </span>
                                        {/* Overlay effect */}
                                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity" />
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <h2 className="text-2xl font-bold mb-3 text-[#0F172A] group-hover:text-[#00BFA5] transition-colors">
                                            {translation?.name || 'Unnamed Product'}
                                        </h2>
                                        <p className="text-gray-600 line-clamp-3 mb-6 flex-1">
                                            {translation?.description || 'No description available.'}
                                        </p>

                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                            <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-500">
                                                SKU: {product.sku}
                                            </span>
                                            <span className="text-[#00BFA5] font-semibold text-sm flex items-center opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                                                View Details &rarr;
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}

                    {products.length === 0 && (
                        <div className="col-span-full text-center py-20 bg-white rounded-xl shadow-sm">
                            <p className="text-gray-500 text-lg">
                                {locale === 'ar' ? 'لا توجد منتجات متاحة حاليا.' : 'No products found at the moment.'}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}