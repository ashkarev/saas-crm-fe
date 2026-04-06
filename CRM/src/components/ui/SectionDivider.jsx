import React from "react";
import { motion } from "framer-motion";

/**
 * SectionDivider Component
 * Creates a modern, precision-engineered transition between two sections.
 * 
 * @param {string} topColor - Background color of the section above.
 * @param {string} bottomColor - Background color of the section below.
 * @param {string} height - Height of the divider.
 * @param {string} orientation - "down" (top points into bottom) or "up" (bottom points into top)
 * @param {string} glowColor - Optional override for the edge glow color.
 */
export const SectionDivider = ({
  topColor = "#ffffff",
  bottomColor = "#070A10",
  height = "50px",
  orientation = "down",
  glowColor,
}) => {
  // We determine which color is the "shape" and which is the "background"
  // based on orientation to ensure no color-gaps between sections.
  const isDown = orientation === "down";
  const polygonColor = isDown ? topColor : bottomColor;
  const containerColor = isDown ? bottomColor : topColor;

  // Path definitions for premium look
  const pathData = isDown
    ? "M0,0 L1000,0 L1000,40 L910,40 L860,100 L140,100 L90,40 L0,40 Z"
    : "M0,100 L1000,100 L1000,60 L910,60 L860,0 L140,0 L90,60 L0,60 Z";

  const glowPathData = isDown
    ? "M0,40 L90,40 L140,100 L860,100 L910,40 L1000,40"
    : "M0,60 L90,60 L140,0 L860,0 L910,60 L1000,60";

  // Adaptive glow: highlight the edge
  const activeGlow = glowColor || (isDown ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.6)");

  return (
    <div
      className="relative w-full overflow-hidden pointer-events-none"
      style={{
        height: height,
        backgroundColor: containerColor,
      }}
    >
      <svg
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        className="w-full h-full block"
      >
        {/* Main Shape with subtle shadow */}
        <path 
          d={pathData} 
          fill={polygonColor} 
          className="drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
        />

        {/* Edge Glow Line (Outer blur) */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          d={glowPathData}
          fill="none"
          stroke={activeGlow}
          strokeWidth="2"
          className="filter blur-[2px]"
        />
        
        {/* Sharp Inner Glow (The "Rim") */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.9 }}
          transition={{ duration: 1.5, delay: 0.4, ease: "easeInOut" }}
          d={glowPathData}
          fill="none"
          stroke={activeGlow}
          strokeWidth="0.75"
        />
      </svg>
      
      {/* Central Accent Decor - Minimalist line instead of dots */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden w-24 h-px">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-full h-full bg-linear-to-r from-transparent via-white/40 to-transparent"
        />
      </div>
    </div>
  );
};
