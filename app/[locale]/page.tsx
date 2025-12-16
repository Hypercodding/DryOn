import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import AboutSection from "@/components/home/AboutSection";
import ProductsSection from "@/components/home/ProductsSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import IndustriesSection from "@/components/home/IndustriesSection";
import StatsSection from "@/components/home/StatsSection";
import CTASection from "@/components/home/CTASection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import HowItWorks from "@/components/home/HowItWorks";
import PartnersSection from "@/components/home/PartnersSection";
import SustainabilityBanner from "@/components/home/SustainabilityBanner";
import FAQSection from "@/components/home/FAQSection";

export default function Home() {
  return (
    <main className="min-h-screen font-sans">
      <Hero />
      <StatsSection />
      <AboutSection />
      <HowItWorks />
      <ProductsSection />
      <WhyChooseUs />
      <IndustriesSection />
      <SustainabilityBanner />
      <PartnersSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
