import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import ChatInterface from './components/ChatInterface';
import AuthScreen from './components/AuthScreen';
import Profile from './components/Profile';
import { FeatureView, User } from './types';
import { getCurrentUser, logoutUser } from './services/authService';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<FeatureView>('stream');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for active session on boot
    const sessionUser = getCurrentUser();
    if (sessionUser) {
      setUser(sessionUser);
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setCurrentView('stream');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'stream':
        return <Feed />;
      case 'chat':
        return <ChatInterface />;
      case 'profile':
        return user ? <Profile user={user} onLogout={handleLogout} /> : null;
      default:
        // Placeholder for other views
        return (
          <div className="flex-1 flex flex-col items-center justify-center bg-slate-950 text-slate-400 p-8 text-center overflow-y-auto">
            <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4 border border-slate-800">
               <svg className="w-8 h-8 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 capitalize">{currentView.replace('-', ' ')}</h2>
            <p className="max-w-md">
              This feature is currently under construction. Ask Phenogram AI about it to learn what's coming soon.
            </p>
            <button 
              onClick={() => setCurrentView('chat')}
              className="mt-6 px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-medium transition-colors"
            >
              Ask AI
            </button>
          </div>
        );
    }
  };

  if (isLoading) {
    return <div className="h-screen w-full bg-slate-950 flex items-center justify-center text-emerald-500">Loading...</div>;
  }

  if (!user) {
    return <AuthScreen onSuccess={setUser} />;
  }

  return (
    <div className="flex flex-col-reverse md:flex-row h-screen w-full bg-slate-950 overflow-hidden">
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;