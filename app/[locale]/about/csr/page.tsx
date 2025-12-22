import { Heart, Users, GraduationCap, HandHeart, Briefcase, Lightbulb, Target, CheckCircle } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Footer from '@/components/Footer';

export default async function CSRPage() {
    const t = await getTranslations('CSRPage');

    const csrInitiatives = [
        {
            icon: Heart,
            title: t('initiative1Title'),
            description: t('initiative1Desc'),
            color: 'from-red-500 to-pink-500',
            bgColor: 'from-red-50 to-pink-50',
            borderColor: 'border-red-100'
        },
        {
            icon: Users,
            title: t('initiative2Title'),
            description: t('initiative2Desc'),
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'from-blue-50 to-cyan-50',
            borderColor: 'border-blue-100'
        },
        {
            icon: GraduationCap,
            title: t('initiative3Title'),
            description: t('initiative3Desc'),
            color: 'from-purple-500 to-violet-500',
            bgColor: 'from-purple-50 to-violet-50',
            borderColor: 'border-purple-100'
        },
        {
            icon: HandHeart,
            title: t('initiative4Title'),
            description: t('initiative4Desc'),
            color: 'from-green-500 to-emerald-500',
            bgColor: 'from-green-50 to-emerald-50',
            borderColor: 'border-green-100'
        },
        {
            icon: Briefcase,
            title: t('initiative5Title'),
            description: t('initiative5Desc'),
            color: 'from-orange-500 to-amber-500',
            bgColor: 'from-orange-50 to-amber-50',
            borderColor: 'border-orange-100'
        },
        {
            icon: Lightbulb,
            title: t('initiative6Title'),
            description: t('initiative6Desc'),
            color: 'from-teal-500 to-cyan-500',
            bgColor: 'from-teal-50 to-cyan-50',
            borderColor: 'border-teal-100'
        },
    ];

    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Hero */}
            <div className="bg-gradient-to-br from-secondary via-secondary-dark to-primary/80 text-white py-28 px-4 relative overflow-hidden">
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
                        </div>

                        {/* Core Principle */}
                        <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 rounded-2xl p-10 md:p-14 border-2 border-primary/20 mb-16 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-5">
                                <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-center mb-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                                        <Target className="w-10 h-10 text-white" />
                                    </div>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-secondary text-center mb-6">
                                    {t('corePrinciple')}
                                </h2>
                                <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100">
                                    <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center leading-relaxed">
                                        {/* Mobile Layout - Stacked */}
                                        <div className="flex flex-col items-center gap-2 md:hidden">
                                            <span className="text-primary">SMART WORK (KHUDI)</span>
                                            <span className="text-slate text-2xl">+</span>
                                            <span className="text-primary">PHILANTHROPY</span>
                                            <span className="text-slate text-2xl">=</span>
                                            <span className="text-secondary">ETHICAL & SMART BUSINESS</span>
                                        </div>
                                        {/* Desktop Layout - Horizontal */}
                                        <div className="hidden md:flex items-center justify-center gap-3 lg:gap-4 flex-wrap">
                                            <span className="text-primary">SMART WORK (KHUDI)</span>
                                            <span className="text-slate">+</span>
                                            <span className="text-primary">PHILANTHROPY</span>
                                            <span className="text-slate">=</span>
                                            <span className="text-secondary">ETHICAL & SMART BUSINESS</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-center text-slate mt-6 text-lg">
                                    {t('principleDesc')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CSR Initiatives */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">{t('ourImpact')}</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">{t('csrInitiatives')}</h2>
                        <p className="text-slate max-w-2xl mx-auto">
                            {t('initiativesDesc')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {csrInitiatives.map((initiative, idx) => (
                            <div 
                                key={idx} 
                                className={`bg-gradient-to-br ${initiative.bgColor} rounded-2xl p-8 border ${initiative.borderColor} hover:shadow-xl transition-all card-3d group`}
                            >
                                <div className={`w-16 h-16 bg-gradient-to-br ${initiative.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <initiative.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-secondary mb-3">{initiative.title}</h3>
                                <p className="text-slate leading-relaxed">{initiative.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="bg-gradient-to-r from-primary via-secondary to-primary rounded-2xl p-10 md:p-14 text-white relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
                        </div>
                        <div className="relative z-10">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('ourCommitment')}</h2>
                                <p className="text-white/90 max-w-3xl mx-auto text-lg leading-relaxed">
                                    {t('commitmentDesc')}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6 mt-12">
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                    <CheckCircle className="w-8 h-8 text-white mb-4" />
                                    <h3 className="text-xl font-bold mb-2">{t('commitment1Title')}</h3>
                                    <p className="text-white/80 text-sm leading-relaxed">
                                        {t('commitment1Desc')}
                                    </p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                    <CheckCircle className="w-8 h-8 text-white mb-4" />
                                    <h3 className="text-xl font-bold mb-2">{t('commitment2Title')}</h3>
                                    <p className="text-white/80 text-sm leading-relaxed">
                                        {t('commitment2Desc')}
                                    </p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                    <CheckCircle className="w-8 h-8 text-white mb-4" />
                                    <h3 className="text-xl font-bold mb-2">{t('commitment3Title')}</h3>
                                    <p className="text-white/80 text-sm leading-relaxed">
                                        {t('commitment3Desc')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-primary to-primary-dark">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('partnerWithUs')}</h2>
                    <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                        {t('partnerDesc')}
                    </p>
                    <a 
                        href="/contact" 
                        className="btn-3d inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
                    >
                        {t('getInTouch')}
                    </a>
                </div>
            </section>
            <Footer />
        </div>
    );
}

