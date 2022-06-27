import { Container } from "../components/Container";
import { Map } from "../components/Map";
import { Navigation } from "../components/Navigation";
import { Title } from "../components/Title";
import { useContext, useState } from "react";
import { StateContext } from "../context/StateProvider";
import { useCameras } from "../hooks/useCameras";
import { FilterCameras } from "../components/FilterCameras";
import { CameraMarker } from "../components/CameraMarker";

export default function CamerasPage() {
  const { socket } = useContext(StateContext);
  const { cameras, loading } = useCameras(socket);
  const [selectedCamera, setSelectedCamera] = useState<string>();

  function selectCamera(id: string) {
    setSelectedCamera(id);
  }

  console.log("selected camera: ", selectedCamera);

  const allCameraMarkers = cameras.map((camera) => (
    <CameraMarker key={camera.id} camera={camera} selectCamera={selectCamera} />
  ));

  const loadingOrCameras = loading ? (
    <p className="mb-5 block animate-bounce">Getting interesting data ...</p>
  ) : (
    <FilterCameras selectedCamera={selectedCamera} selectCamera={selectCamera} cameras={cameras} />
  );

  return (
    <Container>
      <Navigation>
        <Title>Search Camera</Title>
        {loadingOrCameras}
      </Navigation>
      <Map>{allCameraMarkers}</Map>
    </Container>
  );
}
