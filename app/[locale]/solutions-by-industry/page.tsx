'use client';

import { useState, useEffect } from 'react';
import { Factory, Ship, Package, Leaf, Shirt, Apple, Wrench, Car, Coffee, Box, Building, Truck, Filter, ArrowRight, ArrowLeft, Droplets, Shield } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface IndustryCategory {
    id: string;
    slug: string;
    icon: string;
    color: string;
    name: string;
    productCount: number;
}

interface ProductCategory {
    id: string;
    slug: string;
    translations: Array<{ locale: string; name: string }>;
}

interface Product {
    id: string;
    sku: string;
    categoryId: string | null;
    category: ProductCategory | null;
    featured: boolean;
    images: string;
    translations: Array<{
        locale: string;
        name: string;
        description: string;
    }>;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Factory,
    Leaf,
    Shirt,
    Package,
    Apple,
    Wrench,
    Car,
    Ship,
    Coffee,
    Box,
    Building,
    Truck,
    Droplets,
    Shield,
};

const industryDescriptions: Record<string, string> = {
    'agriculture': 'Protect crops, grains, and agricultural commodities from moisture damage during storage and shipping.',
    'dry-fruits': 'Keep dry fruits fresh and prevent moisture-related quality degradation during export.',
    'textile': 'Protect textile apparels and fabrics from mold, mildew, and moisture damage.',
    'leather': 'Preserve leather goods quality by preventing moisture-induced damage and odors.',
    'processed-food': 'Ensure processed food products remain fresh and safe during distribution.',
    'canned-items': 'Protect canned goods from external moisture and rust during transit.',
    'engineering': 'Safeguard engineering goods and machinery from corrosion and rust.',
    'automotive': 'Protect automotive parts and vehicles from corrosion during shipping.',
    'logistics': 'Comprehensive moisture protection for all cargo types during transportation.',
};

