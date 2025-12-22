import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductTranslation from "@/models/ProductTranslation";
import ProductCategory from "@/models/ProductCategory";
import ProductCategoryTranslation from "@/models/ProductCategoryTranslation";
import { Link } from '@/lib/navigation';
import { notFound } from "next/navigation";
import ContainerVisualizer from "@/components/ContainerVisualizer";
import { getTranslations } from 'next-intl/server';
import Footer from '@/components/Footer';
import { Package } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ProductDetailsPage(props: {
    params: Promise<{ locale: string; sku: string }>;
}) {
    await connectDB();
    const params = await props.params;

    const {
        locale,
        sku
    } = params;

    const product = await Product.findOne({ sku });

    if (!product) {
        notFound();
    }

    // Convert Mongoose document to plain object to avoid serialization issues
    const productData = product.toObject();
    
    const translations = await ProductTranslation.find({ productId: product._id });
    const translation =
        translations.find(tr => tr.locale === locale) ||
        translations.find(tr => tr.locale === 'en') ||
        translations[0];
    
    // Get category information if available
    let categoryInfo = null;
    if (productData.categoryId) {
        const category = await ProductCategory.findById(productData.categoryId);
        if (category) {
            const categoryTranslations = await ProductCategoryTranslation.find({ productCategoryId: category._id });
            const categoryTranslation = 
                categoryTranslations.find(tr => tr.locale === locale) ||
                categoryTranslations.find(tr => tr.locale === 'en') ||
                categoryTranslations[0];
            
            if (categoryTranslation) {
                categoryInfo = {
                    name: categoryTranslation.name,
                    description: categoryTranslation.description || ''
                };
            }
        }
    }
    
    const t = await getTranslations('ProductDetailsPage');

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <div className="flex-1 pt-28 pb-12 sm:pb-16">
                <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    {/* Back Link */}
                    <Link 
                        href="/products" 
                        className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold mb-6 sm:mb-8 transition-colors group"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform">←</span>
                        <span>{t('backToProducts')}</span>
                    </Link>

                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-gray-100 mb-12 sm:mb-16">
                        {/* Image Section */}
                        <div className="bg-gradient-to-br from-[#E0EAE8] to-[#E8F5F3] min-h-[500px] lg:min-h-[600px] flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10 relative overflow-hidden">
                            {(() => {
                                try {
                                    const imgs = JSON.parse(productData.images || '[]');
                                    const firstImage = imgs[0] || null;
                                    const secondImage = imgs[1] || null;
                                    
                                    return (
                                        <div className="w-full h-full flex flex-col gap-6">
                                            {/* First Image with Container Visualizer */}
                                            <div className="w-full flex-1 flex items-center justify-center min-h-[350px] bg-white/50 rounded-2xl p-4 sm:p-6 shadow-inner">
                                                <ContainerVisualizer
                                                    points={JSON.parse(productData.containerPoints || '[]')}
                                                    imageUrl={firstImage}
                                                />
                                            </div>
                                            
                                            {/* Second Image (if available) */}
                                            {secondImage && (
                                                <div className="w-full h-56 sm:h-64 bg-white rounded-xl overflow-hidden shadow-lg border-2 border-primary/20 hover:border-primary/40 transition-colors">
                                                    <img 
                                                        src={secondImage} 
                                                        alt={translation?.name || 'Product'} 
                                                        className="w-full h-full object-contain p-4 sm:p-6"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    );
                                } catch { 
                                    return (
                                        <div className="w-full h-full flex items-center justify-center min-h-[350px] bg-white/50 rounded-2xl p-4 sm:p-6">
                                            <ContainerVisualizer
                                                points={JSON.parse(productData.containerPoints || '[]')}
                                                imageUrl={null}
                                            />
                                        </div>
                                    );
                                }
                            })()}
                        </div>

                        {/* Details Section */}
                        <div className="p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-center space-y-6">
                            {/* SKU Badge */}
                            <div>
                                <span className="inline-block bg-secondary text-white text-xs font-mono py-2 px-4 rounded-full tracking-wider shadow-md">
                                    SKU: {productData.sku}
                                </span>
                            </div>

                            {/* Product Title */}
                            <div>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-secondary mb-4 leading-tight">
                                    {translation?.name || t('unnamedProduct')}
                                </h1>
                            </div>
                            
                            {/* Category Subheading with Description */}
                            {categoryInfo && (
                                <div className="p-5 sm:p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/20 shadow-sm">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                            <Package className="w-5 h-5 text-primary" />
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-secondary">
                                            {categoryInfo.name}
                                        </h2>
                                    </div>
                                    {categoryInfo.description && (
                                        <p className="text-slate text-sm sm:text-base leading-relaxed pl-[52px]">
                                            {categoryInfo.description}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Description Section */}
                            <div className="p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 shadow-sm">
                                <h3 className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <span className="w-1 h-4 bg-primary rounded-full"></span>
                                    {t('description')}
                                </h3>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                                    {translation?.description || t('noDescription')}
                                </p>
                            </div>

                            {/* Featured Badge (if applicable) */}
                            {productData.featured && (
                                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full w-fit">
                                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                                    <span className="text-sm font-semibold">Featured Product</span>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="pt-4">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-full sm:w-auto"
                                >
                                    {locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
