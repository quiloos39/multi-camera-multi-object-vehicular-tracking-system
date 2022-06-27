import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCarSide, faVideo } from "@fortawesome/free-solid-svg-icons";
import { StateContext } from "../context/StateProvider";

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

const NAVIGATION: NavigationType[] = [
  {
    path: "/cars",
    icon: faCarSide,
  },
  {
    path: "/cameras",
    icon: faVideo,
  },
];

type NavigationType = {
  path: string;
  icon: FontAwesomeIconProps["icon"];
};

interface NavigationProps {
  children?: React.ReactNode;
}

interface MenuProps {
  toggleCollapse: () => void;
}

function Menu({ toggleCollapse }: MenuProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  function navigateTo(path: string) {
    if (pathname === path) {
      toggleCollapse();
    } else {
      navigate(path, { replace: true });
    }
  }

  return (
    <div className="flex h-full w-16 flex-col space-y-10 bg-white py-10">
      {NAVIGATION.map((item) => (
        <FontAwesomeIcon
          key={item.path}
          icon={item.icon}
          className={`cursor-pointer text-3xl ${item.path === pathname ? "text-black" : "text-gray-300"}`}
          onClick={() => navigateTo(item.path)}
        />
      ))}
    </div>
  );
}

interface NavigationContentProps {
  toggle?: () => void;
  collapse?: boolean;
  children?: React.ReactNode;
}

export function NavigationContent({ collapse = true, toggle, children }: NavigationContentProps) {
  const width = collapse ? "w-0" : "w-[520px]";
  const rotate = collapse ? "rotate-180" : "";

  return (
    <div className="relative">
      <div className={`h-full ${width} overflow-y-scroll bg-white transition-[width] duration-500`}>
        <div className="overflow-x-hidden whitespace-nowrap p-10">{children}</div>
      </div>
      <div className="absolute top-1/2 bottom-1/2 -right-6 z-[9999]" onClick={toggle}>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
          <FontAwesomeIcon icon={faArrowLeft} className={`transition-transform ${rotate} duration-700`} />
        </div>
      </div>
    </div>
  );
}
