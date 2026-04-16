import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      id: "01",
      title: "Multi-tenant Architecture",
      desc: "Operate multiple organizations from a single system with complete data isolation.",
    },
    {
      id: "02",
      title: "Role-Based Access",
      desc: "Define permissions with precision using flexible roles and secure access control.",
    },
    {
      id: "03",
      title: "Real-Time Insights",
      desc: "Track activity, performance, and growth instantly with live system data.",
    },
    {
      id: "04",
      title: "Native Integrations",
      desc: "Connect your workflow with essential tools and services without complexity.",
    },
    {
      id: "05",
      title: "Scalable Infrastructure",
      desc: "Built to handle growth seamlessly, from startups to enterprise systems.",
    },
    {
      id: "06",
      title: "Enterprise Security",
      desc: "Advanced security with audit logs, compliance, and full data protection.",
    },
  ];

  return (
    <section id="feature" className="bg-white py-24 px-6 relative overflow-hidden scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADLINE */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#070A10] leading-tight tracking-tight">
            The last platform your team will{" "}
            <span className="text-blue-300  ">ever</span>{" "}
            <span className="text-blue-600">need.</span>
          </h2>

          <p className="mt-6 text-gray-500 text-lg max-w-2xl leading-relaxed">
            Built with clarity and precision — every feature is designed to scale without compromise.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((item, i) => (
            <Card key={i} item={item} i={i} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;



//  CARD COMPONENT (clean + correct)
const Card = ({ item, i }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: i * 0.05 }}
      viewport={{ once: true }}
      className="
        group p-8 rounded-2xl border text-black border-gray-200 bg-white
        transition-all duration-300 ease-out cursor-pointer

        hover:bg-[#60A5FA]
        hover:text-white
        hover:-translate-y-2
        hover:shadow-xl
        hover:border-blue-500/30
      "
    >

      {/* ID */}
      <span className="text-xs font-semibold tracking-widest text-gray-300 group-hover:text-blue-200">
        {item.id}
      </span>

      {/* TITLE */}
      <h3 className="text-xl font-bold mt-4 leading-snug transition-colors duration-300 group-hover:text-white">
        {item.title}
      </h3>

      {/* DESC */}
      <p className="mt-3 text-sm leading-relaxed text-gray-500 group-hover:text-blue-100">
        {item.desc}
      </p>

    </motion.div>
  );
};