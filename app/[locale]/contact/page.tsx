import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function ContactPage() {
    const t = await getTranslations('ContactPage');

    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Hero */}
            <div className="bg-gradient-to-br from-secondary via-secondary-dark to-primary/80 text-white py-28 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <span className="inline-block bg-white/10 text-white/90 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
                        Get in Touch
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t('title')}</h1>
                    <p className="text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-20 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div>
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">Contact Information</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-10">{t('getInTouch')}</h2>

                        <div className="space-y-8 mb-12">
                            <div className="flex items-start gap-5 group">
                                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <MapPin className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-secondary mb-1 text-lg">{t('headOffice')}</h3>
                                    <p className="text-slate leading-relaxed">123 Business Avenue<br />Karachi, Pakistan 75500</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-5 group">
                                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                                    <Phone className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-secondary mb-1 text-lg">Phone</h3>
                                    <a href="tel:+92211234567" className="text-slate hover:text-primary transition-colors">+92 (21) 1234-5678</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-5 group">
                                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                                    <Mail className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-secondary mb-1 text-lg">Email</h3>
                                    <a href="mailto:info@dryon.pk" className="text-slate hover:text-primary transition-colors block">info@dryon.pk</a>
                                    <a href="mailto:support@dryon.pk" className="text-slate hover:text-primary transition-colors">support@dryon.pk</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-5 group">
                                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                                    <Clock className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-secondary mb-1 text-lg">{t('businessHours')}</h3>
                                    <p className="text-slate leading-relaxed">{t('mondayFriday')}<br />{t('saturday')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl h-64 flex items-center justify-center border border-gray-200">
                            <p className="text-slate">Interactive Map Coming Soon</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-secondary mb-2">Send a Message</h2>
                        <p className="text-slate mb-8">We&apos;ll get back to you within 24 hours.</p>
                        
                        <form className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-secondary mb-2">{t('fullName')} <span className="text-primary">{t('required')}</span></label>
                                <input 
                                    type="text" 
                                    className="w-full border border-gray-200 rounded-lg p-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-gray-50 focus:bg-white" 
                                    placeholder="John Doe"
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-secondary mb-2">Email <span className="text-primary">{t('required')}</span></label>
                                <input 
                                    type="email" 
                                    className="w-full border border-gray-200 rounded-lg p-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-gray-50 focus:bg-white" 
                                    placeholder="john@company.com"
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-secondary mb-2">Phone</label>
                                <input 
                                    type="tel" 
                                    className="w-full border border-gray-200 rounded-lg p-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-gray-50 focus:bg-white" 
                                    placeholder="+92 300 1234567"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-secondary mb-2">Subject <span className="text-primary">{t('required')}</span></label>
                                <input 
                                    type="text" 
                                    className="w-full border border-gray-200 rounded-lg p-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-gray-50 focus:bg-white" 
                                    placeholder="How can we help?"
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-secondary mb-2">Message <span className="text-primary">{t('required')}</span></label>
                                <textarea 
                                    rows={5} 
                                    className="w-full border border-gray-200 rounded-lg p-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-gray-50 focus:bg-white resize-none" 
                                    placeholder="Tell us about your project..."
                                    required
                                ></textarea>
                            </div>
                            <button 
                                type="submit" 
                                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                            >
                                Send Message
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
