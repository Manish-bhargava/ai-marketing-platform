import React from "react";
import logo from "/logo.png";

function Sidebar({ active, setActive }) {
  const items = [
    { id: "dashboard", label: "Dashboard" },
    { id: "campaigns", label: "Campaigns" },
    { id: "content", label: "Content Hub" },
    { id: "analytics", label: "Analytics" },
  ];

  return (
    <aside className="w-64 h-screen bg-white dark:bg-slate-950 border-r border-gray-200 dark:border-slate-800 flex flex-col">
      
      {/* Logo / Brand */}
      <div className="h-18.5 px-6 flex items-center gap-2 ">
        <img
          src={logo}
          alt="AI Marketing Logo"
          className="h-9 w-auto object-contain"
        />
        <span className="font-semibold text-lg text-black dark:text-white">
          AI-Marketing
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${
                active === item.id
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
              }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

    </aside>
  );
}

export default Sidebar;
