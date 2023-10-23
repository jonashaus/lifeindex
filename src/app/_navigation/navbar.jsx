"use client";
import Logo from "./components/logo";
import ThemeSwitch from "./components/themeSwitch";
import UserActions from "./_userActions/userActions";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const navClass =
    pathname.split("/")[1] === "app" ? "max-w-full px-4" : "container";
  return (
    <div className="w-full">
      <nav
        className={`mx-auto py-2 flex justify-between items-center bg-background transition-maxwidth duration-1000 ${navClass}`}
      >
        <Logo />

        <div className="flex items-center space-x-2">
          <ThemeSwitch />

          <UserActions />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
