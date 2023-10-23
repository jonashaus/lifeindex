"use client";

import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import LoginDialog from "./loginDialog";

const Login = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </AlertDialogTrigger>
      <LoginDialog />
    </AlertDialog>
  );
};

export default Login;
