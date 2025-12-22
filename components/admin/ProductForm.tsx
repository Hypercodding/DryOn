'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ContainerEditor from './ContainerEditor';
import ImageUploader from './ImageUploader';

const LOCALES = ['en', 'fr', 'es', 'ar'];

interface Category {
    id: string;
    slug: string;
    name: string;
}

interface Industry {
    id: string;
    slug: string;
    name: string;
}

interface ProductFormProps {
    initialData?: {
        id: string;
        sku: string;
        categoryId?: string | null;
        industryId?: string | null;
        featured: boolean;
        images: string;
        containerPoints?: string | null;
        translations: Array<{ locale: string; name: string; description: string }>;
    };
}

export default function ProductForm({ initialData }: ProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('en');

    const [categories, setCategories] = useState<Category[]>([]);
    const [industries, setIndustries] = useState<Industry[]>([]);

    const [sku, setSku] = useState(initialData?.sku || '');
    const [categoryId, setCategoryId] = useState(initialData?.categoryId || '');
    const [industryId, setIndustryId] = useState(initialData?.industryId || '');
    const [featured, setFeatured] = useState(initialData?.featured || false);
    const [imagesJson, setImagesJson] = useState(initialData?.images || '[]');
    const [containerPoints, setContainerPoints] = useState(initialData?.containerPoints || '[]');

    const [translations, setTranslations] = useState<Record<string, { locale: string; name: string; description: string }>>(
        initialData?.translations?.reduce((acc, t) => ({
            ...acc, [t.locale]: t
        }), {}) || {}
    );

    useEffect(() => {
        const fetchData = async () => {
            const [catRes, indRes] = await Promise.all([
                fetch('/api/product-categories'),
                fetch('/api/industry-categories')
            ]);
            const catData = await catRes.json();
            const indData = await indRes.json();
            setCategories(catData);
            setIndustries(indData);
        };
        fetchData();
    }, []);

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
                sku,
                categoryId: categoryId || null,
                industryId: industryId || null,
                featured,
                translations: Object.values(translations),
                containerPoints,
                images: JSON.parse(imagesJson)
            };

            const res = await fetch(initialData ? `/api/products/${initialData.id}` : '/api/products', {
                method: initialData ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error('Failed to save');

            router.push('/admin/products');
            router.refresh();
        } catch (err) {
            alert('Error saving product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 pb-20">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/products" className="text-gray-500 hover:text-navy">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-2xl font-bold text-navy">
                        {initialData ? 'Edit Product' : 'New Product'}
                    </h1>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary hover:bg-teal-600 text-white px-6 py-2 rounded flex items-center gap-2 font-bold disabled:opacity-50"
                >
                    <Save className="w-4 h-4" />
                    {loading ? 'Saving...' : 'Save Product'}
                </button>
            </div>

            <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">SKU</label>
                        <input
                            value={sku}
                            onChange={e => setSku(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded focus:border-primary focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Product Category</label>
                        <select
                            value={categoryId}
                            onChange={e => setCategoryId(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded focus:border-primary focus:outline-none bg-white"
                        >
                            <option value="">-- Select Category --</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Industry Category</label>
                    <select
                        value={industryId}
                        onChange={e => setIndustryId(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded focus:border-primary focus:outline-none bg-white"
                    >
                        <option value="">-- Select Industry --</option>
                        {industries.map(ind => (
                            <option key={ind.id} value={ind.id}>{ind.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mt-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={featured}
                            onChange={e => setFeatured(e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="text-sm font-medium text-gray-700">Featured Product (Show on homepage)</span>
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
                        <label className="block text-sm font-bold text-gray-700 mb-2">Product Name ({activeTab.toUpperCase()})</label>
                        <input
                            value={translations[activeTab]?.name || ''}
                            onChange={e => handleTransChange('name', e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Description ({activeTab.toUpperCase()})</label>
                        <textarea
                            value={translations[activeTab]?.description || ''}
                            onChange={e => handleTransChange('description', e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded h-32"
                        />
                    </div>
                </div>
            </div>

            {/* Images */}
            <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-navy mb-2">Product Images</h3>
                <p className="text-sm text-gray-500 mb-4">You can upload up to 2 images for each product.</p>
                <ImageUploader
                    images={JSON.parse(imagesJson || '[]')}
                    onChange={(imgs) => setImagesJson(JSON.stringify(imgs.slice(0, 2)))}
                />
            </div>

            {/* Container Visualizer Editor */}
            <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-navy mb-4">Container Map</h3>
                <p className="text-sm text-gray-500 mb-4">
                    Upload an image above to start mapping points. Points will be overlaid on the first image.
                </p>
                <ContainerEditor
                    pointsJson={containerPoints}
                    onChange={setContainerPoints}
                    imageUrl={JSON.parse(imagesJson)[0] || null}
                />
            </div>
        </form>
    );
}
