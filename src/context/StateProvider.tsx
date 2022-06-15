import React, { createContext, useReducer, useRef, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { Camera, Car, Frame, InitialStateType } from "../ts/global";
import { mainReducer } from "./mainReducer";

class ObjectSet {
  data: any[];
  iterator: number;

  constructor() {
    this.data = [];
    this.iterator = 0;
  }
  add(item: any) {
    const found = this.data.find((elem) => elem.id === item.id);
    if (!found) {
      this.data.push(item);
    }
    return this.data;
  }
  get() {
    if (this.iterator < this.data.length) {
      return this.data[this.iterator++];
    }
  }
}

const initalState: InitialStateType = {
  loading: false,
  connected: false,
  error: false,
  showMenu: true,
  map: {
    center: [0, 0],
    zoom: 1,
  },
};

interface StateProviderProps {
  children: React.ReactNode;
}

export const StateContext = createContext<any>(undefined);

export function StateProvider({ children }: StateProviderProps) {
  useSocket({
    host: "localhost",
    port: "4920",
    events: {
      onConnect,
      onConnectionLost,
      onFrameReceived,
      onCameraUpdate,
      onCarUpdate,
    },
  });

  const [state, dispatch] = useReducer(mainReducer, initalState);
  const bufferRef = useRef<any>({});
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [cars, setCars] = useState<any>([]);

  function onConnect() {}

  function onConnectionLost() {}

  function onFrameReceived(cameraId, newFrame: Frame) {
    if (!bufferRef.current[cameraId]) {
      bufferRef.current[cameraId] = [];
    }

    if (bufferRef.current[cameraId].length > 24 * 5) {
      bufferRef.current[cameraId] = [];
    }

    bufferRef.current[cameraId].push(newFrame);
  }

  function onCameraUpdate(newCameras: Camera[]) {
    let shouldUpdate = false;
    for (const camera of cameras) {
      if (!camera.thumbnail) {
        shouldUpdate = true;
      }
    }
    if (shouldUpdate || cameras.length === 0) {
      setCameras((oldCamera) => {
        return newCameras.map((newCamera) => {
          const found = oldCamera.find((oldCar) => oldCar.id === newCamera.id);
          if (found) {
            return {
              ...newCamera,
              thumbnail: found.thumbnail,
            };
          } else {
            return newCamera;
          }
        });
      });
    }
  }

  function onCarUpdate(newCars: Car[]) {
    setCars((oldCars) => {
      return newCars.map((newCar) => {
        const found = oldCars.find((oldCar) => oldCar.id === newCar.id);
        if (found) {
          return {
            ...newCar,
            thumbnail: found.thumbnail,
          };
        } else {
          return newCar;
        }
      });
    });
  }

  return (
    <StateContext.Provider value={{ state: { state, dispatch }, bufferRef, cameras, cars }}>
      {children}
    </StateContext.Provider>
  );
}