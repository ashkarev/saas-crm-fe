import { useEffect, useState } from "react";
import { getAnalytics } from "../../services/allApi";
import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

const COLORS = ["#2176ff", "#a78bfa", "#4ade80", "#fbbf24", "#f87171", "#60a5fa"];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "10px 14px", fontFamily: "'Sora', sans-serif" }}>
        {label && <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", marginBottom: "4px" }}>{label}</p>}
        {payload.map((p, i) => (
          <p key={i} style={{ fontSize: "13px", fontWeight: 700, color: p.color }}>{p.name}: {p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await getAnalytics();
        if (res?.success) setData(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return (
    <div className="p-8 flex items-center justify-center h-full" style={{ fontFamily: "'Sora', sans-serif" }}>
      <div className="text-white/20 text-sm">Loading analytics...</div>
    </div>
  );

  if (!data) return (
    <div className="p-8 flex items-center justify-center h-full" style={{ fontFamily: "'Sora', sans-serif" }}>
      <div className="text-white/20 text-sm">No analytics data available.</div>
    </div>
  );

  // Format data
  const userGrowth = (data.userGrowth || []).map(d => ({
    date: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    Users: parseInt(d.count),
  }));

  const recordGrowth = (data.recordGrowth || []).map(d => ({
    date: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    Records: parseInt(d.count),
  }));

  const activityBreakdown = (data.activityBreakdown || []).map(d => ({
    name: d.action.replace(/_/g, " "),
    value: parseInt(d.count),
  }));

  // Combine user + record growth for comparison
  const combinedDates = [...new Set([...userGrowth.map(d => d.date), ...recordGrowth.map(d => d.date)])].sort();
  const combinedGrowth = combinedDates.map(date => ({
    date,
    Users: userGrowth.find(d => d.date === date)?.Users || 0,
    Records: recordGrowth.find(d => d.date === date)?.Records || 0,
  }));

  // Summary stats
  const totalUsers = userGrowth.reduce((s, d) => s + d.Users, 0);
  const totalRecords = recordGrowth.reduce((s, d) => s + d.Records, 0);
  const totalActions = activityBreakdown.reduce((s, d) => s + d.value, 0);
  const topAction = activityBreakdown.sort((a, b) => b.value - a.value)[0]?.name || "—";

  return (
    <div className="p-8" style={{ fontFamily: "'Sora', sans-serif" }}>

      {/* HEADER */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
        <h1 className="text-2xl font-black text-white tracking-tight" style={{ letterSpacing: "-0.03em" }}>Analytics</h1>
        <p className="text-sm text-white/30 font-light mt-1">Last 7 days activity overview</p>
      </motion.div>

      {/* STAT CARDS */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "New Users (7d)", value: totalUsers, color: "#2176ff" },
          { label: "New Records (7d)", value: totalRecords, color: "#a78bfa" },
          { label: "Total Actions", value: totalActions, color: "#4ade80" },
          { label: "Top Action", value: topAction, color: "#fbbf24", small: true },
        ].map((stat, i) => (
          <div key={i} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 hover:border-white/[0.12] transition-all">
            <div className="text-[11px] font-bold text-white/25 uppercase tracking-[0.08em] mb-3">{stat.label}</div>
            <div
              className={`font-black tracking-tight leading-none ${stat.small ? "text-lg" : "text-3xl"}`}
              style={{ color: stat.color, letterSpacing: "-0.03em" }}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </motion.div>

      {/* CHARTS ROW 1 */}
      <div className="grid grid-cols-2 gap-6 mb-6">

        {/* USER GROWTH AREA CHART */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}
          className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6"
        >
          <h2 className="text-sm font-black text-white tracking-tight mb-1" style={{ letterSpacing: "-0.01em" }}>User Growth</h2>
          <p className="text-xs text-white/25 font-light mb-5">New users added per day</p>
          {userGrowth.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-white/15 text-sm">No data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={userGrowth}>
                <defs>
                  <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2176ff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2176ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="date" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 11, fontFamily: "'Sora'" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 11, fontFamily: "'Sora'" }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="Users" stroke="#2176ff" strokeWidth={2} fill="url(#userGrad)" dot={{ fill: "#2176ff", r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        {/* RECORD GROWTH AREA CHART */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6"
        >
          <h2 className="text-sm font-black text-white tracking-tight mb-1" style={{ letterSpacing: "-0.01em" }}>Record Growth</h2>
          <p className="text-xs text-white/25 font-light mb-5">New records created per day</p>
          {recordGrowth.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-white/15 text-sm">No data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={recordGrowth}>
                <defs>
                  <linearGradient id="recGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="date" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 11, fontFamily: "'Sora'" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 11, fontFamily: "'Sora'" }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="Records" stroke="#a78bfa" strokeWidth={2} fill="url(#recGrad)" dot={{ fill: "#a78bfa", r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </motion.div>

      </div>

      {/* CHARTS ROW 2 */}
      <div className="grid grid-cols-3 gap-6">

        {/* COMBINED BAR CHART */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}
          className="col-span-2 bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6"
        >
          <h2 className="text-sm font-black text-white tracking-tight mb-1" style={{ letterSpacing: "-0.01em" }}>Users vs Records</h2>
          <p className="text-xs text-white/25 font-light mb-5">Comparison over last 7 days</p>
          {combinedGrowth.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-white/15 text-sm">No data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={combinedGrowth} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="date" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 11, fontFamily: "'Sora'" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 11, fontFamily: "'Sora'" }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: "11px", fontFamily: "'Sora'", color: "rgba(255,255,255,0.3)" }} />
                <Bar dataKey="Users" fill="#2176ff" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Records" fill="#a78bfa" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        {/* ACTIVITY PIE CHART */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6"
        >
          <h2 className="text-sm font-black text-white tracking-tight mb-1" style={{ letterSpacing: "-0.01em" }}>Activity Breakdown</h2>
          <p className="text-xs text-white/25 font-light mb-5">Actions by type</p>
          {activityBreakdown.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-white/15 text-sm">No data yet</div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={activityBreakdown} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                    {activityBreakdown.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-1.5 mt-3">
                {activityBreakdown.slice(0, 4).map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                      <span className="text-[10px] text-white/30 font-light truncate max-w-[100px]">{item.name}</span>
                    </div>
                    <span className="text-[10px] font-bold text-white/40">{item.value}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </motion.div>

      </div>
    </div>
  );
}
