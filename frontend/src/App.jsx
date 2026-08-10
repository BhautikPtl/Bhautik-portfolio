import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import useStore from './utils/store';
import AssetPreloader from './components/AssetPreloader';

// Lazy loading components for instant initial page load
const Home = lazy(() => import('./pages/Home'));
const ProjectDetail = lazy(() => import('./pages/Projects/ProjectDetailPage'));
const AdminLogin = lazy(() => import('./pages/Admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'));

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useStore();
  return isLoggedIn ? children : <Navigate to="/admin/login" />;
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Theme is managed by ThemeProvider; no-op here to avoid conflicting defaults
  }, []);

  useEffect(() => {
    if (loading) return;

    // Reveal-on-scroll using IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
          }
        });
      },
      { threshold: 0.08 }
    );

    revealElements.forEach(el => observer.observe(el));

    // Trigger any already-visible elements
    const timer = setTimeout(() => {
      revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92) {
          el.classList.add('in');
        }
      });
    }, 300);

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
        <div style={{ position: 'relative', minHeight: '100vh' }}>
          {/* Fixed grid background */}
          <div className="grid-bg" aria-hidden="true" />

          <AssetPreloader />

          <Suspense fallback={
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
              <div style={{
                width: 40, height: 40,
                border: '3px solid var(--line-strong)',
                borderTopColor: 'var(--accent)',
                borderRadius: '50%',
                animation: 'spin .8s linear infinite',
              }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
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
        </div>
      )}
    </Router>
  );
};

export default App;
