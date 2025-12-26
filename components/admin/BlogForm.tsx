'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ImageUploader from './ImageUploader';

const LOCALES = ['en', 'fr', 'es', 'ar'];

interface BlogFormProps {
    initialData?: {
        id: string;
        slug: string;
        category: string;
        featuredImage?: string | null;
        published: boolean;
        translations: Array<{ locale: string; title: string; excerpt: string; content: string }>;
    };
}

export default function BlogForm({ initialData }: BlogFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('en');

    const [slug, setSlug] = useState(initialData?.slug || '');
    const [category, setCategory] = useState(initialData?.category || 'Education');
    const [published, setPublished] = useState(initialData?.published || false);
    const [featuredImage, setFeaturedImage] = useState(initialData?.featuredImage || '');

    const [translations, setTranslations] = useState<Record<string, { locale: string; title: string; excerpt: string; content: string }>>(
        initialData?.translations?.reduce((acc, t) => ({
            ...acc, [t.locale]: t
        }), {}) || {}
    );

    const handleTransChange = (field: string, value: string) => {
        setTranslations(prev => ({
            ...prev,
            [activeTab]: {
                ...prev[activeTab],
                [field]: value,
                locale: activeTab
            }
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                slug,
                category,
                featuredImage: featuredImage || null,
                published,
                translations: Object.values(translations),
            };

            const res = await fetch(initialData ? `/api/blogs/${initialData.id}` : '/api/blogs', {
                method: initialData ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error('Failed to save');

            router.push('/admin/blogs');
            router.refresh();
        } catch (err) {
            alert('Error saving blog');
        } finally {
            setLoading(false);
        }
    };

    const generateSlug = (title: string) => {
        if (!title) return '';
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleTitleChange = (value: string) => {
        handleTransChange('title', value);
        // Auto-generate slug from English title if slug is empty
        if (activeTab === 'en' && !slug) {
            setSlug(generateSlug(value));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 pb-20">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/blogs" className="text-gray-500 hover:text-navy">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-2xl font-bold text-navy">
                        {initialData ? 'Edit Blog' : 'New Blog'}
                    </h1>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary hover:bg-teal-600 text-white px-6 py-2 rounded flex items-center gap-2 font-bold disabled:opacity-50"
                >
                    <Save className="w-4 h-4" />
                    {loading ? 'Saving...' : 'Save Blog'}
                </button>
            </div>

            <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Slug</label>
                        <input
                            value={slug}
                            onChange={e => setSlug(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded focus:border-primary focus:outline-none"
                            required
                            placeholder="blog-post-slug"
                        />
                        <p className="text-xs text-gray-500 mt-1">URL-friendly identifier (e.g., "understanding-moisture-damage")</p>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                        <select
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded focus:border-primary focus:outline-none bg-white"
                        >
                            <option value="Education">Education</option>
                            <option value="Prevention">Prevention</option>
                            <option value="Case Study">Case Study</option>
                            <option value="Best Practices">Best Practices</option>
                            <option value="News">News</option>
                        </select>
                    </div>
                </div>
                <div className="mt-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={published}
                            onChange={e => setPublished(e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="text-sm font-medium text-gray-700">Published (Show on insights page)</span>
                    </label>
                </div>
            </div>

            <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200 flex bg-gray-50">
                    {LOCALES.map(loc => (
                        <button
                            key={loc}
                            type="button"
                            onClick={() => setActiveTab(loc)}
                            className={`px-6 py-3 text-sm font-bold uppercase transition-colors ${activeTab === loc
                                ? 'bg-white border-t-2 border-primary text-navy'
                                : 'text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            {loc}
                        </button>
                    ))}
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Title ({activeTab.toUpperCase()})</label>
                        <input
                            value={translations[activeTab]?.title || ''}
                            onChange={e => handleTitleChange(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Excerpt ({activeTab.toUpperCase()})</label>
                        <textarea
                            value={translations[activeTab]?.excerpt || ''}
                            onChange={e => handleTransChange('excerpt', e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded h-24"
                            required
                            placeholder="Short description that appears in the blog listing"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Content ({activeTab.toUpperCase()})</label>
                        <textarea
                            value={translations[activeTab]?.content || ''}
                            onChange={e => handleTransChange('content', e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded h-64"
                            required
                            placeholder="Full blog post content"
                        />
                    </div>
                </div>
            </div>

            {/* Featured Image */}
            <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-navy mb-2">Featured Image</h3>
                <p className="text-sm text-gray-500 mb-4">Upload a featured image for this blog post (optional).</p>
                <ImageUploader
                    images={featuredImage ? [featuredImage] : []}
                    onChange={(imgs) => setFeaturedImage(imgs[0] || '')}
                />
            </div>
        </form>
    );
}

