"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import CredentialsForm from "./credentialsForm";

import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

const LoginDialog = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleLogin = async (credentials) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });
    if (error) {
      console.log(data, error);
      toast({
        title: "Ooops - something went wrong",
        description: error.message,
      });
      return;
    }
    router.push("/me");
    toast({ title: "Welcome back", description: "You are now logged in." });
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Login</AlertDialogTitle>
      </AlertDialogHeader>
      <CredentialsForm mode="login" onSubmit={handleLogin} />
    </AlertDialogContent>
  );
};

export default LoginDialog;
