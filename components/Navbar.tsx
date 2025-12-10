'use client';

import { useState, useEffect } from 'react';
import { Search, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, usePathname, useRouter } from '@/lib/navigation';
import { useTranslations } from 'next-intl';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [showLang, setShowLang] = useState(false);
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

    const changeParam = (lang: string) => {
        router.replace(pathname, { locale: lang });
        setShowLang(false);
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-white shadow-md border-b border-gray-200 py-4'
                : 'bg-navy/80 backdrop-blur-sm py-6'
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-tr-lg rounded-bl-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-full opacity-50" />
                    </div>
                    <span className={`font-bold text-xl tracking-wide transition-colors ${scrolled ? 'text-navy' : 'text-white'}`}>
                        DryOn
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className={`hidden md:flex items-center gap-8 text-sm font-medium transition-colors ${scrolled ? 'text-navy' : 'text-white'}`}>
                    <Link href="/damage-prevention" className="hover:text-primary transition-colors uppercase">{t('damagePrevention')}</Link>
                    <Link href="/products" className="hover:text-primary transition-colors uppercase">{t('products')}</Link>
                    <Link href="/talk-to-expert" className="hover:text-primary transition-colors uppercase">{t('talkToExpert')}</Link>
                    <Link href="/insights" className="hover:text-primary transition-colors uppercase">{t('insights')}</Link>
                    <Link href="/sustainability" className="hover:text-primary transition-colors uppercase">{t('sustainability')}</Link>
                    <Link href="/about" className="hover:text-primary transition-colors uppercase">{t('about')}</Link>
                    <Link href="/contact" className="hover:text-primary transition-colors uppercase">{t('contact')}</Link>
                </div>

                {/* Icons */}
                <div className={`flex items-center gap-4 transition-colors ${scrolled ? 'text-navy' : 'text-white'}`}>
                    <div className="relative">
                        <button
                            title="Global"
                            className="hover:text-primary transition-colors flex items-center"
                            onClick={() => setShowLang(!showLang)}
                        >
                            <Globe className="w-5 h-5" />
                        </button>
                        {showLang && (
                            <div className="absolute right-0 top-full mt-2 bg-white text-navy rounded shadow-lg py-2 w-32 border border-gray-100">
                                {['en', 'fr', 'es', 'ar'].map(l => (
                                    <button
                                        key={l}
                                        onClick={() => changeParam(l)}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 uppercase font-medium text-sm"
                                    >
                                        {l}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <button title={t('search')} className="hover:text-primary transition-colors">
                        <Search className="w-5 h-5" />
                    </button>
                    <a href="/admin/login" className="hover:text-primary transition-colors font-bold text-xs border border-current px-2 py-1 rounded uppercase">
                        {t('admin')}
                    </a>
                </div>
            </div>
        </motion.nav>
    );
}
