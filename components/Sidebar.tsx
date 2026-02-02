import React from 'react';
import { FeatureView } from '../types';

interface SidebarProps {
  currentView: FeatureView;
  onChangeView: (view: FeatureView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const navItems: { id: FeatureView; label: string; icon: React.ReactNode }[] = [
    { 
      id: 'stream', 
      label: 'Stream', 
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
    },
    { 
      id: 'explore', 
      label: 'Explore', 
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    },
    { 
      id: 'grow-journals', 
      label: 'Grow', 
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
    },
    { 
      id: 'crews', 
      label: 'Crews', 
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
    },
    { 
      id: 'profile', 
      label: 'Profile', 
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
    },
  ];

  return (
    <div className="w-full h-auto bg-slate-900 border-t border-slate-800 flex flex-row shrink-0 z-50 md:w-64 md:h-screen md:flex-col md:border-r md:border-t-0 md:justify-start transition-all duration-300 relative pb-1 md:pb-0">
      
      {/* Branding - Hidden on mobile, visible on desktop */}
      <div className="hidden md:flex p-6 items-center justify-start gap-3">
        <div className="w-10 h-10 bg-gradient-to-tr from-emerald-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/50">
           <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
        </div>
        <span className="text-xl font-bold tracking-tight text-white">PHENOGRAM</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-row items-center justify-around px-2 py-2 md:flex-col md:mt-6 md:px-4 md:space-y-2 md:justify-start md:items-stretch">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onChangeView(item.id)}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 group md:flex-row md:justify-start md:gap-4 md:p-3
              ${currentView === item.id 
                ? 'bg-emerald-500/10 text-emerald-400 shadow-none md:shadow-[0_0_20px_rgba(16,185,129,0.1)]' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
          >
            <div className={`transition-transform duration-300 ${currentView === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
              {item.icon}
            </div>
            <span className="text-[10px] font-medium mt-1 md:mt-0 md:text-sm md:block">{item.label}</span>
          </button>
        ))}

        {/* Mobile-only Chat Button in Nav Bar */}
        <button
           onClick={() => onChangeView('chat')}
           className={`md:hidden flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 group
             ${currentView === 'chat' ? 'text-purple-400' : 'text-slate-400'}
           `}
        >
          <div className={`transition-transform duration-300 ${currentView === 'chat' ? 'scale-110' : 'group-hover:scale-110'}`}>
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <span className="text-[10px] font-medium mt-1">Ask AI</span>
        </button>
      </nav>

      {/* Desktop Chat Button (Prominent) */}
      <div className="hidden md:block p-4">
        <button
           onClick={() => onChangeView('chat')}
           className={`w-full flex items-center justify-start gap-3 p-3 rounded-xl border transition-all duration-300
           ${currentView === 'chat'
             ? 'bg-purple-600 border-purple-500 text-white shadow-[0_0_25px_rgba(147,51,234,0.3)]'
             : 'bg-slate-800/50 border-slate-700 text-purple-400 hover:border-purple-500/50'
           }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          <div className="flex flex-col items-start">
             <span className="font-bold text-sm">AI Assistant</span>
             <span className="text-[10px] opacity-70">Ask Phenogram</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;