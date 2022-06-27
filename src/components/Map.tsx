import React, { useContext } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { StateContext } from "../context/StateProvider";

export interface MapProps {
  children?: React.ReactNode;
}

export function Map({ children }: MapProps) {
  const { state, dispatch } = useContext(StateContext);
  const map = state.map;

  function updateMap(center, zoom) {
    dispatch({ type: "map/update", payload: { center, zoom } });
  }

  return (
    <MapContainer center={map.center} zoom={map.zoom} scrollWheelZoom={true} style={{ height: "100vh", flexGrow: "1" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
      <MapPositionHandler updateMap={updateMap} />
    </MapContainer>
  );
}

function MapPositionHandler({ updateMap }) {
  const map = useMapEvents({
    move: () => {
      const zoom = map.getZoom();
      const center = map.getCenter();
      updateMap([center.lat, center.lng], zoom);
    },
  });
  return null;
}
