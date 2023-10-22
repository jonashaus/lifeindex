import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import AccountForm from "./components/accountForm";
import DangerZone from "./components/dangerZone";

const ProfilePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings.
        </p>
      </div>
      <Separator />
      <AccountForm />
      <DangerZone />
    </div>
  );
};

export default ProfilePage;
