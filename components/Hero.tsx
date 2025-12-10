'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Hero() {
    const t = useTranslations('HomePage.Hero');

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={{ backgroundImage: "url('/images/hero.png')" }}
            >
                <div className="absolute inset-0 bg-black/30" /> {/* Overlay */}
            </div>

            <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center text-white">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight"
                >
                    {t('title1')}<br />
                    {t('title2')}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="max-w-2xl text-lg md:text-xl font-light mb-10 opacity-90"
                >
                    {t('description')}
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="bg-primary hover:bg-primary-dark text-white text-sm font-bold py-4 px-8 rounded-none uppercase tracking-wider flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-primary/50"
                >
                    {t('cta')}
                    <ArrowRight className="w-4 h-4" />
                </motion.button>
            </div>
        </section>
    );
}
