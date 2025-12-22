'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Shirt, Package, Apple, Wrench, Car, Ship, Factory, Coffee, Box, Building, Truck, Anchor } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

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

// Container Ship SVG
const ContainerShipSVG = ({ className = '' }: { className?: string }) => (
    <svg 
        className={className}
        viewBox="0 0 200 80" 
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M10,60 L30,75 L170,75 L190,60 L180,60 L180,45 L20,45 L20,60 Z" opacity="0.3" />
        <rect x="25" y="25" width="20" height="20" rx="2" opacity="0.4" />
        <rect x="50" y="25" width="20" height="20" rx="2" opacity="0.5" />
        <rect x="75" y="25" width="20" height="20" rx="2" opacity="0.4" />
        <rect x="100" y="25" width="20" height="20" rx="2" opacity="0.5" />
        <rect x="125" y="25" width="20" height="20" rx="2" opacity="0.4" />
        <rect x="155" y="5" width="20" height="20" rx="2" opacity="0.6" />
    </svg>
);

export default function IndustriesSection() {
    const t = useTranslations('IndustriesSection');
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
                // Failed to fetch industries
            }
        };
        fetchIndustries();
    }, []);

    return (
        <section className="py-24 bg-gradient-to-br from-secondary via-secondary-dark to-secondary overflow-hidden relative">
            {/* Wave Pattern Top */}
            <svg 
                className="absolute -top-1 left-0 w-full h-16"
                viewBox="0 0 1440 64" 
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                    fill="white"
                    d="M0,32 C240,64 480,0 720,32 C960,64 1200,0 1440,32 L1440,0 L0,0 Z"
                />
            </svg>

            {/* Ocean Wave Animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <svg 
                    className="absolute bottom-0 left-0 w-[200%] h-24 opacity-5 animate-wave"
                    viewBox="0 0 2880 80" 
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path 
                        fill="white"
                        d="M0,40 C480,80 960,0 1440,40 C1920,80 2400,0 2880,40 L2880,80 L0,80 Z"
                    />
                </svg>
            </div>

            {/* Floating Container Ship */}
            <motion.div 
                className="absolute bottom-10 right-10 opacity-10 hidden lg:block"
                animate={{ 
                    y: [0, -8, 0],
                    rotate: [-1, 1, -1]
                }}
                transition={{ 
                    repeat: Infinity, 
                    duration: 4,
                    ease: "easeInOut"
                }}
            >
                <ContainerShipSVG className="w-40 text-white" />
            </motion.div>

            {/* Anchor Decoration */}
            <div className="absolute top-20 left-10 opacity-5 hidden md:block">
                <Anchor className="w-24 h-24 text-white" />
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{ 
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '50px 50px'
                }} />
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
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-white/20">
                            <Ship className="w-4 h-4" />
                            <span>{t('badge')}</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                            {t('title')}
                        </h2>
                        <p className="text-white/80 text-lg leading-relaxed mb-8">
                            {t('subtitle')}
                        </p>
                        <Link 
                            href="/solutions-by-industry"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl group"
                        >
                            {t('cta')}
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
                                            className="block bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/20 transition-all group cursor-pointer border border-white/10"
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

            {/* Wave Pattern Bottom */}
            <svg 
                className="absolute -bottom-1 left-0 w-full h-16"
                viewBox="0 0 1440 64" 
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                    fill="white"
                    d="M0,32 C240,0 480,64 720,32 C960,0 1200,64 1440,32 L1440,64 L0,64 Z"
                />
            </svg>
        </section>
    );
}
