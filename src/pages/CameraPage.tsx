import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../components/Container";
import { Player } from "../components/Player";
import { StateContext } from "../context/StateProvider";
import { Frame } from "../ts/global";
import Back from "../assets/ant-design_double-right-outlined.svg";
import { Input } from "../components/Input";
import { Socket } from "socket.io-client";
import { convertFrameToImageSource } from "../utils/image";
import { NavigationContent } from "../components/Navigation";

export default function CameraPage() {
  const { socket } = useContext(StateContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const { frame, cars } = useFrame(socket, id);
  const [collapse, setCollapse] = useState(false);
  const filteredCars = cars;

  const allCars = (
    <div className="space-y-5">
      {filteredCars.length > 0 ? (
        filteredCars.map((car) => (
          <div key={car.id} className="bg-gray-200 p-4 ">
            <div className="h-44 w-full">{car.thumbnail}</div>
            <p className="font-bold">ID: {car.id}</p>
          </div>
        ))
      ) : (
        <p>No cars are found</p>
      )}
    </div>
  );

  return (
    <Container>
      <NavigationContent collapse={collapse} toggleCollapse={() => setCollapse(!collapse)}>
        <div className="mb-5 flex items-center space-x-5">
          <img
            src={Back}
            alt=""
            width={18}
            height={18}
            className="relative top-1 cursor-pointer"
            onClick={() => navigate("/cameras")}
          />
          <h1 className="text-4xl">{id}</h1>
        </div>
        {allCars}
      </NavigationContent>
      <Player frame={frame} />
    </Container>
  );
}

const FRAME_INTERVAL = 100;

function useFrame(socket: Socket, id: string) {
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
            thumbnail: <img src={convertFrameToImageSource(car.thumbnail)} className="h-full w-full object-cover" />,
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
