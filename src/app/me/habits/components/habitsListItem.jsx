"use client";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";
import { LifeIndexContext } from "../../lifeIndexContext";
import ChangeHabitForm from "./changeHabitForm";
import { useState, useContext } from "react";

const HabitsListItem = ({ habit }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  return (
    <TableRow>
      <TableCell>{habit.name}</TableCell>
      <TableCell>{habit.points}</TableCell>
      <TableCell className="p-0 text-right">
        <div className="flex justify-end">
          <AlertDialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <EditHabitDialog habit={habit} setOpen={setEditDialogOpen} />
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Trash className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <DeleteHabitDialog habit={habit} />
          </AlertDialog>
        </div>
      </TableCell>
    </TableRow>
  );
};

const DeleteHabitDialog = ({ habit }) => {
  const { deleteHabit } = useContext(LifeIndexContext);
  const handleDeleteHabit = () => {
    deleteHabit(habit.id);
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete Habit</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this habit?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleDeleteHabit}>
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

const EditHabitDialog = ({ habit, setOpen }) => {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Edit Habit</AlertDialogTitle>
        <AlertDialogDescription>
          Changing the number of points of a habit will not affect recorded
          achievements from the past.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <ChangeHabitForm habit={habit} setOpen={setOpen} />
    </AlertDialogContent>
  );
};

export default HabitsListItem;
