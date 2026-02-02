import React, { useState, useEffect, useCallback } from 'react';

interface StoryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  duration: number; // in ms
  seen: boolean;
  date: string;
}

interface StoryViewerProps {
  user: {
    id: string;
    username: string;
    avatar: string;
  };
  onClose: () => void;
  onComplete: () => void;
}

// Mock stories for demo purposes
const MOCK_STORIES: StoryItem[] = [
  {
    id: 's1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1603909223429-69bb7101f420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Cannabis plant detail
    duration: 5000,
    seen: false,
    date: '2h'
  },
  {
    id: 's2',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1556630075-8490a503dc98?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Greenhouse
    duration: 5000,
    seen: false,
    date: '1h'
  },
  {
    id: 's3',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1598516963471-12595085f137?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Joint/Lifestyle
    duration: 5000,
    seen: false,
    date: '30m'
  }
];

const StoryViewer: React.FC<StoryViewerProps> = ({ user, onClose, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentStory = MOCK_STORIES[currentIndex];

  const handleNext = useCallback(() => {
    if (currentIndex < MOCK_STORIES.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setProgress(0);
    } else {
      onComplete();
    }
  }, [currentIndex, onComplete]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setProgress(0);
    } else {
      // If at start, just reset progress
      setProgress(0);
    }
  }, [currentIndex]);

  // Timer for progress bar
  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 50; // Update every 50ms
    const step = (100 * intervalTime) / currentStory.duration;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          handleNext();
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused, handleNext, currentStory.duration]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      {/* Mobile container - full screen, Desktop - mobile aspect ratio */}
      <div className="relative w-full h-full md:max-w-md md:h-[90vh] md:rounded-2xl overflow-hidden bg-slate-900 shadow-2xl">
        
        {/* Story Content */}
        <img 
          src={currentStory.url} 
          alt="story" 
          className="w-full h-full object-cover animate-in fade-in duration-300"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none"></div>

        {/* Header (Progress & User) */}
        <div className="absolute top-0 left-0 right-0 p-4 pt-6 md:pt-4 space-y-3 z-20">
          {/* Progress Bars */}
          <div className="flex gap-1.5 h-1">
            {MOCK_STORIES.map((story, idx) => (
              <div key={story.id} className="flex-1 bg-white/30 rounded-full overflow-hidden h-full">
                <div 
                  className="h-full bg-white transition-all ease-linear"
                  style={{ 
                    width: idx < currentIndex ? '100%' : idx === currentIndex ? `${progress}%` : '0%',
                    transitionDuration: idx === currentIndex ? '50ms' : '0ms'
                  }}
                />
              </div>
            ))}
          </div>

          {/* User Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={user.avatar} alt={user.username} className="w-8 h-8 rounded-full border border-white/50" />
              <div>
                 <p className="text-white text-sm font-bold shadow-black drop-shadow-md">{user.username}</p>
                 <p className="text-white/80 text-xs shadow-black drop-shadow-md">{currentStory.date}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
               <button className="text-white/80 hover:text-white p-1">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
               </button>
               <button onClick={onClose} className="text-white hover:text-red-500 transition-colors p-1">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
               </button>
            </div>
          </div>
        </div>

        {/* Tap Areas */}
        <div className="absolute inset-0 flex z-10">
          <div 
            className="w-1/3 h-full cursor-pointer" 
            onClick={handlePrev}
            onMouseDown={() => setIsPaused(true)}
            onMouseUp={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          ></div>
          <div 
            className="w-2/3 h-full cursor-pointer" 
            onClick={handleNext}
            onMouseDown={() => setIsPaused(true)}
            onMouseUp={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          ></div>
        </div>

        {/* Footer / Message Input */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20 pb-8 md:pb-4">
           <div className="flex gap-3 items-center">
             <input 
               type="text" 
               placeholder="Send message..." 
               className="flex-1 bg-transparent border border-white/40 rounded-full px-4 py-2.5 text-white placeholder-white/70 focus:outline-none focus:border-white focus:bg-white/10 text-sm backdrop-blur-sm"
               onFocus={() => setIsPaused(true)}
               onBlur={() => setIsPaused(false)}
             />
             <button className="p-2 text-white hover:text-emerald-400 transition-colors">
               <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
             </button>
             <button className="p-2 text-white hover:text-emerald-400 transition-colors">
               <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
             </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default StoryViewer;