import React from "react";
import Error from "../assets/error.gif";

export function ConnectError() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <img src={Error} width={300} height={300} alt="" className="mb-5" />
      <p className="font-bold">Something bad happened.</p>
    </div>
  );
}
