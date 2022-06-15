import React, { useState } from "react";

interface CameraFilterProps {
  setSelectedCamera: (arg0: string) => void;
  selectedCamera?: string;
  cameras: any[];
}

export function CameraFilter({ setSelectedCamera, selectedCamera, cameras }: CameraFilterProps) {
  const allCameras = cameras.map(({ id }) => {
    const bgColor = id === selectedCamera ? "bg-gray-700" : "bg-[#C4C4C4]";
    return (
      <div
        key={id}
        className={`flex items-end justify-end h-[110px] text-white mb-5 cursor-pointer hover:bg-gray-700 ${bgColor}`}
        onClick={() => setSelectedCamera(id)}
      >
        <p>{id}</p>
      </div>
    );
  });
  return <div>{allCameras}</div>;
}
