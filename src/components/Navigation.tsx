import React, { useContext } from "react";
import { StateContext } from "../context/StateProvider";
import { Menu } from "./Menu";
import { NavigationContent } from "./NavigationContent";

export function Navigation({ children }: NavigationProps) {
  const { state, dispatch } = useContext(StateContext);

  function toggle() {
    dispatch({ type: "menu/toggle" });
  }

  return (
    <div className="flex">
      <Menu toggleCollapse={toggle} />
      <NavigationContent collapse={!state.showMenu} toggle={toggle}>
        {children}
      </NavigationContent>
    </div>
  );
}

interface NavigationProps {
  children?: React.ReactNode;
}
