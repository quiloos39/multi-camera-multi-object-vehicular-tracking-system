import { Container } from "../components/Container";
import { Map } from "../components/Map";
import { Navigation } from "../components/Navigation";
import { Title } from "../components/Title";
import { useContext, useRef, useState } from "react";
import { StateContext } from "../context/StateProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Marker, Tooltip, useMap } from "react-leaflet";
import Car from "../assets/car.svg";
import L from "leaflet";
import { useCarMap } from "../hooks/useCarMap";
import { useQuery } from "../hooks/useQuery";

export default function CarsPage() {
  const { socket } = useContext(StateContext);

  const { onQuery, cars: queryResult, loading: queryLoading } = useQuery(socket);
  const { cars: carPoints } = useCarMap(socket);

  const navigate = useNavigate();

  const allCars = (
    <div className="space-y-5">
      {queryResult.map((car) => (
        <div
          key={car.id}
          onClick={() => navigate(`/cameras/${car.cameraId}`)}
          className="cursor-pointer rounded-lg bg-gray-200 p-4 hover:bg-gray-400"
        >
          <div className="mb-2 h-48 w-full">{car.thumbnail}</div>
          <p>
            <span className="font-bold">ID:</span> {car.id}
          </p>
          <p>
            <span className="font-bold">Location:</span> {car.cameraId}
          </p>
          <p>
            <span className="font-bold">Score:</span> {car.score.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );

  const allCarMarkers = carPoints.map((car) => <CarMarker key={car.car_id} car={car} />);

  return (
    <Container>
      <Navigation>
        <Title>Search Car</Title>
        <Search loading={queryLoading} onQuery={onQuery} />
        {allCars}
      </Navigation>
      <Map>{allCarMarkers}</Map>
    </Container>
  );
}

function CarMarker({ car }) {
  const navigate = useNavigate();
  const carIcon = new L.Icon({
    iconUrl: Car,
    iconRetinaUrl: Car,
    iconSize: [60, 60],
  });

  const map = useMap();

  function onClick(e) {
    map.flyTo(e.latlng, 18);
  }

  return (
    <Marker
      key={car.car_id}
      icon={carIcon}
      position={[car.lat, car.lon]}
      eventHandlers={{
        dblclick: () => navigate(`/cameras/${car.cam_id}`),
        click: (e) => onClick(e),
      }}
    >
      <Tooltip permanent direction="bottom">
        {car.car_id}
      </Tooltip>
    </Marker>
  );
}

interface SearchProps {
  loading: boolean;
  onQuery: (query: string) => void;
}

function Search({ loading, onQuery }: SearchProps) {
  const inputRef = useRef<HTMLInputElement>();
  const loadingOrSearch = loading ? (
    <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
  ) : (
    <FontAwesomeIcon
      icon={faSearch}
      className="cursor-pointer"
      onClick={() => inputRef.current && inputRef.current.value.length > 0 && onQuery(inputRef.current.value)}
    />
  );

  return (
    <div className="mb-5 flex rounded-lg border bg-gray-200 py-2 px-5">
      <input
        ref={inputRef}
        className="w-full bg-transparent outline-none"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !loading) {
            onQuery(e.currentTarget.value);
          } else if (e.key === "Escape") {
            e.currentTarget.value = "";
          }
        }}
        placeholder="Search for blue car"
      />
      <div>{loadingOrSearch}</div>
    </div>
  );
}
