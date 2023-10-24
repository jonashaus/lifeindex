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

const weightFormSchema = z.object({
  weight: z.number(),
  created_at: z.date(),
});

const CreateWeightForm = ({ setOpen }) => {
  const { createWeight } = useContext(LifeIndexContext);
  const form = useForm({
    resolver: zodResolver(weightFormSchema),
    defaultValues: {
      created_at: new Date(),
      weight: 0,
    },
    mode: "onChange",
  });

  const submitBeforeDialogClose = async (e) => {
    e.preventDefault();
    console.log("CREATING WEIGHT");
    form.handleSubmit(
      async (data) => await createWeight(data).then(() => setOpen(false))
    )();
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
                  step="any"
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseFloat(e.target.value.replace(",", ".")))
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
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={format(new Date(field.value), "yyyy-MM-dd")}
                  onChange={(e) => field.onChange(new Date(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Enter the date you weighed yourself.
              </FormDescription>
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

export default CreateWeightForm;
