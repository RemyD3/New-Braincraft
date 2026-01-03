import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface UserContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  consumeFreeTest: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string) => {
    // Simulation of login
    setUser({
      id: 'u_' + Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email,
      isFirstTestFree: true,
      isAdmin: email.includes('admin'),
    });
  };

  const logout = () => {
    setUser(null);
  };

  const consumeFreeTest = () => {
    if (user) {
      setUser({ ...user, isFirstTestFree: false });
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, consumeFreeTest }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};