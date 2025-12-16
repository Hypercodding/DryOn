'use client';

import { motion } from 'framer-motion';
import { Package, Globe, Users, Award, Anchor } from 'lucide-react';

const stats = [
    { icon: Package, value: '300%', label: 'Absorption Capacity', suffix: '' },
    { icon: Globe, value: '9+', label: 'Industries Served', suffix: '' },
    { icon: Users, value: '500+', label: 'Happy Clients', suffix: '' },
    { icon: Award, value: '100%', label: 'Made in Pakistan', suffix: '' },
];

export default function StatsSection() {
    return (
        <section className="py-16 bg-secondary relative overflow-hidden">
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

            {/* Ocean Wave Animation Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <svg 
                    className="absolute bottom-0 left-0 w-[200%] h-20 opacity-5 animate-wave"
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

            {/* Anchor Decoration */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-5">
                <Anchor className="w-40 h-40 text-white" />
            </div>

            {/* Droplet Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{ 
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center text-white"
                        >
                            <div className="w-14 h-14 mx-auto mb-4 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                                <stat.icon className="w-7 h-7 text-primary" />
                            </div>
                            <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}{stat.suffix}</div>
                            <div className="text-white/70 text-sm font-medium">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
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
