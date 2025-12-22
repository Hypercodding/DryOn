import { Target, Users, Globe2, Award, MapPin, History, CheckCircle, Building2, Ship, Leaf, Package, Factory, Car, Shirt, Apple, Wrench, Sun, TreePine, Recycle, RefreshCw } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Footer from '@/components/Footer';

export default async function AboutPage() {
    const t = await getTranslations('AboutPage');

    const achievements = [
        {
            icon: Award,
            title: t('achievement1Title'),
            description: t('achievement1Desc')
        },
        {
            icon: Globe2,
            title: t('achievement2Title'),
            description: t('achievement2Desc')
        },
        {
            icon: CheckCircle,
            title: t('achievement3Title'),
            description: t('achievement3Desc')
        },
        {
            icon: Factory,
            title: t('achievement4Title'),
            description: t('achievement4Desc')
        },
    ];

    const industries = [
        { icon: Leaf, name: t('industryAgriculture') },
        { icon: Apple, name: t('industryDryFruits') },
        { icon: Shirt, name: t('industryTextile') },
        { icon: Package, name: t('industryLeather') },
        { icon: Apple, name: t('industryFood') },
        { icon: Package, name: t('industryCanned') },
        { icon: Wrench, name: t('industryEngineering') },
        { icon: Car, name: t('industryAutomotive') },
        { icon: Ship, name: t('industryLogistics') },
    ];

    // const branches = [
    //     {
    //         city: 'Lahore',
    //         type: 'Head Office',
    //         description: 'Our main headquarters and primary operations center',
    //         isHQ: true
    //     },
    //     {
    //         city: 'Karachi',
    //         type: 'Distribution Center',
    //         description: 'Serving the southern region and port operations',
    //         isHQ: false
    //     },
    //     {
    //         city: 'Sialkot',
    //         type: 'Regional Office',
    //         description: 'Supporting the sports goods and leather industry',
    //         isHQ: false
    //     },
    //     {
    //         city: 'Faisalabad',
    //         type: 'Regional Office',
    //         description: 'Serving the textile hub of Pakistan',
    //         isHQ: false
    //     },
    //     {
    //         city: 'Multan',
    //         type: 'Regional Office',
    //         description: 'Supporting agricultural exports',
    //         isHQ: false
    //     },
    // ];

    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Hero */}
            <div className="bg-gradient-to-br from-secondary via-secondary-dark to-primary/80 text-white py-28 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <span className="inline-block bg-white/10 text-white/90 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
                        {t('heroBadge')}
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-shadow-lg">{t('heroTitle')}</h1>
                    <p className="text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
                        {t('heroSubtitle')}
                    </p>
                </div>
            </div>

            {/* DryON at a Glance */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">{t('companyOverview')}</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-8">{t('atAGlance')}</h2>
                            
                            <div className="space-y-6 text-slate leading-relaxed">
                                <p>
                                    {t('overviewP1')}
                                </p>
                                <p>
                                    {t('overviewP2')}
                                </p>
                                <p className="font-medium text-secondary">
                                    {t('overviewP3')}
                                </p>
                            </div>
                        </div>
                        
                        <div className="relative">
                            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 shadow-float-lg">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="bg-white rounded-xl p-6 shadow-md text-center card-3d">
                                        <div className="text-4xl font-bold text-primary mb-2">100%</div>
                                        <div className="text-sm text-slate">{t('madeInPakistan')}</div>
                                    </div>
                                    <div className="bg-white rounded-xl p-6 shadow-md text-center card-3d">
                                        <div className="text-4xl font-bold text-secondary mb-2">EU</div>
                                        <div className="text-sm text-slate">{t('euGradeTesting')}</div>
                                    </div>
                                    <div className="bg-white rounded-xl p-6 shadow-md text-center card-3d">
                                        <div className="text-4xl font-bold text-primary mb-2">9+</div>
                                        <div className="text-sm text-slate">{t('industriesServed')}</div>
                                    </div>
                                    <div className="bg-white rounded-xl p-6 shadow-md text-center card-3d">
                                        <div className="text-4xl font-bold text-secondary mb-2">5+</div>
                                        <div className="text-sm text-slate">{t('citiesCovered')}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Achievements */}
            <section id="achievements" className="py-20 bg-gray-50 scroll-mt-24">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">{t('recognition')}</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary">{t('ourAchievements')}</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {achievements.map((item, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-float hover:shadow-xl transition-all card-3d border border-gray-100">
                                <div className="flex items-start gap-5">
                                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 icon-3d">
                                        <item.icon className="w-7 h-7 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-secondary mb-2">{item.title}</h3>
                                        <p className="text-slate leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Industries Section */}
                    <div className="mt-16 bg-white rounded-2xl p-10 shadow-float border border-gray-100">
                        <h3 className="text-xl font-bold text-secondary mb-6 text-center">{t('strongIndustryFootmark')}</h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            {industries.map((industry, idx) => (
                                <div key={idx} className="flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-full border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all">
                                    <industry.icon className="w-4 h-4 text-primary" />
                                    <span className="text-sm font-medium text-secondary">{industry.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>



            {/* History */}
            <section id="history" className="py-20 bg-gray-50 scroll-mt-24">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center mb-16">
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">{t('ourJourney')}</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary">{t('ourHistory')}</h2>
                    </div>

                    <div className="bg-white rounded-2xl shadow-float-lg p-10 md:p-14 border border-gray-100">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center icon-3d">
                                <History className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-secondary">{t('theDryONStory')}</h3>
                                <p className="text-slate">{t('storySubtitle')}</p>
                            </div>
                        </div>

                        <div className="space-y-6 text-slate leading-relaxed">
                            <p>
                                {t('storyP1')}
                            </p>
                            <p>
                                {t('storyP2')}
                            </p>
                            <p>
                                {t('storyP3')}
                            </p>
                            
                            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10 mt-8">
                                <div className="flex items-start gap-4">
                                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                    <p className="text-secondary font-medium">
                                        {t('officialRegistered')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sustainability */}
            <section id="sustainability" className="py-20 bg-white scroll-mt-24">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">{t('ourCommitment')}</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">{t('sustainabilityAtDryON')}</h2>
                        <p className="text-slate max-w-2xl mx-auto">
                            {t('sustainabilityDesc')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {/* 100% Solar */}
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100 hover:shadow-xl transition-all card-3d group">
                            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                                <Sun className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-2">{t('solarPowered')}</h3>
                            <p className="text-slate text-sm leading-relaxed">
                                {t('solarPoweredDesc')}
                            </p>
                            <div className="mt-4 flex items-center gap-2">
                                <div className="w-full bg-amber-100 rounded-full h-2">
                                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full w-full"></div>
                                </div>
                                <span className="text-sm font-bold text-amber-600">100%</span>
                            </div>
                        </div>

                        {/* Tree Plantation */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100 hover:shadow-xl transition-all card-3d group">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                                <TreePine className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-2">{t('treePlantation')}</h3>
                            <p className="text-slate text-sm leading-relaxed">
                                {t('treePlantationDesc')}
                            </p>
                            <div className="mt-4 inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-sm font-semibold">
                                <Leaf className="w-4 h-4" /> {t('ecoFriendlyLabel')}
                            </div>
                        </div>

                        {/* Recycled Plastic */}
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100 hover:shadow-xl transition-all card-3d group">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                                <Recycle className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-2">{t('recycledPlastic')}</h3>
                            <p className="text-slate text-sm leading-relaxed">
                                {t('recycledPlasticDesc')}
                            </p>
                            <div className="mt-4 flex items-center gap-2">
                                <div className="w-full bg-blue-100 rounded-full h-2">
                                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                                </div>
                                <span className="text-sm font-bold text-blue-600">30%</span>
                            </div>
                        </div>

                        {/* Circular Economy */}
                        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-8 border border-purple-100 hover:shadow-xl transition-all card-3d group">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                                <RefreshCw className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-2">{t('circularEconomy')}</h3>
                            <p className="text-slate text-sm leading-relaxed">
                                {t('circularEconomyDesc')}
                            </p>
                            <div className="mt-4 inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full text-sm font-semibold">
                                <RefreshCw className="w-4 h-4" /> {t('sustainableLabel')}
                            </div>
                        </div>
                    </div>

                    {/* Sustainability Banner */}
                    <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl p-10 md:p-14 text-white relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
                        </div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold mb-4">{t('committedGreener')}</h3>
                                <p className="text-white/90 max-w-xl leading-relaxed">
                                    {t('greenerDesc')}
                                </p>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-center">
                                    <div className="text-4xl md:text-5xl font-bold">100%</div>
                                    <div className="text-sm text-white/80">{t('renewableEnergy')}</div>
                                </div>
                                <div className="w-px h-16 bg-white/30"></div>
                                <div className="text-center">
                                    <div className="text-4xl md:text-5xl font-bold">30%</div>
                                    <div className="text-sm text-white/80">{t('recycledMaterials')}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Compliance & Certifications */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">{t('qualityAssurance')}</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">{t('complianceCertifications')}</h2>
                        <p className="text-slate max-w-2xl mx-auto">
                            {t('complianceDesc')}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
                        <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all border border-gray-100 group">
                            <div className="relative w-full h-32 mb-4 flex items-center justify-center">
                                <Image
                                    src="/RoHS.png"
                                    alt="RoHS Compliance"
                                    width={120}
                                    height={120}
                                    className="object-contain max-h-full max-w-full group-hover:scale-110 transition-transform"
                                />
                            </div>
                            <h3 className="font-bold text-secondary text-sm">RoHS</h3>
                            <p className="text-xs text-slate mt-1">Compliant</p>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all border border-gray-100 group">
                            <div className="relative w-full h-32 mb-4 flex items-center justify-center">
                                <Image
                                    src="/REACH.png"
                                    alt="REACH Compliance"
                                    width={120}
                                    height={120}
                                    className="object-contain max-h-full max-w-full group-hover:scale-110 transition-transform"
                                />
                            </div>
                            <h3 className="font-bold text-secondary text-sm">{t('reach')}</h3>
                            <p className="text-xs text-slate mt-1">{t('compliant')}</p>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all border border-gray-100 group">
                            <div className="relative w-full h-32 mb-4 flex items-center justify-center">
                                <Image
                                    src="/RECYCLE.png"
                                    alt="Recyclable"
                                    width={120}
                                    height={120}
                                    className="object-contain max-h-full max-w-full group-hover:scale-110 transition-transform"
                                />
                            </div>
                            <h3 className="font-bold text-secondary text-sm">{t('recyclable')}</h3>
                            <p className="text-xs text-slate mt-1">{t('certified')}</p>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all border border-gray-100 group">
                            <div className="relative w-full h-32 mb-4 flex items-center justify-center">
                                <Image
                                    src="/DMF-FREE.png"
                                    alt="DMF-Free Certified"
                                    width={120}
                                    height={120}
                                    className="object-contain max-h-full max-w-full group-hover:scale-110 transition-transform"
                                />
                            </div>
                            <h3 className="font-bold text-secondary text-sm">{t('dmfFree')}</h3>
                            <p className="text-xs text-slate mt-1">{t('certified')}</p>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all border border-gray-100 group">
                            <div className="relative w-full h-32 mb-4 flex items-center justify-center">
                                <Image
                                    src="/SGS.png"
                                    alt="SGS Certified"
                                    width={120}
                                    height={120}
                                    className="object-contain max-h-full max-w-full group-hover:scale-110 transition-transform"
                                />
                            </div>
                            <h3 className="font-bold text-secondary text-sm">{t('sgs')}</h3>
                            <p className="text-xs text-slate mt-1">{t('certified')}</p>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all border border-gray-100 group">
                            <div className="relative w-full h-32 mb-4 flex items-center justify-center">
                                <Image
                                    src="/ECO-FRIENDLY.png"
                                    alt="Eco-Friendly"
                                    width={120}
                                    height={120}
                                    className="object-contain max-h-full max-w-full group-hover:scale-110 transition-transform"
                                />
                            </div>
                            <h3 className="font-bold text-secondary text-sm">{t('ecoFriendlyCert')}</h3>
                            <p className="text-xs text-slate mt-1">{t('certified')}</p>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all border border-gray-100 group">
                            <div className="relative w-full h-32 mb-4 flex items-center justify-center">
                                <Image
                                    src="/DUNS.png"
                                    alt="DUNS Registered"
                                    width={120}
                                    height={120}
                                    className="object-contain max-h-full max-w-full group-hover:scale-110 transition-transform"
                                />
                            </div>
                            <h3 className="font-bold text-secondary text-sm">{t('duns')}</h3>
                            <p className="text-xs text-slate mt-1">{t('registered')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-10 text-white card-3d">
                            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                                <Target className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{t('ourMission')}</h3>
                            <p className="text-white/90 leading-relaxed">
                                {t('missionDesc')}
                            </p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-secondary to-secondary-dark rounded-2xl p-10 text-white card-3d">
                            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                                <Globe2 className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{t('ourVision')}</h3>
                            <p className="text-white/90 leading-relaxed">
                                {t('visionDesc')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-primary to-primary-dark">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('readyProtectCargo')}</h2>
                    <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                        {t('partnerDryON')}
                    </p>
                    <a 
                        href="/contact" 
                        className="btn-3d inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
                    >
                        {t('contactUsToday')}
                    </a>
                </div>
            </section>
            <Footer />
        </div>
    );
}
