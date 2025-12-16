'use client';

import { motion } from 'framer-motion';
import { Sun, TreePine, Recycle, RefreshCcw, ArrowRight, Leaf } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { useTranslations } from 'next-intl';

const initiativeIcons = [Sun, TreePine, Recycle, RefreshCcw];
const initiativeColors = [
    'from-amber-400 to-orange-500',
    'from-green-500 to-emerald-600',
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-violet-600',
];

export default function SustainabilityBanner() {
    const t = useTranslations('Sustainability');

    const initiatives = [
        { titleKey: 'solarPowered', descKey: 'solarDesc', stat: '100%' },
        { titleKey: 'treePlantation', descKey: 'treeDesc', stat: '500+' },
        { titleKey: 'recycledPlastic', descKey: 'recycledDesc', stat: '30%' },
        { titleKey: 'circularEconomy', descKey: 'circularDesc', stat: '∞' },
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-primary/5 via-green-50 to-emerald-50 relative overflow-hidden">
            {/* Leaf decorations */}
            <div className="absolute top-10 left-10 opacity-10">
                <Leaf className="w-32 h-32 text-primary rotate-45" />
            </div>
            <div className="absolute bottom-10 right-10 opacity-10">
                <Leaf className="w-24 h-24 text-primary -rotate-12" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-4"
                    >
                        <Leaf className="w-4 h-4" />
                        {t('badge')}
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-6"
                    >
                        {t('title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate text-lg max-w-2xl mx-auto"
                    >
                        {t('subtitle')}
                    </motion.p>
                </div>

                {/* Initiatives Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {initiatives.map((item, idx) => {
                        const IconComponent = initiativeIcons[idx];
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-2xl p-6 shadow-float hover:shadow-xl transition-all border border-gray-100 group card-3d"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-14 h-14 bg-gradient-to-br ${initiativeColors[idx]} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                        <IconComponent className="w-7 h-7 text-white" />
                                    </div>
                                    <span className="text-3xl font-bold text-primary">{item.stat}</span>
                                </div>
                                <h3 className="text-lg font-bold text-secondary mb-2">{t(item.titleKey)}</h3>
                                <p className="text-slate text-sm leading-relaxed">{t(item.descKey)}</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* CTA Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-primary to-emerald-600 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
                >
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold text-white mb-2">{t('ctaTitle')}</h3>
                        <p className="text-white/80">
                            {t('ctaDesc')}
                        </p>
                    </div>
                    <Link
                        href="/about#sustainability"
                        className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition-all shadow-lg flex-shrink-0 group"
                    >
                        {t('ctaButton')}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
