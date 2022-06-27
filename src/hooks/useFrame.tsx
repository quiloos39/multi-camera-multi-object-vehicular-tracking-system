import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { convertFrameToImageSource } from "../utils/image";

export function useFrame(socket: Socket, id: string) {
  const [frame, setFrame] = useState<any>();
  const [cars, setCars] = useState<any[]>([]);

  useEffect(() => {
    async function fetchFrames() {
      if (socket) {
        const response: any = await new Promise((resolve) => {
          socket.emit("give_stream_data", id, (response) => {
            resolve(response);
          });
        });

        setCars(
          response.cars.map((car) => ({
            thumbnail: (
              <img alt="" src={convertFrameToImageSource(car.thumbnail)} className="h-full w-full object-cover" />
            ),
            id: car.id,
            label: car.label,
          }))
        );

        const boundingBoxes = response.cars.map((car) => ({
          id: car.id,
          label: car.label.toString(),
          x: car.box[0],
          y: car.box[1],
          w: car.box[2] - car.box[0],
          h: car.box[3] - car.box[1],
          color: car.color,
        }));

        const image = new Image();
        image.src = convertFrameToImageSource(response.frame);
        image.onload = () => {
          setFrame({
            image,
            boundingBoxes,
          });
          fetchFrames();
        };
      }
    }
    fetchFrames();
  }, [id, socket]);

  return { frame, cars };
}
