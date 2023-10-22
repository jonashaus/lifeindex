"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "@/components/ui/use-toast";

const useProfile = (session) => {
  const supabase = createClientComponentClient();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (session && session.user) {
      const getProfile = async () => {
        const userID = session.user.id;
        const { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("id", userID);

        if (error) {
          toast({
            title: "Ooops, something went wrong.",
            description: error.message,
          });
          return;
        }
        setProfile(data[0]);
      };
      getProfile();
    } else {
      setProfile(null);
    }
  }, [session]);

  return profile;
};

export default useProfile;
