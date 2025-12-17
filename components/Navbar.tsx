'use client';

import { useState, useEffect } from 'react';
import { Search, Globe, ChevronDown, Building2, Award, History, MapPin, Droplets, Package, Shield, Apple, Leaf, Factory, Shirt, Wrench, Car, Ship, Coffee, Box, Building, Truck, TreePine, Menu, X, Heart, FlaskConical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, usePathname, useRouter } from '@/lib/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import SearchModal from './SearchModal';

interface IndustryCategory {
    id: string;
    slug: string;
    icon: string;
    color: string;
    name: string;
}

interface ProductCategory {
    id: string;
    slug: string;
    icon: string;
    color: string;
    name: string;
    translations?: Array<{ locale: string; name: string }>;
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
};

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [showLang, setShowLang] = useState(false);
    const [showAboutDropdown, setShowAboutDropdown] = useState(false);
    const [showProductsDropdown, setShowProductsDropdown] = useState(false);
    const [showIndustriesDropdown, setShowIndustriesDropdown] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
    const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
    const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
    const [industries, setIndustries] = useState<IndustryCategory[]>([]);
    const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
    const pathname = usePathname();
    const router = useRouter();
    const t = useTranslations('Navbar');

    // Keyboard shortcut to open search (Cmd/Ctrl + K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setShowSearchModal(true);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setShowMobileMenu(false);
        setMobileAboutOpen(false);
        setMobileProductsOpen(false);
        setMobileIndustriesOpen(false);
    }, [pathname]);

    // Fetch industries from backend
    useEffect(() => {
        const fetchIndustries = async () => {
            try {
                const res = await fetch('/api/industry-categories');
                if (res.ok) {
                    const data = await res.json();
                    setIndustries(data);
                }
            } catch (error) {
                // Failed to fetch industries
            }
        };
        fetchIndustries();
    }, []);

    // Fetch product categories from backend
    useEffect(() => {
        const fetchProductCategories = async () => {
            try {
                const res = await fetch('/api/product-categories');
                if (res.ok) {
                    const data = await res.json();
                    setProductCategories(data);
                }
            } catch (error) {
                // Failed to fetch product categories
            }
        };
        fetchProductCategories();
    }, []);

    const changeParam = (lang: string) => {
        router.replace(pathname, { locale: lang });
        setShowLang(false);
    };

    const aboutDropdownItems = [
        { href: '/about', label: 'Company Overview', icon: Building2 },
        { href: '/about#achievements', label: 'Achievements', icon: Award },
        { href: '/about#history', label: 'Our History', icon: History },
        // { href: '/about#branches', label: 'Branches', icon: MapPin },
        { href: '/about#sustainability', label: 'Sustainability', icon: TreePine },
        { href: '/about/csr', label: 'CSR', icon: Heart },
        { href: '/about/rd', label: 'R&D', icon: FlaskConical },
    ];

    // Helper to get category name from translations
    const getCategoryName = (category: ProductCategory) => {
        const translation = category.translations?.find(t => t.locale === 'en');
        return translation?.name || category.name || category.slug;
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 nav-shadow ${scrolled
                ? 'bg-white py-2'
                : 'bg-white/98 backdrop-blur-md py-3'
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center group" onClick={() => setShowMobileMenu(false)}>
                    <Image
                        src="/images/DryON Pakistan.png"
                        alt="DryOn Pakistan Logo"
                        width={200}
                        height={80}
                        className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                        priority
                    />
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-5 text-sm font-medium text-secondary">
                    {/* About Dropdown */}
                    <div 
                        className="relative"
                        onMouseEnter={() => setShowAboutDropdown(true)}
                        onMouseLeave={() => setShowAboutDropdown(false)}
                    >
                        <button 
                            className="hover:text-primary transition-all uppercase tracking-wide py-2 hover:-translate-y-0.5 flex items-center gap-1"
                            aria-expanded={showAboutDropdown}
                            aria-haspopup="true"
                        >
                            {t('about')}
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showAboutDropdown ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <AnimatePresence>
                            {showAboutDropdown && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute left-0 top-full pt-2 w-56"
                                >
                                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2">
                                        {aboutDropdownItems.map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                                                    <item.icon className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                                                </div>
                                                <span className="text-secondary group-hover:text-primary transition-colors normal-case font-medium">
                                                    {item.label}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Products Dropdown */}
                    <div 
                        className="relative"
                        onMouseEnter={() => setShowProductsDropdown(true)}
                        onMouseLeave={() => setShowProductsDropdown(false)}
                    >
                        <button 
                            className="hover:text-primary transition-all uppercase tracking-wide py-2 hover:-translate-y-0.5 flex items-center gap-1"
                            aria-expanded={showProductsDropdown}
                            aria-haspopup="true"
                        >
                            {t('products')}
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showProductsDropdown ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <AnimatePresence>
                            {showProductsDropdown && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute left-0 top-full pt-2 w-72"
                                >
                                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2 max-h-[70vh] overflow-y-auto">
                                        {/* All Products Link */}
                                        <Link
                                            href="/products"
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group border-b border-gray-100 mb-1"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                                                <Package className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <span className="block font-semibold text-primary normal-case">
                                                    All Products
                                                </span>
                                                <span className="text-xs text-slate normal-case">View complete range</span>
                                            </div>
                                        </Link>
                                        
                                        {/* Dynamic Product Categories */}
                                        {productCategories.map((category, idx) => {
                                            const IconComponent = iconMap[category.icon] || Package;
                                            return (
                                                <Link
                                                    key={category.id || category.slug || `cat-${idx}`}
                                                    href={`/products?category=${category.slug}`}
                                                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                                                >
                                                    <div className="w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary flex items-center justify-center transition-colors">
                                                        <IconComponent className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                                                    </div>
                                                    <span className="text-secondary group-hover:text-primary transition-colors normal-case font-medium">
                                                        {getCategoryName(category)}
                                                    </span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Solutions by Industry Dropdown */}
                    <div 
                        className="relative"
                        onMouseEnter={() => setShowIndustriesDropdown(true)}
                        onMouseLeave={() => setShowIndustriesDropdown(false)}
                    >
                        <button 
                            className="hover:text-primary transition-all uppercase tracking-wide py-2 hover:-translate-y-0.5 flex items-center gap-1"
                            aria-expanded={showIndustriesDropdown}
                            aria-haspopup="true"
                        >
                            {t('solutionsByIndustry')}
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showIndustriesDropdown ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <AnimatePresence>
                            {showIndustriesDropdown && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 top-full pt-2 w-72"
                                >
                                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2 max-h-[70vh] overflow-y-auto">
                                        {/* All Industries Link */}
                                        <Link
                                            href="/solutions-by-industry"
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group border-b border-gray-100 mb-1"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                                                <Factory className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <span className="block font-semibold text-primary normal-case">
                                                    All Industries
                                                </span>
                                                <span className="text-xs text-slate normal-case">View all industry solutions</span>
                                            </div>
                                        </Link>
                                        
                                        {/* Dynamic Industries */}
                                        {industries.map((industry, idx) => {
                                            const IconComponent = iconMap[industry.icon] || Factory;
                                            return (
                                                <Link
                                                    key={industry.id || industry.slug || `ind-${idx}`}
                                                    href={`/solutions-by-industry?industry=${industry.slug}`}
                                                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                                                >
                                                    <div className={`w-10 h-10 rounded-lg ${industry.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                                        <IconComponent className="w-5 h-5 text-white" />
                                                    </div>
                                                    <span className="text-secondary group-hover:text-primary transition-colors normal-case font-medium">
                                                        {industry.name}
                                                    </span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link href="/damage-prevention" className="hover:text-primary transition-all uppercase tracking-wide py-2 hover:-translate-y-0.5">{t('moistureDamagePrevention')}</Link>
                    <Link href="/insights" className="hover:text-primary transition-all uppercase tracking-wide py-2 hover:-translate-y-0.5">{t('insights')}</Link>
                    
                    

                    <Link href="/contact" className="btn-3d bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-md uppercase tracking-wide shadow-md hover:shadow-lg">{t('contact')}</Link>
                </div>

                {/* Desktop Icons */}
                <div className="hidden lg:flex items-center gap-4 text-secondary">
                    <div className="relative">
                        <button
                            title="Global"
                            aria-label="Select language"
                            className="hover:text-primary transition-colors flex items-center p-2 rounded-md hover:bg-gray-100"
                            onClick={() => setShowLang(!showLang)}
                            tabIndex={0}
                        >
                            <Globe className="w-5 h-5" />
                        </button>
                        {showLang && (
                            <div className="absolute right-0 top-full mt-2 bg-white text-secondary rounded-lg shadow-xl py-2 w-36 border border-gray-100 overflow-hidden z-50">
                                {['en', 'fr', 'es', 'ar'].map(l => (
                                    <button
                                        key={l}
                                        onClick={() => changeParam(l)}
                                        className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 uppercase font-medium text-sm transition-colors"
                                        tabIndex={0}
                                    >
                                        {l === 'en' ? 'English' : l === 'fr' ? 'Français' : l === 'es' ? 'Español' : 'العربية'}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <button 
                        title={`${t('search')} (⌘K)`}
                        aria-label="Search"
                        className="hover:text-primary transition-colors p-2 rounded-md hover:bg-gray-100 flex items-center gap-2"
                        tabIndex={0}
                        onClick={() => setShowSearchModal(true)}
                    >
                        <Search className="w-5 h-5" />
                        <kbd className="hidden md:inline-flex items-center gap-0.5 px-2 py-0.5 text-xs font-medium text-gray-500 bg-gray-100 rounded border border-gray-200">
                            ⌘K
                        </kbd>
                    </button>
                    <a 
                        href="/admin/login" 
                        className="font-semibold text-xs border-2 border-secondary text-secondary hover:bg-secondary hover:text-white px-3 py-1.5 rounded-md uppercase tracking-wide transition-all"
                    >
                        {t('admin')}
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden p-2 text-secondary hover:text-primary transition-colors"
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                    aria-label="Toggle menu"
                    aria-expanded={showMobileMenu}
                >
                    {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {showMobileMenu && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="container mx-auto px-6 py-4 space-y-2 max-h-[calc(100vh-80px)] overflow-y-auto">
                            {/* About Dropdown Mobile */}
                            <div>
                                <button
                                    onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                                    className="w-full flex items-center justify-between py-3 text-secondary hover:text-primary transition-colors uppercase tracking-wide font-medium"
                                >
                                    <span>{t('about')}</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileAboutOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {mobileAboutOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="pl-4 space-y-1"
                                        >
                                            {aboutDropdownItems.map((item) => (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    onClick={() => {
                                                        setShowMobileMenu(false);
                                                        setMobileAboutOpen(false);
                                                    }}
                                                    className="flex items-center gap-3 py-2 text-slate hover:text-primary transition-colors"
                                                >
                                                    <item.icon className="w-4 h-4" />
                                                    <span className="normal-case">{item.label}</span>
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Products Dropdown Mobile */}
                            <div>
                                <button
                                    onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                                    className="w-full flex items-center justify-between py-3 text-secondary hover:text-primary transition-colors uppercase tracking-wide font-medium"
                                >
                                    <span>{t('products')}</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileProductsOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {mobileProductsOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="pl-4 space-y-1"
                                        >
                                            <Link
                                                href="/products"
                                                onClick={() => {
                                                    setShowMobileMenu(false);
                                                    setMobileProductsOpen(false);
                                                }}
                                                className="flex items-center gap-3 py-2 text-slate hover:text-primary transition-colors font-semibold"
                                            >
                                                <Package className="w-4 h-4" />
                                                <span className="normal-case">All Products</span>
                                            </Link>
                                            {productCategories.map((category, idx) => {
                                                const IconComponent = iconMap[category.icon] || Package;
                                                return (
                                                    <Link
                                                        key={category.id || category.slug || `cat-${idx}`}
                                                        href={`/products?category=${category.slug}`}
                                                        onClick={() => {
                                                            setShowMobileMenu(false);
                                                            setMobileProductsOpen(false);
                                                        }}
                                                        className="flex items-center gap-3 py-2 text-slate hover:text-primary transition-colors"
                                                    >
                                                        <IconComponent className="w-4 h-4" />
                                                        <span className="normal-case">{getCategoryName(category)}</span>
                                                    </Link>
                                                );
                                            })}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Solutions by Industry Dropdown Mobile */}
                            <div>
                                <button
                                    onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
                                    className="w-full flex items-center justify-between py-3 text-secondary hover:text-primary transition-colors uppercase tracking-wide font-medium"
                                >
                                    <span>{t('solutionsByIndustry')}</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileIndustriesOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {mobileIndustriesOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="pl-4 space-y-1"
                                        >
                                            <Link
                                                href="/solutions-by-industry"
                                                onClick={() => {
                                                    setShowMobileMenu(false);
                                                    setMobileIndustriesOpen(false);
                                                }}
                                                className="flex items-center gap-3 py-2 text-slate hover:text-primary transition-colors font-semibold"
                                            >
                                                <Factory className="w-4 h-4" />
                                                <span className="normal-case">All Industries</span>
                                            </Link>
                                            {industries.map((industry, idx) => {
                                                const IconComponent = iconMap[industry.icon] || Factory;
                                                return (
                                                    <Link
                                                        key={industry.id || industry.slug || `ind-${idx}`}
                                                        href={`/solutions-by-industry?industry=${industry.slug}`}
                                                        onClick={() => {
                                                            setShowMobileMenu(false);
                                                            setMobileIndustriesOpen(false);
                                                        }}
                                                        className="flex items-center gap-3 py-2 text-slate hover:text-primary transition-colors"
                                                    >
                                                        <IconComponent className="w-4 h-4" />
                                                        <span className="normal-case">{industry.name}</span>
                                                    </Link>
                                                );
                                            })}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Damage Prevention */}
                            <Link
                                href="/damage-prevention"
                                onClick={() => setShowMobileMenu(false)}
                                className="block py-3 text-secondary hover:text-primary transition-colors uppercase tracking-wide font-medium"
                            >
                                {t('moistureDamagePrevention')}
                            </Link>

                            {/* Insights */}
                            <Link
                                href="/insights"
                                onClick={() => setShowMobileMenu(false)}
                                className="block py-3 text-secondary hover:text-primary transition-colors uppercase tracking-wide font-medium"
                            >
                                {t('insights')}
                            </Link>

                            

                            {/* Contact */}
                            <Link
                                href="/contact"
                                onClick={() => setShowMobileMenu(false)}
                                className="block py-3 bg-primary text-white rounded-md text-center uppercase tracking-wide font-medium hover:bg-primary-dark transition-colors"
                            >
                                {t('contact')}
                            </Link>

                            {/* Admin Link */}
                            <a
                                href="/admin/login"
                                onClick={() => setShowMobileMenu(false)}    
                                className="block py-3 text-center font-semibold text-xs border-2 border-secondary text-secondary hover:bg-secondary hover:text-white rounded-md uppercase tracking-wide transition-all"
                            >
                                {t('admin')}
                            </a>

                            {/* Mobile Icons */}
                            <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => {
                                        setShowSearchModal(true);
                                        setShowMobileMenu(false);
                                    }}
                                    className="p-2 text-secondary hover:text-primary transition-colors"
                                    aria-label="Search"
                                >
                                    <Search className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setShowLang(!showLang)}
                                    className="p-2 text-secondary hover:text-primary transition-colors"
                                    aria-label="Select language"
                                >
                                    <Globe className="w-5 h-5" />
                                </button>
                                {showLang && (
                                    <div className="absolute bottom-20 left-6 right-6 bg-white text-secondary rounded-lg shadow-xl py-2 border border-gray-100 overflow-hidden z-50">
                                        {['en', 'fr', 'es', 'ar'].map(l => (
                                            <button
                                                key={l}
                                                onClick={() => {
                                                    changeParam(l);
                                                    setShowMobileMenu(false);
                                                }}
                                                className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 uppercase font-medium text-sm transition-colors"
                                            >
                                                {l === 'en' ? 'English' : l === 'fr' ? 'Français' : l === 'es' ? 'Español' : 'العربية'}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Search Modal */}
            <SearchModal 
                isOpen={showSearchModal} 
                onClose={() => setShowSearchModal(false)} 
            />
        </motion.nav>
    );
}
