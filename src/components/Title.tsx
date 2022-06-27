import React from "react";

interface TitleProps {
  children: string;
}

export function Title({ children }: TitleProps) {
  return <h1 className="mb-5 text-4xl font-bold text-black">{children}</h1>;
}
