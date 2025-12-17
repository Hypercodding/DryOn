'use client';

import { useState, useCallback } from 'react';
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

export default function LandingPageWrapper() {
    const [isProductsLoading, setIsProductsLoading] = useState(true);

    const handleProductsLoaded = useCallback(() => {
        setIsProductsLoading(false);
    }, []);

    return (
        <>
            <LandingPageLoader isLoading={isProductsLoading} />
            <main className="min-h-screen font-sans">
                <Hero />
                <StatsSection />
                <AboutSection />
                <HowItWorks />
                <ProductsSection onLoadComplete={handleProductsLoaded} />
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

