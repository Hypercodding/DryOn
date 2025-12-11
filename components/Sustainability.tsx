'use client';

import { motion } from 'framer-motion';
import LinkButton from './LinkButton';
import { useTranslations } from 'next-intl';
import { Leaf, Recycle, TrendingDown } from 'lucide-react';

export default function Sustainability() {
    const t = useTranslations('HomePage.Sustainability');

    const stats = [
        { icon: Leaf, value: '40%', label: 'Less Waste' },
        { icon: Recycle, value: '100%', label: 'Recyclable' },
        { icon: TrendingDown, value: '30%', label: 'Lower Emissions' },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">Sustainability</span>
                    </motion.div>
                    
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-semibold text-secondary mb-6 leading-tight"
                    >
                        {t('title')}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate mb-8 max-w-2xl mx-auto leading-relaxed"
                    >
                        {t('description')}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <LinkButton text={t('cta')} />
                    </motion.div>
                </div>

                {/* Stats Row */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-16"
                >
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                            <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                            <div className="text-3xl md:text-4xl font-bold text-secondary mb-1">{stat.value}</div>
                            <div className="text-sm text-slate">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-[500px] overflow-hidden rounded-2xl shadow-2xl relative"
                >
                    <img
                        src="/images/sustainability.png"
                        alt="Sustainability bridge"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                </motion.div>
            </div>
        </section>
    );
}
