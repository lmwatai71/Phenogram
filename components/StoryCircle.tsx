import React from 'react';

interface StoryUser {
  id: string;
  username: string;
  avatar: string;
  hasUnseenStories: boolean;
}

interface StoryCircleProps {
  user: StoryUser;
  onPress: (user: StoryUser) => void;
}

const StoryCircle: React.FC<StoryCircleProps> = ({ user, onPress }) => {
  return (
    <button 
      onClick={() => onPress(user)}
      className="flex flex-col items-center mr-4 group focus:outline-none shrink-0"
    >
      <div className={`p-[3px] rounded-full border-2 transition-all duration-300 ${
        user.hasUnseenStories 
          ? 'border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
          : 'border-slate-700 group-hover:border-slate-500'
      }`}>
        <div className="w-16 h-16 rounded-full p-0.5 bg-slate-900 overflow-hidden">
          <img 
            src={user.avatar} 
            alt={user.username} 
            className="w-full h-full rounded-full object-cover transition-transform duration-300 group-hover:scale-110" 
          />
        </div>
      </div>
      <span className="mt-2 text-xs text-slate-400 font-medium group-hover:text-white transition-colors truncate max-w-[70px]">
        {user.username}
      </span>
    </button>
  );
};

export default StoryCircle;