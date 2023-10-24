"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { LifeIndexContext } from "../../lifeIndexContext";
import { useContext } from "react";
import { toast } from "@/components/ui/use-toast";

const weightFormSchema = z.object({
  id: z.number().int(),
  created_at: z.date(),
  weight: z.number(),
});

const ChangeWeightForm = ({ weight, setOpen }) => {
  const { updateWeight } = useContext(LifeIndexContext);
  const form = useForm({
    resolver: zodResolver(weightFormSchema),
    defaultValues: {
      ...weight,
      created_at: format(new Date(weight.created_at), "yyyy-MM-dd"),
    },
    mode: "onChange",
  });

  const submitBeforeDialogClose = async (e) => {
    e.preventDefault();
    form.handleSubmit(
      async (data) => await updateWeight(data).then(() => setOpen(false))
    )();
  };

  const handleWeightInput = (value) => {
    toast({ title: `Value: --${value}--` });
    console.log(value);
    if (value === "") {
      return 0;
    }
    if (value.slice(-1) == ".") {
      return parseFloat(value.substr(0, value.length - 1));
    }
    return parseFloat(value.replace(",", "."));
  };

  return (
    <Form {...form}>
      <form onSubmit={(e) => submitBeforeDialogClose(e)} className="space-y-8">
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="42.0"
                  {...field}
                  onChange={(e) =>
                    field.onChange(handleWeightInput(e.target.value))
                  }
                />
              </FormControl>
              <FormDescription>Enter your weight in kilograms.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="created_at"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={format(new Date(field.value), "yyyy-MM-dd")}
                  onChange={(e) => field.onChange(new Date(e.target.value))}
                />
              </FormControl>
              <FormDescription>Enter your weight in kilograms.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button type="submit">Save</Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
};

export default ChangeWeightForm;
