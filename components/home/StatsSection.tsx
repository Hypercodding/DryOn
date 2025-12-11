'use client';

import { motion } from 'framer-motion';
import { Package, Globe, Users, Award } from 'lucide-react';

const stats = [
    { icon: Package, value: '300%', label: 'Absorption Capacity', suffix: '' },
    { icon: Globe, value: '9+', label: 'Industries Served', suffix: '' },
    { icon: Users, value: '500+', label: 'Happy Clients', suffix: '' },
    { icon: Award, value: '100%', label: 'Made in Pakistan', suffix: '' },
];

export default function StatsSection() {
    return (
        <section className="py-16 bg-secondary relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
            </div>
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center text-white"
                        >
                            <div className="w-14 h-14 mx-auto mb-4 bg-white/10 rounded-xl flex items-center justify-center">
                                <stat.icon className="w-7 h-7 text-primary" />
                            </div>
                            <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}{stat.suffix}</div>
                            <div className="text-white/70 text-sm font-medium">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

