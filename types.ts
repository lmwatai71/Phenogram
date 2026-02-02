export interface Message {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  isThinking?: boolean;
}

export interface User {
  id: string;
  username: string;
  handle: string;
  avatar: string;
  bio?: string;
  stats?: {
    followers: number;
    following: number;
    posts: number;
  };
}

export type FeatureView = 'stream' | 'explore' | 'chat' | 'grow-journals' | 'crews' | 'profile';

export interface Strain {
  name: string;
  type: string;
  thc: string;
  terpenes: string[];
  description: string;
}

export interface PostIdea {
  title: string;
  format: string;
  description: string;
}
