import React, { lazy, Suspense } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

const Skills = lazy(() => import('../components/Skills'));
const Projects = lazy(() => import('../components/Projects'));
const Certificates = lazy(() => import('../components/Certificates'));
const Education = lazy(() => import('../components/Education'));
const Contact = lazy(() => import('../components/Contact'));
const Footer = lazy(() => import('../components/Footer'));

const SectionLoader = () => (
  <div className="container mx-auto px-6 py-20 space-y-8 animate-pulse">
    <div className="h-10 bg-white/5 rounded-xl w-1/4"></div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-64 bg-white/5 rounded-3xl border border-white/10"></div>
      ))}
    </div>
  </div>
);

const Home = () => {
  return (
    <main className="relative mesh-gradient min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Divider Line */}
      <div className="relative py-12">
        <div className="container mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
        </div>
      </div>
      
      <Suspense fallback={<SectionLoader />}>
        <Skills />
        
        {/* Divider Line */}
        <div className="relative py-12">
          <div className="container mx-auto px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
          </div>
        </div>
        
        <Education />
        
        {/* Divider Line */}
        <div className="relative py-12">
          <div className="container mx-auto px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
          </div>
        </div>
        
        <Projects />
        
        {/* Divider Line */}
        <div className="relative py-12">
          <div className="container mx-auto px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
          </div>
        </div>
        
        <Certificates />
        
        {/* Divider Line */}
        <div className="relative py-12">
          <div className="container mx-auto px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
          </div>
        </div>
        
        <Contact />
        <Footer />
      </Suspense>
    </main>
  );
};

export default Home;
