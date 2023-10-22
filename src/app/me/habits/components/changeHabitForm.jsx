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
import { Slider } from "@/components/ui/slider";
import { LifeIndexContext } from "../../lifeIndexContext";
import { useContext } from "react";

const habitFormSchema = z.object({
  id: z.string(),
  name: z.string().nonempty("Please enter a name for your habit."),
  points: z.number().int().positive("Please enter a positive number."),
});

const ChangeHabitForm = ({ habit, setOpen }) => {
  const { updateHabit } = useContext(LifeIndexContext);
  const form = useForm({
    resolver: zodResolver(habitFormSchema),
    defaultValues: habit,
    mode: "onChange",
  });

  const submitBeforeDialogClose = async (e) => {
    e.preventDefault();
    form.handleSubmit(
      async (data) => await updateHabit(data).then(() => setOpen(false))
    )();
  };

  return (
    <Form {...form}>
      <form onSubmit={(e) => submitBeforeDialogClose(e)} className="space-y-8">
        <HabitFormField
          control={form.control}
          name="name"
          label="Name"
          description="Give your habit a catchy name."
          renderFormControl={(field) => (
            <Input placeholder="My new habit" {...field} />
          )}
        />
        <HabitFormField
          control={form.control}
          name="points"
          label={
            <div className="flex justify-between">
              <div>Points</div>
              <div className="text-sm text-gray-500">
                {form.watch("points")}
              </div>
            </div>
          }
          description="These points will be added to your score whenever you reach a habit."
          renderFormControl={(field) => {
            return (
              <Slider
                defaultValue={[field.value]}
                max={100}
                step={5}
                {...field}
                onValueChange={(number) => field.onChange(number[0])}
                value={field.value[0]}
              />
            );
          }}
        />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button type="submit">Save</Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
};

const HabitFormField = ({
  control,
  name,
  label,
  description,
  renderFormControl,
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>{renderFormControl(field)}</FormControl>
        <FormDescription>{description}</FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default ChangeHabitForm;
