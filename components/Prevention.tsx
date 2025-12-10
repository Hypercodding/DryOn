'use client';

import { motion } from 'framer-motion';
import LinkButton from './LinkButton';
import { useTranslations } from 'next-intl';

export default function Prevention() {
    const t = useTranslations('HomePage.Prevention');

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center">
                    {/* Image */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 h-[500px] relative z-10"
                    >
                        <img
                            src="/images/warehouse.png"
                            alt="Data driven prevention"
                            className="w-full h-full object-cover shadow-xl"
                        />
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full lg:w-1/2 bg-beige p-12 lg:-ml-20 relative z-20 mt-8 lg:mt-0 min-h-[400px] flex flex-col justify-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-light text-navy mb-6">
                            {t('title')}
                        </h2>
                        <p className="text-gray-700 mb-8 leading-relaxed">
                            {t('description')}
                        </p>
                        <div>
                            <LinkButton text={t('cta')} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
