import { motion } from "framer-motion";

/* ─── Social Icon SVGs ──────────────────────────────────── */
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.263 5.633 5.901-5.633Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

/* ─── Link columns ──────────────────────────────────────── */
const columns = [
  {
    heading: "Product",
    links: ["Features", "Pricing", "Integrations", "Updates", "Roadmap"],
  },
  {
    heading: "Company",
    links: ["About", "Careers", "Blog", "Press", "Contact"],
  },
  {
    heading: "Resources",
    links: ["Docs", "API Reference", "Support", "Status", "Community"],
  },
  {
    heading: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"],
  },
];

const socials = [
  { label: "Twitter", icon: <TwitterIcon /> },
  { label: "LinkedIn", icon: <LinkedInIcon /> },
  { label: "GitHub", icon: <GithubIcon /> },
];

/* ─── Fade-up variants ───────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay },
});

/* ═══════════════════════════════════════════════════════════
   FOOTER COMPONENT
═══════════════════════════════════════════════════════════ */
const Footer = () => {
  return (
    <footer id="footer-section" className="bg-[#070A10] text-white relative overflow-hidden">

      {/* ── Subtle radial glow ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "400px",
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(33,118,255,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Giant watermark ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "100px",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "clamp(80px, 14vw, 180px)",
          fontWeight: 1000,
          letterSpacing: "-0.04em",
          color: "transparent",
          WebkitTextStroke: "2px rgba(255,257,255,0.04)",
          whiteSpace: "nowrap",
          userSelect: "none",
          pointerEvents: "none",
          lineHeight: 1,
        }}
      >
        HELIX
      </div>

      {/* ══════════════════════════════════════════
          PRE-FOOTER CTA BANNER
      ══════════════════════════════════════════ */}
      <div
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          padding: "96px 24px",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "120px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #2176ff, transparent)",
          }}
        />

        <motion.div {...fadeUp(0)}>
          <span
            style={{
              display: "inline-block",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#2176ff",
              marginBottom: "-0px",
              
            }}
          >
            Start today
          </span>
        </motion.div>

        <motion.h2
          {...fadeUp(0.08)}
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: "2px",
          }}
        >
          Ready to build with{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #2176ff, #60a5fa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Helix
          </span>
          ?
        </motion.h2>

        <motion.p
          {...fadeUp(0.14)}
          style={{
            color: "rgba(255,255,255,0.45)",
            maxWidth: "500px",
            margin: "0 auto 20px",
            fontSize: "15px",
            lineHeight: 1.7,
          }}
        >
          Manage users, workflows, and growth — all in one unified platform
          built for teams that scale globally.
        </motion.p>

        <motion.div
          {...fadeUp(0.2)}
          style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <button
            style={{
              background: "linear-gradient(135deg, #2176ff, #60a5fa)",
              color: "#fff",
              border: "none",
              borderRadius: "9999px",
              padding: "14px 32px",
              fontWeight: 600,
              fontSize: "14px",
              cursor: "pointer",
              boxShadow: "0 0 24px rgba(33,118,255,0.35)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 0 36px rgba(33,118,255,0.55)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 0 24px rgba(33,118,255,0.35)";
            }}
          >
            Get Started Free
          </button>

          <button
            style={{
              background: "transparent",
              color: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "9999px",
              padding: "14px 32px",
              fontWeight: 600,
              fontSize: "14px",
              cursor: "pointer",
              transition: "border-color 0.2s, color 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
              e.currentTarget.style.color = "rgba(255,255,255,0.7)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            Talk to Sales
          </button>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════
          MAIN FOOTER GRID
      ══════════════════════════════════════════ */}
      <div
        style={{
          maxWidth: "1152px",
          margin: "0 auto",
          padding: "72px 24px 0",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "40px",
          }}
        >

          {/* ── Brand column ── */}
          <motion.div {...fadeUp(0)} style={{ gridColumn: "span 1" }}>
            {/* Logo pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #2176ff, #60a5fa)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: 900,
                  flexShrink: 0,
                }}
              >
                H
              </div>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                }}
              >
                HELIX
              </span>
            </div>

            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.38)", lineHeight: 1.75, marginBottom: "28px" }}>
              A unified platform to manage users, workflows, and growth — built
              for teams that scale globally.
            </p>

            {/* ── Social Icons ── */}
            <div style={{ display: "flex", gap: "10px" }}>
              {socials.map((s) => (
                <button
                  key={s.label}
                  aria-label={s.label}
                  title={s.label}
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.04)",
                    color: "rgba(255,255,255,0.45)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "border-color 0.2s, color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#2176ff";
                    e.currentTarget.style.color = "#2176ff";
                    e.currentTarget.style.background = "rgba(33,118,255,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  }}
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── Link columns ── */}
          {columns.map((col, ci) => (
            <motion.div key={col.heading} {...fadeUp(0.05 + ci * 0.06)}>
              <h3
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.55)",
                  marginBottom: "20px",
                }}
              >
                {col.heading}
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.38)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.38)")}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* ── Newsletter column ── */}
          <motion.div {...fadeUp(0.28)}>
            <h3
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
                marginBottom: "10px",
              }}
            >
              Stay Updated
            </h3>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.38)", lineHeight: 1.65, marginBottom: "16px" }}>
              Get product updates and early access to new features.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <input
                type="email"
                placeholder="you@company.com"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.04)",
                  color: "#fff",
                  fontSize: "13px",
                  outline: "none",
                  transition: "border-color 0.2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#2176ff")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              />
              <button
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "none",
                  background: "linear-gradient(135deg, #2176ff, #60a5fa)",
                  color: "#fff",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Subscribe
              </button>
            </div>
          </motion.div>

        </div>

        {/* ══════════════════════════════════════════
            BOTTOM BAR
        ══════════════════════════════════════════ */}
        <motion.div
          {...fadeUp(0.32)}
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            marginTop: "60px",
            padding: "24px 0 32px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>
            © {new Date().getFullYear()} Helix Technologies Inc. All rights reserved.
          </p>

          <div style={{ display: "flex", gap: "24px" }}>
            {["Privacy", "Terms", "Cookies", "Security"].map((item) => (
              <a 
                key={item}
                href="#"
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.25)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;