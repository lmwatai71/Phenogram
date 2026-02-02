import { User } from '../types';

const USERS_KEY = 'phenogram_users_db_v1';
const CURRENT_USER_KEY = 'phenogram_active_session_v1';

// Helper to get users from "DB"
const getUsersDB = (): User[] => {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
};

// Helper to save users to "DB"
const saveUsersDB = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const loginUser = async (username: string, password: string): Promise<User> => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 800));

  const users = getUsersDB();
  // Simple check - in a real app, verify hash
  const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
  
  // For demo, we are skipping actual password check logic since we store it raw/mock
  // In a real app, user would have a password field.
  // Here we just check if user exists for simplicity, or if it's a new "session".
  
  if (!user) {
    throw new Error("We couldn't find that grower tag. Try signing up?");
  }

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return user;
};

export const signupUser = async (username: string, password: string, handle: string): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const users = getUsersDB();
  
  if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
    throw new Error("That username is already in the rotation. Pick another.");
  }

  if (users.some(u => u.handle.toLowerCase() === handle.toLowerCase())) {
    throw new Error("Handle already taken. Your brand needs to be unique.");
  }

  const cleanHandle = handle.startsWith('@') ? handle : `@${handle}`;

  const newUser: User = {
    id: Date.now().toString(),
    username,
    handle: cleanHandle,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}&backgroundColor=b6e3f4`,
    bio: "Just planted my seeds 🌱",
    stats: {
      followers: 0,
      following: 0,
      posts: 0
    }
  };

  users.push(newUser);
  saveUsersDB(users);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
  
  return newUser;
};

export const getCurrentUser = (): User | null => {
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
};

export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};
