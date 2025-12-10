'use client';

import { ArrowRight, Linkedin, Youtube, Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Footer() {
    const t = useTranslations('HomePage.Footer');

    return (
        <footer className="bg-mint pt-20 pb-10 text-navy">
            <div className="container mx-auto px-6">

                {/* Newsletter Section */}
                <div className="mb-20 max-w-5xl">
                    <h2 className="text-3xl font-light mb-6">{t('newsletter.title')}</h2>
                    <p className="font-bold mb-8">{t('newsletter.description')}</p>
                    <p className="text-xs text-gray-600 mb-6 max-w-2xl">
                        {t('newsletter.disclaimer')}
                    </p>

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
                        <input type="text" placeholder={t('form.name')} className="bg-transparent border border-gray-400 p-3 placeholder-gray-500 focus:outline-none focus:border-navy" />
                        <input type="email" placeholder={t('form.email')} className="bg-transparent border border-gray-400 p-3 placeholder-gray-500 focus:outline-none focus:border-navy" />
                        <input type="text" placeholder={t('form.company')} className="bg-transparent border border-gray-400 p-3 placeholder-gray-500 focus:outline-none focus:border-navy" />
                        <div className="relative">
                            <select className="w-full bg-transparent border border-gray-400 p-3 text-gray-500 focus:outline-none focus:border-navy appearance-none">
                                <option>{t('form.country')}</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">▼</div>
                        </div>
                    </form>

                    <div className="mt-6 flex items-start gap-4">
                        <div className="border border-gray-400 p-4 bg-white inline-flex items-center gap-2">
                            <div className="w-4 h-4 border border-gray-400" />
                            <span className="text-xs">{t('form.captcha')}</span>
                            <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" className="w-6 h-6 ml-auto" alt="recaptcha" />
                        </div>
                    </div>

                    <button className="mt-8 bg-navy text-white px-8 py-3 text-xs font-bold uppercase hover:bg-opacity-90 transition-colors flex items-center gap-2">
                        {t('form.submit')} <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Footer Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-gray-400/30 pt-10 text-xs">
                    <div>
                        <h3 className="font-bold mb-4 uppercase">{t('sections.contact')}</h3>
                        <ul className="space-y-3 font-light">
                            <li><a href="#" className="hover:underline">{t('links.talkToExpert')}</a></li>
                            <li><a href="#" className="hover:underline">{t('links.findContact')}</a></li>
                            <li><a href="#" className="hover:underline">{t('links.blog')}</a></li>
                        </ul>
                        <div className="flex gap-4 mt-6">
                            <Linkedin className="w-5 h-5 cursor-pointer hover:text-primary" />
                            <Youtube className="w-5 h-5 cursor-pointer hover:text-primary" />
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4 uppercase">{t('sections.moistureDamage')}</h3>
                        <ul className="space-y-3 font-light">
                            <li><a href="#" className="hover:underline">{t('links.preventionProcess')}</a></li>
                            <li><a href="#" className="hover:underline">{t('links.products')}</a></li>
                            <li><a href="#" className="hover:underline">{t('links.absortest')}</a></li>
                            <li><a href="#" className="hover:underline">{t('links.industries')}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4 uppercase">{t('sections.aboutUs')}</h3>
                        <ul className="space-y-3 font-light">
                            <li><a href="#" className="hover:underline">{t('links.ourCompany')}</a></li>
                            <li><a href="#" className="hover:underline">{t('links.sustainability')}</a></li>
                            <li><a href="#" className="hover:underline">{t('links.news')}</a></li>
                            <li><a href="#" className="hover:underline">{t('links.whistleblowing')}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4 uppercase">{t('sections.absortner')}</h3>
                        <div className="border border-navy p-2 inline-block">
                            <div className="border border-navy p-4 flex flex-col items-center justify-center text-center w-24 h-24">
                                <span className="font-bold block">LRQA</span>
                                <span className="text-[0.5rem] block">CERTIFIED</span>
                                <span className="text-[0.4rem] block">ISO 9001-14001</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-6 border-t border-gray-400/30 text-[0.6rem] flex flex-wrap gap-6 uppercase text-gray-600 font-medium">
                    <a href="#">{t('bottom.cookies')}</a>
                    <a href="#">{t('bottom.settings')}</a>
                    <a href="#">{t('bottom.terms')}</a>
                    <a href="#">{t('bottom.impressum')}</a>
                    <span className="ml-auto normal-case">{t('bottom.copyright')}</span>
                </div>
            </div>
        </footer>
    );
}
