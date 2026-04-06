import { useEffect, useRef } from "react";

const CursorSparkles = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const lastMouse = useRef({ x: 0, y: 0, time: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      const now = Date.now();
      const dt = now - lastMouse.current.time;
      
      if (dt > 0) {
        const dx = x - lastMouse.current.x;
        const dy = y - lastMouse.current.y;
        
        // Spawn sparks based on movement speed
        const speed = Math.sqrt(dx * dx + dy * dy);
        const count = Math.min(Math.floor(speed / 4) + 1, 8);
        
        for (let i = 0; i < count; i++) {
          particles.current.push({
            x: x + (Math.random() - 0.5) * 5,
            y: y + (Math.random() - 0.5) * 5,
            vx: (Math.random() - 0.5) * 2 + dx * 0.1,
            vy: (Math.random() - 0.5) * 2 + dy * 0.1,
            life: 1.0,
            decay: 0.015 + Math.random() * 0.02,
            size: Math.random() * 2 + 1,
            color: `hsla(${200 + Math.random() * 30}, 80%, 70%, opacity)`,
          });
        }
      }

      lastMouse.current = { x, y, time: now };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12; // Gravity
        p.vx *= 0.99; // Drag
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.current.splice(i, 1);
          continue;
        }

        const opacity = p.life;
        ctx.fillStyle = p.color.replace("opacity", opacity);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();

        // Optional: faint tail/glow
        if (opacity > 0.5) {
          ctx.shadowBlur = 4 * opacity;
          ctx.shadowColor = p.color.replace("opacity", opacity * 0.5);
        } else {
          ctx.shadowBlur = 0;
        }
      }

      // Limit particle count for performance
      if (particles.current.length > 200) {
        particles.current.shift();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40 opacity-80"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default CursorSparkles;
