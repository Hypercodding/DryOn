'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from '@/lib/navigation';

export default function CTASection() {
    return (
        <section className="py-24 bg-gradient-to-br from-primary via-primary-dark to-secondary relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-white"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                            Ready to Protect Your Cargo?
                        </h2>
                        <p className="text-white/80 text-lg leading-relaxed mb-8">
                            Contact our experts today for a free consultation. We&apos;ll help you find the perfect moisture protection solution for your specific needs.
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                                    <Phone className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="text-white/60 text-sm">Call Us</div>
                                    <div className="font-semibold">+92 300 1234567</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="text-white/60 text-sm">Email Us</div>
                                    <div className="font-semibold">info@dryon.pk</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="text-white/60 text-sm">Head Office</div>
                                    <div className="font-semibold">Lahore, Pakistan</div>
                                </div>
                            </div>
                        </div>

                        <Link 
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl group"
                        >
                            Get Free Consultation
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    {/* Contact Form Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white rounded-2xl p-8 shadow-2xl"
                    >
                        <h3 className="text-2xl font-bold text-secondary mb-6">Send a Quick Message</h3>
                        <form className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate mb-2">Name</label>
                                    <input 
                                        type="text" 
                                        className="w-full border border-gray-200 rounded-lg p-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate mb-2">Email</label>
                                    <input 
                                        type="email" 
                                        className="w-full border border-gray-200 rounded-lg p-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate mb-2">Company</label>
                                <input 
                                    type="text" 
                                    className="w-full border border-gray-200 rounded-lg p-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                                    placeholder="Your company name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate mb-2">Message</label>
                                <textarea 
                                    rows={4}
                                    className="w-full border border-gray-200 rounded-lg p-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                                    placeholder="How can we help you?"
                                />
                            </div>
                            <button 
                                type="submit"
                                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                            >
                                Send Message
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

