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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SettingsContext } from "../settingsContext";
import { useEffect, useContext } from "react";

const accountFormSchema = z.object({
  firstName: z.string().nonempty("Please enter your first name."),
  lastName: z.string().nonempty("Please enter your last name."),
  language: z.string().nonempty("Please enter your preferred language."),
});

const AccountForm = () => {
  const { userSettings, updateUserSettings } = useContext(SettingsContext);

  const form = useForm({
    resolver: zodResolver(accountFormSchema),
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
        <AccountFormField
          control={form.control}
          name="firstName"
          label="First name"
          description="We will use your first name to address you in emails and other communication."
          renderFormControl={(field) => <Input placeholder="Tim" {...field} />}
        />
        <AccountFormField
          control={form.control}
          name="lastName"
          label="Last name"
          description="We will use your last name to address you in emails and other communication."
          renderFormControl={(field) => (
            <Input placeholder="Bergling" {...field} />
          )}
        />
        <AccountFormField
          control={form.control}
          name="language"
          label="Preferred Language"
          description="Currently, LifeIndex is only available in English - we're just asking for statistical reasons to find out whether we should translate LifeIndex to German."
          renderFormControl={(field) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select your preferred language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EN">EN - English</SelectItem>
                <SelectItem value="DE">DE - Deutsch</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <Button type="submit">Update account</Button>
      </form>
    </Form>
  );
};

const AccountFormField = ({
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

export default AccountForm;
