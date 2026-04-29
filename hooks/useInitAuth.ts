// hooks/useInitAuth.ts
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase-client';
import { useAuthStore } from '@/store/useAuth';

export function useInitAuth() {
  let initPromise: Promise<void> | null = null;

  useEffect(() => {
    initPromise ??= useAuthStore.getState().initUser();
    // const { initUser } = useAuthStore.getState();
    // initUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      useAuthStore.setState({ user: session?.user ?? null });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
}
