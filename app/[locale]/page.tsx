import Hero from "@/components/Hero";
import MoistureDamage from "@/components/MoistureDamage";
import Prevention from "@/components/Prevention";
import Sustainability from "@/components/Sustainability";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen font-sans">
      <Hero />
      <MoistureDamage />
      <Prevention />
      <Sustainability />
      <Footer />
    </main>
  );
}
