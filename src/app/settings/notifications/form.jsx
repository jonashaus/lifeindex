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
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { SettingsContext } from "../settingsContext";
import { useEffect, useContext } from "react";

const notificationsFormSchema = z.object({
  productNotifications: z.boolean(),
  systemNotifications: z.boolean(),
});

const NotificationsForm = () => {
  const { userSettings, updateUserSettings } = useContext(SettingsContext);

  const form = useForm({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: userSettings,
    mode: "onChange",
  });

  useEffect(() => {
    form.reset(userSettings);
  }, [userSettings]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(updateUserSettings)}
        className="space-y-8"
      >
        <NotificationItem
          control={form.control}
          name="productNotifications"
          label="Product Development"
          description="Stay updated about new features and improvements."
        />
        <NotificationItem
          control={form.control}
          name="systemNotifications"
          label="System & Security"
          description="We are legally obligated to give you updates on security."
          disabled
        />
        <Button type="submit">Update notifications</Button>
      </form>
    </Form>
  );
};

const NotificationItem = ({
  control,
  name,
  label,
  description,
  disabled = false,
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <FormLabel className="text-base">{label}</FormLabel>
          <FormDescription>{description}</FormDescription>
        </div>
        <FormControl>
          <Switch
            checked={field.value}
            onCheckedChange={field.onChange}
            disabled={disabled}
          />
        </FormControl>
      </FormItem>
    )}
  />
);

export default NotificationsForm;
