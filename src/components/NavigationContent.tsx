import React from "react";
import Right from "../assets/ant-design_double-right-outlined.svg";

interface CloseButtonProps {
  showContent: boolean;
  toggleShowContent: () => void;
}

export function CloseButton({ showContent, toggleShowContent }: CloseButtonProps) {
  const rotation = showContent ? "" : "rotate-180";
  return (
    <div className="absolute top-1/2 bottom-1/2 -right-6 z-[500]">
      <div
        className="flex items-center justify-center w-12 h-12 bg-white rounded-full cursor-pointer"
        onClick={toggleShowContent}
      >
        <img src={Right} alt="" width={24} height={24} className={`transition-transform duration-500 ${rotation}`} />
      </div>
    </div>
  );
}

interface NavigationContentProps {
  children?: React.ReactNode;
  show: boolean;
  toggleMenu: () => void;
}

export function NavigationContent({ toggleMenu, show, children }: NavigationContentProps) {
  const contentWidth = show ? "w-[486px]" : "w-[0px]";
  return (
    <div className={`bg-white h-full relative transition-[width] duration-500 ${contentWidth}`}>
      <div className="overflow-x-hidden no-scrollbar whitespace-nowrap">
        <div className="px-6 py-16 h-screen">{children}</div>
      </div>
      <CloseButton showContent={show} toggleShowContent={toggleMenu} />
    </div>
  );
}
