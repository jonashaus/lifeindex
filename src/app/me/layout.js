import { Separator } from "@/components/ui/separator";
import Habits from "./habits/habits";
import Achievements from "./achievements/achievements";
import Weights from "./weights/weights";
import useSession from "@/hooks/serverSide/useSession";
import { LifeIndexProvider } from "./lifeIndexContext";
import { redirect } from "next/navigation";

const Layout = async ({ children }) => {
  const session = await useSession();
  if (!session) {
    redirect("/user/unauthenticated");
  }
  return (
    <div className="container">
      <div className="space-y-6 pt-8 pb-16">
        {children}
        <Separator className="my-6" />
        <LifeIndexProvider>
          <div className="flex flex-col">
            <Habits />
          </div>
          <div className="flex flex-col">
            <Achievements />
          </div>
          <div className="flex flex-col">
            <Weights />
          </div>
        </LifeIndexProvider>
      </div>
    </div>
  );
};

export default Layout;
