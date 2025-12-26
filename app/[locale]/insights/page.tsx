import { Newspaper, TrendingUp, Lightbulb, ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Footer from '@/components/Footer';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import BlogTranslation from '@/models/BlogTranslation';
import { Link } from '@/lib/navigation';
import Image from 'next/image';

const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
        'Education': 'from-primary to-primary-dark',
        'Prevention': 'from-secondary to-secondary-dark',
        'Case Study': 'from-primary-dark to-secondary',
        'Best Practices': 'from-primary to-secondary',
        'News': 'from-secondary to-primary',
    };
    return colors[category] || 'from-primary to-primary-dark';
};

export default async function InsightsPage(props: { params: Promise<{ locale: string }> }) {
    const t = await getTranslations('InsightsPage');
    const params = await props.params;
    const locale = params.locale;

    const mongoose = await connectDB();

    // Ensure all models are registered
    if (!mongoose.models.Blog) {
        await import('@/models/Blog');
    }
    if (!mongoose.models.BlogTranslation) {
        await import('@/models/BlogTranslation');
    }

    // Fetch only published blogs
    const blogs = await Blog.find({ published: true }).sort({ publishedAt: -1, createdAt: -1 });
    const blogIds = blogs.map(b => b._id);
    const translations = await BlogTranslation.find({ blogId: { $in: blogIds } });

    // Map blogs with translations
    const articles = blogs.map(blog => {
        const blogTrans = translations.find(t => 
            t.blogId.toString() === blog._id.toString() && t.locale === locale
        ) || translations.find(t => 
            t.blogId.toString() === blog._id.toString() && t.locale === 'en'
        ) || translations.find(t => 
            t.blogId.toString() === blog._id.toString()
        );

        const date = blog.publishedAt || blog.createdAt;
        
        return {
            id: blog._id.toString(),
            slug: blog.slug,
            title: blogTrans?.title || 'Untitled',
            excerpt: blogTrans?.excerpt || '',
            category: blog.category || 'Education',
            date: date ? new Date(date).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' }) : '',
            color: getCategoryColor(blog.category || 'Education'),
            featuredImage: blog.featuredImage || null,
        };
    });

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
                {articles.length === 0 ? (
                    <div className="text-center py-20">
                        <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-slate text-lg">No blog posts available yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article) => (
                            <Link 
                                key={article.id} 
                                href={`/insights/${article.slug}`}
                                className="block"
                            >
                                <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group h-full flex flex-col">
                                    <div className={`h-48 relative overflow-hidden ${article.featuredImage ? '' : `bg-gradient-to-br ${article.color}`}`}>
                                        {article.featuredImage ? (
                                            <Image
                                                src={article.featuredImage}
                                                alt={article.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-black/10" />
                                        )}
                                        <div className="absolute bottom-4 left-4">
                                            <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                                                {article.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <h3 className="text-xl font-bold text-secondary mt-2 mb-3 group-hover:text-primary transition-colors leading-tight">
                                            {article.title}
                                        </h3>
                                        <p className="text-slate mb-6 leading-relaxed flex-1">{article.excerpt}</p>
                                        <div className="flex items-center justify-between text-sm mt-auto">
                                            <span className="text-slate">{article.date}</span>
                                            <span className="text-primary font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                                {t('readMore')} <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
