"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const useSession = () => {
  const supabase = createClientComponentClient();

  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session: currentSession },
        error,
      } = await supabase.auth.getSession();

      if (currentSession && !error) {
        setSession(currentSession);
      }
    };
    getSession();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      /* console.log(`Supabase auth event: ${event}`, session); */ // it seems like the event fires too often, resolve this if it becomes a problem
      setSession(session);
    });

    // Return cleanup function from useEffect
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return session;
};

export default useSession;
