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
import { Loader2 } from "lucide-react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

const Register = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (credentials) => {
    setLoading(true);
    const ipData = await fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((ipData) => {
        return ipData;
      });

    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        emailRedirectTo: `${location.origin}/verify`,
        data: ipData,
      },
    });

    setLoading(false);
    if (error) {
      console.log(data, error);
      toast({
        title: "Ooops - something went wrong",
        description: "Please try again.",
      });
      return;
    }

    toast({
      title: "Email Verification Required",
      description:
        "Please check your email and open the link we sent you to verify your account.",
    });
    router.refresh();
  };

  return (
    <>
      <AlertDialog modal={true}>
        <AlertDialogTrigger asChild>
          <Button>Register</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Register
            </AlertDialogTitle>
          </AlertDialogHeader>
          <CredentialsForm mode="register" onSubmit={handleRegister} />
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Register;
