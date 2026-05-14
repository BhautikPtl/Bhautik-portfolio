import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import useStore from './utils/store';
import Chatbot from './components/Chatbot';
import Particles from './components/Particles';
import AssetPreloader from './components/AssetPreloader';
import CustomCursor from './components/CustomCursor';

// Lazy loading components for instant initial page load
const Home = lazy(() => import('./pages/Home'));
const ProjectDetail = lazy(() => import('./pages/Projects/ProjectDetailPage'));
const AdminLogin = lazy(() => import('./pages/Admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'));

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useStore();
  return isLoggedIn ? children : <Navigate to="/admin/login" />;
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent origin-left z-[10000]" style={{ scaleX, willChange: "transform" }} />;
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

    const revealElements = document.querySelectorAll('.reveal');
    
    const checkReveal = () => {
      revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
          el.classList.add('active');
        }
      });
    };

    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
    
    const timer = setTimeout(checkReveal, 500);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [loading]);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {loading ? (
        <LoadingScreen onFinish={() => setLoading(false)} />
      ) : (
        <div className="relative font-outfit selection:bg-primary/30 mesh-gradient min-h-screen">
          <CustomCursor />
          <AssetPreloader />
          <Particles />
          <div className="bg-noise" />
          <ScrollProgress />
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
              <div className="w-10 h-10 border-4 border-[#5b78ff] border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
          <Chatbot />
        </div>
      )}
    </Router>
  );
};

export default App;
