'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Package, Factory, FileText, Loader2, ArrowRight, Building2, Droplets, Leaf, Lightbulb, Mail, Shirt, Wrench, Car, Ship, Coffee, Box, Building, Truck, Apple, Shield } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Image from 'next/image';

interface SearchResult {
    products: Array<{
        id: string;
        sku: string;
        name: string;
        description: string;
        image: string;
        category: string;
        href: string;
    }>;
    categories: Array<{
        id: string;
        slug: string;
        name: string;
        description: string;
        icon: string;
        color: string;
        href: string;
    }>;
    industries: Array<{
        id: string;
        slug: string;
        name: string;
        description: string;
        icon: string;
        color: string;
        href: string;
    }>;
    pages: Array<{
        slug: string;
        name: string;
        description: string;
        icon: string;
        href: string;
    }>;
}

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Factory,
    Leaf,
    Shirt,
    Package,
    Apple,
    Wrench,
    Car,
    Ship,
    Coffee,
    Box,
    Building,
    Truck,
    Droplets,
    Shield,
    Building2,
    Mail,
    Lightbulb,
    FileText,
};

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);
    const t = useTranslations('Search');
    const locale = useLocale();

    // Debounced search
    const searchDebounceRef = useRef<NodeJS.Timeout | null>(null);

    const performSearch = useCallback(async (searchQuery: string) => {
        if (searchQuery.length < 2) {
            setResults(null);
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&locale=${locale}&limit=5`);
            if (res.ok) {
                const data = await res.json();
                setResults(data);
            }
        } catch (error) {
            // Search failed
        } finally {
            setIsLoading(false);
        }
    }, [locale]);

    useEffect(() => {
        if (searchDebounceRef.current) {
            clearTimeout(searchDebounceRef.current);
        }
        searchDebounceRef.current = setTimeout(() => {
            performSearch(query);
        }, 300);

        return () => {
            if (searchDebounceRef.current) {
                clearTimeout(searchDebounceRef.current);
            }
        };
    }, [query, performSearch]);

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
        if (!isOpen) {
            setQuery('');
            setResults(null);
            setSelectedIndex(-1);
        }
    }, [isOpen]);

    // Close on escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    // Get all results in a flat array for keyboard navigation
    const getAllResults = () => {
        if (!results) return [];
        return [
            ...results.pages.map(p => ({ ...p, type: 'page' })),
            ...results.products.map(p => ({ ...p, type: 'product' })),
            ...results.categories.map(c => ({ ...c, type: 'category' })),
            ...results.industries.map(i => ({ ...i, type: 'industry' })),
        ];
    };

    const allResults = getAllResults();
    const hasResults = allResults.length > 0;
    const showNoResults = query.length >= 2 && !isLoading && !hasResults;

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => Math.min(prev + 1, allResults.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => Math.max(prev - 1, -1));
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault();
            const selected = allResults[selectedIndex];
            if (selected) {
                onClose();
                // Navigation handled by Link component
            }
        }
    };

    const renderIcon = (iconName: string, className: string) => {
        const IconComponent = iconMap[iconName] || FileText;
        return <IconComponent className={className} />;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ type: 'spring', duration: 0.3 }}
                        className="fixed top-[10%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-[101] px-4"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                            {/* Search Input */}
                            <div className="relative flex items-center border-b border-gray-100">
                                <Search className="absolute left-5 w-5 h-5 text-gray-400" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder={t('placeholder')}
                                    className="w-full py-5 pl-14 pr-14 text-lg focus:outline-none placeholder:text-gray-400"
                                    aria-label={t('placeholder')}
                                />
                                {isLoading && (
                                    <Loader2 className="absolute right-14 w-5 h-5 text-primary animate-spin" />
                                )}
                                <button
                                    onClick={onClose}
                                    className="absolute right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    aria-label={t('close')}
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            {/* Results */}
                            <div ref={resultsRef} className="max-h-[60vh] overflow-y-auto">
                                {/* Quick Links when no query */}
                                {query.length < 2 && !results && (
                                    <div className="p-4">
                                        <p className="text-sm text-gray-500 mb-3 px-2">{t('quickLinks')}</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {[
                                                { href: '/products', icon: Package, label: t('products') },
                                                { href: '/solutions-by-industry', icon: Factory, label: t('industries') },
                                                { href: '/damage-prevention', icon: Droplets, label: t('damagePrevention') },
                                                { href: '/contact', icon: Mail, label: t('contact') },
                                            ].map((link) => (
                                                <Link
                                                    key={link.href}
                                                    href={link.href}
                                                    onClick={onClose}
                                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                                                >
                                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                                                        <link.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                                                    </div>
                                                    <span className="font-medium text-secondary group-hover:text-primary transition-colors">
                                                        {link.label}
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* No Results */}
                                {showNoResults && (
                                    <div className="py-12 text-center">
                                        <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-500 text-lg">{t('noResults')}</p>
                                        <p className="text-gray-400 text-sm mt-1">{t('tryDifferent')}</p>
                                    </div>
                                )}

                                {/* Search Results */}
                                {hasResults && (
                                    <div className="py-2">
                                        {/* Pages */}
                                        {results?.pages && results.pages.length > 0 && (
                                            <div className="mb-2">
                                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-2">
                                                    {t('pages')}
                                                </p>
                                                {results.pages.map((page, idx) => (
                                                    <Link
                                                        key={page.slug}
                                                        href={page.href}
                                                        onClick={onClose}
                                                        className={`flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors group ${
                                                            selectedIndex === idx ? 'bg-gray-50' : ''
                                                        }`}
                                                    >
                                                        <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:bg-secondary transition-colors">
                                                            {renderIcon(page.icon, 'w-5 h-5 text-secondary group-hover:text-white transition-colors')}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-medium text-secondary group-hover:text-primary transition-colors">
                                                                {page.name}
                                                            </p>
                                                            <p className="text-sm text-gray-500 truncate">{page.description}</p>
                                                        </div>
                                                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                                                    </Link>
                                                ))}
                                            </div>
                                        )}

                                        {/* Products */}
                                        {results?.products && results.products.length > 0 && (
                                            <div className="mb-2">
                                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-2">
                                                    {t('products')}
                                                </p>
                                                {results.products.map((product, idx) => {
                                                    const resultIdx = (results?.pages?.length || 0) + idx;
                                                    return (
                                                        <Link
                                                            key={product.id || product.sku || `product-${idx}`}
                                                            href={product.href}
                                                            onClick={onClose}
                                                            className={`flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors group ${
                                                                selectedIndex === resultIdx ? 'bg-gray-50' : ''
                                                            }`}
                                                        >
                                                            <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                                                                <Image
                                                                    src={product.image}
                                                                    alt={product.name}
                                                                    width={48}
                                                                    height={48}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="font-medium text-secondary group-hover:text-primary transition-colors">
                                                                    {product.name}
                                                                </p>
                                                                <p className="text-sm text-gray-500">
                                                                    {product.category} • SKU: {product.sku}
                                                                </p>
                                                            </div>
                                                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        )}

                                        {/* Categories */}
                                        {results?.categories && results.categories.length > 0 && (
                                            <div className="mb-2">
                                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-2">
                                                    {t('categories')}
                                                </p>
                                                {results.categories.map((category, idx) => {
                                                    const resultIdx = (results?.pages?.length || 0) + (results?.products?.length || 0) + idx;
                                                    return (
                                                        <Link
                                                            key={category.id || category.slug || `category-${idx}`}
                                                            href={category.href}
                                                            onClick={onClose}
                                                            className={`flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors group ${
                                                                selectedIndex === resultIdx ? 'bg-gray-50' : ''
                                                            }`}
                                                        >
                                                            <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                                                {renderIcon(category.icon, 'w-5 h-5 text-white')}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="font-medium text-secondary group-hover:text-primary transition-colors">
                                                                    {category.name}
                                                                </p>
                                                                <p className="text-sm text-gray-500 truncate">{category.description}</p>
                                                            </div>
                                                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        )}

                                        {/* Industries */}
                                        {results?.industries && results.industries.length > 0 && (
                                            <div className="mb-2">
                                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-2">
                                                    {t('industries')}
                                                </p>
                                                {results.industries.map((industry, idx) => {
                                                    const resultIdx = (results?.pages?.length || 0) + (results?.products?.length || 0) + (results?.categories?.length || 0) + idx;
                                                    return (
                                                        <Link
                                                            key={industry.id || industry.slug || `industry-${idx}`}
                                                            href={industry.href}
                                                            onClick={onClose}
                                                            className={`flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors group ${
                                                                selectedIndex === resultIdx ? 'bg-gray-50' : ''
                                                            }`}
                                                        >
                                                            <div className={`w-10 h-10 rounded-lg ${industry.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                                                {renderIcon(industry.icon, 'w-5 h-5 text-white')}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="font-medium text-secondary group-hover:text-primary transition-colors">
                                                                    {industry.name}
                                                                </p>
                                                                <p className="text-sm text-gray-500 truncate">{industry.description}</p>
                                                            </div>
                                                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="border-t border-gray-100 px-5 py-3 flex items-center justify-between text-sm text-gray-500 bg-gray-50/50">
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-2 py-0.5 bg-gray-100 rounded text-xs font-mono">↑↓</kbd>
                                        {t('navigate')}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-2 py-0.5 bg-gray-100 rounded text-xs font-mono">Enter</kbd>
                                        {t('select')}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-2 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd>
                                        {t('close')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

