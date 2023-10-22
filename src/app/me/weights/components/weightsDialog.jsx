"use client";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
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
import WeightsListItem from "./weightsListItem";
import CreateWeightForm from "./createWeightsForm";
import { useState } from "react";

const WeightsDialog = ({ weights }) => {
  const [open, setOpen] = useState(false);
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          <div className="flex justify-between items-center">
            Weights
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <CreateWeightDialog setOpen={setOpen} />
            </AlertDialog>
          </div>
        </AlertDialogTitle>
        <AlertDialogDescription>
          Edit weights or manually add new ones.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <WeightsList weights={weights} />
      <AlertDialogFooter>
        <AlertDialogAction>Close</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

const WeightsList = ({ weights }) => {
  return (
    <ScrollArea className="h-96">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Weight</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {weights.length > 0 &&
            weights.map((weight, i) => (
              <WeightsListItem key={i} weight={weight} />
            ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export const CreateWeightDialog = ({ setOpen }) => {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Add a weight</AlertDialogTitle>
        <AlertDialogDescription>
          Add your weight for today.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <CreateWeightForm setOpen={setOpen} />
    </AlertDialogContent>
  );
};

export default WeightsDialog;
