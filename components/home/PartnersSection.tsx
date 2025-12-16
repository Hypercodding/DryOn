'use client';

import { motion } from 'framer-motion';
import { Award, BadgeCheck, Shield, Globe, Building2, FileCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

const certIcons = [Award, BadgeCheck, Shield, Globe, Building2, FileCheck];
const certColors = ['bg-blue-500', 'bg-primary', 'bg-purple-500', 'bg-cyan-500', 'bg-amber-500', 'bg-secondary'];

export default function PartnersSection() {
    const t = useTranslations('Partners');

    const certifications = [
        { titleKey: 'usaidGrant', subtitleKey: 'recipient' },
        { titleKey: 'dunsRegistered', subtitleKey: 'certified' },
        { titleKey: 'dmfFree', subtitleKey: 'certified' },
        { titleKey: 'isoStandards', subtitleKey: 'compliant' },
        { titleKey: 'chamberOfCommerce', subtitleKey: 'member' },
        { titleKey: 'euGradeTesting', subtitleKey: 'certified' },
    ];

    const partners = [
        { nameKey: 'agriculturalExporters', count: '100+' },
        { nameKey: 'textileIndustries', count: '50+' },
        { nameKey: 'dryFruitTraders', count: '80+' },
        { nameKey: 'leatherManufacturers', count: '40+' },
        { nameKey: 'foodProcessors', count: '60+' },
        { nameKey: 'engineeringCompanies', count: '30+' },
    ];

    return (
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0" style={{ 
                    backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            <div className="container mx-auto px-6 relative z-10">
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

                {/* Certifications */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
                    {certifications.map((cert, idx) => {
                        const IconComponent = certIcons[idx];
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-gray-100 group"
                            >
                                <div className={`w-14 h-14 ${certColors[idx]} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                                    <IconComponent className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="font-bold text-secondary text-sm">{t(cert.titleKey)}</h3>
                                <p className="text-slate text-xs mt-1">{t(cert.subtitleKey)}</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Partners Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-secondary to-secondary-dark rounded-3xl p-8 md:p-12 relative overflow-hidden"
                >
                    {/* Wave decoration */}
                    <div className="absolute bottom-0 left-0 w-full opacity-10">
                        <svg viewBox="0 0 1440 100" className="w-full" preserveAspectRatio="none">
                            <path fill="white" d="M0,50 Q360,100 720,50 T1440,50 L1440,100 L0,100 Z" />
                        </svg>
                    </div>

                    <div className="text-center mb-10 relative z-10">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{t('trustedAcross')}</h3>
                        <p className="text-white/70">{t('servingPakistan')}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10">
                        {partners.map((partner, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10 hover:bg-white/20 transition-colors"
                            >
                                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{partner.count}</div>
                                <div className="text-white/80 text-xs">{t(partner.nameKey)}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
