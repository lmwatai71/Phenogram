import React, { useState } from 'react';
import StoryBar from './StoryBar';
import StoryViewer from './StoryViewer';

interface StoryUser {
  id: string;
  username: string;
  avatar: string;
  hasUnseenStories: boolean;
}

const Feed: React.FC = () => {
  // Mock Stories Data
  const [stories, setStories] = useState<StoryUser[]>([
    {
      id: '1',
      username: 'growguru',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=growguru&backgroundColor=b6e3f4',
      hasUnseenStories: true
    },
    {
      id: '2',
      username: 'phenoking',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=phenoking&backgroundColor=ffdfbf',
      hasUnseenStories: true
    },
    {
      id: '3',
      username: 'terp_queen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=terpqueen&backgroundColor=c0aede',
      hasUnseenStories: false
    },
    {
      id: '4',
      username: 'dank_labs',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=danklabs&backgroundColor=d1d4f9',
      hasUnseenStories: true
    },
     {
      id: '5',
      username: 'soil_life',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=soillife&backgroundColor=b6e3f4',
      hasUnseenStories: false
    }
  ]);

  const [activeStoryUser, setActiveStoryUser] = useState<StoryUser | null>(null);

  const handleOpenStory = (user: StoryUser) => {
    setActiveStoryUser(user);
    // Mark as seen locally
    setStories(prev => prev.map(s => s.id === user.id ? { ...s, hasUnseenStories: false } : s));
  };

  const handleCloseStory = () => {
    setActiveStoryUser(null);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 p-4 md:p-8 scrollbar-hide relative">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Stories Section */}
        <StoryBar stories={stories} onOpenStory={handleOpenStory} />

        {/* Header */}
        <div className="flex justify-between items-end mb-4 border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">The Stream</h1>
            <p className="text-slate-400">Fresh genetics and cultural moments.</p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-full border border-emerald-500/20 cursor-pointer hover:bg-emerald-500/20 transition-colors">Following</span>
            <span className="px-3 py-1 bg-slate-800 text-slate-400 text-xs font-medium rounded-full border border-slate-700 cursor-pointer hover:bg-slate-700 hover:text-slate-300 transition-colors">Trending</span>
          </div>
        </div>

        {/* Post 1 */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-sm hover:border-slate-700 transition-colors">
          <div className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden ring-2 ring-slate-800">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=GrowMaster_420" alt="avatar" className="w-full h-full object-cover"/>
            </div>
            <div>
              <p className="text-white font-medium text-sm hover:text-emerald-400 cursor-pointer transition-colors">GrowMaster_420</p>
              <p className="text-slate-500 text-xs">2 hours ago • Living Soil Crew</p>
            </div>
          </div>
          <div className="aspect-[4/3] bg-black relative group cursor-pointer">
             <img src="https://picsum.photos/seed/cannabis1/800/600" alt="post" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"/>
             <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <p className="text-xs font-mono text-emerald-300">Strain: Garlic Cookies</p>
             </div>
          </div>
          <div className="p-4">
             <p className="text-slate-300 text-sm leading-relaxed">
               Day 56 of flower. The fade is starting to come in strong. Smells like straight funk and onions. 🧅⛽️
             </p>
             <div className="flex gap-6 mt-4 pt-4 border-t border-slate-800/50">
               <button className="flex items-center gap-2 text-slate-400 hover:text-pink-500 transition-colors group">
                 <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                 <span className="text-sm font-medium">243</span>
               </button>
               <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
                 <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                 <span className="text-sm font-medium">18</span>
               </button>
               <button className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors ml-auto">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
               </button>
             </div>
          </div>
        </div>

        {/* Post 2 */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-sm hover:border-slate-700 transition-colors">
          <div className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden ring-2 ring-slate-800">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=TerpHunter" alt="avatar" className="w-full h-full object-cover"/>
            </div>
            <div>
              <p className="text-white font-medium text-sm hover:text-emerald-400 cursor-pointer transition-colors">TerpHunter</p>
              <p className="text-slate-500 text-xs">5 hours ago • Solventless</p>
            </div>
          </div>
          <div className="p-4 pt-0">
             <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
               <p className="text-emerald-400 text-xs font-mono mb-2 uppercase tracking-wider">Review</p>
               <h3 className="text-xl font-bold text-white mb-2">Hash Rosin Drop: Papaya Bomb</h3>
               <p className="text-slate-300 text-sm leading-relaxed mb-4">
                 Absolutely insane terp profile on this wash. Heavy tropical fruits on the inhale, smooth creamy finish. 
                 Consistency is perfect cold cure batter. 9.2/10
               </p>
               <div className="flex gap-2 flex-wrap mb-2">
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300 hover:text-white cursor-pointer transition-colors">#rosin</span>
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300 hover:text-white cursor-pointer transition-colors">#710</span>
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300 hover:text-white cursor-pointer transition-colors">#terps</span>
               </div>
             </div>
              <div className="flex gap-6 mt-4">
               <button className="flex items-center gap-2 text-slate-400 hover:text-pink-500 transition-colors">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                 <span className="text-sm font-medium">856</span>
               </button>
               <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                 <span className="text-sm font-medium">42</span>
               </button>
             </div>
          </div>
        </div>

      </div>

      {/* Full Screen Story Viewer Modal */}
      {activeStoryUser && (
        <StoryViewer 
          user={activeStoryUser} 
          onClose={handleCloseStory} 
          onComplete={handleCloseStory} 
        />
      )}

    </div>
  );
};

export default Feed;