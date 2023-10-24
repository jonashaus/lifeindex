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
import ChangeWeightForm from "./changeWeightForm";
import { useState, useContext } from "react";

const WeightsListItem = ({ weight }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  return (
    <TableRow>
      <TableCell>{weight.weight}</TableCell>
      <TableCell>{new Date(weight.created_at).toLocaleDateString()}</TableCell>
      <TableCell className="p-0 overflow-x-auto">
        <div className="flex justify-end">
          <AlertDialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <EditWeightDialog weight={weight} setOpen={setEditDialogOpen} />
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Trash className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <DeleteWeightDialog weight={weight} />
          </AlertDialog>
        </div>
      </TableCell>
    </TableRow>
  );
};

const DeleteWeightDialog = ({ weight }) => {
  const { deleteWeight } = useContext(LifeIndexContext);
  const handleDeleteWeight = () => {
    deleteWeight(weight.id);
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete Weight</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this weight?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleDeleteWeight}>
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

const EditWeightDialog = ({ weight, setOpen }) => {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Edit Weight</AlertDialogTitle>
        <AlertDialogDescription>Add your weight.</AlertDialogDescription>
      </AlertDialogHeader>
      <ChangeWeightForm weight={weight} setOpen={setOpen} />
    </AlertDialogContent>
  );
};

export default WeightsListItem;
