import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChangePassword, ChangeEmail, DeleteAccount } from "./accountDialogs";

const DangerZone = () => {
  return (
    <Card className="border-none shadow-none space-y-1">
      <CardHeader className="p-0 pb-2 space-y-1">
        <CardTitle className="text-base">Danger Zone</CardTitle>
        <CardDescription>
          These actions will affect your credentials and account.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between p-0 pt-0">
        <ChangePassword />
        <ChangeEmail />
        <DeleteAccount />
      </CardContent>
    </Card>
  );
};

export default DangerZone;
