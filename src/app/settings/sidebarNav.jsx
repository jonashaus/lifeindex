"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SidebarNav = ({ className, items, ...props }) => {
  const pathname = usePathname();

  return (
    <nav
      className={`flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 ${className}`}
      {...props}
    >
      {items.map((item) => (
        <Link
          href={item.href}
          key={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted text-muted-foreground hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
};

export default SidebarNav;
