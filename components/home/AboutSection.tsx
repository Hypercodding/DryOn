'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { useTranslations } from 'next-intl';

export default function AboutSection() {
    const t = useTranslations('AboutSection');
    
    const highlights = [
        t('highlight1'),
        t('highlight2'),
        t('highlight3'),
        t('highlight4'),
    ];
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">{t('badge')}</span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-6 leading-tight">
                            {t('title')}
                        </h2>
                        <p className="text-slate text-lg leading-relaxed mb-8">
                            {t('description')}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            {highlights.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span className="text-secondary font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        <Link 
                            href="/about"
                            className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white font-bold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg group"
                        >
                            {t('cta')}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    {/* Image Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl overflow-hidden shadow-lg">
                                    <img src="/images/warehouse.png" alt="Warehouse" className="w-full h-full object-cover" />
                                </div>
                                <div className="h-64 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-2xl overflow-hidden shadow-lg">
                                    <img src="/images/inspection.png" alt="Inspection" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <div className="space-y-4 pt-8">
                                <div className="h-64 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl overflow-hidden shadow-lg">
                                    <img src="/images/sustainability.png" alt="Sustainability" className="w-full h-full object-cover" />
                                </div>
                                <div className="h-48 bg-gradient-to-br from-secondary to-secondary-dark rounded-2xl p-6 flex flex-col justify-center text-white shadow-lg">
                                    <div className="text-4xl font-bold mb-2">5+</div>
                                    <div className="text-white/80">{t('citiesAcross')}</div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <span className="text-2xl">🏆</span>
                                </div>
                                <div>
                                    <div className="font-bold text-secondary">USAID</div>
                                    <div className="text-xs text-slate">{t('grantRecipient')}</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

