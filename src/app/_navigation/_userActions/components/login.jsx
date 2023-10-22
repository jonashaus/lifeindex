"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
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
import { Button } from "@/components/ui/button";
import CredentialsForm from "./credentialsForm";

import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

const Login = () => {
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
    router.refresh();
    toast({ title: "Welcome back", description: "You are now logged in." });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Login</AlertDialogTitle>
        </AlertDialogHeader>
        <CredentialsForm mode="login" onSubmit={handleLogin} />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Login;
