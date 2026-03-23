import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import Home from './pages/Home';
import ProjectDetail from './pages/Projects/ProjectDetailPage';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import LoadingScreen from './components/LoadingScreen';
import useStore from './utils/store';
import Chatbot from './components/Chatbot';

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

  return <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00d4ff] to-[#16d9b9] origin-left z-[10000]" style={{ scaleX }} />;
};

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {loading ? (
        <LoadingScreen onFinish={() => setLoading(false)} />
      ) : (
        <div className="relative">
          <ScrollProgress />
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
          <Chatbot />
        </div>
      )}
    </Router>
  );
};

export default App;