export default function SolutionsByIndustryPage() {
    const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
    const [industries, setIndustries] = useState<IndustryCategory[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [productsLoading, setProductsLoading] = useState(false);
    const t = useTranslations('SolutionsByIndustryPage');

    useEffect(() => {
        const fetchIndustries = async () => {
            try {
                const res = await fetch('/api/industry-categories');
                if (res.ok) {
                    const data = await res.json();
                    setIndustries(data);
                }
            } catch (error) {
                console.error('Failed to fetch industries:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchIndustries();

        // Check URL for industry filter
        const urlParams = new URLSearchParams(window.location.search);
        const industryParam = urlParams.get('industry');
        if (industryParam) {
            setSelectedIndustry(industryParam);
        }
    }, []);

    // Fetch products when industry is selected
    useEffect(() => {
        if (selectedIndustry) {
            const fetchProducts = async () => {
                setProductsLoading(true);
                try {
                    const res = await fetch(`/api/products?industry=${selectedIndustry}`);
                    if (res.ok) {
                        const data = await res.json();
                        setProducts(data);
                    }
                } catch (error) {
                    console.error('Failed to fetch products:', error);
                } finally {
                    setProductsLoading(false);
                }
            };
            fetchProducts();
        } else {
            setProducts([]);
        }
    }, [selectedIndustry]);

    const handleIndustrySelect = (slug: string) => {
        setSelectedIndustry(slug);
    };

    const getTranslation = (product: Product) => {
        return product.translations?.find(t => t.locale === 'en') || product.translations?.[0];
    };

    const getCategoryName = (product: Product) => {
        if (!product.category) return 'Uncategorized';
        const catTrans = product.category.translations?.find(t => t.locale === 'en');
        return catTrans?.name || product.category.slug;
    };

    const selectedIndustryData = industries.find(ind => ind.slug === selectedIndustry);

    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Hero */}
            <div className="bg-gradient-to-br from-secondary via-secondary-dark to-primary/80 text-white py-28 px-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="1" fill-rule="evenodd"%3E%3Cpath d="M0 40L40 0H20L0 20M40 40V20L20 40"/%3E%3C/g%3E%3C/svg%3E")' }} />
                </div>
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block bg-white/10 text-white/90 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-6"
                    >
                        Industry Solutions
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                    >
                        {selectedIndustryData ? selectedIndustryData.name : t('title')}
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed"
                    >
                        {selectedIndustryData 
                            ? industryDescriptions[selectedIndustryData.slug] || 'Comprehensive moisture protection solutions for this industry.'
                            : t('subtitle')
                        }
                    </motion.p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-20 max-w-7xl">
                {/* Filter Section */}
                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-8">
                        <Filter className="w-6 h-6 text-primary" />
                        <h2 className="text-2xl font-bold text-secondary">{t('filterByIndustry')}</h2>
                    </div>
                    
                    {loading ? (
                        <div className="flex gap-3">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="h-10 w-32 bg-gray-100 rounded-full animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => setSelectedIndustry(null)}
                                className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
                                    selectedIndustry === null 
                                        ? 'bg-primary text-white shadow-lg' 
                                        : 'bg-gray-100 text-secondary hover:bg-gray-200'
                                }`}
                                aria-label="Show all industries"
                                tabIndex={0}
                            >
                                {t('allIndustries')}
                            </button>
                            {industries.map((industry, idx) => {
                                const IconComponent = iconMap[industry.icon] || Factory;
                                return (
                                    <button
                                        key={industry.id || industry.slug || `industry-${idx}`}
                                        onClick={() => handleIndustrySelect(industry.slug)}
                                        className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all flex items-center gap-2 ${
                                            selectedIndustry === industry.slug 
                                                ? 'bg-primary text-white shadow-lg' 
                                                : 'bg-gray-100 text-secondary hover:bg-gray-200'
                                        }`}
                                        aria-label={`Filter by ${industry.name}`}
                                        tabIndex={0}
                                    >
                                        <IconComponent className="w-4 h-4" />
                                        {industry.name}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                <AnimatePresence mode="wait">
                    {/* Show Products when industry is selected */}
                    {selectedIndustry ? (
                        <motion.div
                            key="products"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            {/* Back Button */}
                            <button
                                onClick={() => setSelectedIndustry(null)}
                                className="flex items-center gap-2 text-secondary hover:text-primary mb-8 font-medium transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Back to All Industries
                            </button>

                            {/* Industry Info Card */}
                            {selectedIndustryData && (
                                <div className="bg-gradient-to-br from-secondary to-secondary-dark rounded-2xl p-8 mb-12 text-white">
                                    <div className="flex items-start gap-6">
                                        <div className={`w-20 h-20 ${selectedIndustryData.color} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                                            {(() => {
                                                const IconComponent = iconMap[selectedIndustryData.icon] || Factory;
                                                return <IconComponent className="w-10 h-10 text-white" />;
                                            })()}
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-bold mb-3">{selectedIndustryData.name}</h3>
                                            <p className="text-white/80 text-lg leading-relaxed">
                                                {industryDescriptions[selectedIndustryData.slug] || 'Comprehensive moisture protection solutions for this industry.'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Products Grid */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-secondary mb-6">
                                    Products for {selectedIndustryData?.name}
                                </h3>
                                
                                {productsLoading ? (
                                    <div className="text-center py-20">
                                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                                        <p className="text-slate">Loading products...</p>
                                    </div>
                                ) : products.length === 0 ? (
                                    <div className="text-center py-16 bg-gray-50 rounded-xl">
                                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <p className="text-slate text-lg mb-2">No products assigned to this industry yet.</p>
                                        <p className="text-slate text-sm mb-6">Check out our complete product range:</p>
                                        <Link 
                                            href="/products"
                                            className="inline-flex items-center gap-2 bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-dark transition-colors"
                                        >
                                            View All Products
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {products.map((product, idx) => {
                                            const translation = getTranslation(product);
                                            const images = JSON.parse(product.images || '[]');
                                            const categoryName = getCategoryName(product);

                                            return (
                                                <motion.div
                                                    key={product.id || product.sku || `product-${idx}`}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                >
                                                    <Link
                                                        href={`/products/${product.sku}`}
                                                        className="group block h-full"
                                                    >
                                                        <div className="bg-white rounded-xl overflow-hidden shadow-float hover:shadow-xl transition-all duration-300 h-full border border-gray-100 card-3d flex flex-col">
                                                            {/* Image Area */}
                                                            <div className="h-56 bg-gradient-to-br from-gray-50 to-gray-100 relative flex items-center justify-center overflow-hidden">
                                                                {images[0] ? (
                                                                    <img 
                                                                        src={images[0]} 
                                                                        alt={translation?.name || 'Product'} 
                                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                                    />
                                                                ) : (
                                                                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                                        <Package className="w-10 h-10 text-primary" />
                                                                    </div>
                                                                )}
                                                                
                                                                {/* Category Badge */}
                                                                <div className="absolute top-3 left-3">
                                                                    <span className="bg-secondary/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                                                                        {categoryName}
                                                                    </span>
                                                                </div>

                                                                {product.featured && (
                                                                    <div className="absolute top-3 right-3">
                                                                        <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                                                                            Featured
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {/* Content Area */}
                                                            <div className="p-6 flex-1 flex flex-col">
                                                                <h3 className="text-xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors">
                                                                    {translation?.name || 'Unnamed Product'}
                                                                </h3>
                                                                <p className="text-slate text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                                                                    {translation?.description || 'No description available.'}
                                                                </p>

                                                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                                                    <span className="text-xs font-mono bg-gray-50 px-3 py-1.5 rounded-md text-slate">
                                                                        SKU: {product.sku}
                                                                    </span>
                                                                    <span className="text-primary font-semibold text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                                                        View Details →
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        /* Show Industries Grid when no industry is selected */
                        <motion.div
                            key="industries"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {industries.map((industry, idx) => {
                                const IconComponent = iconMap[industry.icon] || Factory;
                                const description = industryDescriptions[industry.slug] || 'Comprehensive moisture protection solutions for this industry.';
                                
                                return (
                                    <motion.div
                                        key={industry.id || industry.slug || `industry-${idx}`}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        onClick={() => handleIndustrySelect(industry.slug)}
                                        className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all group cursor-pointer"
                                    >
                                        {/* Header */}
                                        <div className="bg-gradient-to-br from-secondary to-secondary-dark p-8 text-white">
                                            <div className={`w-16 h-16 ${industry.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                                                <IconComponent className="w-8 h-8 text-white" />
                                            </div>
                                            <h3 className="text-2xl font-bold mb-2">{industry.name}</h3>
                                            <p className="text-white/80 text-sm leading-relaxed">
                                                {description}
                                            </p>
                                        </div>

                                        {/* Footer */}
                                        <div className="p-6">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-slate">
                                                    {industry.productCount} {industry.productCount === 1 ? 'product' : 'products'}
                                                </span>
                                                <span className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                                                    View Products <ArrowRight className="w-4 h-4" />
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* CTA Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-10 md:p-14 text-center text-white"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('ctaTitle')}</h2>
                    <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                        {t('ctaDescription')}
                    </p>
                    <Link 
                        href="/contact" 
                        className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl group"
                    >
                        {t('ctaButton')}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
