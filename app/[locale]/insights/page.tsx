import { Newspaper, TrendingUp, Lightbulb } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function InsightsPage() {
    const t = await getTranslations('InsightsPage');

    const articles = [
        {
            title: "Understanding Moisture Damage in Shipping Containers",
            excerpt: "Learn about the science behind container rain and how to prevent it effectively.",
            category: "Education",
            date: "Dec 5, 2024"
        },
        {
            title: "5 Signs Your Cargo is at Risk",
            excerpt: "Identify early warning signs of moisture damage before it's too late.",
            category: "Prevention",
            date: "Dec 1, 2024"
        },
        {
            title: "Case Study: Electronics Manufacturer Saves $2M",
            excerpt: "How one company reduced moisture-related losses by 95%.",
            category: "Case Study",
            date: "Nov 28, 2024"
        }
    ];

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

            {/* Categories */}
            <div className="container mx-auto px-4 py-12 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
                        <Newspaper className="w-12 h-12 text-primary mx-auto mb-3" />
                        <h3 className="font-bold text-navy">{t('articles')}</h3>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
                        <TrendingUp className="w-12 h-12 text-primary mx-auto mb-3" />
                        <h3 className="font-bold text-navy">{t('caseStudies')}</h3>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
                        <Lightbulb className="w-12 h-12 text-primary mx-auto mb-3" />
                        <h3 className="font-bold text-navy">{t('bestPractices')}</h3>
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article, idx) => (
                        <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="h-48 bg-gradient-to-br from-teal-400 to-navy"></div>
                            <div className="p-6">
                                <span className="text-xs font-bold text-primary uppercase">{article.category}</span>
                                <h3 className="text-xl font-bold text-navy mt-2 mb-3">{article.title}</h3>
                                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <span>{article.date}</span>
                                    <button className="text-primary font-semibold hover:underline">{t('readMore')} →</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
