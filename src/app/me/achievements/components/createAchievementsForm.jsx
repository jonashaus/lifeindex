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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { LifeIndexContext } from "../../lifeIndexContext";
import { useContext } from "react";

const achievementFormSchema = z.object({
  habit: z.string().nonempty("Please choose a habit."),
  points: z.number().int().positive("Please enter a positive number."),
  created_at: z.date(),
});

const CreateAchievementForm = ({ setOpen }) => {
  const { habits, createAchievement } = useContext(LifeIndexContext);
  const form = useForm({
    resolver: zodResolver(achievementFormSchema),
    defaultValues: {
      habit: "",
      points: 10,
      created_at: new Date(),
    },
    mode: "onChange",
  });

  const submitBeforeDialogClose = async (e) => {
    e.preventDefault();
    form.handleSubmit(
      async (data) =>
        await createAchievement({
          ...data,
          habit_name: habits.find((habit) => habit.id === data.habit).name,
        }).then(() => setOpen(false))
    )();
  };

  return (
    <Form {...form}>
      <form onSubmit={(e) => submitBeforeDialogClose(e)} className="space-y-8">
        <AchievementFormField
          control={form.control}
          name="habit"
          label="Habit"
          description="Choose the habit you completed."
          renderFormControl={(field) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select your preferred language" />
              </SelectTrigger>
              <SelectContent>
                {habits.map((habit) => (
                  <SelectItem key={habit.id} value={habit.id}>
                    {habit.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <AchievementFormField
          control={form.control}
          name="created_at"
          label="Date"
          description="When you completed this habit."
          renderFormControl={(field) => (
            <Input
              type="date"
              {...field}
              value={format(new Date(field.value), "yyyy-MM-dd")}
              onChange={(e) => field.onChange(new Date(e.target.value))}
            />
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

const AchievementFormField = ({
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
      <FormItem className="flex flex-col">
        <FormLabel>{label}</FormLabel>
        <FormControl>{renderFormControl(field)}</FormControl>
        <FormDescription>{description}</FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default CreateAchievementForm;
