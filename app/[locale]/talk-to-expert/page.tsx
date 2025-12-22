import { getTranslations } from 'next-intl/server';
import { Mail, Phone, Calendar } from 'lucide-react';
import Footer from '@/components/Footer';

export default async function TalkToExpertPage() {
    const t = await getTranslations('TalkToExpertPage');

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-[#0F172A] to-[#00897B] text-white py-24 px-4">
                <div className="container mx-auto max-w-4xl text-center">
                    <h1 className="text-5xl font-extrabold mb-6">{t('title')}</h1>
                    <p className="text-xl opacity-90 font-light">
                        {t('subtitle')}
                    </p>
                </div>
            </div>

            {/* Contact Options */}
            <div className="container mx-auto px-4 py-16 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Phone className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-navy mb-2">{t('callUs')}</h3>
                        <p className="text-gray-600 mb-4">{t('callUsDesc')}</p>
                        <a href="tel:+1234567890" className="text-primary font-semibold hover:underline">
                            +1 (234) 567-890
                        </a>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-navy mb-2">{t('emailUs')}</h3>
                        <p className="text-gray-600 mb-4">{t('emailUsDesc')}</p>
                        <a href="mailto:experts@dryon.pk" className="text-primary font-semibold hover:underline">
                            experts@dryon.pk
                        </a>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-navy mb-2">{t('scheduleCall')}</h3>
                        <p className="text-gray-600 mb-4">{t('scheduleCallDesc')}</p>
                        <button className="text-primary font-semibold hover:underline">
                            {t('viewCalendar')}
                        </button>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-navy mb-6 text-center">{t('sendMessage')}</h2>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">{t('name')} *</label>
                                <input type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-primary" required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">{t('email')} *</label>
                                <input type="email" className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-primary" required />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">{t('company')}</label>
                                <input type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">{t('phone')}</label>
                                <input type="tel" className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-primary" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">{t('subject')} *</label>
                            <input type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-primary" required />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">{t('message')} *</label>
                            <textarea rows={6} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-primary" required></textarea>
                        </div>
                        <button type="submit" className="w-full bg-primary hover:bg-teal-600 text-white font-bold py-4 px-8 rounded-lg transition-colors">
                            {t('sendBtn')}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}
