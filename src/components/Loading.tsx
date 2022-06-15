import React, { useEffect, useRef, useState } from "react";
import Eye from "../assets/eye.gif";

export function Loading() {
  const [dots, setDots] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setDots((dots + 1) % 4);
    }, 700);
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [dots]);

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <img src={Eye} width={100} height={100} alt="" className="mb-5" />
      <p className="font-bold">Attempting to connect {".".repeat(dots)}</p>
    </div>
  );
}
