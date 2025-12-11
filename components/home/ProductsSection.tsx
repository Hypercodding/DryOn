'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Droplets, Package, Shield, Apple, Leaf } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { useEffect, useState } from 'react';

interface ProductCategory {
    id: string;
    slug: string;
    icon: string;
    color: string;
    name: string;
    description: string;
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

// Fallback categories if API fails
const fallbackCategories = [
    { id: '1', slug: 'dryon', name: 'DryON', description: 'Container Desiccants for Shipping Containers', icon: 'Droplets', color: 'from-blue-500 to-blue-600' },
    { id: '2', slug: 'super-dryon', name: 'Super DryON', description: 'In-Box Desiccants for cartons and polybags', icon: 'Package', color: 'from-primary to-primary-dark' },
    { id: '3', slug: 'greenpro', name: 'GreenPro', description: 'Transafeliners for bulk cargo protection', icon: 'Shield', color: 'from-emerald-500 to-emerald-600' },
    { id: '4', slug: 'freshon', name: 'FreshON', description: 'Ethylene Absorber for fruits & vegetables', icon: 'Apple', color: 'from-orange-500 to-orange-600' },
    { id: '5', slug: 'drypak-eco', name: 'DryPak ECO', description: '100% Sustainable Plastic-Free Desiccants', icon: 'Leaf', color: 'from-green-500 to-green-600' },
];

export default function ProductsSection() {
    const [categories, setCategories] = useState<ProductCategory[]>(fallbackCategories);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/product-categories');
                if (res.ok) {
                    const data = await res.json();
                    if (data.length > 0) setCategories(data);
                }
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block"
                    >
                        Our Products
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-6"
                    >
                        Moisture Control Solutions
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate text-lg max-w-2xl mx-auto"
                    >
                        Complete range of desiccants and cargo protection solutions for packaging, storage, and long sea voyages
                    </motion.p>
                </div>

                {/* Products Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {categories.slice(0, 6).map((category, idx) => {
                        const IconComponent = iconMap[category.icon] || Package;
                        return (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Link
                                    href={`/products?category=${category.slug}`}
                                    className="block bg-white rounded-2xl p-6 shadow-float hover:shadow-xl transition-all card-3d border border-gray-100 h-full group"
                                >
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                                        <IconComponent className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
                                        {category.name}
                                    </h3>
                                    <p className="text-slate text-sm leading-relaxed mb-4">
                                        {category.description}
                                    </p>
                                    <span className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Explore <ArrowRight className="w-4 h-4" />
                                    </span>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <Link 
                        href="/products"
                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl group"
                    >
                        View All Products
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
