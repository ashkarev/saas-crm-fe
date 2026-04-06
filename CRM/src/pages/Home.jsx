import Hero from "@/components/sections/HeroSection";
import Features from "@/components/sections/Features";
import Pricing from "@/components/sections/Pricing";
import Navbar from "@/components/layout/Navbar";
import About from "@/components/sections/About";
import { SectionDivider } from "@/components/ui/SectionDivider";
import Contact from "@/components/sections/Contact";
import { WorldMapDemo } from "@/components/sections/MapSection";
import Footer from "@/components/layout/Footer";

const Home = () => {
  return (
    <div className="bg-[#070A10]">
      <Navbar />
      {/* HERO — zero-gravity background + content (pt-24 to offset fixed navbar) */}
      <section id="home" className="relative pt-12 min-h-screen">
        <Hero />
      </section>

      <SectionDivider
        topColor="#070A10"
        bottomColor="white"
        orientation="down"
      />
      {/* FEATURES — clean, no sparkles */}
      <Features />

      <SectionDivider topColor="white" bottomColor="#0d1117" orientation="up" />
      <Pricing />

      <SectionDivider
        topColor="#0d1117"
        bottomColor="white"
        orientation="down"
      />
      <About />
      <SectionDivider topColor="white" bottomColor="#0d1117" orientation="up" />
      <Contact />
      <SectionDivider
        topColor="#0d1117"
        bottomColor="white"
        orientation="down"
      />
      <WorldMapDemo />
      <SectionDivider topColor="white" bottomColor="#0d1117" orientation="up" />
      <Footer />
    </div>
  );
};

export default Home;
