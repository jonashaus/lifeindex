import SidebarNav from "./sidebarNav";
import { Separator } from "@/components/ui/separator";
import { SettingsProvider } from "./settingsContext";
import useSession from "@/hooks/serverSide/useSession";
import { redirect } from "next/navigation";

const sidebarNavItems = [
  {
    title: "Account",
    href: "/settings",
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
  },
];

const Layout = async ({ children }) => {
  const session = await useSession();
  if (!session) {
    redirect("/user/unauthenticated");
  }
  return (
    <div className="container">
      <div className="space-y-6 pt-8 pb-16">
        <div className="space-y-0 5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">
            <SettingsProvider>{children}</SettingsProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
