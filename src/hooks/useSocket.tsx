import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { Camera, CameraResponse, Car, FrameResponse } from "../ts/global";
import { convertDataURIToBlob, convertJPG } from "../utils/image";

export function useSocket({
  host,
  port,
  events: { onConnect, onConnectionLost, onFrameReceived, onCameraUpdate, onCarUpdate },
}) {
  useEffect(() => {
    const socket = io(`${host}:${port}`);

    socket.on("connect", () => {
      socket.emit("give_camera_info");
      socket.emit("give_stream_data");
      onConnect();
    });

    socket.on("receive_camera_info", (data: CameraResponse) => {
      const cameras: Camera[] = [];

      Object.entries(data).forEach(([id, properties]) => {
        cameras.push({
          id: id,
          coordinates: properties,
        });
      });

      onCameraUpdate(cameras);
    });

    socket.on("receive_stream_data", (data: FrameResponse) => {
      const { frames, boxes, ids, labels } = data;

      let cameras = Object.keys(frames).map((id) => ({
        id,
      }));

      const cars: Car[] = [];

      cameras.forEach((camera) => {
        const boundingBoxes = boxes[camera.id].map((box, index) => ({
          id: ids[camera.id][index],
          label: labels[camera.id][index].toString(),
          x: box[0],
          y: box[1],
          w: box[2] - box[0],
          h: box[3] - box[1],
        }));

        const frame = frames[camera.id];
        const imageSource = convertJPG(frame);
        const imageBlob = convertDataURIToBlob(imageSource);
        const url = URL.createObjectURL(imageBlob);
        const thumbnail = (
          <img
            src={url}
            alt=""
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
        );

        cameras = cameras.map((camera) => ({
          ...camera,
          thumbnail,
        }));

        onCameraUpdate(cameras);

        for (let i = 0; i < boundingBoxes.length; i++) {
          const { x, y } = boundingBoxes[i];

          cars.push({
            id: ids[camera.id][i],
            camera: camera.id,
            label: labels[camera.id][i].toString(),
            thumbnail,
          });
        }

        const image = new Image();
        image.src = url;

        image.onload = function () {
          onFrameReceived(camera.id, {
            image,
            boundingBoxes,
          });
          socket.emit("give_stream_data");
        };
      });

      onCarUpdate(cars);
    });

    return () => {
      socket.close();
    };
  }, []);

  return {};
}
