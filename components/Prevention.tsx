'use client';

import { motion } from 'framer-motion';
import LinkButton from './LinkButton';
import { useTranslations } from 'next-intl';

export default function Prevention() {
    const t = useTranslations('HomePage.Prevention');

    return (
        <section className="py-24 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
                    {/* Image */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full lg:w-1/2 h-[500px] relative z-10 group"
                    >
                        <img
                            src="/images/warehouse.png"
                            alt="Data driven prevention"
                            className="w-full h-full object-cover rounded-2xl shadow-float-lg transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.01]"
                        />
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-full lg:w-1/2 bg-white p-12 lg:p-16 lg:-ml-16 relative z-20 rounded-2xl shadow-float-lg hover:shadow-xl min-h-[400px] flex flex-col justify-center border-3d transition-shadow duration-300"
                    >
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">Our Approach</span>
                        <h2 className="text-3xl md:text-4xl font-semibold text-secondary mb-6 leading-tight">
                            {t('title')}
                        </h2>
                        <p className="text-slate mb-8 leading-relaxed text-lg">
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
