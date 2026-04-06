import { useEffect, useRef } from "react";

export const SparklesCore = ({
  id,
  background = "transparent",
  minSize = 0.6,
  maxSize = 1.4,
  particleDensity = 100,
  className,
  particleColor = "#FFFFFF",
  speed = 0.4,
  floating = true,
  mouseInteraction = true, // New prop for mouse tracking
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    let animId;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    if (mouseInteraction) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    const createParticles = (w, h) => {
      const currentDensity = Math.max(20, Math.floor((w * h * particleDensity) / 500000));
      particles = Array.from({ length: currentDensity }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * (maxSize - minSize) + minSize,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        opacity: Math.random() * 0.5 + 0.2, // Slightly more visible
      }));
    };

    const draw = () => {
      if (!canvas) return;
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);
      
      particles.forEach((p) => {
        // Subtle drift based on mouse position
        const dx = (mouse.current.x - w / 2) / (w / 2);
        const dy = (mouse.current.y - h / 2) / (h / 2);
        
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Base movement
        p.x += p.vx + dx * 2.5; // Extreme mouse drift factor for more 'feel'
        p.y += p.vy + dy * 2.5;
        
        // Wrap around
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
      });
      
      animId = requestAnimationFrame(draw);
    };

    const resize = () => {
      if (!container || !canvas) return;
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles(w, h);
    };

    resize();
    draw();

    const observer = new ResizeObserver(() => {
      if (canvas.__resizeTimeout) clearTimeout(canvas.__resizeTimeout);
      canvas.__resizeTimeout = setTimeout(resize, 100);
    });
    observer.observe(container);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [maxSize, minSize, particleColor, particleDensity, speed, mouseInteraction]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        background: background,
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};