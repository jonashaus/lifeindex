import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="text-transparent max-w-fit text-lg font-medium">
          Profile
        </Skeleton>
        <Skeleton className="text-transparent max-w-fit text-sm">
          This is how others will see you on the site.
        </Skeleton>
      </div>
      <Separator />
      <div className="space-y-8">
        <div className="space-y-2">
          <Skeleton className="text-transparent max-w-fit text-sm font-medium">
            Initials
          </Skeleton>
          <Skeleton className="text-transparent w-full text-sm h-10" />
          <Skeleton className="text-transparent max-w-fit text-sm">
            These will be shown if other users mention you in a comment.
          </Skeleton>
        </div>
        <div className="space-y-2">
          <Skeleton className="text-transparent max-w-fit text-sm font-medium">
            Email
          </Skeleton>
          <Skeleton className="text-transparent w-full text-sm h-10" />
          <Skeleton className="text-transparent max-w-fit text-sm">
            It is not possible to change your email address once you have
            registered.
          </Skeleton>
        </div>
        <Skeleton className="text-transparent max-w-fit h-10">
          Update profile
        </Skeleton>
      </div>
    </div>
  );
}
