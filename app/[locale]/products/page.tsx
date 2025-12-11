'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import { useSearchParams } from 'next/navigation';
import { Filter, CheckCircle, Droplets, Package, Leaf, Apple, Shield } from 'lucide-react';

const CATEGORIES = [
    { 
        id: 'all', 
        slug: 'all',
        name: 'All Products', 
        icon: Package,
        description: 'View our complete range'
    },
    { 
        id: 'dryon', 
        slug: 'dryon',
        name: 'DryON', 
        icon: Droplets,
        description: 'Calcium Chloride-Based Container Desiccants designed for installing in Shipping Containers.'
    },
    { 
        id: 'super-dryon', 
        slug: 'super-dryon',
        name: 'Super DryON', 
        icon: Package,
        description: 'In-Box Desiccants designed for placing in cartons, boxes or polybags.'
    },
    { 
        id: 'greenpro', 
        slug: 'greenpro',
        name: 'GreenPro', 
        icon: Shield,
        description: 'Transafeliners and hermetic packaging for bulk cargo protection.'
    },
    { 
        id: 'freshon', 
        slug: 'freshon',
        name: 'FreshON', 
        icon: Apple,
        description: 'Ethylene Absorber for extending shelf-life of fruits and vegetables.'
    },
    { 
        id: 'drypak-eco', 
        slug: 'drypak-eco',
        name: 'DryPak ECO', 
        icon: Leaf,
        description: '100% Sustainable and Plastic-Free Desiccants for Textile Apparels, Shoes, Leather & Accessories.'
    },
];

const WHY_CHOOSE = [
    'High Absorption Capacity of up to 300%',
    'Easy Installation',
    'Cost-Effective',
    'Leak-Proof Packaging',
    'DMF-Free, Sustainable and Non-Toxic',
    'Ideal for packaging, storage and sea voyages',
    'Tested in real-time EU-Grade environmental chambers',
];

const BENEFITS = [
    'Prevents Condensation and Container Rain',
    'Eliminates Mold and Mildew',
    'Stops Rust and Corrosion',
    'Maintains Products Quality',
    'Removes Unpleasant Odours',
    'Enhances Shelf-Life of Goods',
    'Reduces Product Rejections',
    'Reduces Financial Losses',
    'Preserves Business Reputation',
    'Cost-Effective Moisture Prevention Solution',
];

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
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const t = useTranslations('ProductsPage');
    const searchParams = useSearchParams();

    // Set initial category from URL
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam && CATEGORIES.some(c => c.slug === categoryParam)) {
            setSelectedCategory(categoryParam);
        }
    }, [searchParams]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
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
        if (!product.category) return 'Uncategorized';
        const catTrans = product.category.translations?.find(t => t.locale === 'en');
        return catTrans?.name || product.category.slug;
    };

    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-secondary via-secondary-dark to-primary/80 text-white py-24 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <span className="inline-block bg-white/10 text-white/90 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
                        Our Solutions
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-shadow-lg">
                        All Products
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed max-w-3xl mx-auto">
                        Our High-Performance and Sustainable Moisture-Control Solutions
                    </p>
                </div>
            </div>

            {/* Intro Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <p className="text-lg text-slate leading-relaxed mb-8">
                        Our complete product range of moisture-control and cargo protection solutions are designed for safeguarding the valuable cargo from condensation, container rain, mold, fungus, decay, lumps, odours, discoloration, rust and corrosion during packaging, storage, and long sea voyages.
                    </p>
                    <p className="text-secondary font-semibold">
                        Explore our complete product line according to your need of moisture prevention.
                    </p>
                </div>
            </section>

            {/* Category Filter */}
            <section className="py-12 bg-white border-b border-gray-100">
                <div className="container mx-auto px-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Filter className="w-5 h-5 text-primary" />
                        <h2 className="text-lg font-bold text-secondary">Filter by Category</h2>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.slug)}
                                className={`p-4 rounded-xl text-left transition-all ${
                                    selectedCategory === cat.slug 
                                        ? 'bg-primary text-white shadow-lg scale-[1.02]' 
                                        : 'bg-gray-50 hover:bg-gray-100 text-secondary border border-gray-200'
                                }`}
                            >
                                <cat.icon className={`w-6 h-6 mb-2 ${selectedCategory === cat.slug ? 'text-white' : 'text-primary'}`} />
                                <div className="font-bold text-sm">{cat.name}</div>
                            </button>
                        ))}
                    </div>

                    {/* Category Description */}
                    {selectedCategory !== 'all' && (
                        <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
                            <p className="text-slate">
                                <strong className="text-secondary">{CATEGORIES.find(c => c.slug === selectedCategory)?.name}:</strong>{' '}
                                {CATEGORIES.find(c => c.slug === selectedCategory)?.description}
                            </p>
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
                            <p className="text-slate">Loading products...</p>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="text-center py-20 bg-gray-50 rounded-xl">
                            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-slate text-lg">No products found in this category.</p>
                            <button 
                                onClick={() => setSelectedCategory('all')}
                                className="mt-4 text-primary font-semibold hover:underline"
                            >
                                View all products
                            </button>
                        </div>
                    ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProducts.map((product) => {
                                const translation = getTranslation(product);
                                const images = JSON.parse(product.images || '[]');
                                const categorySlug = product.category?.slug || '';
                                const categoryInfo = CATEGORIES.find(c => c.slug === categorySlug);
                                const categoryName = getCategoryName(product);

                        return (
                            <Link
                                key={product.id}
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
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">Our Advantage</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary">Why Choose DryON Products?</h2>
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
                        <h2 className="text-2xl md:text-3xl font-bold mb-6">What is a Desiccant?</h2>
                        <p className="text-white/90 leading-relaxed text-lg">
                            A desiccant is a moisture absorbent which is used to reduce the humidity inside the packaging, storage and shipping containers. It works by absorbing the excess moisture from the air and protect the goods from condensation, mold, decay, lumps, aflatoxin, odour and other moisture-related problems. It is widely used across various industries in the form of container desiccants or in-box desiccants.
                        </p>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-12">
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">Supply Chain Value</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary">Benefits of Using DryON Desiccants</h2>
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
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Need Help Choosing the Right Product?</h2>
                    <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                        Our experts can help you select the perfect moisture protection solution for your specific needs.
                    </p>
                    <a 
                        href="/contact" 
                        className="btn-3d inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
                    >
                        Contact Us Today
                    </a>
            </div>
            </section>
        </div>
    );
}
