import { useState, useEffect } from "react";
import { getLeads, createLead, updateLead, deleteLead } from "../../../services/leadServices";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const STAGES = ["new", "contacted", "qualified", "proposal", "won", "lost"];

const stageBadge = (stage) => {
  const map = {
    new: "bg-gray-500/15 text-gray-400 border-gray-500/20",
    contacted: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    qualified: "bg-purple-500/15 text-purple-400 border-purple-500/20",
    proposal: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
    won: "bg-green-500/15 text-green-400 border-green-500/20",
    lost: "bg-red-500/15 text-red-400 border-red-500/20",
  };
  return map[stage] || map.new;
};

const emptyForm = { name: "", email: "", phone: "", company: "", source: "", stage: "new", value: "", notes: "", assigned_to: "" };

export default function LeadsList() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editLead, setEditLead] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await getLeads({ search, stage: stageFilter, page, limit: 10 });
      if (res?.success) {
        setLeads(res.data);
        setTotalPages(res.totalPages || 1);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLeads(); }, [search, stageFilter, page]);

  const openCreate = () => { setEditLead(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (lead) => { setEditLead(lead); setForm({ name: lead.name || "", email: lead.email || "", phone: lead.phone || "", company: lead.company || "", source: lead.source || "", stage: lead.stage || "new", value: lead.value || "", notes: lead.notes || "", assigned_to: lead.assigned_to || "" }); setShowModal(true); };

  const handleSubmit = async () => {
    if (!form.name) return;
    setSubmitting(true);
    try {
      if (editLead) {
        await updateLead(editLead.id, form);
      } else {
        await createLead(form);
      }
      setShowModal(false);
      fetchLeads();
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this lead?")) return;
    await deleteLead(id);
    fetchLeads();
  };

  return (
    <div className="p-8" style={{ fontFamily: "'Sora', sans-serif" }}>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight" style={{ letterSpacing: "-0.03em" }}>Leads</h1>
          <p className="text-sm text-white/30 font-light mt-1">Manage your sales pipeline</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/admin-dashboard/leads/kanban")}
            className="px-4 py-2.5 rounded-xl text-sm font-bold text-white/40 border border-white/[0.07] hover:bg-white/[0.04] hover:text-white transition-all"
          >
            ⬚ Kanban
          </button>
          <button onClick={openCreate} className="bg-[#2176ff] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#1a60e0] transition-all shadow-[0_0_20px_rgba(33,118,255,0.25)]">
            + Add Lead
          </button>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex gap-3 mb-6">
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search name, email, company..."
          className="bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#2176ff]/50 w-72 transition-all"
        />
        <select
          value={stageFilter}
          onChange={(e) => { setStageFilter(e.target.value); setPage(1); }}
          className="bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white/50 outline-none focus:border-[#2176ff]/50 transition-all"
        >
          <option value="" className="bg-slate-900 text-white">All Stages</option>
          {STAGES.map(s => <option key={s} value={s} className="bg-slate-900 text-white">{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {["Name", "Email", "Company", "Stage", "Value", "Created", "Actions"].map(h => (
                <th key={h} className="text-left px-5 py-3.5 text-[11px] font-bold text-white/25 uppercase tracking-[0.08em]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="text-center py-12 text-white/20 text-sm">Loading...</td></tr>
            ) : leads.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-12 text-white/20 text-sm">No leads found</td></tr>
            ) : leads.map((lead) => (
              <tr key={lead.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-4">
                  <button onClick={() => navigate(`/admin-dashboard/leads/${lead.id}`)} className="text-sm font-semibold text-white hover:text-[#2176ff] transition-colors text-left">
                    {lead.name}
                  </button>
                </td>
                <td className="px-5 py-4 text-sm text-white/40 font-light">{lead.email || "—"}</td>
                <td className="px-5 py-4 text-sm text-white/40 font-light">{lead.company || "—"}</td>
                <td className="px-5 py-4">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${stageBadge(lead.stage)}`}>
                    {lead.stage}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-white/40 font-light">{lead.value ? `$${Number(lead.value).toLocaleString()}` : "—"}</td>
                <td className="px-5 py-4 text-sm text-white/30 font-light">{new Date(lead.created_at).toLocaleDateString()}</td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(lead)} className="text-[11px] font-bold text-white/40 hover:text-[#2176ff] transition-colors px-2.5 py-1 rounded-lg hover:bg-[#2176ff]/10 border border-transparent hover:border-[#2176ff]/20">Edit</button>
                    <button onClick={() => handleDelete(lead.id)} className="text-[11px] font-bold text-white/40 hover:text-red-400 transition-colors px-2.5 py-1 rounded-lg hover:bg-red-500/10 border border-transparent hover:border-red-500/20">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-5">
          <p className="text-xs text-white/20">Page {page} of {totalPages}</p>
          <div className="flex gap-2">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-4 py-2 rounded-xl text-xs font-bold text-white/40 border border-white/[0.07] hover:bg-white/[0.04] disabled:opacity-30 transition-all">Prev</button>
            <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="px-4 py-2 rounded-xl text-xs font-bold text-white/40 border border-white/[0.07] hover:bg-white/[0.04] disabled:opacity-30 transition-all">Next</button>
          </div>
        </div>
      )}

      {/* MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-[#0d1117] border border-white/[0.08] rounded-2xl p-7 w-full max-w-lg relative" style={{ fontFamily: "'Sora', sans-serif" }}>
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors text-lg">✕</button>
              <h2 className="text-lg font-black text-white tracking-tight mb-6">{editLead ? "Edit Lead" : "Add Lead"}</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: "name", placeholder: "Name *", type: "text", full: true },
                  { key: "email", placeholder: "Email", type: "email" },
                  { key: "phone", placeholder: "Phone", type: "text" },
                  { key: "company", placeholder: "Company", type: "text" },
                  { key: "source", placeholder: "Source", type: "text" },
                  { key: "value", placeholder: "Value ($)", type: "number" },
                ].map(f => (
                  <input
                    key={f.key}
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    className={`bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#2176ff]/50 transition-all ${f.full ? "col-span-2" : ""}`}
                  />
                ))}
                <select value={form.stage} onChange={e => setForm({ ...form, stage: e.target.value })} className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white/60 outline-none focus:border-[#2176ff]/50 col-span-2">
                  {STAGES.map(s => <option key={s} value={s} className="bg-slate-900 text-white">{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
                <textarea placeholder="Notes" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#2176ff]/50 col-span-2 resize-none h-20" />
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white/40 border border-white/[0.08] hover:bg-white/[0.04] transition-all">Cancel</button>
                <button onClick={handleSubmit} disabled={submitting || !form.name} className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-[#2176ff] text-white hover:bg-[#1a60e0] transition-all disabled:opacity-50 shadow-[0_0_16px_rgba(33,118,255,0.25)]">
                  {submitting ? "Saving..." : editLead ? "Update" : "Create"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
