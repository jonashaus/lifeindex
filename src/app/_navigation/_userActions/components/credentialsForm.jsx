"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "@/components/ui/use-toast";

const Modes = {
  login: {
    showEmail: true,
    showPassword: true,
    showForgotPassword: true,
    submitButtonLabel: "Login",
    formSchema: z.object({
      email: z
        .string()
        .nonempty({ message: "Required" })
        .email({ message: "Please enter a valid email address." }),
      password: z
        .string()
        .nonempty({ message: "Required" })
        .min(6, { message: "Password must be at least 6 characters." }),
    }),
  },
  register: {
    showEmail: true,
    showPassword: true,
    showForgotPassword: false,
    submitButtonLabel: "Register",
    formSchema: z.object({
      email: z
        .string()
        .nonempty({ message: "Required" })
        .email({ message: "Please enter a valid email address." }),
      password: z
        .string()
        .nonempty({ message: "Required" })
        .min(6, { message: "Password must be at least 6 characters." }),
    }),
  },
  changePassword: {
    showEmail: false,
    showPassword: true,
    showForgotPassword: false,
    submitButtonLabel: "Save",
    formSchema: z.object({
      password: z
        .string()
        .nonempty({ message: "Required" })
        .min(6, { message: "Password must be at least 6 characters." }),
    }),
  },
  changeEmail: {
    showEmail: true,
    showPassword: false,
    showForgotPassword: false,
    submitButtonLabel: "Save",
    formSchema: z.object({
      email: z
        .string()
        .nonempty({ message: "Required" })
        .email({ message: "Please enter a valid email address." }),
    }),
  },
};

const CredentialsForm = ({ mode, onSubmit }) => {
  const [modeConfig, setModeConfig] = useState({});

  const form = useForm({
    resolver: zodResolver(modeConfig.formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    setModeConfig(Modes[mode]);
  }, [mode]);

  if (!modeConfig) return null;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        noValidate
      >
        {modeConfig.showEmail && <FieldEmail control={form.control} />}
        {modeConfig.showPassword && (
          <FieldPassword control={form.control} modeConfig={modeConfig} />
        )}
        <AlertDialogFooter className="justify-between">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button type="submit">{modeConfig.submitButtonLabel}</Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
};

const FieldEmail = ({ control }) => {
  return (
    <FormField
      name="email"
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const FieldPassword = ({ control, modeConfig }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormField
      name="password"
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <div
              className={`flex items-center justify-between ${
                modeConfig.showForgotPassword && "-mb-2"
              }`}
            >
              <div className="flex items-center justify-between">
                Password
                <div
                  className="ml-1"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </div>
              </div>
              {modeConfig.showForgotPassword && (
                <>
                  <ForgotPassword />
                  {/* <Button
                  type="button"
                  variant="link"
                  className="p-0 font-normal"
                >
                  Forgot password?
                </Button> */}
                </>
              )}
            </div>
          </FormLabel>
          <FormControl>
            <Input type={showPassword ? "text" : "password"} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const ForgotPassword = () => {
  const ref = useRef();
  const supabase = createClientComponentClient();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.resetPasswordForEmail(
      ref.current.value,
      {
        redirectTo: `${location.origin}/settings`,
      }
    );
    if (error) {
      console.log(data, error);
      toast({
        title: "Ooops - something went wrong",
        description: error.message,
      });
      return;
    }
    toast({
      title: "Password Reset",
      description:
        "Please check your email and open the link we sent you to reset your password.",
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant="link" className="p-0 font-normal">
          Forgot password?
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={handleResetPassword}>
          <AlertDialogHeader>
            <AlertDialogTitle>Password Reset</AlertDialogTitle>
            <AlertDialogDescription>
              Enter your email address and we will send you a recovery link.
              <Input
                ref={ref}
                type="email"
                placeholder="Email"
                className="my-2"
                required
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button type="submit">Continue</Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CredentialsForm;
