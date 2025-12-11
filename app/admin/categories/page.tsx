'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Package, Save, X } from 'lucide-react';

interface CategoryTranslation {
    locale: string;
    name: string;
    description: string;
}

interface ProductCategory {
    id: string;
    slug: string;
    icon: string;
    color: string;
    sortOrder: number;
    name: string;
    description: string;
    productCount: number;
    translations: CategoryTranslation[];
}

const ICON_OPTIONS = ['Package', 'Droplets', 'Shield', 'Apple', 'Leaf', 'Box', 'Container', 'Truck'];
const COLOR_OPTIONS = [
    { value: 'from-blue-500 to-blue-600', label: 'Blue' },
    { value: 'from-green-500 to-green-600', label: 'Green' },
    { value: 'from-primary to-primary-dark', label: 'Primary' },
    { value: 'from-orange-500 to-orange-600', label: 'Orange' },
    { value: 'from-emerald-500 to-emerald-600', label: 'Emerald' },
    { value: 'from-purple-500 to-purple-600', label: 'Purple' },
    { value: 'from-red-500 to-red-600', label: 'Red' },
    { value: 'from-amber-500 to-amber-600', label: 'Amber' },
];

export default function CategoriesPage() {
    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        slug: '',
        icon: 'Package',
        color: 'from-blue-500 to-blue-600',
        sortOrder: 0,
        nameEn: '',
        descriptionEn: '',
        nameAr: '',
        descriptionAr: '',
    });

    const fetchCategories = async () => {
        const res = await fetch('/api/product-categories');
        const data = await res.json();
        setCategories(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const resetForm = () => {
        setFormData({
            slug: '',
            icon: 'Package',
            color: 'from-blue-500 to-blue-600',
            sortOrder: 0,
            nameEn: '',
            descriptionEn: '',
            nameAr: '',
            descriptionAr: '',
        });
        setEditingId(null);
        setShowForm(false);
    };

    const handleEdit = (category: ProductCategory) => {
        const enTrans = category.translations.find(t => t.locale === 'en');
        const arTrans = category.translations.find(t => t.locale === 'ar');
        
        setFormData({
            slug: category.slug,
            icon: category.icon,
            color: category.color,
            sortOrder: category.sortOrder,
            nameEn: enTrans?.name || '',
            descriptionEn: enTrans?.description || '',
            nameAr: arTrans?.name || '',
            descriptionAr: arTrans?.description || '',
        });
        setEditingId(category.id);
        setShowForm(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const payload = {
            slug: formData.slug,
            icon: formData.icon,
            color: formData.color,
            sortOrder: formData.sortOrder,
            translations: [
                { locale: 'en', name: formData.nameEn, description: formData.descriptionEn },
                { locale: 'ar', name: formData.nameAr || formData.nameEn, description: formData.descriptionAr || formData.descriptionEn },
            ]
        };

        const url = editingId ? `/api/product-categories/${editingId}` : '/api/product-categories';
        const method = editingId ? 'PUT' : 'POST';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            fetchCategories();
            resetForm();
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this category?')) return;
        
        const res = await fetch(`/api/product-categories/${id}`, { method: 'DELETE' });
        if (res.ok) {
            fetchCategories();
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Product Categories</h1>
                    <p className="text-gray-600">Manage product categories for your store</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Category
                </button>
            </div>

            {showForm && (
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900">
                            {editingId ? 'Edit Category' : 'Add New Category'}
                        </h2>
                        <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="dryon, super-dryon, etc."
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Sort Order</label>
                                <input
                                    type="number"
                                    value={formData.sortOrder}
                                    onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) })}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                                <select
                                    value={formData.icon}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary"
                                >
                                    {ICON_OPTIONS.map(icon => (
                                        <option key={icon} value={icon}>{icon}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                                <select
                                    value={formData.color}
                                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary"
                                >
                                    {COLOR_OPTIONS.map(color => (
                                        <option key={color.value} value={color.value}>{color.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <h3 className="font-medium text-gray-900 mb-4">English Translation</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Name (EN)</label>
                                    <input
                                        type="text"
                                        value={formData.nameEn}
                                        onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description (EN)</label>
                                    <input
                                        type="text"
                                        value={formData.descriptionEn}
                                        onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <h3 className="font-medium text-gray-900 mb-4">Arabic Translation</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Name (AR)</label>
                                    <input
                                        type="text"
                                        value={formData.nameAr}
                                        onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary"
                                        dir="rtl"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description (AR)</label>
                                    <input
                                        type="text"
                                        value={formData.descriptionAr}
                                        onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary"
                                        dir="rtl"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                            >
                                <Save className="w-4 h-4" />
                                {editingId ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Slug</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Icon</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Products</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Order</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {categories.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                    <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                    <p>No categories yet. Add your first category.</p>
                                </td>
                            </tr>
                        ) : (
                            categories.map((cat) => (
                                <tr key={cat.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center shadow`}>
                                                <Package className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">{cat.name}</div>
                                                <div className="text-sm text-gray-500">{cat.description}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{cat.slug}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{cat.icon}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            {cat.productCount} products
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{cat.sortOrder}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(cat)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(cat.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

