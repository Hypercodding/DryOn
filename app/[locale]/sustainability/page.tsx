import { Leaf, Recycle, TrendingDown, Award } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function SustainabilityPage() {
    const t = await getTranslations('SustainabilityPage');

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* Hero */}
            <div className="bg-gradient-to-r from-[#0F172A] to-[#00897B] text-white py-24 px-4">
                <div className="container mx-auto max-w-4xl text-center">
                    <h1 className="text-5xl font-extrabold mb-6">{t('title')}</h1>
                    <p className="text-xl opacity-90 font-light">
                        {t('subtitle')}
                    </p>
                </div>
            </div>

            {/* Impact Stats */}
            <div className="container mx-auto px-4 py-16 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
                    <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                        <div className="text-4xl font-extrabold text-primary mb-2">95%</div>
                        <p className="text-gray-600">{t('wasteReduction')}</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                        <div className="text-4xl font-extrabold text-primary mb-2">50K+</div>
                        <p className="text-gray-600">{t('co2Saved')}</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                        <div className="text-4xl font-extrabold text-primary mb-2">100%</div>
                        <p className="text-gray-600">{t('recyclable')}</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                        <div className="text-4xl font-extrabold text-primary mb-2">Zero</div>
                        <p className="text-gray-600">{t('harmfulChemicals')}</p>
                    </div>
                </div>

                {/* Initiatives */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-sm">
                        <Leaf className="w-12 h-12 text-primary mb-4" />
                        <h3 className="text-2xl font-bold text-navy mb-3">{t('ecoFriendly')}</h3>
                        <p className="text-gray-600">
                            {t('ecoFriendlyDesc')}
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm">
                        <Recycle className="w-12 h-12 text-primary mb-4" />
                        <h3 className="text-2xl font-bold text-navy mb-3">{t('circularEconomy')}</h3>
                        <p className="text-gray-600">
                            {t('circularEconomyDesc')}
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm">
                        <TrendingDown className="w-12 h-12 text-primary mb-4" />
                        <h3 className="text-2xl font-bold text-navy mb-3">{t('carbonReduction')}</h3>
                        <p className="text-gray-600">
                            {t('carbonReductionDesc')}
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm">
                        <Award className="w-12 h-12 text-primary mb-4" />
                        <h3 className="text-2xl font-bold text-navy mb-3">{t('certifiedGreen')}</h3>
                        <p className="text-gray-600">
                            {t('certifiedGreenDesc')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
