import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home,
  Book, 
  Cpu, 
  Rocket, 
  Layers, 
  Code, 
  BarChart, 
  ShieldCheck, 
  CreditCard, 
  HelpCircle, 
  Mail,
  ChevronRight,
  Menu,
  X,
  Search,
  ExternalLink,
  Terminal,
  ArrowRight
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'


const DOCS_NAV = [
    { title: "Overview", icon: Book, id: "overview" },
    { title: "Core Features", icon: Cpu, id: "features" },
    { title: "Getting Started", icon: Rocket, id: "getting-started" },
    { title: "Architecture", icon: Layers, id: "architecture" },
    { title: "API / Developers", icon: Code, id: "api" },
    { title: "Workflows", icon: BarChart, id: "workflows" },
    { title: "Security", icon: ShieldCheck, id: "security" },
    { title: "Pricing", icon: CreditCard, id: "pricing-docs" },
    { title: "FAQ", icon: HelpCircle, id: "faq" },
    { title: "Support", icon: Mail, id: "support" },
];

const Overview = () => {
    const [activeSection, setActiveSection] = useState("overview");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Scroll to section helper
    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
            const yOffset = -120; // accounting for navbar
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
            setActiveSection(id);
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <div className="bg-[#070A10] text-[#E2E8F0] min-h-screen selection:bg-[#3B82F6] selection:text-white font-['Sora',sans-serif]">
            <Navbar />

            {/* BACK TO HOME BUTTON */}
            <div className="fixed top-24 right-6 lg:right-12 z-50">
                <Link to="/">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600/90 backdrop-blur-md text-white rounded-full font-bold text-sm shadow-2xl shadow-blue-500/20 hover:bg-blue-600 transition-all border border-blue-400/30"
                    >
                        <Home size={16} />
                        <span className="hidden sm:inline">Back to Home</span>
                    </motion.button>
                </Link>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="pt-24 lg:pt-32 pb-20 max-w-7xl mx-auto px-6 lg:px-12 flex gap-12 relative">

                
                {/* SIDEBAR — Desktop */}
                <aside className="hidden lg:block w-72 shrink-0 sticky top-32 h-[calc(100vh-160px)] overflow-y-auto pr-8 custom-scrollbar">
                    <div className="mb-10 px-5 py-3.5 bg-[#0D1117] border border-gray-800 rounded-2xl flex items-center gap-3 group focus-within:border-blue-500/50 transition-all">
                        <Search size={16} className="text-gray-500 group-focus-within:text-blue-400" />
                        <input 
                            type="text" 
                            placeholder="Search documentation..." 
                            className="bg-transparent border-none outline-none text-sm w-full text-white placeholder-gray-600"
                        />
                    </div>
                    
                    <nav className="space-y-1.5">
                        {DOCS_NAV.map((item) => (   
                            <button
                                key={item.id}
                                onClick={() => scrollTo(item.id)}
                                className={`
                                    w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
                                    ${activeSection === item.id 
                                        ? "bg-[#1E293B] text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/5" 
                                        : "text-gray-500 hover:text-gray-200 hover:bg-[#0D1117]"}
                                `}
                            >
                                <item.icon size={18} className={activeSection === item.id ? "text-blue-400" : ""} />
                                {item.title}
                                {activeSection === item.id && (
                                    <motion.div layoutId="active-dot" className="ml-auto w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                                )}
                            </button>
                        ))}
                    </nav>

                    <div className="mt-12 pt-8 border-t border-gray-800/50">
                        <h4 className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-700 mb-6 font-mono">Status & Logs</h4>
                        <div className="space-y-2">
                             <a href="#" className="flex items-center justify-between px-4 py-2 text-xs text-gray-500 hover:text-blue-400 transition-colors group italic">
                                <span>API Status</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            </a>
                            <a href="#" className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-blue-400 transition-colors">
                                <Terminal size={14} className="opacity-50" /> Changelog v4.2.0
                            </a>
                        </div>
                    </div>
                </aside>

                {/* MOBILE NAV BUTTON */}
                <button 
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="lg:hidden fixed bottom-10 right-10 z-50 bg-[#1E293B] p-5 rounded-3xl border border-blue-500/30 shadow-2xl text-blue-400 flex items-center gap-3 active:scale-95 transition-transform backdrop-blur-xl"
                >
                    <Menu size={24} />
                    <span className="font-bold text-sm tracking-tight uppercase">Navigation</span>
                </button>

                {/* MOBILE OVERLAY MENU */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div 
                            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
                            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                            className="fixed inset-0 z-200 bg-[#070A10]/95 p-12 overflow-y-auto"
                        >
                            <div className="flex justify-between items-center mb-16">
                                <span className="font-bold text-3xl tracking-tighter">HELIX<span className="text-blue-600 text-sm align-top ml-1">DOCS</span></span>
                                <button className="p-3 bg-gray-900 rounded-2xl" onClick={() => setIsMobileMenuOpen(false)}><X size={24} /></button>
                            </div>
                            <nav className="flex flex-col gap-8">
                                {DOCS_NAV.map((item, idx) => (
                                    <motion.button 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        key={item.id}
                                        onClick={() => scrollTo(item.id)}
                                        className="flex items-center gap-8 text-2xl font-bold text-gray-500 hover:text-blue-400 transition-colors text-left"
                                    >
                                        <div className="w-12 h-12 bg-[#0D1117] rounded-2xl border border-gray-800 flex items-center justify-center">
                                            <item.icon size={24} />
                                        </div>
                                        {item.title}
                                    </motion.button>
                                ))}
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* CONTENT AREA */}
                <main className="flex-1 max-w-4xl">
                    <header className="mb-24">
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2.5 text-blue-500 text-[11px] font-bold uppercase tracking-widest mb-8 px-3 py-1 bg-blue-500/5 border border-blue-500/10 rounded-full w-fit"
                        >
                            <Book size={12} /> Documentation <ChevronRight size={12} className="opacity-50" /> <span className="text-gray-400">Main Reference</span>
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl lg:text-8xl font-bold tracking-[ -0.04em] text-white mb-8 leading-[0.9]"
                        >
                            Mastering <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-500">Helix.</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-2xl text-gray-500 leading-snug max-w-2xl font-medium"
                        >
                            The unified engine for modern teams. Built for zero-latency operations and enterprise-scale multi-tenancy.
                        </motion.p>
                    </header>

                    {/* CONTENT SECTIONS */}
                    <article className="space-y-40">
                        
                        {/* 1. OVERVIEW */}
                        <section id="overview" className="scroll-mt-32">
                            <div className="flex items-center gap-4 mb-10">
                                <h2 className="text-3xl font-bold text-white">Overview</h2>
                                <div className="h-px flex-1 bg-gray-800/50" />
                            </div>
                            <div className="space-y-8">
                                <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
                                    Helix is a unified operations platform built from the ground up for modern SaaS ecosystems. It centralizes customer intelligence, organizational hierarchy, and real-time telemetry into a single, high-performance interface.
                                </p>
                                <p className="text-lg text-gray-500 leading-relaxed max-w-3xl border-l-4 border-blue-600 pl-8 py-2 italic font-serif">
                                    "We built Helix to bridge the gap between complex backend infrastructure and intuitive operational control."
                                </p>
                            </div>
                            
                            <div className="grid md:grid-cols-3 gap-8 mt-16">
                                <div className="p-8 bg-linear-to-b from-[#0D1117] to-transparent rounded-4xl border border-gray-800/50 group hover:border-blue-500/30 transition-all">
                                    <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mb-6">
                                        <Rocket size={24} />
                                    </div>
                                    <h4 className="font-bold mb-3 text-white">Founders</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">Launch multi-tenant apps in hours, not weeks, with pre-built infra.</p>
                                </div>
                                <div className="p-8 bg-linear-to-b from-[#0D1117] to-transparent rounded-4xl border border-gray-800/50 group hover:border-blue-500/30 transition-all">
                                    <div className="w-12 h-12 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-500 mb-6">
                                        <Layers size={24} />
                                    </div>
                                    <h4 className="font-bold mb-3 text-white">Ops Teams</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">Administer enterprise hierarchies with surgical RBAC precision.</p>
                                </div>
                                <div className="p-8 bg-linear-to-b from-[#0D1117] to-transparent rounded-4xl border border-gray-800/50 group hover:border-blue-500/30 transition-all">
                                    <div className="w-12 h-12 bg-purple-600/10 rounded-2xl flex items-center justify-center text-purple-500 mb-6">
                                        <Code size={24} />
                                    </div>
                                    <h4 className="font-bold mb-3 text-white">Developers</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">High-throughput REST API with native TypeScript support.</p>
                                </div>
                            </div>
                        </section>


                        {/* 2. CORE FEATURES */}
                        <section id="features" className="scroll-mt-32">
                           <div className="flex items-center gap-4 mb-12">
                                <h2 className="text-3xl font-bold text-white">Core Features</h2>
                                <div className="h-px flex-1 bg-gray-800/50" />
                            </div>
                            <div className="space-y-16">
                                {[
                                    { t: "Multi-tenant Architecture", d: "Hard data isolation at the infrastructure level. Every workspace resides in a logically separate partition, ensuring zero leakage across tenants." },
                                    { t: "Role-Based Access (RBAC)", d: "Dynamic policy engine that allows you to define granular CRUD permissions per user, per resource, or per organization." },
                                    { t: "Real-Time Telemetry", d: "WebSocket-driven dashboards that provide sub-200ms latency updates for critical system metrics and user activity." },
                                    { t: "Native Integration Sync", d: "Zero-config pipelines to Slack, Vercel, and Salesforce. Stream events directly into your existing communication channels." }
                                ].map((f, i) => (
                                    <div key={i} className="group relative">
                                        <h3 className="text-2xl font-bold mb-4 text-gray-200 flex items-center gap-5">
                                            <span className="text-[10px] font-mono text-blue-600 px-2 py-1 bg-blue-600/5 border border-blue-600/20 rounded-md">0{i+1}</span>
                                            {f.t}
                                        </h3>
                                        <p className="text-gray-500 group-hover:text-gray-400 transition-colors leading-relaxed border-l border-gray-800 pl-10 max-w-2xl">
                                            {f.d}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 3. GETTING STARTED */}
                        <section id="getting-started" className="scroll-mt-32">
                            <div className="flex items-center gap-4 mb-16">
                                <h2 className="text-3xl font-bold text-white">Getting Started</h2>
                                <div className="h-px flex-1 bg-gray-800/50" />
                            </div>
                            <div className="space-y-24">
                                <div className="flex gap-10">
                                    <div className="hidden md:flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-600/20">1</div>
                                        <div className="w-px flex-1 bg-gray-800 mt-4" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-4 text-white">Initialize Workspace</h3>
                                        <p className="text-gray-400 leading-relaxed mb-6">Create your primary cluster. Define your region and organization metadata to begin. This step configures your private API gateway.</p>
                                        <div className="p-5 bg-[#0D1117] rounded-2xl border border-gray-800 font-mono text-xs text-blue-400 flex justify-between items-center group">
                                            <code>$ helix workspace init "Acme Corp" --region us-east-1</code>
                                            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-10">
                                    <div className="hidden md:flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center font-bold text-gray-500">2</div>
                                        <div className="w-px flex-1 bg-gray-800 mt-4" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-4 text-white">Define Access Policies</h3>
                                        <p className="text-gray-400 leading-relaxed">Map your organizational roles. Helix comes with three default roles (Admin, Member, Viewer) which you can customize in the Security tab.</p>
                                    </div>
                                </div>

                                <div className="flex gap-10">
                                    <div className="hidden md:flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center font-bold text-gray-500">3</div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-4 text-white">Invite & Integrate</h3>
                                        <p className="text-gray-400 leading-relaxed">Connect your first third-party app and invite your technical steering committee via email for final validation.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 4. ARCHITECTURE */}
                        <section id="architecture" className="scroll-mt-32">
                            <div className="flex items-center gap-4 mb-12">
                                <h2 className="text-3xl font-bold text-white">Architecture</h2>
                                <div className="h-px flex-1 bg-gray-800/50" />
                            </div>
                            <div className="bg-[#0D1117] border border-gray-800 rounded-[3rem] p-12 relative overflow-hidden">
                                <div className="relative z-10 space-y-12">
                                    <div className="flex flex-col gap-6">
                                        <div className="flex justify-between items-end">
                                            <h4 className="text-blue-500 text-[10px] uppercase font-bold tracking-widest">Logic Layer</h4>
                                            <span className="text-gray-700 font-mono text-[10px]/none">Distributed Edge</span>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="p-6 bg-gray-900 rounded-2xl border border-gray-800">
                                                <div className="font-bold mb-1 text-white">React / Framer SPA</div>
                                                <p className="text-xs text-gray-500 leading-relaxed">Declarative UI built for fluid transitions and extreme responsiveness.</p>
                                            </div>
                                            <div className="p-6 bg-gray-900 rounded-2xl border border-gray-800">
                                                <div className="font-bold mb-1 text-white">Node.js Gateway</div>
                                                <p className="text-xs text-gray-500 leading-relaxed">Multi-threaded cluster handling auth, throttle, and event routing.</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col gap-6">
                                        <div className="flex justify-between items-end">
                                            <h4 className="text-blue-500 text-[10px] uppercase font-bold tracking-widest">Persistence Layer</h4>
                                            <span className="text-gray-700 font-mono text-[10px]/none">Redundant Shards</span>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="p-6 bg-gray-900 rounded-2xl border border-gray-800">
                                                <div className="font-bold mb-1 text-white">PostgreSQL Cluster</div>
                                                <p className="text-xs text-gray-500 leading-relaxed">Relational integrity for organizations, mapping, and core records.</p>
                                            </div>
                                            <div className="p-6 bg-gray-900 rounded-2xl border border-gray-800">
                                                <div className="font-bold mb-1 text-white">Redis Event Bus</div>
                                                <p className="text-xs text-gray-500 leading-relaxed">Publisher-subscriber model for real-time telemetry and state logic.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 right-0 p-10 opacity-[0.03] scale-150 rotate-12 pointer-events-none">
                                    <Cpu size={400} />
                                </div>
                            </div>
                        </section>

                        {/* 5. API */}
                        <section id="api" className="scroll-mt-32">
                            <div className="flex items-center gap-4 mb-16">
                                <h2 className="text-3xl font-bold text-white">Developer Guide</h2>
                                <div className="h-px flex-1 bg-gray-800/50" />
                                <div className="px-3 py-1 bg-blue-600/10 border border-blue-600/20 rounded-md text-blue-500 text-[10px] font-bold">API v1.4</div>
                            </div>
                            
                            <div className="space-y-12">
                                <div>
                                    <h3 className="text-xl font-bold mb-4 text-white">Authentication</h3>
                                    <p className="text-gray-400 mb-6 max-w-2xl">Requests use a secure Bearer token. We recommend rotating these monthly via the Security settings.</p>
                                    <div className="bg-[#0D1117] rounded-2xl p-6 font-mono text-sm border border-gray-800 shadow-inner">
                                        <span className="text-blue-500">Authorization:</span> Bearer &lt;hlx_..._xyz&gt;
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-4 text-white">Webhook Listener</h3>
                                    <p className="text-gray-400 mb-6">Helix emits events for all organizational changes. Ensure your endpoint validates the HMAC signature.</p>
                                    <div className="bg-[#0D1117] rounded-3xl p-8 font-mono text-sm border border-gray-800 relative group overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                            <span className="text-[10px] text-gray-600 bg-gray-900 px-2 py-1 rounded-md">javascript</span>
                                        </div>
                                        <pre className="text-blue-200 overflow-x-auto">
{`app.post('/webhooks/helix', (req, res) => {
  const signature = req.headers['x-helix-signature'];
  const event = validateSignature(req.body, signature);
  
  if (event.type === 'org.created') {
     console.log('Scaling cluster for tenant:', event.data.id);
  }
  
  res.status(200).send('OK');
});`}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 6. WORKFLOWS */}
                        <section id="workflows" className="scroll-mt-32">
                             <div className="flex items-center gap-4 mb-12">
                                <h2 className="text-3xl font-bold text-white">Standard Workflows</h2>
                                <div className="h-px flex-1 bg-gray-800/50" />
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="p-10 bg-linear-to-br from-[#0D1117] to-transparent rounded-4xl border border-gray-800 transition-all hover:border-gray-700">
                                    <BarChart size={32} className="text-indigo-500 mb-8" />
                                    <h3 className="text-xl font-bold text-white mb-4">Metric Aggregation</h3>
                                    <p className="text-gray-500 leading-relaxed text-sm">Aggregating telemetry from sub-entities into a parent organization dashboard for executive stakeholders.</p>
                                </div>
                                <div className="p-10 bg-linear-to-br from-[#0D1117] to-transparent rounded-4xl border border-gray-800 transition-all hover:border-gray-700">
                                    <Mail size={32} className="text-purple-500 mb-8" />
                                    <h3 className="text-xl font-bold text-white mb-4">Provisioning Guardrails</h3>
                                    <p className="text-gray-500 leading-relaxed text-sm">Automating user seats and quota limits based on organizational contract types via the Billing API.</p>
                                </div>
                            </div>
                        </section>

                        {/* 7. SECURITY & RELIABILITY */}
                        <section id="security" className="scroll-mt-32">
                             <div className="flex items-center gap-4 mb-16">
                                <h2 className="text-3xl font-bold text-white">Trust & Safety</h2>
                                <div className="h-px flex-1 bg-gray-800/50" />
                            </div>
                            <div className="grid md:grid-cols-2 gap-16">
                                <div>
                                    <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-3">
                                        <ShieldCheck size={20} className="text-green-500" /> Hardened Defense
                                    </h3>
                                    <p className="text-gray-500 leading-relaxed text-sm">
                                        Zero-trust architecture with mandatory MFA and hardware-key support (WebAuthn). External penetration testing performed bi-annually by third-party auditors.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-3">
                                        <Rocket size={20} className="text-blue-500" /> Operational Uptime
                                    </h3>
                                    <p className="text-gray-500 leading-relaxed text-sm">
                                        Our 99.99% SLA is backed by geo-redundant cluster failover. In the event of a regional outage, service is restored within &lt;1.5 seconds.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 8. PRICING */}
                        <section id="pricing-docs" className="scroll-mt-32">
                             <div className="flex items-center gap-4 mb-12">
                                <h2 className="text-3xl font-bold text-white">Licensing</h2>
                                <div className="h-px flex-1 bg-gray-800/50" />
                            </div>
                            <div className="bg-[#0D1117] p-16 rounded-[4rem] border border-gray-800/50 shadow-2xl relative overflow-hidden group">
                                <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
                                    <div>
                                        <h3 className="text-4xl font-bold text-white mb-6 leading-tight">Predictable growth for modern teams.</h3>
                                        <p className="text-gray-500 mb-10 leading-relaxed">No arbitrary seat caps. No legacy per-feature unlocking. Upgrade your core infrastructure when you scale.</p>
                                        <button className="px-8 py-4 bg-white text-black rounded-3xl font-bold hover:bg-gray-200 transition-all flex items-center gap-3">
                                            View Detailed Plans <ArrowRight size={18} />
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div className="px-8 py-6 bg-gray-900/50 backdrop-blur-md rounded-4xl border border-gray-800 flex justify-between items-center group-hover:border-blue-500/30 transition-all">
                                            <span className="font-bold text-gray-300">Starter</span>
                                            <span className="text-white font-black text-2xl font-mono">$0<span className="text-[10px] text-gray-600 font-normal"> /mo</span></span>
                                        </div>
                                        <div className="px-8 py-6 bg-blue-600 rounded-4xl flex justify-between items-center shadow-2xl shadow-blue-600/30">
                                            <span className="font-bold text-white">Production</span>
                                            <span className="text-white font-black text-2xl font-mono">$199<span className="text-[10px] text-blue-200 font-normal"> /mo</span></span>
                                        </div>
                                        <div className="px-8 py-6 bg-gray-900/50 backdrop-blur-md rounded-4xl border border-gray-800 flex justify-between items-center group-hover:border-blue-500/30 transition-all">
                                            <span className="font-bold text-gray-300">Enterprise</span>
                                            <span className="text-white font-black text-lg">Contact Sales</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-blue-600/5 via-transparent to-transparent opacity-50 pointer-events-none" />
                            </div>
                        </section>


                        {/* 9. FAQ */}
                        <section id="faq" className="scroll-mt-32">
                            <div className="flex items-center gap-4 mb-16">
                                <h2 className="text-3xl font-bold text-white">Expert FAQ</h2>
                                <div className="h-px flex-1 bg-gray-800/50" />
                            </div>
                            <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
                                {[
                                    { q: "Is Helix GDPR compliant?", a: "Helix is fully GDPR and SOC 2 Type II compliant. We provide Data Processing Agreements (DPA) and regional residency options for EU customers." },
                                    { q: "Can we self-host Helix?", a: "Currently, Helix is available as a managed Cloud service only. Enterprise customers can opt for Private Cluster instances in their own VPC." },
                                    { q: "What is the maximum tenant limit?", a: "Standard clusters support up to 50,000 tenants. Custom sharding is available for enterprise requirements exceeding this limit." },
                                    { q: "Does the API support GraphQL?", a: "Our current roadmap includes GraphQL support in v5.0. Currently, we offer a robust, self-documenting RESTful API." }
                                ].map((item, i) => (
                                    <div key={i} className="group">
                                        <h4 className="text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">#{i+1} {item.q}</h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 10. SUPPORT */}
                        <section id="support" className="scroll-mt-32 mb-40">
                            <div className="p-16 bg-[#111827] rounded-[4rem] text-center text-white relative overflow-hidden border border-white/5 group">
                                <div className="relative z-10">
                                    <div className="w-16 h-16 bg-blue-600/10 rounded-3xl flex items-center justify-center text-blue-500 mb-8 mx-auto border border-blue-500/20">
                                        <HelpCircle size={32} />
                                    </div>
                                    <h2 className="text-5xl font-bold mb-8 tracking-tighter">Zero-friction support.</h2>
                                    <p className="text-gray-400 mb-12 max-w-lg mx-auto text-lg">Our specialized engineers work directly in our customer Slack channels to ensure your deployment never slows down.</p>
                                    <div className="flex flex-wrap justify-center gap-6">
                                        <button className="px-10 py-5 bg-white text-[#111827] rounded-3xl font-bold hover:bg-gray-100 transition-all active:scale-95 shadow-xl">Join Managed Slack</button>
                                        <button className="px-10 py-5 bg-gray-800 text-white rounded-3xl font-bold hover:bg-gray-700 transition-all border border-white/5">Open Priority Ticket</button>
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 p-16 opacity-[0.02] -rotate-12 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                                    <Mail size={500} />
                                </div>
                            </div>
                        </section>

                    </article>

                    {/* BOTTOM NAV / FOOTER */}
                    <footer className="mt-40 pt-16 border-t border-gray-800/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-10 text-gray-700 text-[10px] font-mono tracking-widest uppercase">
                        <div className="flex flex-wrap items-center gap-10">
                             <a href="https://status.helix.com" className="hover:text-blue-500 transition-colors">Regional Health: Operational</a>
                             <a href="#" className="hover:text-blue-500 transition-colors">Privacy Shield</a>
                             <a href="#" className="hover:text-blue-500 transition-colors">Legal Terms</a>
                        </div>
                        <div className="text-gray-800">
                             &copy; 2026 HELIX SYSTEMS. ALL RIGHTS RESERVED.
                        </div>
                    </footer>
                </main>
            </div>

            <Footer />

            {/* CUSTOM STYLES */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #111827;
                    border-radius: 20px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #1F2937;
                }
                
                @media (max-width: 1024px) {
                    main {
                        max-width: 100% !important;
                    }
                }
            `}</style>
        </div>
    )
}

export default Overview

