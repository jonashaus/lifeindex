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
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";
import HabitsListItem from "./habitsListItem";
import CreateHabitForm from "./createHabitForm";
import { useState } from "react";

const HabitsDialog = ({ habits }) => {
  const [open, setOpen] = useState(false);
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          <div className="flex justify-between items-center">
            Habits
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <CreateHabitDialog setOpen={setOpen} />
            </AlertDialog>
          </div>
        </AlertDialogTitle>
        <AlertDialogDescription>
          Create new habits or delete existing ones.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <HabitsList habits={habits} />
      <AlertDialogFooter>
        <AlertDialogAction>Close</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

const HabitsList = ({ habits }) => {
  return (
    <ScrollArea className="h-96">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Points</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {habits.length > 0 &&
            habits.map((habit, i) => <HabitsListItem key={i} habit={habit} />)}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

const CreateHabitDialog = ({ setOpen }) => {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Create new habit</AlertDialogTitle>
        <AlertDialogDescription>
          Use a short and concise name for your habit and assign it a certain
          amount of points.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <CreateHabitForm setOpen={setOpen} />
    </AlertDialogContent>
  );
};

export default HabitsDialog;
