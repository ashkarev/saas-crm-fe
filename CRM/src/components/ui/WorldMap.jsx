"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import DottedMap from "dotted-map";

export default function WorldMap({
  dots = [],
  lineColor = "#3B82F6",
}) {
  const svgRef = useRef(null);
  const isInView = useInView(svgRef, { once: false, margin: "-100px" });

  const map = new DottedMap({ height: 100, grid: "diagonal" });

  // ✅ SOFT DOT COLOR (blends with white)
  const svgMap = map.getSVG({
    radius: 0.25,
    color: "#00000060",
    shape: "circle",
    backgroundColor: "transparent",
  });

  const projectPoint = (lat, lng) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (start, end) => {
    const curve = 90;
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - curve;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div className="w-full h-[520px] md:h-[650px] relative overflow-hidden bg-white">

      {/* MAP */}
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="w-full h-full opacity-80 pointer-events-none select-none"
        alt="world map"
      />

      {/* ✅ CLEAN WHITE FADE (NO COLOR SHIFT) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/80" />

      {/* SVG CONNECTIONS */}
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0"
      >
        <defs>
          <linearGradient id="gradient">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="10%" stopColor={lineColor} />
            <stop offset="90%" stopColor={lineColor} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => {
          const start = projectPoint(dot.start.lat, dot.start.lng);
          const end = projectPoint(dot.end.lat, dot.end.lng);
          const path = createCurvedPath(start, end);

          return (
            <g key={i}>
              {/* LINE DRAW */}
              <motion.path
                d={path}
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.3,
                }}
              />

              {/*  FLOWING DOT */}
              {isInView && (
                <circle r="3" fill={lineColor}>
                  <animateMotion
                    dur="2.5s"
                    repeatCount="indefinite"
                    path={path}
                    begin={`${i * 0.4}s`}
                  />
                </circle>
              )}

              {/*  KOZHIKODE HUB */}
              <circle cx={start.x} cy={start.y} r="4" fill={lineColor} />

              <circle cx={start.x} cy={start.y} r="4" fill={lineColor} opacity="0.5">
                <animate
                  attributeName="r"
                  from="4"
                  to="16"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* END POINT */}
              <circle cx={end.x} cy={end.y} r="2.5" fill={lineColor} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}