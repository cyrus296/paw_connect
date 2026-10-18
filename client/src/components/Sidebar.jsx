import { useState } from "react";

const navGroups = [
  {
    title: "Vitals & My Pet",
    items: [
      { key: "dashboard", label: "Vitals Dashboard", icon: "📊" },
      { key: "pets", label: "My Pets", icon: "🐾" },
      { key: "health", label: "Pet Health Records", icon: "🏥" },
      { key: "alerts", label: "Vaccine & Food Alerts", icon: "🔔" },
    ],
  },
  {
    title: "Healthcare & Boarding",
    items: [
      { key: "vet", label: "Pet Vet (Book / Chat)", icon: "🩺" },
      { key: "boarding", label: "Pet Boarding", icon: "🏨" },
      { key: "videos", label: "Care & Grooming Videos", icon: "🎥" },
      { key: "ai", label: "Ask PawAI Assistant", icon: "🤖" },
    ],
  },
  {
    title: "IoT & Essentials",
    items: [
      { key: "tracking", label: "Pet Live Tracking", icon: "📍" },
      { key: "locate", label: "Locate My Pet (IoT Belt)", icon: "🛰️" },
      { key: "essentials", label: "Food & Essentials Store", icon: "🛍️" },
      { key: "marketplace", label: "Marketplace Services", icon: "🛒" },
    ],
  },
  {
    title: "Social & Discovery",
    items: [
      { key: "community", label: "Pet Community", icon: "👥" },
      { key: "mate", label: "Pet Mate", icon: "💕" },
      { key: "adoption", label: "Pet Adoption", icon: "🏡" },
    ],
  },
];

export default function Sidebar({ active = "dashboard", onNavigate }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } flex flex-col bg-gray-950 text-gray-100 transition-all duration-300 min-h-screen border-r border-gray-800 shrink-0 select-none`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-gray-800">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐾</span>
            <span className="text-xl font-extrabold tracking-tight text-white">
              Paw<span className="text-emerald-400">Connect</span>
            </span>
          </div>
        )}
        {collapsed && <span className="text-2xl mx-auto">🐾</span>}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? "▶" : "◀"}
        </button>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-4">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            {!collapsed && (
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                {group.title}
              </p>
            )}
            {group.items.map((item) => {
              const isActive = active === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => onNavigate?.(item.key)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-xs font-bold"
                      : "text-gray-400 hover:bg-gray-900 hover:text-gray-200"
                  } ${collapsed ? "justify-center px-0 py-2.5" : ""}`}
                  title={collapsed ? item.label : undefined}
                >
                  <span className="text-base shrink-0">{item.icon}</span>
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer Status */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-800/80 bg-gray-950/60 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">System Collar</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Online
            </span>
          </div>
        </div>
      )}
    </aside>
  );
}
