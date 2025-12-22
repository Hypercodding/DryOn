import { FlaskConical, Microscope, Lightbulb, Beaker, Target, TrendingUp, TestTube, Zap, CheckCircle, Rocket, Atom, FlaskRound } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Footer from '@/components/Footer';

export default async function RDPage() {
    const t = await getTranslations('RDPage');

    const rndFocusAreas = [
        {
            icon: FlaskConical,
            title: t('focus1Title'),
            description: t('focus1Desc'),
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'from-blue-50 to-cyan-50',
            borderColor: 'border-blue-100'
        },
        {
            icon: Atom,
            title: t('focus2Title'),
            description: t('focus2Desc'),
            color: 'from-purple-500 to-violet-500',
            bgColor: 'from-purple-50 to-violet-50',
            borderColor: 'border-purple-100'
        },
        {
            icon: Beaker,
            title: t('focus3Title'),
            description: t('focus3Desc'),
            color: 'from-green-500 to-emerald-500',
            bgColor: 'from-green-50 to-emerald-50',
            borderColor: 'border-green-100'
        },
        {
            icon: Rocket,
            title: t('focus4Title'),
            description: t('focus4Desc'),
            color: 'from-orange-500 to-amber-500',
            bgColor: 'from-orange-50 to-amber-50',
            borderColor: 'border-orange-100'
        },
        {
            icon: Microscope,
            title: t('focus5Title'),
            description: t('focus5Desc'),
            color: 'from-red-500 to-pink-500',
            bgColor: 'from-red-50 to-pink-50',
            borderColor: 'border-red-100'
        },
        {
            icon: Lightbulb,
            title: t('focus6Title'),
            description: t('focus6Desc'),
            color: 'from-teal-500 to-cyan-500',
            bgColor: 'from-teal-50 to-cyan-50',
            borderColor: 'border-teal-100'
        },
    ];

    const researchCapabilities = [
        {
            icon: TestTube,
            title: t('capability1Title'),
            description: t('capability1Desc'),
            stat: '100%'
        },
        {
            icon: Zap,
            title: t('capability2Title'),
            description: t('capability2Desc'),
            stat: 'Fast'
        },
        {
            icon: Target,
            title: t('capability3Title'),
            description: t('capability3Desc'),
            stat: '100%'
        },
    ];

    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Hero */}
            <div className="bg-gradient-to-br from-primary via-primary-dark to-secondary/80 text-white py-28 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <span className="inline-block bg-white/10 text-white/90 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
                        {t('heroBadge')}
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-shadow-lg">{t('title')}</h1>
                    <p className="text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-6 text-slate leading-relaxed text-lg mb-12">
                            <p>
                                {t('mainP1')}
                            </p>
                            <p>
                                {t('mainP2')}
                            </p>
                            <p className="font-medium text-secondary">
                                {t('mainP3')}
                            </p>
                        </div>

                        {/* Core Philosophy */}
                        <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 rounded-2xl p-10 md:p-14 border-2 border-primary/20 mb-16 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-5">
                                <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-center mb-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                                        <FlaskRound className="w-10 h-10 text-white" />
                                    </div>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-secondary text-center mb-6">
                                    {t('rndPhilosophy')}
                                </h2>
                                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                                    <p className="text-xl md:text-2xl font-semibold text-center text-secondary leading-relaxed mb-4">
                                        {t('philosophy')}
                                    </p>
                                    <div className="grid md:grid-cols-3 gap-4 mt-6">
                                        <div className="text-center p-4 bg-primary/5 rounded-lg">
                                            <div className="text-2xl font-bold text-primary mb-1">{t('innovation')}</div>
                                            <div className="text-sm text-slate">{t('innovationSub')}</div>
                                        </div>
                                        <div className="text-center p-4 bg-secondary/5 rounded-lg">
                                            <div className="text-2xl font-bold text-secondary mb-1">{t('quality')}</div>
                                            <div className="text-sm text-slate">{t('qualitySub')}</div>
                                        </div>
                                        <div className="text-center p-4 bg-primary/5 rounded-lg">
                                            <div className="text-2xl font-bold text-primary mb-1">{t('local')}</div>
                                            <div className="text-sm text-slate">{t('localSub')}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* R&D Focus Areas */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">{t('ourExpertise')}</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">{t('rndFocusAreas')}</h2>
                        <p className="text-slate max-w-2xl mx-auto">
                            {t('focusAreasDesc')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {rndFocusAreas.map((area, idx) => (
                            <div 
                                key={idx} 
                                className={`bg-gradient-to-br ${area.bgColor} rounded-2xl p-8 border ${area.borderColor} hover:shadow-xl transition-all card-3d group`}
                            >
                                <div className={`w-16 h-16 bg-gradient-to-br ${area.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <area.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-secondary mb-3">{area.title}</h3>
                                <p className="text-slate leading-relaxed">{area.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Research Capabilities */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">{t('ourStrengths')}</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">{t('researchCapabilities')}</h2>
                        <p className="text-slate max-w-2xl mx-auto">
                            {t('capabilitiesDesc')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {researchCapabilities.map((capability, idx) => (
                            <div 
                                key={idx} 
                                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all card-3d text-center"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                    <capability.icon className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-4xl font-bold text-primary mb-2">{capability.stat}</div>
                                <h3 className="text-xl font-bold text-secondary mb-3">{capability.title}</h3>
                                <p className="text-slate leading-relaxed">{capability.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Innovation Process */}
                    <div className="bg-gradient-to-r from-primary via-secondary to-primary rounded-2xl p-10 md:p-14 text-white relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
                        </div>
                        <div className="relative z-10">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('innovationProcess')}</h2>
                                <p className="text-white/90 max-w-3xl mx-auto text-lg leading-relaxed">
                                    {t('processDesc')}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-4 gap-6 mt-12">
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl font-bold text-white">1</span>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{t('step1Title')}</h3>
                                    <p className="text-white/80 text-sm leading-relaxed">
                                        {t('step1Desc')}
                                    </p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl font-bold text-white">2</span>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{t('step2Title')}</h3>
                                    <p className="text-white/80 text-sm leading-relaxed">
                                        {t('step2Desc')}
                                    </p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl font-bold text-white">3</span>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{t('step3Title')}</h3>
                                    <p className="text-white/80 text-sm leading-relaxed">
                                        {t('step3Desc')}
                                    </p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl font-bold text-white">4</span>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{t('step4Title')}</h3>
                                    <p className="text-white/80 text-sm leading-relaxed">
                                        {t('step4Desc')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Achievements */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">{t('rndExcellence')}</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">{t('keyAchievements')}</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-2xl p-8 shadow-float border border-gray-100 hover:shadow-xl transition-all card-3d">
                            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                                <CheckCircle className="w-7 h-7 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-3">{t('achievement1Title')}</h3>
                            <p className="text-slate leading-relaxed">
                                {t('achievement1Desc')}
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl p-8 shadow-float border border-gray-100 hover:shadow-xl transition-all card-3d">
                            <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
                                <TrendingUp className="w-7 h-7 text-secondary" />
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-3">{t('achievement2Title')}</h3>
                            <p className="text-slate leading-relaxed">
                                {t('achievement2Desc')}
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl p-8 shadow-float border border-gray-100 hover:shadow-xl transition-all card-3d">
                            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                                <Zap className="w-7 h-7 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-3">{t('achievement3Title')}</h3>
                            <p className="text-slate leading-relaxed">
                                {t('achievement3Desc')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-primary to-primary-dark">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('partnerInnovation')}</h2>
                    <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                        {t('partnerDesc')}
                    </p>
                    <a 
                        href="/contact" 
                        className="btn-3d inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
                    >
                        {t('discussNeeds')}
                    </a>
                </div>
            </section>
            <Footer />
        </div>
    );
}

