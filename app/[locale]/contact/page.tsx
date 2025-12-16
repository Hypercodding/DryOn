import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import ContactForm from '@/components/ContactForm';

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

            <div className="container mx-auto px-6 py-20 max-w-7xl">
                {/* Locations Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">Our Locations</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Visit Our Offices</h2>
                        <p className="text-slate max-w-2xl mx-auto">
                            We have offices in Lahore and Karachi to serve you better. Reach out to us at any of our locations.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                        {/* Lahore Office */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow">
                            <div className="relative h-64">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.5!2d74.2756!3d31.4702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0x23fa6e9ddd3ec843!2sMoon%20Heights%2C%20Block%20F%20Johar%20Town%2C%20Lahore%2C%20Punjab%2045400%2C%20Pakistan!5e0!3m2!1sen!2s!4v1699123456789!5m2!1sen!2s"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="w-full h-full rounded-t-2xl"
                                    title="Lahore Office Location"
                                ></iframe>
                            </div>
                            <div className="p-8">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-secondary mb-2 text-xl">Lahore Office</h3>
                                        <p className="text-slate leading-relaxed">
                                            G-29, Moon Heights, Block F, Johar Town<br />
                                            Lahore, Pakistan
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-slate/70 mb-1">Phone</p>
                                            <a href="tel:+923008415079" className="text-slate hover:text-primary transition-colors font-medium">
                                                +92-300-8415079
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-slate/70 mb-1">UAN</p>
                                            <a href="tel:+923111775999" className="text-slate hover:text-primary transition-colors font-medium">
                                                +92-3-111-775-999
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-slate/70 mb-1">Email</p>
                                            <a href="mailto:sales.dryon@gmail.com" className="text-slate hover:text-primary transition-colors font-medium break-all">
                                                sales.dryon@gmail.com
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Karachi Office */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow">
                            <div className="relative h-64">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.2!2d67.0014!3d24.8607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e8e8e8e8e8e%3A0x8e8e8e8e8e8e8e8e!2sSaima%20Trade%20Tower%2C%20I.I%20Chundrigar%20Rd%2C%20Karachi%2C%20Sindh%2074000%2C%20Pakistan!5e0!3m2!1sen!2s!4v1699123456789!5m2!1sen!2s"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="w-full h-full rounded-t-2xl"
                                    title="Karachi Office Location"
                                ></iframe>
                            </div>
                            <div className="p-8">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-secondary mb-2 text-xl">Karachi Office</h3>
                                        <p className="text-slate leading-relaxed">
                                            Suite 1009, 10th Floor, Saima Trade Tower<br />
                                            Tower &quot;A&quot;, I.I Chundrigar Road<br />
                                            Karachi, Pakistan
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-slate/70 mb-1">Phone</p>
                                            <a href="tel:+923204305013" className="text-slate hover:text-primary transition-colors font-medium">
                                                +92-320-4305013
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-slate/70 mb-1">UAN</p>
                                            <a href="tel:+923111775999" className="text-slate hover:text-primary transition-colors font-medium">
                                                +92-3-111-775-999
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-slate/70 mb-1">Email</p>
                                            <a href="mailto:sales@dryon.pk" className="text-slate hover:text-primary transition-colors font-medium">
                                                sales@dryon.pk
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div>
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">Contact Information</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-10">{t('getInTouch')}</h2>

                        <div className="space-y-8">
                            <div className="flex items-start gap-5 group">
                                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <Clock className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-secondary mb-1 text-lg">{t('businessHours')}</h3>
                                    <p className="text-slate leading-relaxed">{t('mondayFriday')}<br />{t('saturday')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}
