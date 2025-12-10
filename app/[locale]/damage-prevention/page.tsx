import { getTranslations } from 'next-intl/server';

export default async function DamagePreventionPage() {
    const t = await getTranslations('DamagePreventionPage');

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

            <div className="container mx-auto px-4 py-16 max-w-6xl">
                <div className="bg-white rounded-3xl shadow-lg p-12 mb-12">
                    <h2 className="text-3xl font-bold text-navy mb-6">{t('theProblem')}</h2>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                        {t('problemP1')}
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        {t('problemP2')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-sm">
                        <div className="text-4xl font-bold text-primary mb-3">1</div>
                        <h3 className="text-xl font-bold text-navy mb-3">{t('assessment')}</h3>
                        <p className="text-gray-600">
                            {t('assessmentDesc')}
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm">
                        <div className="text-4xl font-bold text-primary mb-3">2</div>
                        <h3 className="text-xl font-bold text-navy mb-3">{t('solutionDesign')}</h3>
                        <p className="text-gray-600">
                            {t('solutionDesignDesc')}
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm">
                        <div className="text-4xl font-bold text-primary mb-3">3</div>
                        <h3 className="text-xl font-bold text-navy mb-3">{t('implementation')}</h3>
                        <p className="text-gray-600">
                            {t('implementationDesc')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
