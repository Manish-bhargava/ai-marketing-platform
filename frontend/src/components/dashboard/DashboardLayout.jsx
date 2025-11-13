import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import ContentHub from './pages/ContentHub';
import CampaignOrchestrator from './pages/CampaignOrchestrator';
import ContentCalendar from './pages/ContentCalendar';
import ContentAutopsy from './pages/ContentAutopsy';
import ResonanceEngine from './pages/ResonanceEngine';
import PerformanceDashboard from './pages/PerformanceDashboard';


const DashboardLayout = () => {
  const navigate=useNavigate();

  const handleNavigate=(path)=>{
    navigate(`/dashboard/${path}`);
  };
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <Sidebar onNavigate={handleNavigate}/>
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<Navigate to="content-hub" replace />} />
            <Route path="content-hub" element={<ContentHub />} />
            <Route path="campaign-orchestrator" element={<CampaignOrchestrator />} />
            <Route path="content-calendar" element={<ContentCalendar />} />
            <Route path="content-autopsy" element={<ContentAutopsy />} />
            <Route path="resonance-engine" element={<ResonanceEngine />} />
            <Route path="performance-dashboard" element={<PerformanceDashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
