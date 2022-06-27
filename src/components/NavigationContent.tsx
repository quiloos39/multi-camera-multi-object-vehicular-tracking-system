import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export interface NavigationContentProps {
  toggle?: () => void;
  collapse?: boolean;
  children?: React.ReactNode;
}

export function NavigationContent({ collapse = true, toggle, children }: NavigationContentProps) {
  const width = collapse ? "w-0" : "w-[520px]";
  const rotate = collapse ? "rotate-180" : "";

  return (
    <div className="relative">
      <div className={`h-full ${width} no-scrollbar overflow-y-scroll bg-white transition-[width] duration-500`}>
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
