
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  healthProfile?: {
    conditions: string[];
    medications: string[];
    allergies: string[];
    preferences: {
      dietaryRestrictions: string[];
      fitnessLevel: string;
    };
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => void;
  updateHealthProfile: (healthProfile: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("docease-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, create a fake user
      const demoUser = {
        id: "user-" + Math.random().toString(36).substring(2, 9),
        name: email.split('@')[0],
        email
      };
      
      setUser(demoUser);
      localStorage.setItem("docease-user", JSON.stringify(demoUser));
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
    } catch (error) {
      console.error("Sign in error:", error);
      toast({
        title: "Sign in failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, create a new user
      const newUser = {
        id: "user-" + Math.random().toString(36).substring(2, 9),
        name,
        email
      };
      
      setUser(newUser);
      localStorage.setItem("docease-user", JSON.stringify(newUser));
      toast({
        title: "Account created",
        description: "Your account has been successfully created.",
      });
    } catch (error) {
      console.error("Sign up error:", error);
      toast({
        title: "Sign up failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      // Simulate Google OAuth API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock Google user data
      const googleUser = {
        id: "google-" + Math.random().toString(36).substring(2, 9),
        name: "Google User",
        email: "user@gmail.com",
        photoURL: "https://lh3.googleusercontent.com/a/default-user=s64-c"
      };
      
      setUser(googleUser);
      localStorage.setItem("docease-user", JSON.stringify(googleUser));
      toast({
        title: "Google Sign-in Successful",
        description: "You have signed in with your Google account.",
      });
    } catch (error) {
      console.error("Google sign in error:", error);
      toast({
        title: "Google Sign-in Failed",
        description: "There was an issue signing in with Google. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateHealthProfile = async (healthProfile: any) => {
    if (!user) return;
    
    try {
      // Update the user with health profile
      const updatedUser = {
        ...user,
        healthProfile
      };
      
      setUser(updatedUser);
      localStorage.setItem("docease-user", JSON.stringify(updatedUser));
      
      toast({
        title: "Health Profile Updated",
        description: "Your health information has been saved successfully.",
      });
    } catch (error) {
      console.error("Error updating health profile:", error);
      toast({
        title: "Update Failed",
        description: "There was an error saving your health information.",
        variant: "destructive",
      });
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("docease-user");
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        updateHealthProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
