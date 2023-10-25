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
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import CredentialsForm from "@/app/_navigation/_userActions/components/credentialsForm";
import { Lock, Mail, Trash } from "lucide-react";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export const ChangePassword = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleChangePassword = async (credentials) => {
    console.log(credentials.password);
    const { data, error } = await supabase.auth.updateUser({
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
    toast({
      title: "Done!",
      description: "Your password was changed successfully.",
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Lock className="mr-2" size={16} /> Change Password
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>New Password</AlertDialogTitle>
        </AlertDialogHeader>
        <CredentialsForm
          mode="changePassword"
          onSubmit={handleChangePassword}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const ChangeEmail = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleChangeEmail = async (credentials) => {
    const { data, error } = await supabase.auth.updateUser({
      email: credentials.email,
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
    toast({
      title: "Confirmation Required",
      description:
        "Please confirm the change of your email address from both your old and your new email address",
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Mail className="mr-2" size={16} /> Change Email
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>New Email</AlertDialogTitle>
          <AlertDialogDescription>
            To complete the process of changing your email, you'll need to
            confirm the change from both your old and new email addresses. To
            facilitate this, we'll send a confirmation email to each address,
            which you'll need to verify.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <CredentialsForm mode="changeEmail" onSubmit={handleChangeEmail} />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const DeleteAccount = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const confirmationRef1 = useRef();
  const confirmationRef2 = useRef();

  const handleDeleteAccount = async () => {
    if (
      !(
        confirmationRef1.current.dataset.state == "checked" &&
        confirmationRef2.current.dataset.state == "checked"
      )
    ) {
      toast({
        title: "Confirmation Required",
        description:
          "Please confirm that you understand that deleting your account cannot be undone.",
      });
      return;
    }
    const { data, error } = await supabase.rpc("handle_delete_user");
    if (error) {
      console.log(data, error);
      toast({
        title: "Ooops - something went wrong",
        description: error.message,
      });
      return;
    }
    await supabase.auth.signOut();
    router.push("/");
    toast({
      title: "Account deleted successfully",
      description:
        "Fare well dear friend. Thank you for using LifeIndex - we will miss you :(",
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash className="mr-2" size={16} /> Delete Account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Account</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="space-y-4">
          <div>
            Are you sure you want to delete your account? This action cannot be
            undone.
          </div>
          <div className="flex items-center">
            <Switch ref={confirmationRef1} className="mr-3" /> I understand that
            this action cannot be undone.
          </div>
          <div className="flex items-center">
            <Switch ref={confirmationRef2} className="mr-3" /> I wont come
            crawling back asking to restore my account.
          </div>
        </AlertDialogDescription>
        <AlertDialogFooter className="justify-between">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={handleDeleteAccount}>
            Delete Account Permanently
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
