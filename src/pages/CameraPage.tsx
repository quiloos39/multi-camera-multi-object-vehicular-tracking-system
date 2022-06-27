import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../components/Container";
import { Player } from "../components/Player";
import { StateContext } from "../context/StateProvider";
import { NavigationContent } from "../components/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useFrame } from "../hooks/useFrame";

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
      <NavigationContent collapse={collapse} toggle={() => setCollapse(!collapse)}>
        <div className="mb-5 flex items-center space-x-5">
          <FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate("/cameras")} className="cursor-pointer" />
          <h1 className="text-4xl">{id}</h1>
        </div>
        {allCars}
      </NavigationContent>
      <Player frame={frame} />
    </Container>
  );
}
