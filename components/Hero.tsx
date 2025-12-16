'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Ship, Anchor } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';

// Container Ship Silhouette
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
        <rect x="150" y="25" width="20" height="20" rx="2" opacity="0.5" />
        <rect x="155" y="5" width="20" height="20" rx="2" opacity="0.6" />
        <rect x="160" y="10" width="10" height="8" rx="1" fill="white" opacity="0.3" />
    </svg>
);

export default function Hero() {
    const t = useTranslations('HomePage.Hero');

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={{ backgroundImage: "url('/images/hero.png')" }}
            >
                {/* Professional gradient overlay with brand colors */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 via-secondary/60 to-primary/40" />
            </div>

            {/* Animated Ocean Waves */}
            <div className="absolute bottom-0 left-0 w-full h-40 z-[5] overflow-hidden pointer-events-none">
                {/* Wave Layer 1 */}
                <svg 
                    className="absolute bottom-0 left-0 w-[200%] h-24 opacity-20 animate-wave"
                    viewBox="0 0 2880 120" 
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path 
                        fill="white"
                        d="M0,60 C480,120 960,0 1440,60 C1920,120 2400,0 2880,60 L2880,120 L0,120 Z"
                    />
                </svg>
                {/* Wave Layer 2 */}
                <svg 
                    className="absolute bottom-0 left-0 w-[200%] h-20 opacity-10 animate-wave-slow"
                    viewBox="0 0 2880 120" 
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path 
                        fill="white"
                        d="M0,80 C360,20 720,100 1080,60 C1440,20 1800,100 2160,60 C2520,20 2880,100 2880,60 L2880,120 L0,120 Z"
                    />
                </svg>
            </div>

            {/* Floating Container Ship */}
            <motion.div 
                className="absolute bottom-24 right-10 md:right-20 z-[6] opacity-30"
                animate={{ 
                    y: [0, -10, 0],
                    rotate: [-1, 1, -1]
                }}
                transition={{ 
                    repeat: Infinity, 
                    duration: 4,
                    ease: "easeInOut"
                }}
            >
                <ContainerShipSVG className="w-32 md:w-48 lg:w-64 text-white" />
            </motion.div>

            {/* Anchor Decoration */}
            <div className="absolute top-32 left-10 opacity-10 hidden md:block">
                <Anchor className="w-24 h-24 text-white" />
            </div>

            {/* Droplet Pattern Overlay */}
            <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="hero-droplets" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                            <circle cx="10" cy="10" r="2" fill="white" />
                            <circle cx="50" cy="40" r="1.5" fill="white" />
                            <circle cx="30" cy="60" r="2" fill="white" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hero-droplets)" />
                </svg>
            </div>

            <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center text-white">
                {/* Maritime Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20"
                >
                    <Ship className="w-4 h-4" />
                    <span>Protecting Cargo Across the Seas</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-semibold mb-6 leading-tight tracking-tight text-shadow-lg"
                >
                    {t('title1')}<br />
                    <span className="text-primary drop-shadow-lg">{t('title2')}</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="max-w-2xl text-lg md:text-xl font-light mb-12 text-white/90 leading-relaxed text-shadow"
                >
                    {t('description')}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02, y: -3 }}
                    whileTap={{ scale: 0.98, y: 1 }}
                    transition={{ duration: 0.2, delay: 0.6 }}
                >
                    <Link
                        href="/contact"
                        className="bg-primary hover:bg-primary-dark text-white text-sm font-bold py-4 px-10 rounded-md uppercase tracking-wider flex items-center gap-3 transition-all duration-300 shadow-[0_8px_30px_-6px_rgba(6,166,82,0.5)] hover:shadow-[0_12px_40px_-8px_rgba(6,166,82,0.6)]"
                        aria-label={t('cta')}
                        tabIndex={0}
                    >
                        {t('cta')}
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            >
                <motion.div 
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
                >
                    <div className="w-1.5 h-3 bg-white/80 rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
}
