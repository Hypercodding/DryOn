'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';

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

            <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center text-white">
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
