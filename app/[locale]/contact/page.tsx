import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function ContactPage() {
    const t = await getTranslations('ContactPage');

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* Hero */}
            <div className="bg-gradient-to-r from-[#0F172A] to-[#00897B] text-white py-24 px-4">
                <div className="container mx-auto max-w-4xl text-center">
                    <h1 className="text-5xl font-extrabold mb-6">{t('title')}</h1>
                    <p className="text-xl opacity-90 font-light">
                        {t('subtitle')}
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-3xl font-bold text-navy mb-8">{t('getInTouch')}</h2>

                        <div className="space-y-6 mb-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-navy mb-1">{t('headOffice')}</h3>
                                    <p className="text-gray-600">123 Business Avenue<br />Karachi, Pakistan 75500</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-navy mb-1">Phone</h3>
                                    <p className="text-gray-600">+92 (21) 1234-5678</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-navy mb-1">Email</h3>
                                    <p className="text-gray-600">info@dryon.pk<br />support@dryon.pk</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-navy mb-1">{t('businessHours')}</h3>
                                    <p className="text-gray-600">{t('mondayFriday')}<br />{t('saturday')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center">
                            <p className="text-gray-500">Map Placeholder</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-3xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-navy mb-6">Send a Message</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">{t('fullName')} {t('required')}</label>
                                <input type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-primary" required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email {t('required')}</label>
                                <input type="email" className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-primary" required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                                <input type="tel" className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Subject {t('required')}</label>
                                <input type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-primary" required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Message {t('required')}</label>
                                <textarea rows={5} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-primary" required></textarea>
                            </div>
                            <button type="submit" className="w-full bg-primary hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
