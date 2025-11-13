import React, { useContext } from 'react';
import {
  Home,
  LayoutGrid,
  Calendar,
  Search as SearchIcon,
  Bot,
  BarChartHorizontal,
  LogOut,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Sidebar = ({ dashboardView, onNavigate }) => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Content Hub', view: 'content-hub', icon: Home },
    { name: 'Campaign Orchestrator', view: 'campaign-orchestrator', icon: LayoutGrid },
    { name: 'Content Calendar', view: 'content-calendar', icon: Calendar },
    { name: 'Content Autopsy', view: 'content-autopsy', icon: SearchIcon },
    { name: 'Resonance Engine', view: 'resonance-engine', icon: Bot },
    { name: 'Performance Dashboard', view: 'performance-dashboard', icon: BarChartHorizontal },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/'); // Redirect to Landing Page after logout
  };

  return (
    <div className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      {/* Logo */}
      <div className="flex h-26 items-center justify-center border-b border-gray-200 px-6 dark:border-gray-800">
        <Link to="/" className="hover:opacity-90 transition">
          <img src="/logo.png" height={180} width={180} alt="Logo" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = dashboardView === item.view;
          return (
            <button
              key={item.name}
              onClick={() => onNavigate(item.view)}
              className={`flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50'
                }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </button>
          );
        })}
      </nav>

      {/* Footer / User Account */}
      <div className="border-t border-gray-200 p-4 dark:border-gray-800">
        <Link to="/profile" className="flex items-center gap-3 hover:opacity-90 transition">
          <img
            className="h-10 w-10 rounded-full border border-gray-300 dark:border-gray-700"
            src="https://avatar.vercel.sh/sam.png?size=40"
            alt="User Avatar"
          />
          <div className="flex flex-col text-left">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {user?.name || 'User'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user?.email || 'user@example.com'}
            </p>
          </div>
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-4 flex w-full items-center justify-start rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/40 transition"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
