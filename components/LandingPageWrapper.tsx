'use client';

import { useState, useEffect } from 'react';
import LandingPageLoader from './LandingPageLoader';
import Hero from './Hero';
import Footer from './Footer';
import AboutSection from './home/AboutSection';
import ProductsSection from './home/ProductsSection';
import WhyChooseUs from './home/WhyChooseUs';
import IndustriesSection from './home/IndustriesSection';
import StatsSection from './home/StatsSection';
import CTASection from './home/CTASection';
import TestimonialsSection from './home/TestimonialsSection';
import HowItWorks from './home/HowItWorks';
import PartnersSection from './home/PartnersSection';
import SustainabilityBanner from './home/SustainabilityBanner';
import FAQSection from './home/FAQSection';
import type { CategoryWithProducts } from '@/lib/fetchProducts';

interface LandingPageWrapperProps {
    initialData?: CategoryWithProducts[];
}

export default function LandingPageWrapper({ initialData }: LandingPageWrapperProps) {
    const [isPageReady, setIsPageReady] = useState(false);

    useEffect(() => {
        // Small delay to ensure smooth transition
        const timer = setTimeout(() => {
            setIsPageReady(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {!isPageReady && <LandingPageLoader isLoading={true} />}
            <main className="min-h-screen font-sans">
                <Hero />
                <StatsSection />
                <AboutSection />
                <HowItWorks />
                <ProductsSection initialData={initialData} />
                <WhyChooseUs />
                <IndustriesSection />
                <SustainabilityBanner />
                <PartnersSection />
                <TestimonialsSection />
                <FAQSection />
                <CTASection />
                <Footer />
            </main>
        </>
    );
}

