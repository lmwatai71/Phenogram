import React, { useState } from 'react';
import { loginUser, signupUser } from '../services/authService';
import { User } from '../types';

interface AuthScreenProps {
  onSuccess: (user: User) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Form States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [handle, setHandle] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        const user = await loginUser(username, password);
        onSuccess(user);
      } else {
        const user = await signupUser(username, password, handle);
        onSuccess(user);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
       {/* Background Ambience */}
       <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px]"></div>
       <div className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
           <div className="w-16 h-16 bg-gradient-to-tr from-emerald-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-emerald-900/50 mb-4">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
           </div>
           <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">PHENOGRAM</h1>
           <p className="text-slate-400">Cultural Intelligence for the Cannabis Community.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="flex gap-4 mb-6 border-b border-slate-800 pb-2">
            <button 
              onClick={() => { setIsLogin(true); setError(''); }} 
              className={`flex-1 pb-2 text-sm font-bold transition-colors ${isLogin ? 'text-emerald-400 border-b-2 border-emerald-500' : 'text-slate-500 hover:text-slate-300'}`}
            >
              LOG IN
            </button>
            <button 
              onClick={() => { setIsLogin(false); setError(''); }}
              className={`flex-1 pb-2 text-sm font-bold transition-colors ${!isLogin ? 'text-emerald-400 border-b-2 border-emerald-500' : 'text-slate-500 hover:text-slate-300'}`}
            >
              SIGN UP
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-slate-400 text-xs font-bold uppercase mb-1 ml-1">Username</label>
              <input 
                type="text" 
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder-slate-700"
                placeholder={isLogin ? "Your username" : "Pick a username"}
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-slate-400 text-xs font-bold uppercase mb-1 ml-1">Handle</label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-slate-500">@</span>
                  <input 
                    type="text" 
                    required
                    value={handle}
                    onChange={(e) => setHandle(e.target.value.replace('@',''))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 pl-8 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder-slate-700"
                    placeholder="terp_god"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-slate-400 text-xs font-bold uppercase mb-1 ml-1">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder-slate-700"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-wait text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-900/20 mt-4"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                  CONNECTING...
                </span>
              ) : (
                isLogin ? "ENTER PHENOGRAM" : "JOIN THE CULTURE"
              )}
            </button>
          </form>

          <p className="text-center text-slate-500 text-xs mt-6">
            By entering, you agree to respect the culture and community guidelines.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
