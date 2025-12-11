'use client';

import { useState, useEffect } from 'react';
import { Search, Globe, ChevronDown, Building2, Award, History, MapPin, Droplets, Package, Shield, Apple, Leaf, Factory, Shirt, Wrench, Car, Ship, Coffee, Box, Building, Truck, TreePine } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, usePathname, useRouter } from '@/lib/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface IndustryCategory {
    id: string;
    slug: string;
    icon: string;
    color: string;
    name: string;
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
    const [industries, setIndustries] = useState<IndustryCategory[]>([]);
    const pathname = usePathname();
    const router = useRouter();
    const t = useTranslations('Navbar');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                console.error('Failed to fetch industries:', error);
            }
        };
        fetchIndustries();
    }, []);

    const changeParam = (lang: string) => {
        router.replace(pathname, { locale: lang });
        setShowLang(false);
    };

    const aboutDropdownItems = [
        { href: '/about', label: 'Company Overview', icon: Building2 },
        { href: '/about#achievements', label: 'Achievements', icon: Award },
        { href: '/about#history', label: 'Our History', icon: History },
        { href: '/about#branches', label: 'Branches', icon: MapPin },
        { href: '/about#sustainability', label: 'Sustainability', icon: TreePine },
    ];

    const productDropdownItems = [
        { href: '/products', label: 'All Products', icon: Package, desc: 'View complete range' },
        { href: '/products?category=dryon', label: 'DryON', icon: Droplets, desc: 'Container Desiccants' },
        { href: '/products?category=super-dryon', label: 'Super DryON', icon: Package, desc: 'In-Box Desiccants' },
        { href: '/products?category=greenpro', label: 'GreenPro', icon: Shield, desc: 'Transafeliners' },
        { href: '/products?category=freshon', label: 'FreshON', icon: Apple, desc: 'Ethylene Absorber' },
        { href: '/products?category=drypak-eco', label: 'DryPak ECO', icon: Leaf, desc: 'Sustainable Desiccants' },
    ];

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
                <Link href="/" className="flex items-center group">
                    <Image
                        src="/images/DryON Pakistan.png"
                        alt="DryOn Pakistan Logo"
                        width={200}
                        height={80}
                        className="h-12 md:h-13 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
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
                                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2">
                                        {productDropdownItems.map((item, idx) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group ${idx === 0 ? 'border-b border-gray-100 mb-1' : ''}`}
                                            >
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${idx === 0 ? 'bg-primary' : 'bg-primary/10 group-hover:bg-primary'}`}>
                                                    <item.icon className={`w-5 h-5 ${idx === 0 ? 'text-white' : 'text-primary group-hover:text-white'} transition-colors`} />
                                                </div>
                                                <div>
                                                    <span className={`block font-semibold ${idx === 0 ? 'text-primary' : 'text-secondary group-hover:text-primary'} transition-colors normal-case`}>
                                                        {item.label}
                                                    </span>
                                                    <span className="text-xs text-slate normal-case">{item.desc}</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link href="/damage-prevention" className="hover:text-primary transition-all uppercase tracking-wide py-2 hover:-translate-y-0.5">{t('moistureDamagePrevention')}</Link>
                    <Link href="/insights" className="hover:text-primary transition-all uppercase tracking-wide py-2 hover:-translate-y-0.5">{t('insights')}</Link>
                    
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
                                        {industries.map((industry) => {
                                            const IconComponent = iconMap[industry.icon] || Factory;
                                            return (
                                                <Link
                                                    key={industry.id}
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

                    <Link href="/contact" className="btn-3d bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-md uppercase tracking-wide shadow-md hover:shadow-lg">{t('contact')}</Link>
                </div>

                {/* Icons */}
                <div className="flex items-center gap-4 text-secondary">
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
                            <div className="absolute right-0 top-full mt-2 bg-white text-secondary rounded-lg shadow-xl py-2 w-36 border border-gray-100 overflow-hidden">
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
                        title={t('search')} 
                        aria-label="Search"
                        className="hover:text-primary transition-colors p-2 rounded-md hover:bg-gray-100"
                        tabIndex={0}
                    >
                        <Search className="w-5 h-5" />
                    </button>
                    <a 
                        href="/admin/login" 
                        className="font-semibold text-xs border-2 border-secondary text-secondary hover:bg-secondary hover:text-white px-3 py-1.5 rounded-md uppercase tracking-wide transition-all"
                    >
                        {t('admin')}
                    </a>
                </div>
            </div>
        </motion.nav>
    );
}
