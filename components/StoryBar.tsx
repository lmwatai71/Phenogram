import React from 'react';
import StoryCircle from './StoryCircle';

interface StoryUser {
  id: string;
  username: string;
  avatar: string;
  hasUnseenStories: boolean;
}

interface StoryBarProps {
  stories: StoryUser[];
  onOpenStory: (user: StoryUser) => void;
}

const StoryBar: React.FC<StoryBarProps> = ({ stories, onOpenStory }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        {/* Your Story Placeholder */}
        <div className="flex flex-col items-center mr-4 shrink-0 cursor-pointer group">
           <div className="relative">
             <div className="w-[74px] h-[74px] rounded-full border-2 border-slate-700 border-dashed flex items-center justify-center bg-slate-900 group-hover:bg-slate-800 transition-colors">
                <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
             </div>
             <div className="absolute bottom-0 right-0 bg-emerald-500 w-5 h-5 rounded-full border-2 border-slate-950 flex items-center justify-center">
               <span className="text-white text-xs font-bold leading-none mb-0.5">+</span>
             </div>
           </div>
           <span className="mt-2 text-xs text-slate-400 font-medium">Add Story</span>
        </div>

        {/* Story List */}
        {stories.map((user) => (
          <StoryCircle key={user.id} user={user} onPress={onOpenStory} />
        ))}
      </div>
    </div>
  );
};

export default StoryBar;