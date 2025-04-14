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
  selectedProgram: string | null;
  login: (userData: User) => void;
  logout: () => void;
  setSelectedProgram: (programId: string) => void;
  isAuthenticated: boolean;
  getHomePath: () => string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
    const router = useRouter();
  
    useEffect(() => {
      // Initialize from localStorage on mount
      const storedUser = localStorage.getItem('user');
      const storedProgram = localStorage.getItem('selectedProgram');
      
      if (storedUser) {
        try {
            setUser(JSON.parse(storedUser));
        } catch (e) {
            console.error('Failed to parse user data:', e);
            localStorage.removeItem('user');
        }
      }
      
      if (storedProgram) {
        setSelectedProgram(storedProgram);
      }
    }, []);
  
    const handleSetProgram = (programId: string) => {
      setSelectedProgram(programId);
      localStorage.setItem('selectedProgram', programId);
    };
  
    const login = (userData: User) => {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    };
  
    const logout = () => {
      setUser(null);
      localStorage.removeItem('user');
      removeSelectedProgram();
      router.push('/');
    };

    const getHomePath = () => {
        if (!user || !isAuthenticated) return "/";
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

    const removeSelectedProgram = () => {
      setSelectedProgram(null);
      localStorage.removeItem('selectedProgram');
    }
  
    const isAuthenticated = !!user;
  
    return (
        <AuthContext.Provider 
          value={{ 
            user, 
            selectedProgram,
            login, 
            logout, 
            setSelectedProgram: handleSetProgram,
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