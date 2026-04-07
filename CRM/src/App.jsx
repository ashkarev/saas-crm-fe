import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { Bounce, ToastContainer } from "react-toastify";

// pages
import Home from "./pages/Home";
import Documentation from "./pages/Documentation";
import Overview from "./pages/Overview";
import Auth from "./pages/auth/Auth";
import Members from "./pages/dashboard/Members";
import UserDashboard from "./pages/user/UserDashboard";

// protected route
import ProtectedRoute from "./components/ProtectedRoutes";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="min-h-screen text-white bg-[#070A10] relative"
      >
        <ScrollToTop />

        {/* PROGRESS BAR */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-[#2176ff] origin-left z-50"
          style={{ scaleX }}
        />

        {/* ROUTES */}
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/auth" element={<Auth />} />

          {/* ADMIN only (role_id = 1 or is_super_admin) */}
          <Route
            path="/members"
            element={
              <ProtectedRoute role={1}>
                <Members />
              </ProtectedRoute>
            }
          />

          {/* Any authenticated user */}
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </motion.div>

      {/* TOAST */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
};

export default App;
