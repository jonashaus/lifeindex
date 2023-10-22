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
import { format } from "date-fns";
import { LifeIndexContext } from "../../lifeIndexContext";
import { useContext } from "react";

const achievementFormSchema = z.object({
  id: z.string(),
  habit_name: z.string(),
  points: z.number().int().positive("Please enter a positive number."),
  created_at: z.date(),
});

const ChangeAchievementForm = ({ achievement, setOpen }) => {
  const { updateAchievement } = useContext(LifeIndexContext);
  const form = useForm({
    resolver: zodResolver(achievementFormSchema),
    defaultValues: {
      ...achievement,
      created_at: format(new Date(achievement.created_at), "yyyy-MM-dd"),
    },
    mode: "onChange",
  });

  const submitBeforeDialogClose = async (e) => {
    e.preventDefault();
    form.handleSubmit(
      async (data) => await updateAchievement(data).then(() => setOpen(false))
    )();
  };

  /* const [calendarOpen, setCalendarOpen] = useState(false); */
  return (
    <Form {...form}>
      <form onSubmit={(e) => submitBeforeDialogClose(e)} className="space-y-8">
        <AchievementFormField
          control={form.control}
          name="habit_name"
          label="Habit"
          description="It's not possible to select a different habit."
          renderFormControl={(field) => (
            <Input disabled placeholder="My new achievement" {...field} />
          )}
        />
        <AchievementFormField
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
          description="These points will be added to your score whenever you reach a achievement."
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
        <AchievementFormField
          control={form.control}
          name="created_at"
          label="Date"
          description="When you completed this habit."
          renderFormControl={(field) => (
            <>
              <Input
                type="date"
                {...field}
                value={format(new Date(field.value), "yyyy-MM-dd")}
                onChange={(e) => field.onChange(new Date(e.target.value))}
              />
              {/* <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-fit pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      field.value.split("T")[0]
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover> */}
            </>
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

export default ChangeAchievementForm;
