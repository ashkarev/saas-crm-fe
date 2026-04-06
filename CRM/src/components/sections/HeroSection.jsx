import { Link, useNavigate } from "react-router-dom";
import { SparklesCore } from "@/components/ui/Acernity";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/", { state: { scrollTo: "pricing" } });
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent">
      
      {/* ZERO GRAVITY BACKGROUND */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <SparklesCore
          id="sparkles-hero-floating"
          background="transparent"
          minSize={0.4}
          maxSize={1.6}
          particleDensity={200}
          className="w-full h-full"
          particleColor="#FFFFFF"
          floating={true}
          speed={0.4}
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 text-center px-4">
        <h1 className="md:text-7xl text-4xl lg:text-8xl font-bold tracking-tighter text-white">
          HELIX <br />
          <span className="text-blue-500">Elevate Your Business</span>
        </h1>
        
        <p className="text-gray-400 mt-6 max-w-xl mx-auto text-lg md:text-xl leading-relaxed font-light">
          A unified system to manage users, organizations, and growth. 
          Built for modern teams that need clarity at scale.
        </p>

        <div className="flex flex-wrap gap-4 mt-10 justify-center">
          
          {/* ✅ FIXED BUTTON */}
          <button
            onClick={handleGetStarted}
            className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)]"
          >
            Get Started
          </button>

          <Link
            to={'/overview'}
            className="px-8 py-4 rounded-full border border-white/10 text-white/70 hover:bg-white/5 hover:text-white transition duration-300 backdrop-blur-sm"
          >
            Explore Platform
          </Link>
        </div>
      </div>

    </div>
  );
};

export default HeroSection;