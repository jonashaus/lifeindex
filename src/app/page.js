"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import LoginDialog from "./_navigation/_userActions/components/loginDialog";
import RegisterDialog from "./_navigation/_userActions/components/registerDialog";
import useSession from "@/hooks/clientSide/useSession";
import Link from "next/link";

export default function Home() {
  const session = useSession();
  return (
    <div
      className="container flex flex-col justify-center items-center space-y-8 md:flex-row md:justify-between "
      style={{ minHeight: "91vh" }}
    >
      <div className="text-center md:text-start">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          LifeIndex
        </h1>
        <p className="scroll-m-20 text-xl text-gray-500 lg:text-2xl">
          A place to track your habits
        </p>
        {session && (
          <Button className="mt-4">
            <Link href="/me">Your Dashboard</Link>
          </Button>
        )}
        {!session && (
          <p className="text-sm text-muted-foreground">
            To get started, please{" "}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="link" className="px-0">
                  register
                </Button>
              </AlertDialogTrigger>
              <RegisterDialog />
            </AlertDialog>{" "}
            or{" "}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="link" className="px-0">
                  login
                </Button>
              </AlertDialogTrigger>
              <LoginDialog />
            </AlertDialog>
            .
          </p>
        )}
      </div>
      <div className="flex justify-center md:justify-end">
        <Image
          src="/home.svg"
          alt="Woman with checklist"
          width={1}
          height={1}
          style={{ width: "70%", height: "auto" }}
        />
      </div>
    </div>
  );
}
