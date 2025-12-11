'use client';

import { motion } from 'framer-motion';
import LinkButton from './LinkButton';
import { useTranslations } from 'next-intl';

export default function MoistureDamage() {
    const t = useTranslations('HomePage.MoistureDamage');

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block mb-4"
                    >
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider">The Challenge</span>
                    </motion.div>
                    
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-semibold text-secondary mb-8 leading-tight"
                    >
                        {t('title')}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate leading-relaxed mb-6"
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

                <motion.div
                    initial={{ opacity: 0, scale: 0.98, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative h-[60vh] w-full overflow-hidden rounded-2xl shadow-float-lg hover:shadow-2xl transition-shadow duration-500"
                >
                    <img
                        src="/images/inspection.png"
                        alt="Cargo inspection"
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 via-transparent to-transparent" />
                </motion.div>
            </div>
        </section>
    );
}
