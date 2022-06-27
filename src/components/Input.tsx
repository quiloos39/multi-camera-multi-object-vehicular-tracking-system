import React from "react";

type InputProps = React.HTMLAttributes<HTMLInputElement>;
export function Input(props: InputProps) {
  return (
    <div className="mb-5">
      <input about="" className="min-w-full bg-gray-200 py-2 px-5" {...props} />
    </div>
  );
}
