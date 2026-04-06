"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

export const AnimatedFAQ = ({
  items,
  autoplay = false,
}) => {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + items.length) % items.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 10000);
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  const [rotations, setRotations] = useState([]);

  useEffect(() => {
    setRotations(items.map(() => Math.floor(Math.random() * 11) - 5));
  }, [items]);

  return (
    <div className="max-w-sm md:max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-12">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div>
          <div className="relative h-64 md:h-80 w-full">
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => (
                <motion.div
                  key={item.question}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: rotations[index] || 0,
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.6,
                    scale: isActive(index) ? 1 : 0.9,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : rotations[index] || 0,
                    zIndex: isActive(index)
                      ? 50
                      : items.length + 2 - index,
                    y: isActive(index) ? [0, -40, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: rotations[index] || 0,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <div className="h-full w-full rounded-[32px] bg-[#1a1f2e]/60 border border-white/10 flex flex-col justify-center px-10 md:px-14 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5),inset_0_0_32px_rgba(255,255,255,0.02)] relative overflow-hidden backdrop-blur-2xl group">
                     {/* Noise Texture */}
                     <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-soft-light" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

                     {/* Dynamic Corner Accent */}
                     <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-[#2176ff]/30 to-transparent blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                     
                     <div className="flex items-baseline gap-3 mb-6 relative z-10">
                        <span className="text-[12px] font-black text-[#2176ff] tracking-[0.3em] uppercase">
                            Q{index + 1}
                        </span>
                        <div className="h-px w-8 bg-white/10" />
                     </div>
                     
                     <h3 className="text-2xl md:text-3xl font-black text-white leading-[1.1] tracking-tight mb-2 relative z-10 pr-4">
                        {item.question}
                     </h3>
                     
                     {/* Decorative Bottom Line */}
                     <div className="absolute bottom-0 left-0 h-1 bg-linear-to-r from-transparent via-[#2176ff]/60 to-transparent w-full opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-1 group-hover:translate-y-0" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between flex-col py-4 min-h-[300px]">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2176ff] shadow-[0_0_12px_#2176ff]" />
                <span className="text-[11px] font-black text-white/20 tracking-[0.25em] uppercase block">Platform Context</span>
            </div>
            
            <motion.p className="text-[17px] md:text-xl text-white/80 leading-relaxed font-light tracking-tight">
              {items[active].answer.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(8px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    delay: 0.01 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          
          <div className="flex gap-4 pt-12 md:pt-8 mt-auto">
            <button
              onClick={handlePrev}
              className="h-11 w-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group/button hover:bg-white/10 transition-all hover:border-[#2176ff]/30 shadow-lg"
            >
              <ArrowLeft className="h-5 w-5 text-white/40 group-hover/button:text-[#2176ff] group-hover/button:rotate-12 transition-all duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-11 w-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group/button hover:bg-white/10 transition-all hover:border-[#2176ff]/30 shadow-lg"
            >
              <ArrowRight className="h-5 w-5 text-white/40 group-hover/button:text-[#2176ff] group-hover/button:-rotate-12 transition-all duration-300" />
            </button>
            
            <div className="ml-auto flex items-center gap-2">
                {items.map((_, i) => (
                    <div 
                        key={i} 
                        className={`h-1 rounded-full transition-all duration-500 ${active === i ? 'w-6 bg-[#2176ff]' : 'w-1 bg-white/10'}`} 
                    />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
