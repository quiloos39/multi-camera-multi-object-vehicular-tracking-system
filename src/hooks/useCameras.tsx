import { useEffect, useState } from "react";
import { convertFrameToImageSource } from "../utils/image";
import { Socket } from "socket.io-client";

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
                <img
                  src={convertFrameToImageSource(value.thumbnail)}
                  alt=""
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                />
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
