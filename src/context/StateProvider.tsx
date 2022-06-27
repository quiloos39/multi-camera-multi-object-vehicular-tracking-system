import React, { createContext, useEffect, useReducer, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Loading } from "../components/Loading";
import { InitialStateType } from "../ts/global";
import { mainReducer } from "./mainReducer";

const initialState: InitialStateType = {
  loading: false,
  connected: false,
  error: false,
  showMenu: true,
  map: {
    center: [0, 0],
    zoom: 1,
  },
};

const HOST = "localhost";
const PORT = "4920";

export const StateContext = createContext<any>(undefined);

interface StateProviderProps {
  children: React.ReactNode;
}

export function StateProvider({ children }: StateProviderProps) {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const socket = io(`${HOST}:${PORT}`);
    setSocket(socket);
    socket.on("connect", () => {
      setTimeout(() => {
        dispatch({ type: "socket/connected" });
      }, 1500);
    });

    return () => {
      socket.close();
    };
  }, []);

  if (!state.connected) {
    return <Loading />;
  } else {
    return <StateContext.Provider value={{ state, dispatch, socket }}>{children}</StateContext.Provider>;
  }
}
