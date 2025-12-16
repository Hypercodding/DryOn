'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Phone, Mail, MapPin, Ship, Anchor } from 'lucide-react';
import { Link } from '@/lib/navigation';

// Container Ship Silhouette
const ContainerShipSVG = ({ className = '' }: { className?: string }) => (
    <svg 
        className={className}
        viewBox="0 0 200 80" 
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M10,60 L30,75 L170,75 L190,60 L180,60 L180,45 L20,45 L20,60 Z" opacity="0.3" />
        <rect x="25" y="25" width="20" height="20" rx="2" opacity="0.4" />
        <rect x="50" y="25" width="20" height="20" rx="2" opacity="0.5" />
        <rect x="75" y="25" width="20" height="20" rx="2" opacity="0.4" />
        <rect x="100" y="25" width="20" height="20" rx="2" opacity="0.5" />
        <rect x="125" y="25" width="20" height="20" rx="2" opacity="0.4" />
        <rect x="150" y="25" width="20" height="20" rx="2" opacity="0.5" />
        <rect x="155" y="5" width="20" height="20" rx="2" opacity="0.6" />
    </svg>
);

export default function CTASection() {
    return (
        <section className="py-24 bg-gradient-to-br from-primary via-primary-dark to-secondary relative overflow-hidden">
            {/* Wave Pattern Top */}
            <svg 
                className="absolute -top-1 left-0 w-full h-16"
                viewBox="0 0 1440 64" 
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                    fill="#f9fafb"
                    d="M0,32 C360,64 720,0 1080,32 C1440,64 1440,0 1440,0 L1440,0 L0,0 Z"
                />
            </svg>

            {/* Ocean Wave Animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <svg 
                    className="absolute bottom-0 left-0 w-[200%] h-32 opacity-10 animate-wave"
                    viewBox="0 0 2880 120" 
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path 
                        fill="white"
                        d="M0,60 C480,120 960,0 1440,60 C1920,120 2400,0 2880,60 L2880,120 L0,120 Z"
                    />
                </svg>
                <svg 
                    className="absolute bottom-0 left-0 w-[200%] h-24 opacity-5 animate-wave-slow"
                    viewBox="0 0 2880 120" 
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path 
                        fill="white"
                        d="M0,80 C360,20 720,100 1080,60 C1440,20 1800,100 2160,60 C2520,20 2880,100 2880,60 L2880,120 L0,120 Z"
                    />
                </svg>
            </div>

            {/* Floating Container Ship */}
            <motion.div 
                className="absolute bottom-20 left-10 opacity-10 hidden lg:block"
                animate={{ 
                    y: [0, -8, 0],
                    rotate: [-1, 1, -1]
                }}
                transition={{ 
                    repeat: Infinity, 
                    duration: 4,
                    ease: "easeInOut"
                }}
            >
                <ContainerShipSVG className="w-48 text-white" />
            </motion.div>

            {/* Anchor Decoration */}
            <div className="absolute top-20 right-10 opacity-10">
                <Anchor className="w-32 h-32 text-white" />
            </div>

            {/* Background Blur Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20">
                            <Ship className="w-4 h-4" />
                            <span>Maritime Cargo Protection</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                            Ready to Protect Your Cargo?
                        </h2>
                        <p className="text-white/80 text-lg leading-relaxed mb-8">
                            Contact our experts today for a free consultation. We&apos;ll help you find the perfect moisture protection solution for your specific needs.
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/10">
                                    <Phone className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="text-white/60 text-sm">Call Us</div>
                                    <div className="font-semibold">+92 300 1234567</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/10">
                                    <Mail className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="text-white/60 text-sm">Email Us</div>
                                    <div className="font-semibold">info@dryon.pk</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/10">
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
                        className="bg-white rounded-2xl p-8 shadow-2xl relative overflow-hidden"
                    >
                        {/* Wave accent on form */}
                        <div className="absolute top-0 right-0 opacity-5">
                            <svg width="120" height="120" viewBox="0 0 120 120">
                                <path d="M0,60 Q30,30 60,60 T120,60 L120,0 L0,0 Z" fill="currentColor" className="text-secondary" />
                            </svg>
                        </div>

                        <h3 className="text-2xl font-bold text-secondary mb-6">Send a Quick Message</h3>
                        <form className="space-y-4 relative z-10">
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
