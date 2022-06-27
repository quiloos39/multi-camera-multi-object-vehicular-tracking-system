import { useEffect, useState } from "react";
import { convertFrameToImageSource } from "../utils/image";
import { Socket } from "socket.io-client";

/**
 * Used for fetching cameras metadata from the server.
 * @param socket
 * @returns
 */
export function useCameras(socket: Socket) {
  const [cameras, setCameras] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCameras() {
      if (socket) {
        setLoading(true);
        try {
          const result = await new Promise((resolve) => {
            socket.emit("give_camera_info", (result) => {
              resolve(result);
            });
          });
          console.log(result);
          setCameras(
            Object.entries(result).map(([key, value]) => ({
              id: key,
              lat: value.lat,
              lon: value.lon,
              thumbnail: (
                <img src={convertFrameToImageSource(value.thumbnail)} alt="" className="h-full w-full object-cover" />
              ),
            }))
          );
        } catch (e) {
          console.log(e);
        }
        setLoading(false);
      }
    }
    fetchCameras();
  }, [socket]);

  return { cameras, loading };
}
