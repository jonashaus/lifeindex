"use client";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Pencil } from "lucide-react";
import { LifeIndexContext } from "../lifeIndexContext";
import { useContext } from "react";
import HabitsDialog from "./components/habitsDialog";

const Habits = () => {
  const { habits } = useContext(LifeIndexContext);
  return (
    <>
      <div className="flex justify-between items-center">
        <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
          Habits
        </h4>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <HabitsDialog habits={habits} />
        </AlertDialog>
      </div>
      {habits.length == 0 && <div className="mt-0">No habits yet</div>}
      {habits.length > 0 && (
        <div className="mt-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 w-full">
          {habits.map((habit, i) => (
            <Habit key={i} habit={habit} />
          ))}
        </div>
      )}
    </>
  );
};

const Habit = ({ habit }) => {
  const { createAchievement } = useContext(LifeIndexContext);
  const handleAddAchievement = () => {
    createAchievement({
      habit: habit.id,
      habit_name: habit.name,
      points: habit.points,
    });
  };
  return (
    <Button
      // if habit.last_achievement is today, set the variant to "outline"
      variant={
        new Date(habit.last_achievement).toLocaleDateString() ===
        new Date().toLocaleDateString()
          ? "outline"
          : ""
      }
      className="h-16 md:h-24 relative overflow-hidden"
      onClick={handleAddAchievement}
    >
      <small className="text-xs font-medium leading-1 whitespace-normal md:text-sm">
        {habit.name}
      </small>
      <div className="-mt-1.5 absolute top-0 right-0 transition transform translate-x-[-2px]">
        <div className="p-2 text-xs md:text-sm">+{habit.points}</div>
      </div>
    </Button>
  );
};

export default Habits;
