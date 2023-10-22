"use client";

import useSession from "@/hooks/clientSide/useSession";
import Login from "./components/login";
import Register from "./components/register";
import UserAvatar from "./components/avatar";

const UserActions = () => {
  const session = useSession();

  return (
    <div className="flex items-center space-x-2">
      {session ? (
        <UserAvatar />
      ) : (
        <>
          <Login />
          <Register />
        </>
      )}
    </div>
  );
};

export default UserActions;
