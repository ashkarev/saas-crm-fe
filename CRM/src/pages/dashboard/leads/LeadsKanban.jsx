import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getLeads, updateLead } from "../../../services/leadServices";

const STAGES = [
  { key: "new", label: "New", color: "#94a3b8", bg: "rgba(148,163,184,0.08)", border: "rgba(148,163,184,0.15)" },
  { key: "contacted", label: "Contacted", color: "#60a5fa", bg: "rgba(96,165,250,0.08)", border: "rgba(96,165,250,0.15)" },
  { key: "qualified", label: "Qualified", color: "#a78bfa", bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.15)" },
  { key: "proposal", label: "Proposal", color: "#fbbf24", bg: "rgba(251,191,36,0.08)", border: "rgba(251,191,36,0.15)" },
  { key: "won", label: "Won", color: "#4ade80", bg: "rgba(74,222,128,0.08)", border: "rgba(74,222,128,0.15)" },
  { key: "lost", label: "Lost", color: "#f87171", bg: "rgba(248,113,113,0.08)", border: "rgba(248,113,113,0.15)" },
];

export default function LeadsKanban() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dragging, setDragging] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const dragItem = useRef(null);

  const fetchAllLeads = async () => {
    setLoading(true);
    try {
      const res = await getLeads({ limit: 100, page: 1 });
      if (res?.success) setLeads(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAllLeads(); }, []);

  const getLeadsByStage = (stage) => leads.filter(l => l.stage === stage);

  const handleDragStart = (e, lead) => {
    dragItem.current = lead;
    setDragging(lead.id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, stage) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOver(stage);
  };

  const handleDrop = async (e, stage) => {
    e.preventDefault();
    const lead = dragItem.current;
    if (!lead || lead.stage === stage) {
      setDragging(null);
      setDragOver(null);
      return;
    }
    // optimistic update
    setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, stage } : l));
    setDragging(null);
    setDragOver(null);
    dragItem.current = null;
    try {
      await updateLead(lead.id, { stage });
    } catch {
      // revert on failure
      fetchAllLeads();
    }
  };

  const handleDragEnd = () => {
    setDragging(null);
    setDragOver(null);
    dragItem.current = null;
  };

  const totalValue = (stage) => {
    const stageLeads = getLeadsByStage(stage);
    const total = stageLeads.reduce((sum, l) => sum + (Number(l.value) || 0), 0);
    return total > 0 ? `$${total.toLocaleString()}` : null;
  };

  return (
    <div className="h-full flex flex-col" style={{ fontFamily: "'Sora', sans-serif" }}>

      {/* HEADER */}
      <div className="flex items-center justify-between px-8 pt-8 pb-6 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight" style={{ letterSpacing: "-0.03em" }}>Pipeline</h1>
          <p className="text-sm text-white/30 font-light mt-1">{leads.length} leads across {STAGES.length} stages</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/admin-dashboard/leads")}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white/40 border border-white/[0.07] hover:bg-white/[0.04] hover:text-white transition-all"
          >
            ☰ List View
          </button>
          <button
            onClick={() => navigate("/admin-dashboard/leads")}
            className="bg-[#2176ff] text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#1a60e0] transition-all shadow-[0_0_16px_rgba(33,118,255,0.25)]"
          >
            + Add Lead
          </button>
        </div>
      </div>

      {/* BOARD */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center text-white/20 text-sm">Loading pipeline...</div>
      ) : (
        <div className="flex-1 overflow-x-auto px-8 pb-8">
          <div className="flex gap-4 h-full min-w-max">
            {STAGES.map((stage) => {
              const stageLeads = getLeadsByStage(stage.key);
              const isOver = dragOver === stage.key;

              return (
                <div
                  key={stage.key}
                  className="flex flex-col w-[260px] flex-shrink-0 rounded-2xl transition-all duration-200"
                  style={{
                    background: isOver ? stage.bg : "rgba(255,255,255,0.02)",
                    border: `1px solid ${isOver ? stage.border : "rgba(255,255,255,0.06)"}`,
                  }}
                  onDragOver={(e) => handleDragOver(e, stage.key)}
                  onDrop={(e) => handleDrop(e, stage.key)}
                  onDragLeave={() => setDragOver(null)}
                >
                  {/* COLUMN HEADER */}
                  <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/[0.05] flex-shrink-0">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full" style={{ background: stage.color, boxShadow: `0 0 6px ${stage.color}` }} />
                      <span className="text-xs font-bold text-white/70">{stage.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {totalValue(stage.key) && (
                        <span className="text-[10px] font-bold text-white/25">{totalValue(stage.key)}</span>
                      )}
                      <span
                        className="text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: stage.bg, color: stage.color }}
                      >
                        {stageLeads.length}
                      </span>
                    </div>
                  </div>

                  {/* CARDS */}
                  <div className="flex flex-col gap-2.5 p-3 overflow-y-auto flex-1">
                    {stageLeads.length === 0 && !isOver && (
                      <div className="flex flex-col items-center justify-center py-8 text-white/10 text-xs font-light">
                        <div className="text-2xl mb-2 opacity-30">○</div>
                        Drop here
                      </div>
                    )}

                    {stageLeads.map((lead) => (
                      <div
                        key={lead.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, lead)}
                        onDragEnd={handleDragEnd}
                        onClick={() => navigate(`/admin-dashboard/leads/${lead.id}`)}
                        className="rounded-xl p-3.5 cursor-grab active:cursor-grabbing transition-all duration-200 group"
                        style={{
                          background: dragging === lead.id ? "rgba(33,118,255,0.1)" : "rgba(255,255,255,0.03)",
                          border: `1px solid ${dragging === lead.id ? "rgba(33,118,255,0.3)" : "rgba(255,255,255,0.07)"}`,
                          opacity: dragging === lead.id ? 0.5 : 1,
                          transform: dragging === lead.id ? "scale(0.97)" : "scale(1)",
                        }}
                      >
                        {/* CARD HEADER */}
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-sm font-bold text-white group-hover:text-[#60a5fa] transition-colors leading-tight">
                            {lead.name}
                          </p>
                          {lead.value > 0 && (
                            <span className="text-[10px] font-black text-white/30 ml-2 flex-shrink-0 mt-0.5">
                              ${Number(lead.value).toLocaleString()}
                            </span>
                          )}
                        </div>

                        {/* COMPANY */}
                        {lead.company && (
                          <p className="text-[11px] text-white/30 font-light mb-2.5 truncate">{lead.company}</p>
                        )}

                        {/* FOOTER */}
                        <div className="flex items-center justify-between">
                          {lead.email && (
                            <p className="text-[10px] text-white/20 font-light truncate max-w-[140px]">{lead.email}</p>
                          )}
                          <p className="text-[10px] text-white/15 font-light ml-auto">
                            {new Date(lead.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </p>
                        </div>

                        {/* ASSIGNED */}
                        {lead.assigned_to_name && (
                          <div className="mt-2.5 pt-2.5 border-t border-white/[0.05] flex items-center gap-1.5">
                            <div className="w-4 h-4 rounded-full bg-[#2176ff]/20 border border-[#2176ff]/20 flex items-center justify-center text-[8px] font-black text-[#60a5fa]">
                              {lead.assigned_to_name[0].toUpperCase()}
                            </div>
                            <span className="text-[10px] text-white/20 font-light">{lead.assigned_to_name}</span>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* DROP INDICATOR */}
                    {isOver && dragging && (
                      <div
                        className="rounded-xl p-3.5 border-2 border-dashed flex items-center justify-center text-xs font-bold"
                        style={{ borderColor: stage.color, color: stage.color, background: stage.bg, minHeight: "60px" }}
                      >
                        Drop here
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
