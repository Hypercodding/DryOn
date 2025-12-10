import { Target, Users, Globe2, Award } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function AboutPage() {
    const t = await getTranslations('AboutPage');

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

            {/* Story */}
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <div className="bg-white rounded-3xl shadow-lg p-12 mb-16">
                    <h2 className="text-3xl font-bold text-navy mb-6">{t('ourStory')}</h2>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                        {t('storyP1')}
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        {t('storyP2')}
                    </p>
                </div>

                {/* Values */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-white p-8 rounded-2xl shadow-sm">
                        <Target className="w-12 h-12 text-primary mb-4" />
                        <h3 className="text-2xl font-bold text-navy mb-3">{t('ourMission')}</h3>
                        <p className="text-gray-600">
                            {t('missionDesc')}
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm">
                        <Globe2 className="w-12 h-12 text-primary mb-4" />
                        <h3 className="text-2xl font-bold text-navy mb-3">{t('ourVision')}</h3>
                        <p className="text-gray-600">
                            {t('visionDesc')}
                        </p>
                    </div>
                </div>

                {/* Team Section */}
                <div className="text-center mb-12">
                    <Users className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-navy mb-4">{t('ourTeam')}</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        {t('teamDesc')}
                    </p>
                </div>

                {/* Certifications */}
                <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                    <Award className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-navy mb-4">{t('certifications')}</h3>
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                        <span className="bg-gray-100 px-4 py-2 rounded-full">ISO 9001</span>
                        <span className="bg-gray-100 px-4 py-2 rounded-full">ISO 14001</span>
                        <span className="bg-gray-100 px-4 py-2 rounded-full">Best Innovation 2023</span>
                        <span className="bg-gray-100 px-4 py-2 rounded-full">Green Business Award</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
