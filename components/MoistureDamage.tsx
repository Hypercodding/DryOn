'use client';

import { motion } from 'framer-motion';
import LinkButton from './LinkButton';
import { useTranslations } from 'next-intl';

export default function MoistureDamage() {
    const t = useTranslations('HomePage.MoistureDamage');

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-light text-navy mb-8"
                    >
                        {t('title')}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-700 font-bold mb-4"
                    >
                        {t('description')}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <LinkButton text={t('cta')} />
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative h-[60vh] w-full overflow-hidden"
                >
                    <img
                        src="/images/inspection.png"
                        alt="Cargo inspection"
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            </div>
        </section>
    );
}
