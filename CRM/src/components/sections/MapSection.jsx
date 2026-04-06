"use client";

import WorldMap from "@/components/ui/WorldMap";
import { motion } from "framer-motion";

export function WorldMapDemo() {
  return (
    <section id="map-section" className="py-24 bg-white w-full">

      <div className="max-w-6xl mx-auto text-center ">

        {/* HEADING */}
        <h2 className="font-bold text-3xl md:text-5xl text-[#070A10] leading-tight">
          Built for teams{" "}
          <span className="text-blue-600">
            {"everywhere".split("").map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                viewport={{ once: true }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        </h2>

        {/* SUBTEXT */}
        <p className="text-sm md:text-lg text-gray-500 max-w-2xl mx-auto mt-5">
          Helix powers organizations across regions — connecting teams globally
          from a single unified system.
        </p>
      </div>

      {/* MAP */}
      <div className="mt-16">
        <WorldMap
          dots={[
            // Kozhikode → London
            {
              start: { lat: 11.2588, lng: 75.7804 },
              end: { lat: 51.5074, lng: -0.1278 },
            },

            //  Kozhikode → New York
            {
              start: { lat: 11.2588, lng: 75.7804 },
              end: { lat: 43.7128, lng: -74.006 },
            },

            //  Kozhikode → Brazil
            {
              start: { lat: 11.2588, lng: 75.7804 },
              end: { lat: -25.7975, lng: -47.8919 },
            },

            //  Kozhikode → Tokyo
            {
              start: { lat: 11.2588, lng: 75.7804 },
              end: { lat: 35.6762, lng: 139.6503 },
            },

            //  Kozhikode → Nairobi
            {
              start: { lat: 11.2588, lng: 75.7804 },
              end: { lat: -4.2951, lng: 36.8219 },
            },
          ]}
        />
      </div>

    </section>
  );
}