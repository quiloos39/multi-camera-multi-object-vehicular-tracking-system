import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";

interface Car {
  id: string;
  lat: string;
  lon: string;
}

export type CarResponse = Car;

export function useCarMap(socket: Socket) {
  const [cars, setCars] = useState([]);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    async function fetchCars() {
      if (socket) {
        try {
          const cars: CarResponse[] = await new Promise((resolve) => {
            socket.emit("give_car_positions", (result) => {
              resolve(result);
            });
          });
          setCars(cars);
        } catch (e) {
          console.warn(e);
        }
      }
    }
    timerRef.current = setInterval(fetchCars, 1000);
    return () => {
      clearInterval(timerRef.current);
    };
  }, [socket]);

  return { cars };
}
