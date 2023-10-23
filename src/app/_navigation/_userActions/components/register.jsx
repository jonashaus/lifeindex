"use client";

import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import RegisterDialog from "./registerDialog";

const Register = () => {
  return (
    <>
      <AlertDialog modal={true}>
        <AlertDialogTrigger asChild>
          <Button>Register</Button>
        </AlertDialogTrigger>
        <RegisterDialog />
      </AlertDialog>
    </>
  );
};

export default Register;
