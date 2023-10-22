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
import AchievementsListItem from "./achievementsListItem";
import CreateAchievementForm from "./createAchievementsForm";
import { useState } from "react";

const AchievementsDialog = ({ achievements }) => {
  const [open, setOpen] = useState(false);
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          <div className="flex justify-between items-center">
            Achievements
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <CreateAchievementDialog setOpen={setOpen} />
            </AlertDialog>
          </div>
        </AlertDialogTitle>
        <AlertDialogDescription>
          Edit achievements or manually add new ones.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AchievementsList achievements={achievements} />
      <AlertDialogFooter>
        <AlertDialogAction>Close</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

const AchievementsList = ({ achievements }) => {
  return (
    <ScrollArea className="h-96">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Habit</TableHead>
            <TableHead>Points</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {achievements.length > 0 &&
            achievements.map((achievement, i) => (
              <AchievementsListItem key={i} achievement={achievement} />
            ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

const CreateAchievementDialog = ({ setOpen }) => {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Add an achievement</AlertDialogTitle>
        <AlertDialogDescription>
          Add achievements here to set the date manually.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <CreateAchievementForm setOpen={setOpen} />
    </AlertDialogContent>
  );
};

export default AchievementsDialog;
