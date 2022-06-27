import { Marker, Tooltip, useMap } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import CameraIcon from "../assets/camera.svg";
import { useNavigate } from "react-router-dom";

const ZOOM_LEVEL = 17;

export function CameraMarker({ selectCamera, camera }) {
  const position: LatLngExpression = [camera.lat, camera.lon];
  const map = useMap();
  const navigate = useNavigate();

  const cameraIcon = new L.Icon({
    iconUrl: CameraIcon,
    iconRetinaUrl: CameraIcon,
    iconSize: [32, 32],
  });

  function onClick(e) {
    console.log("click");
    selectCamera(camera.id);
    map.flyTo(e.latlng, ZOOM_LEVEL);
  }

  return (
    <Marker
      position={position}
      icon={cameraIcon}
      eventHandlers={{
        click: (e) => onClick(e),
        dblclick: () => navigate(`/cameras/${camera.id}`),
      }}
    >
      <Tooltip permanent direction="bottom" offset={[0, 15]}>
        {camera.id}
      </Tooltip>
    </Marker>
  );
}
