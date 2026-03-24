import React from "react";
import { ModeToggle } from "./ui/toggle";
import { Show, UserButton } from "@clerk/nextjs";

const Nav = () => {
  return (
    <div className="flex justify-between py-5">
      <ModeToggle />
      <Show when="signed-in">
        <UserButton />
      </Show>
    </div>
  );
};

export default Nav;
