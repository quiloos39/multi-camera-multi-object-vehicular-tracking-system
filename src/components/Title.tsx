import React from "react";

interface TitleProps {
  children: string;
}

export function Title({ children }: TitleProps) {
  return <h1 className="text-4xl mb-5 text-black">{children}</h1>;
}
