// context/auth-context.tsx
'use client'
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from 'react';

type User = {
  id: string;  
  role: string;
  programid: string;
  fullname: string;
  // other user fields that we need access to later in project
};

type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  getHomePath: () => string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
  
    useEffect(() => {
      // Initialize from localStorage on mount
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
            setUser(JSON.parse(storedUser));
        } catch (e) {
            console.error('Failed to parse user data:', e);
            localStorage.removeItem('user');
        }
      }
    }, []);
  
    //sets user to be stored in local storgae
    const login = (userData: User) => {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    };
  
    //removes user from local storage
    const logout = () => {
      setUser(null);
      localStorage.removeItem('user');
      router.push('/');
    };

    const getHomePath = () => {
        if (!user) return "/"; // Default for logged out users
        switch(user.role.toLowerCase()) {
          case 'student': 
            return '/student-home';
          case 'programcoordinator':
            return '/pc-home';
          case 'admin':
            return '/admin-home';
          default:
            return '/';
        }
      };
  
    const isAuthenticated = !!user;
  
    return (
        <AuthContext.Provider 
          value={{ 
            user, 
            login, 
            logout, 
            isAuthenticated,
            getHomePath
          }}
        >
        {children}
      </AuthContext.Provider>
    );
  }
  
  export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  }