'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/lib/navigation';
import { useSearchParams } from 'next/navigation';
import { Filter, CheckCircle, Droplets, Package, Leaf, Apple, Shield, Box } from 'lucide-react';
import Footer from '@/components/Footer';

// Icon mapping for categories
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Droplets,
    Package,
    Shield,
    Apple,
    Leaf,
    Box,
};

// These will be populated from translations in the component

interface ProductCategoryFromAPI {
    id: string;
    slug: string;
    icon: string;
    color: string;
    name: string;
    description: string;
    translations: Array<{ locale: string; name: string; description?: string }>;
}

interface DisplayCategory {
    id: string;
    slug: string;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
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

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<DisplayCategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const t = useTranslations('ProductsPage');
    const commonT = useTranslations('Common');
    const searchParams = useSearchParams();
    const locale = useLocale();

    const WHY_CHOOSE = [
        t('whyChoose1'),
        t('whyChoose2'),
        t('whyChoose3'),
        t('whyChoose4'),
        t('whyChoose5'),
        t('whyChoose6'),
        t('whyChoose7'),
    ];

    const BENEFITS = [
        t('benefit1'),
        t('benefit2'),
        t('benefit3'),
        t('benefit4'),
        t('benefit5'),
        t('benefit6'),
        t('benefit7'),
        t('benefit8'),
        t('benefit9'),
        t('benefit10'),
    ];

