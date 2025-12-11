'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Shirt, Package, Apple, Wrench, Car, Ship, Factory, Coffee, Box, Building, Truck } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { useEffect, useState } from 'react';

interface IndustryCategory {
    id: string;
    slug: string;
    icon: string;
    color: string;
    name: string;
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
};

// Fallback industries if API fails
const fallbackIndustries = [
    { id: '1', slug: 'agriculture', icon: 'Leaf', name: 'Agriculture', color: 'bg-green-500' },
    { id: '2', slug: 'dry-fruits', icon: 'Coffee', name: 'Dry Fruits', color: 'bg-amber-500' },
    { id: '3', slug: 'textile', icon: 'Shirt', name: 'Textile Apparels', color: 'bg-blue-500' },
    { id: '4', slug: 'leather', icon: 'Package', name: 'Leather Goods', color: 'bg-orange-600' },
    { id: '5', slug: 'processed-food', icon: 'Apple', name: 'Processed Food', color: 'bg-red-500' },
    { id: '6', slug: 'canned-items', icon: 'Package', name: 'Canned Items', color: 'bg-gray-600' },
    { id: '7', slug: 'engineering', icon: 'Wrench', name: 'Engineering Goods', color: 'bg-slate-600' },
    { id: '8', slug: 'automotive', icon: 'Car', name: 'Auto-motives', color: 'bg-indigo-500' },
    { id: '9', slug: 'logistics', icon: 'Ship', name: 'Logistics', color: 'bg-cyan-600' },
];

export default function IndustriesSection() {
    const [industries, setIndustries] = useState<IndustryCategory[]>(fallbackIndustries);

    useEffect(() => {
        const fetchIndustries = async () => {
            try {
                const res = await fetch('/api/industry-categories');
                if (res.ok) {
                    const data = await res.json();
                    if (data.length > 0) setIndustries(data);
                }
            } catch (error) {
                console.error('Failed to fetch industries:', error);
            }
        };
        fetchIndustries();
    }, []);

    return (
        <section className="py-24 bg-gradient-to-br from-secondary via-secondary-dark to-secondary overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="1" fill-rule="evenodd"%3E%3Cpath d="M0 40L40 0H20L0 20M40 40V20L20 40"/%3E%3C/g%3E%3C/svg%3E")' }} />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">Industries We Serve</span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                            Protecting Cargo Across All Industries
                        </h2>
                        <p className="text-white/80 text-lg leading-relaxed mb-8">
                            From agriculture to automotive, our moisture control solutions protect valuable cargo across diverse sectors. We understand each industry&apos;s unique requirements and provide tailored solutions.
                        </p>
                        <Link 
                            href="/solutions-by-industry"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl group"
                        >
                            Explore Industry Solutions
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    {/* Industries Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="grid grid-cols-3 gap-4">
                            {industries.slice(0, 9).map((industry, idx) => {
                                const IconComponent = iconMap[industry.icon] || Factory;
                                return (
                                    <motion.div
                                        key={industry.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        <Link
                                            href={`/solutions-by-industry?industry=${industry.slug}`}
                                            className="block bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/20 transition-all group cursor-pointer"
                                        >
                                            <div className={`w-12 h-12 ${industry.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                                                <IconComponent className="w-6 h-6 text-white" />
                                            </div>
                                            <span className="text-white text-sm font-medium">{industry.name}</span>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
