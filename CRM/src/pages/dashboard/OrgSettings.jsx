import { useState, useEffect } from "react";
import { getDashboard } from "../../services/orgServices";
import { motion } from "framer-motion";

export default function OrgSettings() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getDashboard();
      if (res?.success) setData(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const usagePercent = data?.usage?.userUsagePercent || 0;
  const usageColor = usagePercent >= 90 ? "#f87171" : usagePercent >= 70 ? "#fbbf24" : "#2176ff";

  if (loading) return (
    <div className="p-8 flex items-center justify-center h-full" style={{ fontFamily: "'Sora', sans-serif" }}>
      <div className="text-white/20 text-sm">Loading organization...</div>
    </div>
  );

  if (!data) return (
    <div className="p-8 flex items-center justify-center h-full" style={{ fontFamily: "'Sora', sans-serif" }}>
      <div className="text-white/20 text-sm">Failed to load organization data.</div>
    </div>
  );

  return (
    <div className="p-8" style={{ fontFamily: "'Sora', sans-serif" }}>

      {/* HEADER */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
        <h1 className="text-2xl font-black text-white tracking-tight" style={{ letterSpacing: "-0.03em" }}>
          Organization
        </h1>
        <p className="text-sm text-white/30 font-light mt-1">Your organization details and plan usage</p>
      </motion.div>

      {/* STATS GRID */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Users", value: data.totalUsers, sub: `${data.activeUsers} active`, color: "#2176ff" },
          { label: "Total Records", value: data.totalRecords, sub: "All time", color: "#a78bfa" },
          { label: "Current Plan", value: data.plan?.name, sub: `Max ${data.plan?.maxUsers} users`, color: "#fbbf24" },
          { label: "Usage", value: `${usagePercent}%`, sub: `${data.totalUsers} / ${data.plan?.maxUsers} users`, color: usageColor },
        ].map((stat, i) => (
          <div key={i} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 hover:border-white/[0.12] transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-white/25 uppercase tracking-[0.08em]">{stat.label}</span>
            </div>
            <div className="text-3xl font-black tracking-tight leading-none mb-1.5" style={{ color: stat.color, letterSpacing: "-0.03em" }}>
              {stat.value}
            </div>
            <div className="text-[11px] text-white/25 font-light">{stat.sub}</div>
          </div>
        ))}
      </motion.div>

      {/* PLAN EXPIRY BANNER */}
      {data.plan?.expiry && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-6 flex items-center justify-between px-5 py-4 rounded-2xl border"
          style={{
            background: new Date(data.plan.expiry) < new Date() ? "rgba(248,113,113,0.06)" : "rgba(33,118,255,0.06)",
            borderColor: new Date(data.plan.expiry) < new Date() ? "rgba(248,113,113,0.2)" : "rgba(33,118,255,0.2)",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full" style={{ background: new Date(data.plan.expiry) < new Date() ? "#f87171" : "#2176ff", boxShadow: `0 0 6px ${new Date(data.plan.expiry) < new Date() ? "#f87171" : "#2176ff"}` }} />
            <span className="text-sm font-semibold" style={{ color: new Date(data.plan.expiry) < new Date() ? "#f87171" : "#60a5fa" }}>
              {new Date(data.plan.expiry) < new Date() ? "Plan expired" : `Plan expires: ${new Date(data.plan.expiry).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`}
            </span>
          </div>
          <button className="text-xs font-bold text-[#2176ff] bg-[#2176ff]/10 border border-[#2176ff]/20 px-4 py-1.5 rounded-lg hover:bg-[#2176ff]/20 transition-all">
            Upgrade Plan →
          </button>
        </motion.div>
      )}

      <div className="grid grid-cols-2 gap-6">

        {/* PLAN DETAILS */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6"
        >
          <h2 className="text-sm font-black text-white tracking-tight mb-5" style={{ letterSpacing: "-0.01em" }}>
            Plan Details
          </h2>
          <div className="flex flex-col gap-4">
            {[
              { label: "Plan Name", value: data.plan?.name },
              { label: "Max Users", value: data.plan?.maxUsers },
              { label: "Current Users", value: data.totalUsers },
              { label: "Available Slots", value: (data.plan?.maxUsers || 0) - (data.totalUsers || 0) },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-b-0">
                <span className="text-xs font-bold text-white/25 uppercase tracking-[0.06em]">{label}</span>
                <span className="text-sm font-semibold text-white/70">{value ?? "—"}</span>
              </div>
            ))}

            {/* USAGE BAR */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white/25 uppercase tracking-[0.06em]">Usage</span>
                <span className="text-xs font-black" style={{ color: usageColor }}>{usagePercent}%</span>
              </div>
              <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${usagePercent}%` }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: usageColor, boxShadow: `0 0 8px ${usageColor}` }}
                />
              </div>
              {usagePercent >= 80 && (
                <p className="text-[11px] mt-2 font-light" style={{ color: usageColor }}>
                  {usagePercent >= 90 ? "⚠ Critical — upgrade your plan immediately" : "⚠ Approaching limit — consider upgrading"}
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* RECENT ACTIVITY */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}
          className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6"
        >
          <h2 className="text-sm font-black text-white tracking-tight mb-5" style={{ letterSpacing: "-0.01em" }}>
            Recent Activity
          </h2>
          <div className="flex flex-col gap-0">
            {data.recentActivity?.length === 0 ? (
              <p className="text-sm text-white/20 font-light py-4 text-center">No recent activity</p>
            ) : data.recentActivity?.map((log, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-[#2176ff]/10 border border-[#2176ff]/15 flex items-center justify-center text-[9px] font-black text-[#60a5fa] flex-shrink-0">
                    {log.action[0]}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white/60">{log.action.replace(/_/g, " ")}</p>
                    <p className="text-[10px] text-white/20 font-light capitalize">{log.target_table}</p>
                  </div>
                </div>
                <span className="text-[10px] text-white/20 font-light flex-shrink-0">
                  {new Date(log.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* UPGRADE SECTION */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-6 relative overflow-hidden rounded-2xl p-6 border border-[#2176ff]/20"
        style={{ background: "linear-gradient(135deg, rgba(33,118,255,0.08) 0%, rgba(33,118,255,0.03) 100%)" }}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2176ff] to-transparent opacity-50" />
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-white tracking-tight mb-1" style={{ letterSpacing: "-0.02em" }}>
              Need more capacity?
            </h3>
            <p className="text-sm text-white/30 font-light">
              Upgrade your plan to add more users and unlock advanced features.
            </p>
          </div>
          <button className="flex-shrink-0 bg-[#2176ff] text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-[#1a60e0] transition-all shadow-[0_0_20px_rgba(33,118,255,0.3)] hover:shadow-[0_0_30px_rgba(33,118,255,0.45)] ml-6">
            Upgrade Plan →
          </button>
        </div>
      </motion.div>

    </div>
  );
}
