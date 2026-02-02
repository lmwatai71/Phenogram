import React from 'react';
import { User } from '../types';
import { logoutUser } from '../services/authService';

interface ProfileProps {
  user: User;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Profile Header */}
        <div className="flex flex-col items-center md:items-start md:flex-row gap-6 pb-8 border-b border-slate-800">
           <div className="relative group">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-tr from-emerald-500 to-purple-500">
                 <div className="w-full h-full rounded-full bg-slate-900 p-1">
                    <img src={user.avatar} alt={user.username} className="w-full h-full rounded-full object-cover bg-slate-800" />
                 </div>
              </div>
              <button className="absolute bottom-0 right-0 bg-slate-800 text-white p-2 rounded-full border border-slate-700 shadow-lg hover:bg-slate-700 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              </button>
           </div>
           
           <div className="flex-1 text-center md:text-left">
             <h1 className="text-2xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
                {user.username} 
                <span className="text-emerald-400">
                   <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                </span>
             </h1>
             <p className="text-slate-400 text-sm font-medium mb-4">{user.handle}</p>
             
             <div className="flex justify-center md:justify-start gap-6 mb-4">
                <div className="text-center md:text-left">
                   <span className="block text-white font-bold text-lg">{user.stats?.posts || 0}</span>
                   <span className="text-slate-500 text-xs uppercase tracking-wide">Posts</span>
                </div>
                <div className="text-center md:text-left">
                   <span className="block text-white font-bold text-lg">{user.stats?.followers || 0}</span>
                   <span className="text-slate-500 text-xs uppercase tracking-wide">Followers</span>
                </div>
                <div className="text-center md:text-left">
                   <span className="block text-white font-bold text-lg">{user.stats?.following || 0}</span>
                   <span className="text-slate-500 text-xs uppercase tracking-wide">Following</span>
                </div>
             </div>

             <div className="text-slate-300 text-sm max-w-md mx-auto md:mx-0 leading-relaxed mb-6">
               {user.bio || "No bio yet."}
             </div>

             <div className="flex gap-3 justify-center md:justify-start">
                <button className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors border border-slate-700">
                  Edit Profile
                </button>
                <button onClick={onLogout} className="px-6 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 text-sm font-medium rounded-lg transition-colors border border-red-500/20">
                  Log Out
                </button>
             </div>
           </div>
        </div>

        {/* Content Tabs */}
        <div className="flex border-b border-slate-800">
           <button className="flex-1 py-3 text-sm font-medium text-white border-b-2 border-emerald-500">POSTS</button>
           <button className="flex-1 py-3 text-sm font-medium text-slate-500 hover:text-slate-300">REELS</button>
           <button className="flex-1 py-3 text-sm font-medium text-slate-500 hover:text-slate-300">SAVED</button>
        </div>

        {/* Empty State Grid */}
        <div className="grid grid-cols-3 gap-1 md:gap-4">
           {[1,2,3,4,5,6].map(i => (
              <div key={i} className="aspect-square bg-slate-900 rounded-lg flex items-center justify-center border border-slate-800/50 group cursor-pointer relative overflow-hidden">
                 <svg className="w-8 h-8 text-slate-800 group-hover:text-slate-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold">
                    <span>♥ 0</span>
                 </div>
              </div>
           ))}
        </div>
        
        <div className="text-center py-8">
           <p className="text-slate-500 text-sm">Capture your first grow log or session to fill this grid.</p>
           <button className="mt-4 text-emerald-400 text-sm font-medium hover:underline">Create Post +</button>
        </div>

      </div>
    </div>
  );
};

export default Profile;
