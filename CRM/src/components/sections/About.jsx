import { motion } from "framer-motion";

const stats = [
  { number: "10M+", label: "Users Managed" },
  { number: "99.9%", label: "Uptime SLA" },
  { number: "50+", label: "Integrations" },
  { number: "150+", label: "Countries" },
];

const About = () => {
  return (
    <section id="about" className="bg-white py-28 px-6 relative overflow-hidden scroll-mt-24">

      {/* BG DETAIL */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[120px] pointer-events-none opacity-60" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-[100px] pointer-events-none opacity-40" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* EYEBROW */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-7 h-px bg-[#2176ff]" />
          <span className="text-[11px] font-bold text-[#2176ff] tracking-[0.15em] uppercase">About Helix</span>
        </motion.div>

        {/* MAIN SPLIT */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">

          {/* LEFT — MISSION */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl      text-[#0f172a] tracking-tight leading-[1.05] mb-6">
              Built to give teams{" "}
              <span className="text-[#2176ff]">clarity</span>{" "}
              at any scale.
            </h2>
            <p className="text-[15px] font-light text-slate-500 leading-relaxed mb-6">
              Helix was built on a simple belief — managing users, organizations, and growth shouldn't require five different tools and a dedicated ops team. We exist to give modern businesses one unified system that just works.
            </p>
            <p className="text-[15px] font-light text-slate-500 leading-relaxed">
              Our mission is to make organizational clarity accessible to every team — from early-stage startups to global enterprises — without compromise on control or security.
            </p>
          </motion.div>

          {/* RIGHT — VISION */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            {/* VISION CARD */}
            <div className="bg-[#190bd5cc] rounded-2xl p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2176ff] to-transparent" />
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#2176ff] shadow-[0_0_8px_#2176ff]" />

              <div className="text-[11px] font-bold text-[#2176ff] tracking-[0.15em] uppercase mb-4">
                Our Vision
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight leading-tight mb-4">
                A world where every team operates with{" "}
                <span className="text-[#2176ff]">zero friction.</span>
              </h3>
              <p className="text-[13px] font-light text-white/40 leading-relaxed">
                We envision a future where organizational complexity is invisible — where any team, anywhere, can focus entirely on building and growing rather than managing infrastructure and access.
              </p>

              {/* decorative dots */}
              <div className="absolute bottom-6 right-6 flex gap-1.5">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/10" />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* STATS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border-t border-slate-100 pt-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="text-center group cursor-default"
              >
                <div className="text-4xl md:text-5xl  text-[#0f172a] tracking-tight leading-none mb-2 group-hover:text-[#2176ff] transition-colors duration-300">
                  {s.number}
                </div>
                <div className="text-xs font-medium text-slate-400 tracking-wide uppercase">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;