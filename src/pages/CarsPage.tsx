import { Container } from "../components/Container";
import { Map } from "../components/Map";
import { Navigation } from "../components/Navigation";
import { Title } from "../components/Title";
import { useContext, useRef } from "react";
import { StateContext } from "../context/StateProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Marker } from "react-leaflet";
import CircleSolid from "../assets/circle-solid.svg";
import L from "leaflet";
import { useCarMap } from "../hooks/useCarMap";
import { useQuery } from "../hooks/useQuery";

export default function CarsPage() {
  const { socket } = useContext(StateContext);
  const { onQuery, cars: queryResult, loading: queryLoading } = useQuery(socket);
  const { cars: carPoints } = useCarMap(socket);

  const navigate = useNavigate();

  const allCarPoints = (
    <div className="space-y-5">
      {queryResult.map((car) => (
        <div
          key={car.id}
          onClick={() => navigate(`/cameras/${car.cameraId}`)}
          className="cursor-pointer bg-gray-200 p-4"
        >
          <div className="h-48 w-full">{car.thumbnail}</div>
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

  const carIcon = new L.Icon({
    iconUrl: CircleSolid,
    iconRetinaUrl: CircleSolid,
    iconSize: [20, 20],
  });

  const allCarMarkers = carPoints.map((car) => (
    <Marker key={car.car_id} icon={carIcon} position={[car.lat, car.lon]} />
  ));

  return (
    <Container>
      <Navigation>
        <Title>Search Car</Title>
        <Search loading={queryLoading} onQuery={onQuery} />
        <div>{queryResult.length > 0 ? allCarPoints : <p>No results</p>}</div>
      </Navigation>
      <Map>{allCarMarkers}</Map>
    </Container>
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
    <div className="mb-5 flex border bg-gray-200 py-2 px-5">
      <input
        ref={inputRef}
        className="w-full bg-transparent outline-none"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !loading) {
            onQuery(e.currentTarget.value);
          }
        }}
        placeholder="Search for blue car"
      />
      <div>{loadingOrSearch}</div>
    </div>
  );
}
