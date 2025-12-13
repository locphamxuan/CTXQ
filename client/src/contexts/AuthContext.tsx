import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { AuthUser } from '../types/content';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: AuthUser, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user từ localStorage khi component mount
    const loadUser = () => {
      try {
        const userStr = localStorage.getItem('auth_user');
        const token = localStorage.getItem('auth_token');
        
        if (userStr && token) {
          const userData = JSON.parse(userStr);
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Error loading user from localStorage:', err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();

    // Listen for storage changes (khi đăng nhập/đăng xuất ở tab khác)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth_user' || e.key === 'auth_token') {
        loadUser();
      }
    };

    // Listen for custom event (khi đăng nhập/đăng xuất trong cùng tab)
    const handleAuthChange = () => {
      loadUser();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('auth-change', handleAuthChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, []);

  const login = (userData: AuthUser, token: string) => {
    localStorage.setItem('auth_user', JSON.stringify(userData));
    localStorage.setItem('auth_token', token);
    setUser(userData);
    // Dispatch custom event để notify các components khác
    window.dispatchEvent(new Event('auth-change'));
  };

  const logout = () => {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
    setUser(null);
    // Dispatch custom event để notify các components khác
    window.dispatchEvent(new Event('auth-change'));
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

