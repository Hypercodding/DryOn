'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Droplets, Package, Shield, Apple, Leaf } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface Product {
    id: string;
    sku: string;
    images: string;
    featured: boolean;
    category?: {
        id: string;
        slug: string;
        icon: string;
        color: string;
        translations?: Array<{ locale: string; name: string; description: string }>;
    };
    translations: Array<{ locale: string; name: string; description: string }>;
}

interface ProductCategory {
    id: string;
    slug: string;
    icon: string;
    color: string;
    translations?: Array<{ locale: string; name: string; description: string }>;
}

interface CategoryWithProducts {
    category: ProductCategory;
    products: Product[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Droplets,
    Package,
    Shield,
    Apple,
    Leaf,
    Box: Package,
    Container: Package,
    Truck: Package,
};

import type { CategoryWithProducts as ServerCategoryWithProducts } from '@/lib/fetchProducts';

interface ProductsSectionProps {
    initialData?: ServerCategoryWithProducts[];
}

export default function ProductsSection({ initialData }: ProductsSectionProps) {
    const [categoriesWithProducts, setCategoriesWithProducts] = useState<CategoryWithProducts[]>([]);
    const [isLoading, setIsLoading] = useState(!initialData || initialData.length === 0);
    const t = useTranslations('ProductsSection');

    useEffect(() => {
        // If we have initial data from server, use it immediately
        if (initialData && initialData.length > 0) {
            // Transform server data to match client-side format
            const transformed = initialData.map(({ category, products }) => ({
                category: {
                    id: category.id,
                    slug: category.slug,
                    icon: category.icon,
                    color: category.color,
                    translations: category.translations || []
                },
                products: products.map(p => ({
                    id: p.id,
                    sku: p.sku,
                    images: p.images,
                    featured: p.featured,
                    category: p.category ? {
                        id: p.category.id,
                        slug: p.category.slug,
                        icon: p.category.icon,
                        color: p.category.color,
                        translations: p.category.translations || []
                    } : undefined,
                    translations: p.translations || []
                }))
            }));
            setCategoriesWithProducts(transformed);
            setIsLoading(false);
            return;
        }

        // Fallback: fetch from API if no initial data (shouldn't happen in production)
        const fetchData = async () => {
            try {
                // Fetch all categories
                const categoriesRes = await fetch('/api/product-categories');
                if (!categoriesRes.ok) {
                    setIsLoading(false);
                    return;
                }

                const categories: ProductCategory[] = await categoriesRes.json();
                
                // Fetch products for each category
                const categoryPromises = categories.map(async (category) => {
                    try {
                        const productsRes = await fetch(`/api/products?category=${category.slug}&limit=10`);
                        if (productsRes.ok) {
                            const products: Product[] = await productsRes.json();
                            // Only include categories that have at least 1 product
                            if (products.length > 0) {
                                return { category, products };
                            }
                        }
                    } catch (error) {
                        // Failed to fetch products for category
                    }
                    return null;
                });

                const results = await Promise.all(categoryPromises);
                const validCategories = results.filter((item): item is CategoryWithProducts => item !== null);
                
                setCategoriesWithProducts(validCategories);
            } catch (error) {
                // Failed to fetch data
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [initialData]);

    const getProductName = (product: Product) => {
        const translation = product.translations?.find(t => t.locale === 'en') || product.translations?.[0];
        return translation?.name || product.sku;
    };

    const getProductImage = (product: Product) => {
        try {
            const images = JSON.parse(product.images || '[]');
            return images[0] || '/images/product-placeholder.jpg';
        } catch {
            return '/images/product-placeholder.jpg';
        }
    };

    const getCategoryName = (category: ProductCategory) => {
        const translation = category.translations?.find(t => t.locale === 'en') || category.translations?.[0];
        return translation?.name || category.slug;
    };

    const getCategoryDescription = (category: ProductCategory) => {
        const translation = category.translations?.find(t => t.locale === 'en') || category.translations?.[0];
        return translation?.description || '';
    };

    return (
        <section className="py-24 bg-gray-50 relative overflow-hidden">
            {/* Wave Pattern Top */}
            <svg 
                className="absolute -top-1 left-0 w-full h-12 text-white"
                viewBox="0 0 1440 48" 
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                    fill="currentColor"
                    d="M0,24 C240,48 480,0 720,24 C960,48 1200,0 1440,24 L1440,0 L0,0 Z"
                />
            </svg>

            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block"
                    >
                        {t('badge')}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-6"
                    >
                        {t('title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate text-lg max-w-2xl mx-auto"
                    >
                        {t('subtitle')}
                    </motion.p>
                </div>

                {/* Category Sections */}
                {isLoading ? (
                    <div className="space-y-16">
                        {[...Array(3)].map((_, catIdx) => (
                            <div key={catIdx} className="space-y-6">
                                <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse" />
                                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                                    {[...Array(5)].map((_, idx) => (
                                        <div key={idx} className="bg-white rounded-2xl p-6 shadow-float border border-gray-100 animate-pulse">
                                            <div className="w-full h-48 bg-gray-200 rounded-xl mb-4" />
                                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                                            <div className="h-3 bg-gray-200 rounded w-1/2" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : categoriesWithProducts.length > 0 ? (
                    <div className="space-y-16">
                        {categoriesWithProducts.map(({ category, products }, catIdx) => {
                            const IconComponent = iconMap[category.icon] || Package;
                            const displayProducts = products.slice(0, 5); // Show at least 5 products
                            const hasMore = products.length > 5;

                            return (
                                <motion.div
                                    key={category.id || category.slug || `category-${catIdx}`}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: catIdx * 0.1 }}
                                    className="space-y-6"
                                >
                                    {/* Category Header */}
                                    <div className="flex items-center justify-between flex-wrap gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color || 'from-primary to-primary-dark'} flex items-center justify-center shadow-lg`}>
                                                <IconComponent className="w-7 h-7 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl md:text-3xl font-bold text-secondary">
                                                    {getCategoryName(category)}
                                                </h3>
                                                {getCategoryDescription(category) && (
                                                    <p className="text-slate text-sm mt-1">
                                                        {getCategoryDescription(category)}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        {hasMore && (
                                            <Link
                                                href={`/products?category=${category.slug}`}
                                                className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold group"
                                            >
                                                {t('exploreMore')}
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        )}
                                    </div>

                                    {/* Products Grid */}
                                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                                        {displayProducts.map((product, idx) => (
                                            <motion.div
                                                key={product.id || product.sku || `${category.id}-${idx}`}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: (catIdx * 0.1) + (idx * 0.05) }}
                                            >
                                                <Link
                                                    href={`/products/${product.sku}`}
                                                    className="block bg-white rounded-2xl overflow-hidden shadow-float hover:shadow-xl transition-all card-3d border border-gray-100 h-full group"
                                                >
                                                    {/* Product Image */}
                                                    <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                                                        <Image
                                                            src={getProductImage(product)}
                                                            alt={getProductName(product)}
                                                            fill
                                                            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                        {/* Featured Badge */}
                                                        {product.featured && (
                                                            <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                                                                {t('featured')}
                                                            </div>
                                                        )}
                                                    </div>
                                    
                                                    {/* Product Info */}
                                                    <div className="p-4">
                                                        <h4 className="text-base font-bold text-secondary mb-1 group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem]">
                                                            {getProductName(product)}
                                                        </h4>
                                                        <p className="text-slate text-xs mb-2">
                                                            SKU: {product.sku}
                                                        </p>
                                                        <span className="text-primary font-semibold text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
                                                            {t('viewDetails')} <ArrowRight className="w-3 h-3" />
                                                        </span>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-slate text-lg">{t('noProducts')}</p>
                    </div>
                )}

                {/* Global Explore All CTA */}
                {categoriesWithProducts.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-16"
                    >
                        <Link 
                            href="/products"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl group"
                        >
                            {t('exploreAll')}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                )}
            </div>

            {/* Wave Pattern Bottom */}
            <svg 
                className="absolute -bottom-1 left-0 w-full h-12 text-white"
                viewBox="0 0 1440 48" 
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                    fill="currentColor"
                    d="M0,24 C240,0 480,48 720,24 C960,0 1200,48 1440,24 L1440,48 L0,48 Z"
                />
            </svg>
        </section>
    );
}
