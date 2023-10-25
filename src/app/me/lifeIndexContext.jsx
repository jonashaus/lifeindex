"use client";
import { useState, useEffect, createContext } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "@/components/ui/use-toast";
import useSession from "@/hooks/clientSide/useSession";

const LifeIndexContext = createContext();

const LifeIndexProvider = ({ children }) => {
  const supabase = createClientComponentClient();
  const session = useSession();

  //#region Habits
  const [habits, setHabits] = useState({});

  const fetchHabits = async (userID) => {
    if (!userID) return {};
    const { data, error } = await supabase
      .from("v_habits")
      .select()
      .eq("user", userID)
      .order("last_achievement", { ascending: true });
    if (error) {
      toast({
        title: "Ooops, something went wrong.",
        description: error.message,
      });
      return {};
    }
    return data;
  };
  const getHabits = async () => {
    const habits = await fetchHabits(session.user.id);
    setHabits(habits);
  };

  useEffect(() => {
    if (!session?.user) return;
    getHabits();
  }, [session?.user]);

  const createHabit = async ({ name, points }) => {
    const newHabit = {
      name,
      points,
      user: session.user.id,
    };
    if (!session?.user) return;
    const { data, error } = await supabase
      .from("habits")
      .insert(newHabit)
      .select();
    if (error) {
      toast({
        title: "Ooops, something went wrong.",
        description: error.message,
      });
      return;
    }
    toast({
      title: "Habit added!",
    });
    getHabits();
  };

  const updateHabit = async (updatedHabit) => {
    console.log(updatedHabit);
    if (!session?.user) return;
    const { data, error } = await supabase
      .from("habits")
      .update(updatedHabit)
      .eq("id", updatedHabit.id);
    if (error) {
      toast({
        title: "Ooops, something went wrong.",
        description: error.message,
      });
      return;
    }
    toast({
      title: "Habit updated!",
    });
    getHabits();
  };

  const deleteHabit = async (habitID) => {
    if (!session?.user) return;
    const { data, error } = await supabase
      .from("habits")
      .delete()
      .eq("id", habitID);
    if (error) {
      toast({
        title: "Ooops, something went wrong.",
        description: error.message,
      });
      return;
    }
    toast({
      title: "Habit deleted!",
    });
    getHabits();
  };

  //#endregion

  //#region Achievements
  const [achievements, setAchievements] = useState({});

  const fetchAchievements = async (userID) => {
    if (!userID) return {};
    const { data, error } = await supabase
      .from("v_habitachievements")
      .select()
      .eq("habit_user", userID)
      .order("created_at", { ascending: false });
    if (error) {
      toast({
        title: "Ooops, something went wrong.",
        description: error.message,
      });
      return {};
    }
    return data;
  };

  const getAchievements = async () => {
    getHabits();
    const achievements = await fetchAchievements(session.user.id);
    setAchievements(achievements);
  };

  useEffect(() => {
    if (!session?.user) return;
    getAchievements();
  }, [session?.user]);

  const createAchievement = async (newAchievement) => {
    if (!session?.user) return;
    const { data, error } = await supabase
      .from("achievements")
      .insert({ ...newAchievement, created_at: new Date().toISOString() });
    if (error) {
      toast({
        title: "Ooops, something went wrong.",
        description: error.message,
      });
      return;
    }
    /* toast({
      title: "Achievement recorded!",
    }); */
    getAchievements();
  };

  const updateAchievement = async (updatedAchievement) => {
    if (!session?.user) return;
    const { data, error } = await supabase
      .from("achievements")
      .update(updatedAchievement)
      .eq("id", updatedAchievement.id);
    if (error) {
      toast({
        title: "Ooops, something went wrong.",
        description: error.message,
      });
      return;
    }
    toast({
      title: "Achievement updated!",
    });
    getAchievements();
  };

  const deleteAchievement = async (achievementID) => {
    if (!session?.user) return;
    const { data, error } = await supabase
      .from("achievements")
      .delete()
      .eq("id", achievementID);
    if (error) {
      toast({
        title: "Ooops, something went wrong.",
        description: error.message,
      });
      return;
    }
    toast({
      title: "Achievement deleted!",
    });
    getAchievements();
  };
  //#endregion

  //#region Weights
  const [weights, setWeights] = useState({});

  const fetchWeight = async (userID) => {
    if (!userID) return {};
    const { data, error } = await supabase
      .from("weights")
      .select()
      .eq("user", userID)
      .order("created_at", { ascending: false });
    if (error) {
      toast({
        title: "Ooops, something went wrong.",
        description: error.message,
      });
      return {};
    }
    return data;
  };

  const getWeights = async () => {
    const weight = await fetchWeight(session.user.id);
    setWeights(weight);
  };

  useEffect(() => {
    if (!session?.user) return;
    getWeights();
  }, [session?.user]);

  const createWeight = async (newWeight) => {
    if (!session?.user) return;

    const { data, error } = await supabase
      .from("weights")
      .insert({ ...newWeight, user: session.user.id });
    if (error) {
      toast({
        title: "Ooops, something went wrong.",
        description: error.message,
      });
      return;
    }
    toast({
      title: "Weight recorded!",
    });
    getWeights();
  };

  const updateWeight = async (updatedWeight) => {
    if (!session?.user) return;
    const { data, error } = await supabase
      .from("weights")
      .update(updatedWeight)
      .eq("id", updatedWeight.id);
    if (error) {
      toast({
        title: "Ooops, something went wrong.",
        description: error.message,
      });
      return;
    }
    toast({
      title: "Weight updated!",
    });
    getWeights();
  };

  const deleteWeight = async (weightID) => {
    if (!session?.user) return;
    const { data, error } = await supabase
      .from("weights")
      .delete()
      .eq("id", weightID);
    if (error) {
      toast({
        title: "Ooops, something went wrong.",
        description: error.message,
      });
      return;
    }
    toast({
      title: "Weight deleted!",
    });
    getWeights();
  };

  //#endregion

  return (
    <LifeIndexContext.Provider
      value={{
        habits,
        createHabit,
        updateHabit,
        deleteHabit,
        achievements,
        createAchievement,
        updateAchievement,
        deleteAchievement,
        weights,
        createWeight,
        updateWeight,
        deleteWeight,
      }}
    >
      {children}
    </LifeIndexContext.Provider>
  );
};

export { LifeIndexContext, LifeIndexProvider };
