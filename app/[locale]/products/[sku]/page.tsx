import { prisma } from "@/lib/prisma";
import { Link } from '@/lib/navigation';
import { notFound } from "next/navigation";
import ContainerVisualizer from "@/components/ContainerVisualizer";

export const dynamic = 'force-dynamic';

export default async function ProductDetailsPage(props: {
    params: Promise<{ locale: string; sku: string }>;
}) {
    const params = await props.params;

    const {
        locale,
        sku
    } = params;

    const product = await prisma.product.findUnique({
        where: { sku },
        include: {
            translations: true
        }
    });

    if (!product) {
        notFound();
    }

    const translation =
        product.translations.find(tr => tr.locale === locale) ||
        product.translations.find(tr => tr.locale === 'en') ||
        product.translations[0];

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 shadow-inner pt-28">
            <div className="container mx-auto max-w-5xl">
                {/* Back Link */}
                <Link href="/products" className="inline-flex items-center text-[#00897B] font-semibold mb-8 hover:underline">
                    &larr; {locale === 'ar' ? 'عودة إلى المنتجات' :
                        locale === 'fr' ? 'Retour aux produits' :
                            locale === 'es' ? 'Volver a productos' : 'Back to Products'}
                </Link>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
                    {/* Image Section */}
                    <div className="bg-[#E0EAE8] h-auto min-h-[500px] flex items-center justify-center p-8 bg-opacity-30 relative overflow-hidden">
                        <ContainerVisualizer
                            points={JSON.parse(product.containerPoints || '[]')}
                            imageUrl={(() => {
                                try {
                                    const imgs = JSON.parse(product.images);
                                    return imgs.length > 0 ? imgs[0] : null;
                                } catch { return null; }
                            })()}
                        />
                    </div>

                    {/* Details Section */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                        <div className="mb-6">
                            <span className="bg-[#0F172A] text-white text-xs font-mono py-1 px-3 rounded-full mb-4 inline-block tracking-wider">
                                SKU: {product.sku}
                            </span>
                            <h1 className="text-4xl font-extrabold text-[#0F172A] mb-4 leading-tight">
                                {translation?.name || 'Unnamed Product'}
                            </h1>
                        </div>

                        <div className="mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Description</h3>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                {translation?.description || 'No description available for this product.'}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button className="bg-[#00BFA5] hover:bg-[#00897B] text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                {locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                            </button>
                            <button className="bg-white border-2 border-[#0F172A] text-[#0F172A] hover:bg-[#0F172A] hover:text-white font-bold py-4 px-6 rounded-xl transition-all">
                                {locale === 'ar' ? 'تحميل المواصفات' : 'Download Spec Sheet'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
