import { useState } from "react";
import { convertFrameToImageSource } from "../utils/image";
import { Socket } from "socket.io-client";

export interface Query {
  id: string;
  cameraId: string;
  thumbnail: any;
  score: number;
}

export interface QueryResponse {
  id: string;
  camera: string;
  frame: string;
  score: number;
}

export function useQuery(socket: Socket) {
  const [cars, setCars] = useState<Query[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function onQuery(query: string) {
    setLoading(true);
    try {
      const response: QueryResponse[] = await new Promise((resolve, reject) => {
        socket.emit("give_match_info", query, (result) => {
          resolve(result);
        });
        setTimeout(() => reject("Timeout"), 20000);
      });
      setCars(
        response.map((car) => ({
          id: car.id,
          cameraId: car.camera,
          thumbnail: <img src={convertFrameToImageSource(car.frame)} alt="" className="h-full w-full object-cover" />,
          score: car.score,
        }))
      );
    } catch (e) {
      console.warn(e);
    }
    setLoading(false);
  }

  return { cars, loading, onQuery };
}
