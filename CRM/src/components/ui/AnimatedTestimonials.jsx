"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}) => {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  const [rotations, setRotations] = useState([]);

  useEffect(() => {
    setRotations(testimonials.map(() => Math.floor(Math.random() * 21) - 10));
  }, [testimonials]);

  return (
    <div className="max-w-sm md:max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-20">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence mode="popLayout">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: rotations[index] || 0,
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : rotations[index] || 0,
                    zIndex: isActive(index)
                      ? 50
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: rotations[index] || 0,
                  }}
                  transition={{
                    duration: 1,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center shadow-2xl"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between flex-col py-4">
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
              duration: 0.9,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl font-black text-white tracking-tight">
              {testimonials[active].name}
            </h3>
            <p className="text-sm text-white/40 font-medium">
              {testimonials[active].designation}
            </p>
            <motion.p className="text-lg text-white/60 mt-8 leading-relaxed italic">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
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
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group/button hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-white/50 group-hover/button:text-white group-hover/button:rotate-12 transition-all duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group/button hover:bg-white/10 transition-colors"
            >
              <ArrowRight className="h-5 w-5 text-white/50 group-hover/button:text-white group-hover/button:-rotate-12 transition-all duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
