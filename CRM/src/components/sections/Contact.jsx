import { motion } from "framer-motion";
import { AnimatedFAQ } from "@/components/ui/AnimatedFaq";
import { Link, useNavigate } from "react-router-dom";


const Contact = () => {
  const navigate = useNavigate();
  const faqItems = [
    {
      question: "Is there a free trial?",
      answer: "Yes, we offer a 14-day full-access trial with no credit card required. You can experience all premium features starting from day one.",
      category: "Onboarding"
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Absolutely. Our monthly plans are contract-free and can be paused or cancelled at any time through your dashboard.",
      category: "Billing"
    },
    {
      question: "Do you offer discounts for non-profits?",
      answer: "We provide a 20% discount for registered non-profits. We also offer simplified pricing for startups and academic institutions.",
      category: "Pricing"
    },
    {
      question: "How secure is my data on the platform?",
      answer: "Your data is protected with SOC2 industry standards, including end-to-end encryption at rest and in transit.",
      category: "Security"
    },
    {
        question: "Does Helix support international teams?",
        answer: "Yes, we support over 150 countries with multi-region infrastructure to ensure maximum performance and compliance everywhere.",
        category: "Global"
    }
  ];

  return (
    <section id="contact" className="bg-[#0a0d14] text-white scroll-mt-24">

      {/* BIG CTA */}
      <div className="relative text-center px-6 py-32 border-b border-white/6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(33,118,255,0.12),transparent_60%)] pointer-events-none" />

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 font-black tracking-tight leading-[0.9] mb-8"
          style={{ fontSize: "clamp(56px, 8vw, 110px)", letterSpacing: "-0.06em" }}
        >
          <span
            className="block"
            style={{
              WebkitTextStroke: "1.5px rgba(255,255,255,0.15)",
              color: "transparent",
            }}
          >
            Elevate your
          </span>
          <span
            className="block text-white"
            style={{
              textShadow:
                "0 2px 0 rgba(0,0,0,0.5), 0 4px 0 rgba(0,0,0,0.3), 0 12px 32px rgba(0,0,0,0.4)",
            }}
          >
            workflow with
          </span>
          <span
            className="block text-[#2176ff]"
            style={{
              textShadow:
                "0 2px 0 rgba(0,50,180,0.5), 0 4px 0 rgba(0,30,120,0.3), 0 12px 48px rgba(33,118,255,0.45)",
            }}
          >
            Helix.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative z-10 text-[17px] font-light text-white/40 max-w-xl mx-auto leading-relaxed mb-14"
        >
          Experience the next generation of customer relationship management.{" "}
          <span className="text-white/80 font-medium">Join 50,000+ teams</span> scaling their operations with precision, speed, and intelligence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="relative z-10 flex flex-col sm:flex-row justify-center gap-4"
        >
          <button 
            onClick={() => navigate("/auth")}
            className="bg-[#2176ff] text-white px-12 py-5 rounded-lg text-[15px] font-bold transition-all duration-300 hover:bg-[#1a60e0] hover:-translate-y-1 shadow-[0_0_40px_rgba(33,118,255,0.3)]  active:scale-95"
          >
            Get started for free — 14 day trial
          </button>
          <Link 
            to="/overview"
            className="bg-white/05 text-white/70 px-12 py-5 rounded-lg text-[15px] font-semibold border border-white/10 transition-all duration-300 hover:text-white hover:bg-white/10 hover:border-white/20  active:scale-95"
          >
            Schedule a platform tour
          </Link>
        </motion.div>
      </div>

      {/* CHANNELS */}
<div className="border-b border-white/6">
  <div className="max-w-5xl mx-auto px-6 py-16">

    {/* HEADING */}
    <p className="text-[11px] text-[#2176ff] tracking-[0.25em] uppercase mb-10 font-semibold">
      Contact
    </p>

    {/* LIST */}
    <div className="space-y-3">

      {/* ITEM */}
      <div className="group flex items-center justify-between px-5 py-5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300">
        
        <div>
          <p className="text-[15px] font-semibold text-white tracking-tight">
            Live Support
          </p>
          <p className="text-[13px] text-white/60 mt-1">
            Talk to our team instantly
          </p>
        </div>

        <button className="flex items-center gap-2 text-[13px] font-medium text-white/50 group-hover:text-[#2176ff] transition">
          Open
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>

      {/* ITEM */}
      <div className="group flex items-center justify-between px-5 py-5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300">
        
        <div>
          <p className="text-[15px] font-semibold text-white tracking-tight">
            Book a Demo
          </p>
          <p className="text-[13px] text-white/60 mt-1">
            See Helix in action
          </p>
        </div>

        <button className="flex items-center gap-2 text-[13px] font-medium text-white/50 group-hover:text-[#2176ff] transition">
          Schedule
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>

      {/* ITEM */}
      <div className="group flex items-center justify-between px-5 py-5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300">
        
        <div>
          <p className="text-[15px] font-semibold text-white tracking-tight">
            Developer Docs
          </p>
          <p className="text-[13px] text-white/60 mt-1">
            APIs & integrations
          </p>
        </div>

        <Link to={'/docs'}  className="flex items-center gap-2 text-[13px] font-medium text-white/50 group-hover:text-[#2176ff] transition">
          Explore
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>

    </div>

  </div>
</div>


      {/* FAQ SECTION */}
      <div className="border-b border-white/6 overflow-hidden">
        <div className="px-12 pt-16 -mb-8">
            <span className="text-[10px] font-bold text-[#2176ff] tracking-[0.2em] uppercase mb-4 block">Knowledge Base</span>
            <h3 className="text-3xl font-black text-white tracking-tight">Common Questions.</h3>
        </div>
        <AnimatedFAQ items={faqItems} autoplay={true} />
      </div>

      

    
    </section>
  );
};

export default Contact;