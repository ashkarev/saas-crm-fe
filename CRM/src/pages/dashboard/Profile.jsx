import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axiosConfig from "../../services/axiosConfig";
import { ENDPOINTS } from "../../services/apiEndpoints";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function Profile() {
  const { user, fetchUser } = useAuth();
  const [nameForm, setNameForm] = useState({ name: "", email: "" });
  const [passForm, setPassForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (user) {
      setNameForm({ name: user.name || "", email: user.email || "" });
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!nameForm.name && !nameForm.email) return;
    setSavingProfile(true);
    try {
      const res = await axiosConfig("PUT", ENDPOINTS.UPDATE_ME, nameForm);
      if (res?.success) {
        toast.success("Profile updated");
        await fetchUser();
      } else {
        toast.error(res?.message || "Failed to update");
      }
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    if (!passForm.currentPassword || !passForm.newPassword || !passForm.confirmPassword) {
      toast.error("All fields required");
      return;
    }
    if (passForm.newPassword !== passForm.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (passForm.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setSavingPassword(true);
    try {
      const res = await axiosConfig("PUT", ENDPOINTS.CHANGE_PASSWORD, {
        currentPassword: passForm.currentPassword,
        newPassword: passForm.newPassword,
      });
      if (res?.success) {
        toast.success("Password changed successfully");
        setPassForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        toast.error(res?.message || "Failed to change password");
      }
    } finally {
      setSavingPassword(false);
    }
  };

  const EyeIcon = ({ show }) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {show ? (
        <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
      ) : (
        <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
      )}
    </svg>
  );

  return (
    <div className="p-8" style={{ fontFamily: "'Sora', sans-serif" }}>

      {/* HEADER */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
        <h1 className="text-2xl font-black text-white tracking-tight" style={{ letterSpacing: "-0.03em" }}>Profile</h1>
        <p className="text-sm text-white/30 font-light mt-1">Manage your personal account settings</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-6">

        {/* LEFT — PROFILE INFO */}
        <div className="flex flex-col gap-6">

          {/* AVATAR CARD */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#2176ff]/15 border border-[#2176ff]/20 flex items-center justify-center text-2xl font-black text-[#2176ff] flex-shrink-0">
                {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "?"}
              </div>
              <div>
                <h2 className="text-base font-black text-white tracking-tight">{user?.name || "—"}</h2>
                <p className="text-sm text-white/30 font-light mt-0.5">{user?.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] font-bold text-[#60a5fa] bg-[#2176ff]/10 border border-[#2176ff]/20 px-2.5 py-0.5 rounded-full">
                    {user?.role || "Member"}
                  </span>
                  {user?.is_super_admin && (
                    <span className="text-[10px] font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-2.5 py-0.5 rounded-full">
                      Super Admin
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* EDIT PROFILE */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}
            className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6"
          >
            <h3 className="text-sm font-black text-white tracking-tight mb-5" style={{ letterSpacing: "-0.01em" }}>
              Edit Profile
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-white/25 uppercase tracking-[0.08em]">Full Name</label>
                <input
                  value={nameForm.name}
                  onChange={e => setNameForm({ ...nameForm, name: e.target.value })}
                  placeholder="Your name"
                  className="bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#2176ff]/50 focus:bg-[#2176ff]/[0.03] transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-white/25 uppercase tracking-[0.08em]">Email Address</label>
                <input
                  value={nameForm.email}
                  onChange={e => setNameForm({ ...nameForm, email: e.target.value })}
                  placeholder="your@email.com"
                  type="email"
                  className="bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#2176ff]/50 focus:bg-[#2176ff]/[0.03] transition-all"
                />
              </div>
              <button
                onClick={handleUpdateProfile}
                disabled={savingProfile}
                className="w-full py-2.5 rounded-xl text-sm font-bold bg-[#2176ff] text-white hover:bg-[#1a60e0] transition-all disabled:opacity-50 shadow-[0_0_16px_rgba(33,118,255,0.2)] mt-1"
              >
                {savingProfile ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </motion.div>

        </div>

        {/* RIGHT — CHANGE PASSWORD + ACCOUNT INFO */}
        <div className="flex flex-col gap-6">

          {/* CHANGE PASSWORD */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6"
          >
            <h3 className="text-sm font-black text-white tracking-tight mb-5" style={{ letterSpacing: "-0.01em" }}>
              Change Password
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { key: "currentPassword", label: "Current Password", show: showCurrent, toggle: () => setShowCurrent(!showCurrent) },
                { key: "newPassword", label: "New Password", show: showNew, toggle: () => setShowNew(!showNew) },
                { key: "confirmPassword", label: "Confirm New Password", show: showConfirm, toggle: () => setShowConfirm(!showConfirm) },
              ].map(({ key, label, show, toggle }) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-white/25 uppercase tracking-[0.08em]">{label}</label>
                  <div className="relative">
                    <input
                      type={show ? "text" : "password"}
                      value={passForm[key]}
                      onChange={e => setPassForm({ ...passForm, [key]: e.target.value })}
                      placeholder="••••••••"
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-2.5 pr-10 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#2176ff]/50 focus:bg-[#2176ff]/[0.03] transition-all"
                    />
                    <button type="button" onClick={toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-[#2176ff] transition-colors">
                      <EyeIcon show={show} />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={handleChangePassword}
                disabled={savingPassword}
                className="w-full py-2.5 rounded-xl text-sm font-bold bg-white/[0.04] text-white/60 border border-white/[0.08] hover:bg-white/[0.07] hover:text-white transition-all disabled:opacity-50 mt-1"
              >
                {savingPassword ? "Changing..." : "Change Password"}
              </button>
            </div>
          </motion.div>

          {/* ACCOUNT INFO */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}
            className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6"
          >
            <h3 className="text-sm font-black text-white tracking-tight mb-5" style={{ letterSpacing: "-0.01em" }}>
              Account Info
            </h3>
            <div className="flex flex-col gap-0">
              {[
                { label: "User ID", value: `#${user?.id}` },
                { label: "Role", value: user?.role || "Member" },
                { label: "Organization ID", value: `#${user?.organization_id}` },
                { label: "Account Status", value: "Active" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-b-0">
                  <span className="text-xs font-bold text-white/25 uppercase tracking-[0.06em]">{label}</span>
                  <span className="text-sm font-semibold text-white/60">{value ?? "—"}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
