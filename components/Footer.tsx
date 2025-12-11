'use client';

import { ArrowRight, Linkedin, Youtube, Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Footer() {
    const t = useTranslations('HomePage.Footer');

    return (
        <footer>
            {/* Newsletter CTA Section
            <div className="bg-gradient-to-r from-primary to-primary-dark py-12">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-white text-center md:text-left">
                            <h3 className="text-2xl font-bold mb-2">{t('newsletter.title')}</h3>
                            <p className="text-white/80">{t('newsletter.description')}</p>
                        </div>
                        <form className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <input 
                                type="email" 
                                placeholder={t('form.email')} 
                                className="px-5 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:bg-white/20 focus:border-white min-w-[280px]"
                                aria-label={t('form.email')}
                            />
                            <button 
                                type="submit"
                                className="bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
                            >
                                {t('form.submit')} <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>
            </div> */}

            {/* Main Footer Content */}
            <div className="bg-secondary text-white">
                <div className="container mx-auto px-6 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {/* Company Info */}
                        <div>
                            <div className="mb-6 bg-white rounded-lg p-3 inline-block shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <Image
                                    src="/images/DryON Pakistan.png"
                                    alt="DryOn Pakistan Logo"
                                    width={140}
                                    height={45}
                                    className="h-10 w-auto object-contain"
                                />
                            </div>
                            <p className="text-white/70 mb-6 text-sm leading-relaxed">
                                Leading provider of moisture damage prevention solutions for global shipping and logistics.
                            </p>
                            <div className="flex gap-3">
                                <a 
                                    href="https://www.linkedin.com/company/dryondesiccants/posts/?feedView=all" 
                                    className="icon-3d w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center text-white"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                               
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="font-bold mb-6 uppercase text-sm tracking-wide text-primary">{t('sections.moistureDamage')}</h3>
                            <ul className="space-y-3 text-sm">
                                <li><a href="#" className="text-white/70 hover:text-primary transition-colors">{t('links.preventionProcess')}</a></li>
                                <li><a href="#" className="text-white/70 hover:text-primary transition-colors">{t('links.products')}</a></li>
                                <li><a href="#" className="text-white/70 hover:text-primary transition-colors">{t('links.absortest')}</a></li>
                                <li><a href="#" className="text-white/70 hover:text-primary transition-colors">{t('links.industries')}</a></li>
                            </ul>
                        </div>

                        {/* About Links */}
                        <div>
                            <h3 className="font-bold mb-6 uppercase text-sm tracking-wide text-primary">{t('sections.aboutUs')}</h3>
                            <ul className="space-y-3 text-sm">
                                <li><a href="#" className="text-white/70 hover:text-primary transition-colors">{t('links.ourCompany')}</a></li>
                                <li><a href="#" className="text-white/70 hover:text-primary transition-colors">{t('links.sustainability')}</a></li>
                                <li><a href="#" className="text-white/70 hover:text-primary transition-colors">{t('links.news')}</a></li>
                                <li><a href="#" className="text-white/70 hover:text-primary transition-colors">{t('links.blog')}</a></li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="font-bold mb-6 uppercase text-sm tracking-wide text-primary">{t('sections.contact')}</h3>
                            <ul className="space-y-4 text-sm">
                                <li className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-white/70">123 Business Street, City, Country</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                                    <a href="tel:+1234567890" className="text-white/70 hover:text-primary transition-colors">+1 234 567 890</a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                                    <a href="mailto:info@dryon.com" className="text-white/70 hover:text-primary transition-colors">info@dryon.com</a>
                                </li>
                            </ul>
                            
                            {/* Certification Badge */}
                            <div className="mt-6 inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-lg px-4 py-3">
                                <div className="text-center">
                                    <span className="font-bold text-white text-xs block">ISO</span>
                                    <span className="text-[0.6rem] text-white/60 block">9001-14001</span>
                                </div>
                                <div className="w-px h-8 bg-white/20" />
                                <span className="text-xs text-white/80 font-medium">Certified</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10">
                    <div className="container mx-auto px-6 py-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/60">
                            <div className="flex flex-wrap gap-6">
                                <a href="#" className="hover:text-primary transition-colors">{t('bottom.cookies')}</a>
                                <a href="#" className="hover:text-primary transition-colors">{t('bottom.settings')}</a>
                                <a href="#" className="hover:text-primary transition-colors">{t('bottom.terms')}</a>
                                <a href="#" className="hover:text-primary transition-colors">{t('bottom.impressum')}</a>
                            </div>
                            <span>{t('bottom.copyright')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
