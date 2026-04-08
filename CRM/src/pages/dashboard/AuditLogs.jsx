import React, { useEffect, useState } from 'react';
import { getAuditLogs } from '../../services/allApi';

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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Audit Logs</h1>
      <p>Check console for API flow verification.</p>
    </div>
  );
}
