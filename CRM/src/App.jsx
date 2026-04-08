import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

// Auth & Contexts
import ProtectedRoute from './components/ProtectedRoutes';

// Layouts
import DashboardLayout from './components/layout/DashboardLayout';

// Pages
import Home from './pages/Home';
import Documentation from './pages/Documentation';
import Overview from './pages/Overview';
import Auth from './pages/auth/Auth';
import UserDashboard from './pages/user/UserDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import Members from './pages/dashboard/Members';
import Roles from './pages/dashboard/Roles';
import Analytics from './pages/dashboard/Analytics';
import AuditLogs from './pages/dashboard/AuditLogs';
import Records from './pages/dashboard/Records';
import NotFound from './pages/NotFound';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Scroll Progress Bar
function ProgressBar() {
  const { pathname } = useLocation();

  return (
    <motion.div
      key={pathname}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
      className="fixed top-0 left-0 h-1 bg-blue-500 origin-left z-50"
      transition={{ duration: 0.5 }}
    />
  );
}

function App() {
  return (
    <>
      <ScrollToTop />
      <ProgressBar />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Documentation />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/auth" element={<Auth />} />

        {/* USER ROUTES */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTES (Nested) */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute requiredRole="Admin">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="members" element={<Members />} />
          <Route path="roles" element={<Roles />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="audit" element={<AuditLogs />} />
          <Route path="records" element={<Records />} />
        </Route>

        {/* CATCH ALL (404) */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;