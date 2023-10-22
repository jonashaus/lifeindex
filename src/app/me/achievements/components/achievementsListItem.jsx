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
import ChangeAchievementForm from "./changeAchievementForm";
import { useState, useContext } from "react";

const AchievementsListItem = ({ achievement }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  return (
    <TableRow>
      <TableCell>{achievement.habit_name}</TableCell>
      <TableCell>{achievement.points}</TableCell>
      <TableCell>
        {new Date(achievement.created_at).toLocaleDateString()}
      </TableCell>
      <TableCell className="p-0 overflow-x-auto">
        <div className="flex justify-end">
          <AlertDialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <EditAchievementDialog
              achievement={achievement}
              setOpen={setEditDialogOpen}
            />
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Trash className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <DeleteAchievementDialog achievement={achievement} />
          </AlertDialog>
        </div>
      </TableCell>
    </TableRow>
  );
};

const DeleteAchievementDialog = ({ achievement }) => {
  const { deleteAchievement } = useContext(LifeIndexContext);
  const handleDeleteAchievement = () => {
    deleteAchievement(achievement.id);
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete Achievement</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this achievement?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleDeleteAchievement}>
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

const EditAchievementDialog = ({ achievement, setOpen }) => {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Edit Achievement</AlertDialogTitle>
        <AlertDialogDescription>
          Changing the number of points of a achievement will not affect
          recorded achievements from the past.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <ChangeAchievementForm achievement={achievement} setOpen={setOpen} />
    </AlertDialogContent>
  );
};

export default AchievementsListItem;
