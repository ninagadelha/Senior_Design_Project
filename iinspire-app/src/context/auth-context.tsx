'use client'
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from 'react';

type User = {
  id: string;  
  role: string;
  programid: string;
  fullname: string;
};

type ProgramCounts = {
  programs: string;
  students: string;
  resources: string;
};

type ProgramSelection = {
  id: string | null;
  name: string | null;
  counts?: ProgramCounts;
};

type AuthContextType = {
  user: User | null;
  selectedProgram: ProgramSelection;
  login: (userData: User) => void;
  logout: () => void;
  setSelectedProgram: (programId: string, programName?: string, counts?: ProgramCounts) => void;
  removeSelectedProgram: () => void;
  isAuthenticated: boolean;
  getHomePath: () => string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [selectedProgram, setSelectedProgramState] = useState<ProgramSelection>({
      id: null,
      name: null
    });
    const router = useRouter();
  
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      const storedProgramId = localStorage.getItem('selectedProgramID');
      const storedProgramName = localStorage.getItem('selectedProgramName');
      const storedCounts = localStorage.getItem('programCounts');
      
      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedProgramId) {
        setSelectedProgramState({
          id: storedProgramId,
          name: storedProgramName || null,
          counts: storedCounts ? JSON.parse(storedCounts) : undefined
        });
      }
    }, []);
  
    const setSelectedProgram = (programId: string, programName?: string, counts?: ProgramCounts) => {
      const newSelection = {
        id: programId,
        name: programName || null,
        counts
      };
      setSelectedProgramState(newSelection);
      localStorage.setItem('selectedProgramID', programId);
      if (programName) {
        localStorage.setItem('selectedProgramName', programName);
      }
      if (counts) {
        localStorage.setItem('programCounts', JSON.stringify(counts));
      }
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
      setSelectedProgramState({ id: null, name: null });
      localStorage.removeItem('selectedProgramID');
      localStorage.removeItem('selectedProgramName');
    }
  
    const isAuthenticated = !!user;
  
    return (
        <AuthContext.Provider 
          value={{ 
            user, 
            selectedProgram,
            login, 
            logout, 
            setSelectedProgram,
            removeSelectedProgram,
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