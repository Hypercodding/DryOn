import { Leaf, Recycle, TrendingDown, Award } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function SustainabilityPage() {
    const t = await getTranslations('SustainabilityPage');

    const stats = [
        { value: '95%', label: 'wasteReduction', color: 'text-primary' },
        { value: '50K+', label: 'co2Saved', color: 'text-secondary' },
        { value: '100%', label: 'recyclable', color: 'text-primary' },
        { value: 'Zero', label: 'harmfulChemicals', color: 'text-secondary' },
    ];

    const initiatives = [
        { icon: Leaf, key: 'ecoFriendly', keyDesc: 'ecoFriendlyDesc', color: 'bg-primary' },
        { icon: Recycle, key: 'circularEconomy', keyDesc: 'circularEconomyDesc', color: 'bg-secondary' },
        { icon: TrendingDown, key: 'carbonReduction', keyDesc: 'carbonReductionDesc', color: 'bg-primary' },
        { icon: Award, key: 'certifiedGreen', keyDesc: 'certifiedGreenDesc', color: 'bg-secondary' },
    ];

    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Hero */}
            <div className="bg-gradient-to-br from-primary via-primary-dark to-secondary text-white py-28 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <span className="inline-block bg-white/10 text-white/90 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
                        <Leaf className="w-4 h-4 inline mr-2" />
                        Environmental Commitment
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t('title')}</h1>
                    <p className="text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>
            </div>

            {/* Impact Stats */}
            <div className="container mx-auto px-6 py-20 max-w-6xl">
                <div className="text-center mb-16">
                    <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">Our Impact</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary">Making a Difference</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 text-center hover:shadow-lg transition-shadow">
                            <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-3`}>{stat.value}</div>
                            <p className="text-slate font-medium">{t(stat.label)}</p>
                        </div>
                    ))}
                </div>

                {/* Initiatives */}
                <div className="text-center mb-16">
                    <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">What We Do</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary">Our Green Initiatives</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {initiatives.map((item, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all group">
                            <div className={`w-14 h-14 ${item.color}/10 rounded-xl flex items-center justify-center mb-6 group-hover:${item.color} transition-colors`}>
                                <item.icon className={`w-7 h-7 ${item.color === 'bg-primary' ? 'text-primary' : 'text-secondary'} group-hover:text-white transition-colors`} />
                            </div>
                            <h3 className="text-2xl font-bold text-secondary mb-4">{t(item.key)}</h3>
                            <p className="text-slate leading-relaxed">
                                {t(item.keyDesc)}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-20 bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-10 md:p-14 text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Sustainability Mission</h2>
                    <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                        Partner with us to protect your cargo and the planet simultaneously.
                    </p>
                    <a 
                        href="/contact" 
                        className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl"
                    >
                        Learn More
                        <Leaf className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </div>
    );
}
