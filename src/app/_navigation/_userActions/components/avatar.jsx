"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback as AvatarInitials,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "lucide-react";
import useSession from "@/hooks/clientSide/useSession";
import { useRouter } from "next/navigation";
import useProfile from "@/hooks/clientSide/useProfile";
import { toast } from "@/components/ui/use-toast";

const UserAvatar = () => {
  const supabase = createClientComponentClient();
  const session = useSession();
  const profile = useProfile(session);
  const router = useRouter();

  if (!profile) return null;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    toast({ title: "Goodbye :)", description: "...and see you soon." });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar>
          {profile.firstName && profile.lastName && (
            <AvatarInitials className="uppercase">
              {profile.lastName &&
                (
                  profile.firstName.charAt(0) + profile.lastName.charAt(0)
                ).toUpperCase()}
            </AvatarInitials>
          )}
          {!profile.firstName && (
            <AvatarInitials>
              <User className="w-5 h-5" />
            </AvatarInitials>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2">
        <DropdownMenuLabel>{profile.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/settings")}>
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
