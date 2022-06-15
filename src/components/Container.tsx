import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  return <div className="flex bg-gray-300 h-screen">{children}</div>;
}
