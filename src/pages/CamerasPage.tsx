import { Marker, useMap } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import { Container } from "../components/Container";
import { Map } from "../components/Map";
import CameraIcon from "../assets/camera.svg";
import { Navigation } from "../components/Navigation";
import { Title } from "../components/Title";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Input } from "../components/Input";
import { StateContext } from "../context/StateProvider";

const ZOOM_LEVEL = 17;

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

const CAMERAS = [
  {
    id: "c016",
    lat: 42.4995215,
    lon: -90.6906985,
  },
  {
    id: "c017",
    lat: 42.4987505,
    lon: -90.6906065,
  },
];

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
          className={`flex items-end justify-end h-32 ${backgroundColor} cursor-pointer mb-5`}
          onClick={() => selectCamera(camera.id)}
          onDoubleClick={() => navigate(`/cameras/${camera.id}`)}
        >
          <div className="px-5 bg-black text-white">
            {camera.thumbnail}
            <p>{camera.id}</p>
          </div>
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

export default function CamerasPage() {
  // const { cameras } = useContext(StateContext);
  const cameras = CAMERAS;

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

  return (
    <Container>
      <Navigation>
        <Title>Search Camera</Title>
        <FilterCameras selectedCamera={selectedCamera} selectCamera={selectCamera} cameras={cameras} />
        <Link to="/cameras" className="text-[#005F95] underline font-bold">
          Show all cameras
        </Link>
      </Navigation>
      <Map>
        {allCameraMarkers}
        <MapZoomHandler cameras={cameras} selectedCamera={selectedCamera} />
      </Map>
    </Container>
  );
}
