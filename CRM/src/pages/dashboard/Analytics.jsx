import React, { useEffect, useState } from 'react';
import { getAnalytics } from '../../services/allApi';

export default function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await getAnalytics();
        console.log("ANALYTICS RESPONSE:", response);
        setData(response);
      } catch (err) {
        console.log("API ERROR:", err);
      }
    };
    
    fetchAnalyticsData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>
      <p>Check console for API flow verification.</p>
    </div>
  );
}
