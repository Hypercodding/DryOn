'use client';

import { motion } from 'framer-motion';
import { Package, Ship, ShieldCheck, Sparkles, ArrowRight, Anchor } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { useTranslations } from 'next-intl';

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

const stepIcons = [Package, Ship, ShieldCheck, Sparkles];
const stepColors = [
    'from-blue-500 to-cyan-500',
    'from-primary to-emerald-500',
    'from-purple-500 to-violet-500',
    'from-amber-500 to-orange-500',
];

export default function HowItWorks() {
    const t = useTranslations('HowItWorks');

    const steps = [
        { number: '01', titleKey: 'step1Title', descKey: 'step1Desc' },
        { number: '02', titleKey: 'step2Title', descKey: 'step2Desc' },
        { number: '03', titleKey: 'step3Title', descKey: 'step3Desc' },
        { number: '04', titleKey: 'step4Title', descKey: 'step4Desc' },
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            {/* Wave Pattern Top */}
            <div className="absolute inset-0 pointer-events-none">
                <svg className="absolute top-0 left-0 w-full h-20 opacity-10" viewBox="0 0 1440 80" preserveAspectRatio="none">
                    <path fill="currentColor" className="text-secondary" d="M0,40 Q360,80 720,40 T1440,40 L1440,0 L0,0 Z" />
                </svg>
            </div>

            {/* Floating Container Ship */}
            <motion.div 
                className="absolute bottom-20 left-10 opacity-[0.03] hidden lg:block pointer-events-none"
                animate={{ 
                    y: [0, -6, 0],
                    rotate: [-0.5, 0.5, -0.5]
                }}
                transition={{ 
                    repeat: Infinity, 
                    duration: 5,
                    ease: "easeInOut"
                }}
            >
                <ContainerShipSVG className="w-48 text-secondary" />
            </motion.div>

            {/* Anchor Decoration */}
            <div className="absolute top-20 right-10 opacity-[0.03] hidden md:block pointer-events-none">
                <Anchor className="w-24 h-24 text-secondary" />
            </div>

            {/* Wave bottom decoration */}
            <div className="absolute bottom-0 left-0 w-full opacity-5 pointer-events-none">
                <svg viewBox="0 0 1440 60" className="w-full text-primary" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,30 Q360,60 720,30 T1440,30 L1440,60 L0,60 Z" />
                </svg>
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

                {/* Steps */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {steps.map((step, idx) => {
                        const IconComponent = stepIcons[idx];
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="relative"
                            >
                                {/* Connector line */}
                                {idx < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-gray-200 to-gray-100 z-0" />
                                )}
                                
                                <div className="bg-white rounded-2xl p-6 shadow-float hover:shadow-xl transition-all border border-gray-100 relative z-10 card-3d h-full">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className={`w-14 h-14 bg-gradient-to-br ${stepColors[idx]} rounded-xl flex items-center justify-center shadow-lg`}>
                                            <IconComponent className="w-7 h-7 text-white" />
                                        </div>
                                        <span className="text-5xl font-bold text-gray-100">{step.number}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-secondary mb-3">{t(step.titleKey)}</h3>
                                    <p className="text-slate text-sm leading-relaxed">{t(step.descKey)}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <Link
                        href="/damage-prevention"
                        className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white font-bold py-4 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl group"
                    >
                        {t('cta')}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