    // Fetch categories from backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`/api/product-categories?locale=${locale}`);
                if (res.ok) {
                    const data: ProductCategoryFromAPI[] = await res.json();
                    
                    // Transform API data to display format
                    const displayCategories: DisplayCategory[] = [
                        {
                            id: 'all',
                            slug: 'all',
                            name: t('allProducts'),
                            icon: Package,
                            description: t('viewCompleteRange')
                        },
                        ...data.map(cat => {
                            // Find translation for current locale, fallback to English, then use API name/description
                            const translation = cat.translations?.find(t => t.locale === locale) ||
                                              cat.translations?.find(t => t.locale === 'en');
                            
                            return {
                                id: cat.id,
                                slug: cat.slug,
                                name: translation?.name || cat.name || cat.slug,
                                icon: iconMap[cat.icon] || Package,
                                description: translation?.description || cat.description || ''
                            };
                        })
                    ];
                    
                    setCategories(displayCategories);
                }
            } catch (error) {
                // Fallback to just "All Products"
                setCategories([{
                    id: 'all',
                    slug: 'all',
                    name: t('allProducts'),
                    icon: Package,
                    description: t('viewCompleteRange')
                }]);
            } finally {
                setCategoriesLoading(false);
            }
        };
        fetchCategories();
    }, [locale, t]);

    // Set initial category from URL
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam && categories.some(c => c.slug === categoryParam)) {
            setSelectedCategory(categoryParam);
        }
    }, [searchParams, categories]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                // Error fetching products
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = selectedCategory === 'all' 
        ? products 
        : products.filter(p => p.category?.slug === selectedCategory);

    const getTranslation = (product: Product) => {
        return product.translations?.find(t => t.locale === 'en') || product.translations?.[0];
    };

    const getCategoryName = (product: Product) => {
        if (!product.category) return t('uncategorized');
        const catTrans = product.category.translations?.find(t => t.locale === 'en');
        return catTrans?.name || product.category.slug;
    };

    const getSelectedCategoryInfo = () => {
        return categories.find(c => c.slug === selectedCategory);
    };

    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-secondary via-secondary-dark to-primary/80 text-white py-24 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <span className="inline-block bg-white/10 text-white/90 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
                        {t('heroBadge')}
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-shadow-lg">
                        {t('heroTitle')}
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed max-w-3xl mx-auto">
                        {t('heroSubtitle')}
                    </p>
                </div>
            </div>

            {/* Intro Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <p className="text-lg text-slate leading-relaxed mb-8">
                        {t('introDescription')}
                    </p>
                    <p className="text-secondary font-semibold">
                        {t('introCTA')}
                    </p>
                </div>
            </section>

            {/* Category Filter */}
            <section className="py-12 bg-white border-b border-gray-100">
                <div className="container mx-auto px-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Filter className="w-5 h-5 text-primary" />
                        <h2 className="text-lg font-bold text-secondary">{t('filterByCategory')}</h2>
                    </div>
                    
                    {categoriesLoading ? (
                        <div className="flex gap-4">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="h-20 w-32 bg-gray-100 rounded-xl animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {categories.map((cat, idx) => {
                                const IconComponent = cat.icon;
                                return (
                                    <button
                                        key={cat.id || cat.slug || `cat-${idx}`}
                                        onClick={() => setSelectedCategory(cat.slug)}
                                        className={`p-4 rounded-xl text-left transition-all ${
                                            selectedCategory === cat.slug 
                                                ? 'bg-primary text-white shadow-lg scale-[1.02]' 
                                                : 'bg-gray-50 hover:bg-gray-100 text-secondary border border-gray-200'
                                        }`}
                                    >
                                        <IconComponent className={`w-6 h-6 mb-2 ${selectedCategory === cat.slug ? 'text-white' : 'text-primary'}`} />
                                        <div className="font-bold text-sm">{cat.name}</div>
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {/* Category Description */}
                    {selectedCategory !== 'all' && getSelectedCategoryInfo() && (
                        <div className="mt-6 p-6 bg-primary/5 rounded-xl border border-primary/10">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 mt-1">
                                    {(() => {
                                        const IconComponent = getSelectedCategoryInfo()?.icon || Package;
                                        return <IconComponent className="w-6 h-6 text-primary" />;
                                    })()}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-secondary mb-2">
                                        {getSelectedCategoryInfo()?.name}
                                    </h3>
                                    {getSelectedCategoryInfo()?.description ? (
                                        <p className="text-slate leading-relaxed">
                                            {getSelectedCategoryInfo()?.description}
                                        </p>
                                    ) : (
                                        <p className="text-slate leading-relaxed">
                                            {t('browseCategoryProducts')}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                            <p className="text-slate">{t('loadingProducts')}</p>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="text-center py-20 bg-gray-50 rounded-xl">
                            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-slate text-lg">{t('noProductsFound')}</p>
                            <button 
                                onClick={() => setSelectedCategory('all')}
                                className="mt-4 text-primary font-semibold hover:underline"
                            >
                                {t('viewAllProducts')}
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProducts.map((product, idx) => {
                                const translation = getTranslation(product);
                                const images = JSON.parse(product.images || '[]');
                                const categorySlug = product.category?.slug || '';
                                const categoryInfo = categories.find(c => c.slug === categorySlug);
                                const categoryName = getCategoryName(product);

                                return (
                                    <Link
                                        key={product.id || product.sku || `product-${idx}`}
                                        href={`/products/${product.sku}`}
                                        className="group block h-full"
                                    >
                                        <div className="bg-white rounded-xl overflow-hidden shadow-float hover:shadow-xl transition-all duration-300 h-full border border-gray-100 card-3d flex flex-col">
                                            {/* Image Area */}
                                            <div className="h-56 bg-gradient-to-br from-gray-50 to-gray-100 relative flex items-center justify-center overflow-hidden">
                                                {images.length > 0 ? (
                                                    <div className="w-full h-full flex">
                                                        {/* First Image */}
                                                        <div className="flex-1 relative overflow-hidden">
                                                            <img 
                                                                src={images[0]} 
                                                                alt={translation?.name || 'Product'} 
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                            />
                                                        </div>
                                                        {/* Second Image (if available) */}
                                                        {images[1] && (
                                                            <div className="flex-1 relative overflow-hidden border-l-2 border-white/50">
                                                                <img 
                                                                    src={images[1]} 
                                                                    alt={translation?.name || 'Product'} 
                                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        {categoryInfo?.icon && <categoryInfo.icon className="w-10 h-10 text-primary" />}
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
                                                            {t('featured')}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content Area */}
                                            <div className="p-6 flex-1 flex flex-col">
                                                <h3 className="text-xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors">
                                                    {translation?.name || t('unnamedProduct')}
                                                </h3>
                                                <p className="text-slate text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                                                    {translation?.description || t('noDescription')}
                                                </p>

                                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                                    <span className="text-xs font-mono bg-gray-50 px-3 py-1.5 rounded-md text-slate">
                                                        {t('sku')}: {product.sku}
                                                    </span>
                                                    <span className="text-primary font-semibold text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                                        {t('viewDetails')} →
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* Why Choose DryON */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-12">
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">{t('whyChooseTitle')}</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary">{t('whyChooseHeading')}</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {WHY_CHOOSE.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-secondary font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What is a Desiccant */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="bg-gradient-to-br from-secondary to-secondary-dark rounded-2xl p-10 md:p-14 text-white">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6">{t('whatIsDesiccantTitle')}</h2>
                        <p className="text-white/90 leading-relaxed text-lg">
                            {t('whatIsDesiccantDescription')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-12">
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">{t('benefitsTitle')}</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary">{t('benefitsHeading')}</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {BENEFITS.map((benefit, idx) => (
                            <div key={idx} className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm border border-gray-100 card-3d">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <CheckCircle className="w-5 h-5 text-primary" />
                                </div>
                                <span className="text-secondary font-medium">{benefit}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-primary to-primary-dark">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('ctaTitle')}</h2>
                    <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                        {t('ctaDescription')}
                    </p>
                    <a 
                        href="/contact" 
                        className="btn-3d inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
                    >
                        {t('ctaButton')}
                    </a>
                </div>
            </section>
            <Footer />
        </div>
    );
}
