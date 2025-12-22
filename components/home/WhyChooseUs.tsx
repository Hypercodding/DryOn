'use client';

import { motion } from 'framer-motion';
import { Shield, Droplets, Leaf, TestTube, BadgeCheck, Truck, Zap, HeartHandshake } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function WhyChooseUs() {
    const t = useTranslations('WhyChooseUs');
    
    const features = [
        {
            icon: Droplets,
            title: t('features.highAbsorption.title'),
            description: t('features.highAbsorption.description'),
        },
        {
            icon: Shield,
            title: t('features.leakProof.title'),
            description: t('features.leakProof.description'),
        },
        {
            icon: Leaf,
            title: t('features.ecoFriendly.title'),
            description: t('features.ecoFriendly.description'),
        },
        {
            icon: TestTube,
            title: t('features.inHouseTesting.title'),
            description: t('features.inHouseTesting.description'),
        },
        {
            icon: BadgeCheck,
            title: t('features.certifiedQuality.title'),
            description: t('features.certifiedQuality.description'),
        },
        {
            icon: Truck,
            title: t('features.easyInstallation.title'),
            description: t('features.easyInstallation.description'),
        },
        {
            icon: Zap,
            title: t('features.costEffective.title'),
            description: t('features.costEffective.description'),
        },
        {
            icon: HeartHandshake,
            title: t('features.expertSupport.title'),
            description: t('features.expertSupport.description'),
        },
    ];
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block"
                    >
                        {t('badge')}
                    </motion.span>
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

                {/* Features Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-gray-50 rounded-2xl p-6 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100 group"
                        >
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                                <feature.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-lg font-bold text-secondary mb-2">{feature.title}</h3>
                            <p className="text-slate text-sm leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

