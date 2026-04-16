import React, { useState } from 'react';
import { Menu, X, LogOut, Users, Settings, BarChart3, FileText, Home } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

export default function AdminDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'home', label: 'Dashboard', icon: Home, path: '/admin-dashboard' },
    { id: 'members', label: 'Members', icon: Users, path: '/admin-dashboard/members' },
    { id: 'roles', label: 'Roles', icon: Settings, path: '/admin-dashboard/roles' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/admin-dashboard/analytics' },
    { id: 'audit', label: 'Audit Logs', icon: FileText, path: '/admin-dashboard/audit' },
    { id: 'records', label: 'Records', icon: FileText, path: '/admin-dashboard/records' },
    { id: 'attendance', label: 'Attendance', icon: Users, path: '/admin-dashboard/attendance' },
  ];

  // Determine current active item based on pathname
  const currentPath = location.pathname;
  const currentMenuItem = menuItems.find(item => item.path === currentPath) 
                         || (currentPath.startsWith('/admin-dashboard/') ? menuItems.find(item => currentPath.includes(item.id)) : menuItems[0]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-950">
      {/* SIDEBAR */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 transition-all duration-300 flex flex-col`}
      >
        {/* Logo / Brand */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-slate-800">
          {sidebarOpen && <span className="text-lg font-semibold text-gray-900 dark:text-white">CRM</span>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-400"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path || (item.id !== 'home' && currentPath.includes(item.id));
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* User Profile & Logout */}
        <div className="px-3 py-4 border-t border-gray-200 dark:border-slate-800">
          <div className="mb-3 px-3 py-2 rounded-lg bg-gray-50 dark:bg-slate-800">
            {sidebarOpen && (
              <>
                <p className="text-xs text-gray-600 dark:text-gray-400">Logged in as</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user?.name || user?.email}</p>
              </>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TOP HEADER */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            {currentMenuItem?.label || 'Dashboard'}
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || user?.email}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                {(user?.name || user?.email)?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-slate-950 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}