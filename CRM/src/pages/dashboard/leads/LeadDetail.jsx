import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleLead, updateLead, createContact, deleteContact, createDeal, deleteDeal, createActivity, markActivityDone, deleteActivity } from "../../../services/leadServices";
import { motion, AnimatePresence } from "framer-motion";

const STAGES = ["new", "contacted", "qualified", "proposal", "won", "lost"];
const ACTIVITY_TYPES = ["call", "email", "meeting", "note", "task"];

const stageBadge = (stage) => {
  const map = { new: "bg-gray-500/15 text-gray-400", contacted: "bg-blue-500/15 text-blue-400", qualified: "bg-purple-500/15 text-purple-400", proposal: "bg-yellow-500/15 text-yellow-400", won: "bg-green-500/15 text-green-400", lost: "bg-red-500/15 text-red-400" };
  return map[stage] || map.new;
};

export default function LeadDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showContactModal, setShowContactModal] = useState(false);
  const [showDealModal, setShowDealModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", role: "", company: "" });
  const [dealForm, setDealForm] = useState({ title: "", value: "", stage: "new", close_date: "", notes: "" });
  const [activityForm, setActivityForm] = useState({ type: "call", description: "", scheduled_at: "" });

  const fetchLead = async () => {
    setLoading(true);
    try {
      const res = await getSingleLead(id);
      if (res?.success) setLead(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLead(); }, [id]);

  const handleStageChange = async (stage) => {
    await updateLead(id, { stage });
    fetchLead();
  };

  const handleAddContact = async () => {
    if (!contactForm.name) return;
    await createContact({ ...contactForm, lead_id: id });
    setShowContactModal(false);
    setContactForm({ name: "", email: "", phone: "", role: "", company: "" });
    fetchLead();
  };

  const handleAddDeal = async () => {
    if (!dealForm.title) return;
    await createDeal({ ...dealForm, lead_id: id });
    setShowDealModal(false);
    setDealForm({ title: "", value: "", stage: "new", close_date: "", notes: "" });
    fetchLead();
  };

  const handleAddActivity = async () => {
    if (!activityForm.type) return;
    await createActivity({ ...activityForm, lead_id: id });
    setShowActivityModal(false);
    setActivityForm({ type: "call", description: "", scheduled_at: "" });
    fetchLead();
  };

  if (loading) return <div className="p-8 text-white/30 text-sm">Loading...</div>;
  if (!lead) return <div className="p-8 text-white/30 text-sm">Lead not found</div>;

  return (
    <div className="p-8" style={{ fontFamily: "'Sora', sans-serif" }}>
      {/* HEADER */}
      <button onClick={() => navigate("/admin-dashboard/leads")} className="text-xs text-white/30 hover:text-white mb-6 flex items-center gap-2 transition-colors">
        ← Back to Leads
      </button>

      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-black text-white tracking-tight" style={{ letterSpacing: "-0.03em" }}>{lead.name}</h1>
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${stageBadge(lead.stage)}`}>{lead.stage}</span>
          </div>
          <p className="text-sm text-white/30 font-light">{lead.company || "No company"} {lead.email ? `· ${lead.email}` : ""}</p>
        </div>
        <select value={lead.stage} onChange={e => handleStageChange(e.target.value)} className="bg-[#2176ff]/10 border border-[#2176ff]/25 text-[#60a5fa] rounded-xl px-4 py-2 text-sm font-bold outline-none">
          {STAGES.map(s => <option key={s} value={s} className="bg-slate-900 text-white">{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      {/* TABS */}
      <div className="flex gap-1 mb-6 bg-white/[0.03] border border-white/[0.06] rounded-xl p-1 w-fit">
        {["overview", "contacts", "deals", "activities"].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all capitalize ${activeTab === tab ? "bg-[#2176ff] text-white shadow-[0_0_12px_rgba(33,118,255,0.3)]" : "text-white/30 hover:text-white"}`}>
            {tab}
            {tab === "contacts" && lead.contacts?.length > 0 && <span className="ml-1.5 text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full">{lead.contacts.length}</span>}
            {tab === "deals" && lead.deals?.length > 0 && <span className="ml-1.5 text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full">{lead.deals.length}</span>}
            {tab === "activities" && lead.activities?.length > 0 && <span className="ml-1.5 text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full">{lead.activities.length}</span>}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Email", value: lead.email },
            { label: "Phone", value: lead.phone },
            { label: "Company", value: lead.company },
            { label: "Source", value: lead.source },
            { label: "Value", value: lead.value ? `$${Number(lead.value).toLocaleString()}` : null },
            { label: "Assigned To", value: lead.assigned_to_name },
            { label: "Created", value: new Date(lead.created_at).toLocaleDateString() },
            { label: "Updated", value: new Date(lead.updated_at).toLocaleDateString() },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
              <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.08em] mb-1.5">{label}</div>
              <div className="text-sm font-semibold text-white/70">{value || "—"}</div>
            </div>
          ))}
          {lead.notes && (
            <div className="col-span-2 bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
              <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.08em] mb-1.5">Notes</div>
              <div className="text-sm text-white/50 font-light leading-relaxed">{lead.notes}</div>
            </div>
          )}
        </div>
      )}

      {/* CONTACTS TAB */}
      {activeTab === "contacts" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-white/30">{lead.contacts?.length || 0} contacts</p>
            <button onClick={() => setShowContactModal(true)} className="bg-[#2176ff] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#1a60e0] transition-all">+ Add Contact</button>
          </div>
          <div className="flex flex-col gap-3">
            {lead.contacts?.length === 0 ? <p className="text-sm text-white/20 py-8 text-center">No contacts yet</p> :
              lead.contacts?.map(c => (
                <div key={c.id} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-white">{c.name}</p>
                    <p className="text-xs text-white/30 mt-0.5">{c.role && `${c.role} · `}{c.email || c.phone || "—"}</p>
                  </div>
                  <button onClick={async () => { if (window.confirm("Delete?")) { await deleteContact(c.id); fetchLead(); } }} className="text-xs text-white/20 hover:text-red-400 transition-colors">Delete</button>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* DEALS TAB */}
      {activeTab === "deals" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-white/30">{lead.deals?.length || 0} deals</p>
            <button onClick={() => setShowDealModal(true)} className="bg-[#2176ff] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#1a60e0] transition-all">+ Add Deal</button>
          </div>
          <div className="flex flex-col gap-3">
            {lead.deals?.length === 0 ? <p className="text-sm text-white/20 py-8 text-center">No deals yet</p> :
              lead.deals?.map(d => (
                <div key={d.id} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-white">{d.title}</p>
                    <p className="text-xs text-white/30 mt-0.5">{d.value ? `$${Number(d.value).toLocaleString()}` : "No value"} · <span className={`${stageBadge(d.stage)} px-1.5 py-0.5 rounded-full text-[10px]`}>{d.stage}</span></p>
                  </div>
                  <button onClick={async () => { if (window.confirm("Delete?")) { await deleteDeal(d.id); fetchLead(); } }} className="text-xs text-white/20 hover:text-red-400 transition-colors">Delete</button>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ACTIVITIES TAB */}
      {activeTab === "activities" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-white/30">{lead.activities?.length || 0} activities</p>
            <button onClick={() => setShowActivityModal(true)} className="bg-[#2176ff] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#1a60e0] transition-all">+ Log Activity</button>
          </div>
          <div className="flex flex-col gap-3">
            {lead.activities?.length === 0 ? <p className="text-sm text-white/20 py-8 text-center">No activities yet</p> :
              lead.activities?.map(a => (
                <div key={a.id} className={`bg-white/[0.02] border rounded-xl p-4 flex items-start justify-between transition-all ${a.done ? "border-green-500/15 opacity-60" : "border-white/[0.06]"}`}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#2176ff]/10 border border-[#2176ff]/15 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      {a.type === "call" ? "📞" : a.type === "email" ? "✉️" : a.type === "meeting" ? "🤝" : a.type === "note" ? "📝" : "✅"}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white capitalize">{a.type}</p>
                      <p className="text-xs text-white/40 font-light mt-0.5">{a.description || "—"}</p>
                      <p className="text-[10px] text-white/20 mt-1">{new Date(a.created_at).toLocaleDateString()} · {a.user_name || "Unknown"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={async () => { await markActivityDone(a.id); fetchLead(); }} className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all ${a.done ? "text-green-400 border-green-500/20 bg-green-500/10" : "text-white/20 border-white/[0.06] hover:text-green-400 hover:border-green-500/20"}`}>
                      {a.done ? "Done" : "Mark done"}
                    </button>
                    <button onClick={async () => { if (window.confirm("Delete?")) { await deleteActivity(a.id); fetchLead(); } }} className="text-[10px] text-white/20 hover:text-red-400 transition-colors">Del</button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* CONTACT MODAL */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-[#0d1117] border border-white/[0.08] rounded-2xl p-7 w-full max-w-md">
              <h2 className="text-lg font-black text-white mb-5">Add Contact</h2>
              <div className="flex flex-col gap-3">
                {[["name","Name *"],["email","Email"],["phone","Phone"],["role","Role"],["company","Company"]].map(([k,p]) => (
                  <input key={k} placeholder={p} value={contactForm[k]} onChange={e => setContactForm({...contactForm,[k]:e.target.value})} className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#2176ff]/50" />
                ))}
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setShowContactModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white/40 border border-white/[0.08]">Cancel</button>
                <button onClick={handleAddContact} className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-[#2176ff] text-white hover:bg-[#1a60e0]">Add</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DEAL MODAL */}
      <AnimatePresence>
        {showDealModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-[#0d1117] border border-white/[0.08] rounded-2xl p-7 w-full max-w-md">
              <h2 className="text-lg font-black text-white mb-5">Add Deal</h2>
              <div className="flex flex-col gap-3">
                <input placeholder="Title *" value={dealForm.title} onChange={e => setDealForm({...dealForm,title:e.target.value})} className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#2176ff]/50" />
                <input placeholder="Value ($)" type="number" value={dealForm.value} onChange={e => setDealForm({...dealForm,value:e.target.value})} className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#2176ff]/50" />
                <select value={dealForm.stage} onChange={e => setDealForm({...dealForm,stage:e.target.value})} className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white/60 outline-none">
                  {STAGES.map(s => <option key={s} value={s} className="bg-slate-900 text-white">{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                </select>
                <input type="date" value={dealForm.close_date} onChange={e => setDealForm({...dealForm,close_date:e.target.value})} className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#2176ff]/50" />
                <textarea placeholder="Notes" value={dealForm.notes} onChange={e => setDealForm({...dealForm,notes:e.target.value})} className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none resize-none h-20" />
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setShowDealModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white/40 border border-white/[0.08]">Cancel</button>
                <button onClick={handleAddDeal} className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-[#2176ff] text-white hover:bg-[#1a60e0]">Add</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ACTIVITY MODAL */}
      <AnimatePresence>
        {showActivityModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-[#0d1117] border border-white/[0.08] rounded-2xl p-7 w-full max-w-md">
              <h2 className="text-lg font-black text-white mb-5">Log Activity</h2>
              <div className="flex flex-col gap-3">
                <select value={activityForm.type} onChange={e => setActivityForm({...activityForm,type:e.target.value})} className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white/60 outline-none">
                  {ACTIVITY_TYPES.map(t => <option key={t} value={t} className="bg-slate-900 text-white">{t.charAt(0).toUpperCase()+t.slice(1)}</option>)}
                </select>
                <textarea placeholder="Description" value={activityForm.description} onChange={e => setActivityForm({...activityForm,description:e.target.value})} className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none resize-none h-24" />
                <input type="datetime-local" value={activityForm.scheduled_at} onChange={e => setActivityForm({...activityForm,scheduled_at:e.target.value})} className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#2176ff]/50" />
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setShowActivityModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white/40 border border-white/[0.08]">Cancel</button>
                <button onClick={handleAddActivity} className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-[#2176ff] text-white hover:bg-[#1a60e0]">Add</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
