"use client";
import { useState, useEffect, createContext } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "@/components/ui/use-toast";
import useSession from "@/hooks/clientSide/useSession";

const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
  const supabase = createClientComponentClient();
  const session = useSession();

  const [userSettings, setUserSettings] = useState({});

  const fetchUserSettings = async (userID) => {
    if (!userID) return {};
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", userID);
    if (error) {
      toast({
        title: "Ooops, something went wrong.",
        description: error.message,
      });
      return {};
    }
    return data[0];
  };

  useEffect(() => {
    if (!session?.user) return;
    const getUserSettings = async () => {
      const settings = await fetchUserSettings(session.user.id);
      setUserSettings(settings);
    };
    getUserSettings();
  }, [session?.user]);

  const updateUserSettings = async (newSettings) => {
    if (!session?.user) return;
    const { data, error } = await supabase
      .from("profiles")
      .update(newSettings)
      .eq("id", session.user.id);
    if (error) {
      toast({
        title: "Ooops, something went wrong.",
        description: error.message,
      });
      return;
    }
    toast({
      title: "The following settings were saved successfully:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(newSettings, null, 2)}
          </code>
        </pre>
      ),
    });
    setUserSettings(await fetchUserSettings(session.user.id));
  };

  return (
    <SettingsContext.Provider value={{ userSettings, updateUserSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, SettingsProvider };
