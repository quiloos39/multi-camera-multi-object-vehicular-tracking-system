import { Marker, useMap } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import { Container } from "../components/Container";
import { Map } from "../components/Map";
import CameraIcon from "../assets/camera.svg";
import { Navigation } from "../components/Navigation";
import { Title } from "../components/Title";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Input } from "../components/Input";
import { StateContext } from "../context/StateProvider";
import { useCameras } from "../hooks/useCameras";

const ZOOM_LEVEL = 17;

export default function CamerasPage() {
  const { socket } = useContext(StateContext);
  const { cameras, loading } = useCameras(socket);
  const [selectedCamera, setSelectedCamera] = useState<string>();

  function selectCamera(id: string) {
    if (id === selectedCamera) {
      setSelectedCamera(undefined);
    } else {
      setSelectedCamera(id);
    }
  }

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
      <Map>
        {allCameraMarkers}
        <MapZoomHandler cameras={cameras} selectedCamera={selectedCamera} />
      </Map>
    </Container>
  );
}

function MapZoomHandler({ selectedCamera, cameras }) {
  const map = useMap();
  useEffect(() => {
    if (cameras && selectedCamera) {
      const camera = cameras.find((camera) => camera.id === selectedCamera)!;
      const position: LatLngExpression = [camera.lat, camera.lon];
      map.flyTo(position, ZOOM_LEVEL);
    }
  }, [selectedCamera, cameras]);
  return null;
}

function CameraMarker({ selectCamera, camera }) {
  const position: LatLngExpression = [camera.lat, camera.lon];

  const cameraIcon = new L.Icon({
    iconUrl: CameraIcon,
    iconRetinaUrl: CameraIcon,
    iconSize: [20, 20],
  });

  return (
    <Marker
      position={position}
      icon={cameraIcon}
      eventHandlers={{
        click: () => selectCamera(camera.id),
      }}
    />
  );
}

function FilterCameras({ cameras, selectedCamera, selectCamera }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("");

  const allCameras = cameras
    .filter((camera) => camera.id.match(filter))
    .slice(0, 5)
    .map((camera) => {
      const backgroundColor = selectedCamera === camera.id ? "bg-gray-500" : "bg-gray-300 hover:bg-gray-400";

      return (
        <div
          key={camera.id}
          className={`items-end justify-end bg-gray-200 p-4 ${backgroundColor} mb-5 cursor-pointer`}
          onClick={() => selectCamera(camera.id)}
          onDoubleClick={() => navigate(`/cameras/${camera.id}`)}
        >
          <div className="mb-2 h-60">{camera.thumbnail}</div>
          <p>
            <span className="font-bold">ID:</span> {camera.id}
          </p>
        </div>
      );
    });

  return (
    <div className="select-none">
      <Input onChange={(e) => setFilter(e.target["value"])} placeholder="Type to search camera" />
      {allCameras}
    </div>
  );
}
