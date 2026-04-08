import React, { useState, useEffect } from 'react';
import { Users, FileText, TrendingUp, Zap } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getDashboard } from '../../services/allApi';
import { toast } from 'react-toastify';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await getDashboard();
      console.log("DASHBOARD RESPONSE:", response);
      // Corrected: Backend returns dashboard stats inside 'data'
      setDashboardData(response.data || null);
    } catch (err) {
      console.log("API ERROR:", err);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-gray-200 dark:bg-slate-800 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }

  // Accessing nested fields correctly from backend 'data' object
  const totalUsers = dashboardData?.totalUsers || 0;
  const activeUsers = dashboardData?.activeUsers || 0;
  const totalRecords = dashboardData?.totalRecords || 0;
  const planName = dashboardData?.plan?.name || 'N/A';
  const planMaxUsers = dashboardData?.plan?.maxUsers || 0;
  const usagePercent = dashboardData?.usage?.userUsagePercent || 0;
  const planExpiry = dashboardData?.plan?.expiry;
  const recentActivity = dashboardData?.recentActivity || [];

  return (
    <div className="space-y-6">
      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-gray-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</span>
            <Users size={20} className="text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {totalUsers}
          </p>
          <p className="text-xs text-green-500 mt-2">
            {activeUsers} active
          </p>
        </div>

        {/* Total Records */}
        <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-gray-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Records</span>
            <FileText size={20} className="text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {totalRecords}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">All time</p>
        </div>

        {/* Current Plan */}
        <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-gray-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Plan</span>
            <Zap size={20} className="text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {planName}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            Max {planMaxUsers} users
          </p>
        </div>

        {/* Usage */}
        <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-gray-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Usage</span>
            <TrendingUp size={20} className="text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{usagePercent}%</p>
          <div className="mt-2 w-full bg-gray-200 dark:bg-slate-800 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${usagePercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* PLAN EXPIRY */}
      {planExpiry && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-sm text-blue-900 dark:text-blue-200">
            <strong>Plan expires:</strong> {new Date(planExpiry).toLocaleDateString()}
          </p>
        </div>
      )}

      {/* RECENT ACTIVITY */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
                <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300">Action</th>
                <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300">Target</th>
                <th className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.length > 0 ? (
                recentActivity.map((log, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <td className="px-6 py-3">
                      <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-gray-600 dark:text-gray-400 capitalize">
                      {log.target_table.replace('_', ' ')}
                    </td>
                    <td className="px-6 py-3 text-gray-600 dark:text-gray-400">
                      {new Date(log.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    No activity yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}