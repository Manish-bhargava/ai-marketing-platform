import React, { useContext } from 'react';
import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import Workflow from './Workflow';
import Pricing from './Pricing';
import Testimonials from './Testimonials';
import CTA from './CTA';
import Footer from './Footer';
import { AuthContext } from '../../contexts/AuthContext';

// --- Landing Page Wrapper ---
const LandingPage = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleNavigate = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="App bg-white text-gray-800 antialiased dark:bg-gray-900 dark:text-gray-200">
      {/* Header dynamically handles auth state */}
      <Header 
        onNavigate={handleNavigate} 
        isAuthenticated={isAuthenticated} 
        onLogout={handleLogout} 
      />

      <main>
        <Hero onNavigate={handleNavigate} />
        <Features />
        <Workflow />
        <Pricing />
        <Testimonials />
        <CTA onNavigate={handleNavigate} />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
