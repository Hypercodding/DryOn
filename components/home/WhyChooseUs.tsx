'use client';

import { motion } from 'framer-motion';
import { Shield, Droplets, Leaf, TestTube, BadgeCheck, Truck, Zap, HeartHandshake } from 'lucide-react';

const features = [
    {
        icon: Droplets,
        title: 'High Absorption',
        description: 'Up to 300% moisture absorption capacity for maximum protection',
    },
    {
        icon: Shield,
        title: 'Leak-Proof',
        description: 'Advanced packaging prevents any leakage during transit',
    },
    {
        icon: Leaf,
        title: 'Eco-Friendly',
        description: 'DMF-Free, sustainable and non-toxic materials',
    },
    {
        icon: TestTube,
        title: 'In-House Testing Facility',
        description: 'Real-time environmental chamber testing for quality assurance',
    },
    {
        icon: BadgeCheck,
        title: 'Certified Quality',
        description: 'DUNS registered and internationally recognized standards',
    },
    {
        icon: Truck,
        title: 'Easy Installation',
        description: 'Simple setup process for quick deployment',
    },
    {
        icon: Zap,
        title: 'Cost-Effective',
        description: 'Affordable solutions without compromising on quality',
    },
    {
        icon: HeartHandshake,
        title: 'Expert Support',
        description: 'Dedicated team for consultation and after-sales service',
    },
];

export default function WhyChooseUs() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block"
                    >
                        Our Advantages
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-6"
                    >
                        Why Choose DryON?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate text-lg max-w-2xl mx-auto"
                    >
                        Industry-leading moisture protection with unmatched quality and service
                    </motion.p>
                </div>

                {/* Features Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-gray-50 rounded-2xl p-6 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100 group"
                        >
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                                <feature.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-lg font-bold text-secondary mb-2">{feature.title}</h3>
                            <p className="text-slate text-sm leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

