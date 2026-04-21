import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation, Link } from "react-router-dom";

/* ─── Section config ─────────────────────────────────────────────
   Map every scrollable section to a theme.
   "dark"  = section has a dark bg  → navbar uses LIGHT text + dark bubble
   "light" = section has a light bg → navbar uses DARK text + light bubble
──────────────────────────────────────────────────────────────────── */
const SECTIONS = [
  { id: "home",           theme: "dark"  },
  { id: "feature",        theme: "light" },
  { id: "pricing",        theme: "dark"  },
  { id: "about",          theme: "light" },
  { id: "contact",        theme: "dark"  },
  { id: "map-section",    theme: "light" }, // WorldMapDemo — white bg
  { id: "footer-section", theme: "dark"  }, // Footer — dark bg
];

/* ─── Theme palettes ──────────────────────────────────────────── */
const THEMES = {
  dark: {
    // navbar sits over a DARK section
    bg: "rgba(17, 24, 39, 0.75)",
    border: "rgba(55, 65, 81, 0.5)",
    text: "rgba(156, 163, 175, 1)",
    textHover: "#ffffff",
    pillBg: "rgba(31, 41, 55, 1)",
    logo: "#ffffff",
    btnBg: "#ffffff",
    btnText: "#000000",
    btnHoverBg: "#3B82F6",
    btnHoverText: "#ffffff",
  },
  light: {
    // navbar sits over a LIGHT / white section
    bg: "rgba(255, 255, 255, 0.78)",
    border: "rgba(0, 0, 0, 0.08)",
    text: "rgba(100, 116, 139, 1)",
    textHover: "#0f172a",
    pillBg: "rgba(241, 245, 249, 1)",
    logo: "#0f172a",
    btnBg: "#0f172a",
    btnText: "#ffffff",
    btnHoverBg: "#3B82F6",
    btnHoverText: "#ffffff",
  },
};

const Navbar = () => {
  const [hovered, setHovered] = useState(null);
  const [activeSection, setActiveSection] = useState("home");
  const [activeTheme, setActiveTheme] = useState("dark"); // default dark (hero)
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const observerRef = useRef(null);

  const menu = [
    { name: "Home", id: "home" },
    { name: "Features", id: "feature" },
    { name: "Pricing", id: "pricing" },
    { name: "About", id: "about" },
    { name: "Contact", id: "contact" },
  ];

  /* ─── Scroll-to helper ──────────────────────────────────────── */
  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
      return;
    }
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  /* ─── After-navigation scroll ───────────────────────────────── */
  useEffect(() => {
    if (location.pathname === "/" && location.state?.scrollTo) {
      const id = location.state.scrollTo;
      const section = document.getElementById(id);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 200);
      }
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  /* ─── Detect scrolled state (adds shadow) ───────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ─── Intersection Observer — detect which section is under the navbar ── */
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        // Filter to only those that are currently intersecting the band
        const intersecting = entries.filter(e => e.isIntersecting);
        if (intersecting.length === 0) return;

        // Pick the one that is at the top of the sensor band (last index usually in DOM order)
        const dominantEntry = intersecting[intersecting.length - 1];
        const sectionId = dominantEntry.target.id;
        const match = SECTIONS.find((s) => s.id === sectionId);
        
        if (match) {
          setActiveTheme(match.theme);
          if (menu.find(m => m.id === sectionId)) {
            setActiveSection(sectionId);
          }
        }
      },
      {
        // Sensory band centered on the navbar's position (top ~20px to 80px)
        rootMargin: "-20px 0px -85% 0px",
        threshold: 0,
      }
    );

    // Observe all sections
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    observerRef.current = observer;
    return () => observer.disconnect();
  }, [location.pathname]);

  /* ─── Active palette ────────────────────────────────────────── */
  const t = THEMES[activeTheme];

  return (
    <motion.div
      className="fixed top-0 inset-x-0 z-[100] flex justify-center px-4 md:px-0"
      style={{ paddingTop: "20px", pointerEvents: "none" }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        style={{
          pointerEvents: "auto",
          backgroundColor: t.bg,
          borderColor: t.border,
          transition: "background-color 0.5s ease-in-out, border-color 0.5s ease-in-out, box-shadow 0.5s ease-in-out, color 0.5s ease-in-out",
          boxShadow: scrolled
            ? activeTheme === "dark"
              ? "0 8px 32px rgba(0,0,0,0.4)"
              : "0 8px 32px rgba(0,0,0,0.08)"
            : "none",
        }}
        className="backdrop-blur-xl border rounded-full px-4 md:px-6 py-2.5 md:py-3 flex items-center justify-between w-full max-w-5xl transition-all duration-500 ease-out overflow-hidden"
      >
        {/* ─── Logo ─────────────────────────────────────────── */}
        <motion.div
          className="font-bold text-xl cursor-pointer tracking-tighter select-none"
          style={{ color: t.logo }}
          onClick={() => scrollToSection("home")}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          HELIX
        </motion.div>

        {/* ─── Links ────────────────────────────────────────── */}
        <div className="flex gap-1 relative">
          {menu.map((item) => {
            const isActive = activeSection === item.id;
            const isHovered = hovered === item.name;

            return (
              <div
                key={item.name}
                onMouseEnter={() => setHovered(item.name)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => scrollToSection(item.id)}
                className="relative px-4 py-1.5 cursor-pointer transition-colors duration-300"
                style={{
                  color: isHovered || isActive ? t.textHover : t.text,
                }}
              >
                { (isHovered || isActive) && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ 
                      backgroundColor: t.pillBg,
                      zIndex: 0
                    }}
                    initial={false}
                    animate={{ 
                      opacity: isActive && !isHovered ? 0.6 : 1 
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 38,
                    }}
                  />
                )}
                <span className="relative z-10 text-sm font-medium">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* ─── CTA & Auth ───────────────────────────────────── */}
        <div className="flex items-center gap-4">
          <Link
            to="/auth"
            className="hidden md:block text-sm font-medium hover:opacity-80 transition-opacity cursor-pointer px-2"
            style={{ color: t.text }}
          >
            Log In
          </Link>
          
          <motion.button 
            onClick={() => navigate("/auth")}
            className="px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300"
            style={{
              backgroundColor: t.btnBg,
              color: t.btnText,
            }}
            whileHover={{
              backgroundColor: t.btnHoverBg,
              color: t.btnHoverText,
              scale: 1.03,
              boxShadow: "0 4px 20px rgba(59,130,246,0.4)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
