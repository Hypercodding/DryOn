import { Newspaper, TrendingUp, Lightbulb, ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function InsightsPage() {
    const t = await getTranslations('InsightsPage');

    const articles = [
        {
            title: "Understanding Moisture Damage in Shipping Containers",
            excerpt: "Learn about the science behind container rain and how to prevent it effectively.",
            category: "Education",
            date: "Dec 5, 2024",
            color: "from-primary to-primary-dark"
        },
        {
            title: "5 Signs Your Cargo is at Risk",
            excerpt: "Identify early warning signs of moisture damage before it's too late.",
            category: "Prevention",
            date: "Dec 1, 2024",
            color: "from-secondary to-secondary-dark"
        },
        {
            title: "Case Study: Electronics Manufacturer Saves $2M",
            excerpt: "How one company reduced moisture-related losses by 95%.",
            category: "Case Study",
            date: "Nov 28, 2024",
            color: "from-primary-dark to-secondary"
        }
    ];

    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Hero */}
            <div className="bg-gradient-to-br from-secondary via-secondary-dark to-primary/80 text-white py-28 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <span className="inline-block bg-white/10 text-white/90 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
                        Knowledge Hub
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t('title')}</h1>
                    <p className="text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>
            </div>

            {/* Categories */}
            <div className="container mx-auto px-6 py-16 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <div className="bg-white p-8 rounded-xl border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all text-center group cursor-pointer">
                        <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors">
                            <Newspaper className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="font-bold text-secondary text-lg">{t('articles')}</h3>
                    </div>
                    <div className="bg-white p-8 rounded-xl border border-gray-100 hover:shadow-lg hover:border-secondary/20 transition-all text-center group cursor-pointer">
                        <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary transition-colors">
                            <TrendingUp className="w-8 h-8 text-secondary group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="font-bold text-secondary text-lg">{t('caseStudies')}</h3>
                    </div>
                    <div className="bg-white p-8 rounded-xl border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all text-center group cursor-pointer">
                        <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors">
                            <Lightbulb className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="font-bold text-secondary text-lg">{t('bestPractices')}</h3>
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article, idx) => (
                        <article key={idx} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                            <div className={`h-48 bg-gradient-to-br ${article.color} relative`}>
                                <div className="absolute inset-0 bg-black/10" />
                                <div className="absolute bottom-4 left-4">
                                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                                        {article.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-secondary mt-2 mb-3 group-hover:text-primary transition-colors leading-tight">
                                    {article.title}
                                </h3>
                                <p className="text-slate mb-6 leading-relaxed">{article.excerpt}</p>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate">{article.date}</span>
                                    <button className="text-primary font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                        {t('readMore')} <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
