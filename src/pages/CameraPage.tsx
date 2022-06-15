import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../components/Container";
import { NavigationContent } from "../components/NavigationContent";
import { Player } from "../components/Player";
import { StateContext } from "../context/StateProvider";
import { Frame } from "../ts/global";
import Back from "../assets/ant-design_double-right-outlined.svg";
import { Input } from "../components/Input";

const FRAME_SPEED = 100;

export default function CameraPage() {
  const { bufferRef, cars } = useContext(StateContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [frame, setFrame] = useState<Frame>();
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (bufferRef.current[id]) {
        const frame = bufferRef.current[id].shift();
        if (frame) {
          setFrame(frame);
        }
      }
    }, FRAME_SPEED);
    return () => {
      clearInterval(timerRef.current);
    };
  }, [id]);

  const filteredCars = cars.filter((car) => car.camera === id);

  const allCars = (
    <div className="space-y-5">
      {filteredCars.length > 0 ? (
        filteredCars.map((car) => (
          <div key={car.id}>
            <div className="h-24">{car.thumbnail}</div>
            <p className="font-bold">ID: {car.id}</p>
            <p className="font-bold">Label: {car.label}</p>
          </div>
        ))
      ) : (
        <p>No cars are found</p>
      )}
    </div>
  );

  return (
    <Container>
      <NavigationContent show={true} toggleMenu={null}>
        <div className="flex items-center space-x-5 mb-5">
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
        <Input onChange={null} placeholder="Ex. Blue car" />
        {allCars}
      </NavigationContent>
      <Player frame={frame} />
    </Container>
  );
}
