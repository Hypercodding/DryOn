'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: 'Ahmed Hassan',
        role: 'Export Manager',
        company: 'Textile Exports Ltd.',
        content: 'DryON desiccants have significantly reduced our moisture damage claims. Their products consistently perform even during the longest sea voyages.',
        rating: 5,
    },
    {
        name: 'Fatima Khan',
        role: 'Quality Director',
        company: 'Fresh Fruits Pakistan',
        content: 'The FreshON ethylene absorbers have extended our fruit shelf-life remarkably. Our export rejection rates have dropped by 40%.',
        rating: 5,
    },
    {
        name: 'Muhammad Ali',
        role: 'Logistics Head',
        company: 'Auto Parts Industries',
        content: 'We switched to DryON two years ago and haven\'t looked back. Their customer support and product quality are exceptional.',
        rating: 5,
    },
];

export default function TestimonialsSection() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block"
                    >
                        Testimonials
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-6"
                    >
                        What Our Clients Say
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate text-lg max-w-2xl mx-auto"
                    >
                        Trusted by leading exporters and manufacturers across Pakistan
                    </motion.p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-2xl p-8 shadow-float hover:shadow-xl transition-all border border-gray-100 relative"
                        >
                            {/* Quote Icon */}
                            <div className="absolute -top-4 left-8">
                                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg">
                                    <Quote className="w-5 h-5 text-white" />
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="flex gap-1 mb-4 mt-2">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-slate leading-relaxed mb-6">
                                &quot;{testimonial.content}&quot;
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white font-bold">
                                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <div className="font-bold text-secondary">{testimonial.name}</div>
                                    <div className="text-sm text-slate">{testimonial.role}</div>
                                    <div className="text-xs text-primary font-medium">{testimonial.company}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

