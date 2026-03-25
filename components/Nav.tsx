import { ModeToggle } from "./ui/toggle";
import { Show, UserButton } from "@clerk/nextjs";

const Nav = () => {
  return (
    <div className="flex justify-between py-5">
      <ModeToggle />
      <UserButton />
    </div>
  );
};

export default Nav;
