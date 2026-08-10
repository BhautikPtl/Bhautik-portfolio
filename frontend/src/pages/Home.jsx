import React, { lazy, Suspense } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

const Skills = lazy(() => import('../components/Skills'));
const Education = lazy(() => import('../components/Education'));
const Projects = lazy(() => import('../components/Projects'));
const Certificates = lazy(() => import('../components/Certificates'));
const Contact = lazy(() => import('../components/Contact'));
const Footer = lazy(() => import('../components/Footer'));

const SectionLoader = () => (
  <div style={{ padding: '80px 0', display: 'flex', justifyContent: 'center' }}>
    <div style={{
      width: 32, height: 32,
      border: '2px solid var(--line-strong)',
      borderTopColor: 'var(--accent)',
      borderRadius: '50%',
      animation: 'spin .8s linear infinite',
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

const Home = () => {
  return (
    <main style={{ position: 'relative', minHeight: '100vh' }}>
      <Navbar />
      <Hero />

      <Suspense fallback={<SectionLoader />}>
        <Skills />
        <Education />
        <Projects />
        <Certificates />
        <Contact />
        <Footer />
      </Suspense>
    </main>
  );
};

export default Home;
