import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import Home from "./pages/Home";
import Documentation from "./pages/Documentation";
import Overview from "./pages/Overview";
import Auth from "./pages/auth/Auth";
import { Bounce, ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";

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
        className="min-h-screen text-white bg-[#070A10] relative "
      >
        <ScrollToTop />
        {/* GLOBAL PROGRESS BAR (Smooth UX detail) */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-[#2176ff] origin-left z-110"
          style={{ scaleX }}
        />

        {/* ROUTES */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard-organization" element={<Dashboard />} />
        </Routes>
      </motion.div>

      <ToastContainer
        position="top-center"
        autoClose={4000}
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
