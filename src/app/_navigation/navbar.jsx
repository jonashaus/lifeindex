"use client";
import Logo from "./components/logo";
import ThemeSwitch from "./components/themeSwitch";
import UserActions from "./_userActions/userActions";

const Navbar = () => {
  return (
    <div className="w-full">
      <nav className="mx-auto py-2 flex justify-between items-center bg-background container">
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
