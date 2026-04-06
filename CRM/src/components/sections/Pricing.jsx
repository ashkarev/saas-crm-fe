import { useState } from "react";
import { motion } from "framer-motion";

const plans = [
  {
    tier: "Free",
    desc: "Perfect for individuals exploring Helix. Get started with no credit card required.",
    monthly: 0,
    yearly: 0,
    custom: false,
    features: [
      { text: "Up to 3 users", included: true },
      { text: "1 organization", included: true },
      { text: "Basic analytics", included: true },
      { text: "Role-based access", included: false },
      { text: "Priority support", included: false },
      { text: "Custom integrations", included: false },
    ],
    cta: "Get Started Free",
    variant: "ghost",
  },
  {
    tier: "Pro",
    desc: "For growing teams that need full control, insights, and integrations.",
    monthly: 49,
    yearly: 39,
    custom: false,
    popular: true,
    features: [
      { text: "Up to 50 users", included: true },
      { text: "Unlimited organizations", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Role-based access", included: true },
      { text: "Priority support", included: true },
      { text: "Custom integrations", included: false },
    ],
    cta: "Start Pro Trial",
    variant: "primary",
  },
  {
    tier: "Enterprise",
    desc: "For large orgs that need dedicated infra, compliance, and white-glove support.",
    monthly: null,
    yearly: null,
    custom: true,
    features: [
      { text: "Unlimited users", included: true },
      { text: "Unlimited organizations", included: true },
      { text: "Custom analytics", included: true },
      { text: "Role-based access", included: true },
      { text: "24/7 dedicated support", included: true },
      { text: "Custom integrations", included: true },
    ],
    cta: "Contact Sales",
    variant: "ghost",
  },
];

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="8" fill="rgba(33,118,255,0.15)" stroke="rgba(33,118,255,0.4)" strokeWidth="1" />
    <path d="M5 8l2 2 4-4" stroke="#2176ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CrossIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="8" fill="transparent" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  const handleCTA = (plan) => {
    console.log("CTA clicked:", plan.tier, isYearly ? "yearly" : "monthly");
  };

  return (
    <section id="pricing" className="bg-[#0d1117] py-28 px-6 relative overflow-hidden">

      {/* BG GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]  rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* EYEBROW */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 "
        >
          {/* <div className="w-7 h-px bg-[#2176ff]" />
          <span className="text-[11px] font-bold text-[#2176ff] tracking-[0.15em] uppercase">Pricing</span>
          <div className="w-7 h-px bg-[#2176ff]" /> */}
        </motion.div>

        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-4"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
            Simple,{" "}
            <span className="text-[#2176ff] ">
              transparent
            </span>{" "}
            pricing.
          </h2>
          <p className="text-sm font-light text-white/30 mt-4">
            No hidden fees. No surprises. Cancel anytime.
          </p>
        </motion.div>

        {/* TOGGLE */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mt-8 mb-12"
        >
          <span
            onClick={() => setIsYearly(false)}
            className={`text-sm font-semibold cursor-pointer transition-colors ${!isYearly ? "text-white" : "text-white/30"}`}
          >
            Monthly
          </span>

          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative w-12 h-6 rounded-full border transition-all duration-300 ${
              isYearly ? "bg-[#2176ff] border-[#2176ff]" : "bg-white/8 border-white/10"
            }`}
          >
            <div className={`absolute top-[3px] left-[3px] w-[18px] h-[18px] bg-white rounded-full transition-transform duration-300 ${isYearly ? "translate-x-6" : "translate-x-0"}`} />
          </button>

          <span
            onClick={() => setIsYearly(true)}
            className={`text-sm font-semibold cursor-pointer transition-colors ${isYearly ? "text-white" : "text-white/30"}`}
          >
            Yearly
          </span>

          <span className="text-[10px] font-bold text-[#2176ff] bg-[#2176ff]/10 border border-[#2176ff]/25 px-3 py-1 rounded-full tracking-wide">
            Save 20%
          </span>
        </motion.div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.tier}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 border overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? "bg-[#2176ff]/8 border-[#2176ff]/40 hover:border-[#2176ff]/70"
                  : "bg-white/[0.02] border-white/[0.07] hover:border-white/[0.15]"
              }`}
            >
              {/* TOP GLOW LINE for pro */}
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2176ff] to-transparent" />
              )}

              {/* POPULAR BADGE */}
              {plan.popular && (
                <div className="absolute top-5 right-5 bg-[#2176ff] text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wide uppercase shadow-[0_0_16px_rgba(33,118,255,0.5)]">
                  Most Popular
                </div>
              )}

              {/* TIER */}
              <div className={`text-[11px] font-bold tracking-[0.12em] uppercase mb-4 ${plan.popular ? "text-[#2176ff]" : "text-white/25"}`}>
                {plan.tier}
              </div>

              {/* PRICE */}
              {plan.custom ? (
                <div className="text-3xl font-black text-white tracking-tight mb-1 mt-2">Custom</div>
              ) : (
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-lg font-bold text-white/40 mb-2">$</span>
                  <span className="text-5xl font-black text-white tracking-tight leading-none">
                    {isYearly ? plan.yearly : plan.monthly}
                  </span>
                </div>
              )}
              <div className="text-xs font-light text-white/25 mb-6 pb-6 border-b border-white/[0.06]">
                {plan.custom ? "contact us" : isYearly ? "per month, billed yearly" : "per month"}
              </div>

              {/* DESC */}
              <p className="text-[12.5px] font-light text-white/30 leading-relaxed mb-6">
                {plan.desc}
              </p>

              {/* FEATURES */}
              <ul className="flex flex-col gap-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className={`flex items-center gap-2.5 text-[12.5px] font-light ${f.included ? "text-white/55" : "text-white/20"}`}>
                    {f.included ? <CheckIcon /> : <CrossIcon />}
                    {f.text}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => handleCTA(plan)}
                className={`w-full py-3 rounded-full text-[13.5px] font-bold transition-all duration-200 ${
                  plan.popular
                    ? "bg-[#2176ff] text-white hover:bg-[#1a60e0] shadow-[0_0_20px_rgba(33,118,255,0.35)] hover:shadow-[0_0_28px_rgba(33,118,255,0.5)]"
                    : "bg-transparent text-white/60 border border-white/12 hover:bg-white/5 hover:text-white"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM NOTE */}
        {/* <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-xs text-white/15 font-light mt-10"
        >
          All plans include{" "}
          <span className="text-white/35">SSL encryption</span>,{" "}
          <span className="text-white/35">99.9% uptime SLA</span>, and{" "}
          <span className="text-white/35">GDPR compliance</span>.
        </motion.p> */}

      </div>
    </section>
  );
};

export default Pricing;