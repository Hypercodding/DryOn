'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { useTranslations } from 'next-intl';

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const t = useTranslations('FAQ');

    const faqs = [
        { qKey: 'q1', aKey: 'a1' },
        { qKey: 'q2', aKey: 'a2' },
        { qKey: 'q3', aKey: 'a3' },
        { qKey: 'q4', aKey: 'a4' },
        { qKey: 'q5', aKey: 'a5' },
        { qKey: 'q6', aKey: 'a6' },
    ];

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-24 bg-gray-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 opacity-5">
                <HelpCircle className="w-96 h-96 text-secondary" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:sticky lg:top-32"
                    >
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
                            {t('badge')}
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-6 leading-tight">
                            {t('title')}
                        </h2>
                        <p className="text-slate text-lg leading-relaxed mb-8">
                            {t('subtitle')}
                        </p>

                        <div className="bg-white rounded-2xl p-6 shadow-float border border-gray-100">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                    <MessageCircle className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-secondary">{t('stillHaveQuestions')}</h3>
                                    <p className="text-slate text-sm">{t('expertsReady')}</p>
                                </div>
                            </div>
                            <Link
                                href="/contact"
                                className="w-full inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark text-white font-bold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
                            >
                                {t('contactTeam')}
                            </Link>
                        </div>
                    </motion.div>

                    {/* FAQ Accordion */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                    >
                        {faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className={`bg-white rounded-xl border transition-all ${
                                    openIndex === idx 
                                        ? 'border-primary/30 shadow-lg' 
                                        : 'border-gray-100 shadow-sm hover:shadow-md'
                                }`}
                            >
                                <button
                                    onClick={() => handleToggle(idx)}
                                    className="w-full flex items-center justify-between p-6 text-left"
                                    aria-expanded={openIndex === idx}
                                    aria-controls={`faq-answer-${idx}`}
                                >
                                    <span className={`font-bold pr-4 transition-colors ${
                                        openIndex === idx ? 'text-primary' : 'text-secondary'
                                    }`}>
                                        {t(faq.qKey)}
                                    </span>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                                        openIndex === idx 
                                            ? 'bg-primary text-white rotate-180' 
                                            : 'bg-gray-100 text-secondary'
                                    }`}>
                                        <ChevronDown className="w-5 h-5" />
                                    </div>
                                </button>
                                
                                <AnimatePresence>
                                    {openIndex === idx && (
                                        <motion.div
                                            id={`faq-answer-${idx}`}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 pt-0">
                                                <div className="w-full h-px bg-gray-100 mb-4" />
                                                <p className="text-slate leading-relaxed">
                                                    {t(faq.aKey)}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
