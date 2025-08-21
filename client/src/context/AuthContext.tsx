import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    const savedAuth = localStorage.getItem('auth');
    if (savedAuth) {
      const parsedAuth = JSON.parse(savedAuth);
      setAuthState(parsedAuth);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Symulacja logowania z mock danymi
      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (user && user.isActive) {
        const updatedUser = { ...user, lastLogin: new Date().toISOString() };
        const newAuthState = {
          isAuthenticated: true,
          user: updatedUser,
        };
        
        setAuthState(newAuthState);
        localStorage.setItem('auth', JSON.stringify(newAuthState));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
    });
    localStorage.removeItem('auth');
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      // Symulacja resetowania hasła
      const user = mockUsers.find(u => u.email === email);
      if (user) {
        // W rzeczywistej aplikacji wysłalibyśmy email
        console.log(`Reset password email sent to: ${email}`);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Password reset error:', error);
      return false;
    }
  };

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};