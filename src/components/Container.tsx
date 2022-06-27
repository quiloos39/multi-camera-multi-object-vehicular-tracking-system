import React from "react";

interface ContainerProps {
  children?: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  return <div className="flex h-screen bg-gray-400">{children}</div>;
}
