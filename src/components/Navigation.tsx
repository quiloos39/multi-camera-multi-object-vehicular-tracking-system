import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StateContext } from "../context/StateProvider";
import { CameraIcon } from "./CameraIcon";
import { CarIcon } from "./CarIcon";
import { NavigationContent } from "./NavigationContent";

interface MenuIconsProps {
  children?: React.ReactNode;
}

function MenuIcons({ children }: MenuIconsProps) {
  return (
    <div className="w-[48px]">
      <div className="flex flex-col items-center py-10 space-y-7">{children}</div>
    </div>
  );
}

interface NavigationProps {
  children?: React.ReactNode;
}

export function Navigation({ children }: NavigationProps) {
  const {
    state: {
      state: { showMenu },
      dispatch,
    },
  } = useContext(StateContext);

  const { pathname } = useLocation();

  const navigate = useNavigate();

  function toggleMenu() {
    dispatch({ type: "menu/toggle" });
  }

  function navigateTo(to: string) {
    if (pathname !== to) {
      navigate(to);
    } else {
      toggleMenu();
    }
  }

  const isCurrentPath = (to: string) => (to === pathname ? "black" : "gray");
  return (
    <div className="inline-flex bg-white">
      <MenuIcons>
        <CarIcon
          height={32}
          width={32}
          className="cursor-pointer"
          fill={isCurrentPath("/cars")}
          onClick={() => navigateTo("/cars")}
        />
        <CameraIcon
          height={32}
          width={32}
          className="cursor-pointer"
          fill={isCurrentPath("/cameras")}
          onClick={() => navigateTo("/cameras")}
        />
      </MenuIcons>
      <NavigationContent toggleMenu={toggleMenu} show={showMenu}>
        {children}
      </NavigationContent>
    </div>
  );
}
