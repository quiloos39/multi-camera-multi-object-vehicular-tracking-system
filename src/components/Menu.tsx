import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { faCarSide, faVideo } from "@fortawesome/free-solid-svg-icons";

type NavigationType = {
  path: string;
  icon: FontAwesomeIconProps["icon"];
};

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

export interface MenuProps {
  toggleCollapse: () => void;
}

export function Menu({ toggleCollapse }: MenuProps) {
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
