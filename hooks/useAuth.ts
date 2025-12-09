import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { Session, User } from '@supabase/supabase-js';
import { getCurrentUser, signIn, signOut, signUp, subscribeToAuthChanges } from '@/lib/supabase';

export type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const useProvideAuth = (): AuthContextValue => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialSessionChecked, setInitialSessionChecked] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const initialize = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoading(false);
      setInitialSessionChecked(true);
    };

    void initialize();

    const { data: listener } = subscribeToAuthChanges((_event, session: Session | null) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!initialSessionChecked) return;
    const inAuthGroup = segments[0] === '(auth)';
    if (!user && !inAuthGroup) {
      router.replace('/login');
    }
    if (user && inAuthGroup) {
      router.replace('/(protected)');
    }
  }, [user, segments, router, initialSessionChecked]);

  const handleSignIn = async (email: string, password: string) => {
    await signIn(email, password);
  };

  const handleSignUp = async (email: string, password: string) => {
    await signUp(email, password);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return useMemo(
    () => ({ user, loading, signIn: handleSignIn, signUp: handleSignUp, signOut: handleSignOut }),
    [user, loading],
  );
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = useProvideAuth();
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};
