
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, AuthState } from "@/types";
import { toast } from "@/hooks/use-toast";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, telephone: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Check for saved auth on component mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem("jobfair_user");
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser) as User;
          setState({
            user: parsedUser,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          setState((prev) => ({ ...prev, isLoading: false }));
        }
      } catch (err) {
        setState((prev) => ({ ...prev, isLoading: false }));
        console.error("Error checking authentication", err);
      }
    };

    checkAuth();
  }, []);

  // Login functionality
  const login = async (email: string, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      // Mock API call - Replace with actual API call
      // This simulates checking credentials against a database
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // For demo purposes, hardcoded admin and user credentials
      let mockUser: User | null = null;
      
      if (email === "admin@jobfair.com" && password === "admin123") {
        mockUser = {
          id: "admin-123",
          name: "Admin User",
          email: "admin@jobfair.com",
          telephone: "1234567890",
          isAdmin: true,
        };
      } else if (email === "user@example.com" && password === "password123") {
        mockUser = {
          id: "user-123",
          name: "Demo User",
          email: "user@example.com",
          telephone: "0987654321",
          isAdmin: false,
        };
      } else {
        throw new Error("Invalid credentials");
      }

      // Save user to localStorage
      localStorage.setItem("jobfair_user", JSON.stringify(mockUser));
      
      setState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${mockUser.name}!`,
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : "Login failed",
      }));
      
      toast({
        title: "Login failed",
        description: err instanceof Error ? err.message : "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  // Register functionality
  const register = async (name: string, email: string, telephone: string, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      // Mock API call - Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // In a real app, you would make an API call to create a user account
      const mockUser: User = {
        id: `user-${Math.random().toString(36).substr(2, 9)}`,
        name,
        email,
        telephone,
        isAdmin: false,
      };
      
      // Save user to localStorage
      localStorage.setItem("jobfair_user", JSON.stringify(mockUser));
      
      setState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      
      toast({
        title: "Registration successful",
        description: `Welcome, ${name}!`,
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : "Registration failed",
      }));
      
      toast({
        title: "Registration failed",
        description: err instanceof Error ? err.message : "Could not create account",
        variant: "destructive",
      });
    }
  };

  // Logout functionality
  const logout = () => {
    localStorage.removeItem("jobfair_user");
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
