import React, { useEffect, useState } from 'react';
import { getAuditLogs } from '../../services/allApi';
import { exportToCSV } from "../../utils/exportCSV";

export default function AuditLogs() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAuditData = async () => {
      try {
        const response = await getAuditLogs();
        console.log("AUDIT LOGS RESPONSE:", response);
        setData(response);
      } catch (err) {
        console.log("API ERROR:", err);
      }
    };
    
    fetchAuditData();
  }, []);

  const handleExport = async () => {
    try {
      // fetch all audit logs with limit 1000
      const res = await getAuditLogs({ limit: 1000, page: 1 });
      if (res?.success && res.data.length > 0) {
        const exportData = res.data.map(log => ({
          Action: log.action || "",
          "Target Table": log.target_table || "",
          "Target ID": log.target_id || "",
          "User ID": log.user_id || "",
          "Created At": new Date(log.created_at).toLocaleDateString(),
        }));
        exportToCSV(exportData, "audit_logs");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Audit Logs</h1>
        <button
          onClick={handleExport}
          className="px-4 py-2.5 rounded-xl text-sm font-bold text-white/40 border border-white/[0.07] hover:bg-white/[0.04] hover:text-white transition-all flex items-center gap-2"
        >
          ↓ Export CSV
        </button>
      </div>
      <p>Check console for API flow verification.</p>
    </div>
  );
}
