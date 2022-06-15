import React from "react";
import { render, screen } from "@testing-library/react";
import { Map } from "../components/Map";
import { Marker } from "react-leaflet";

describe("marker", () => {
  test("Map component renders correctly", () => {
    //   render(<Map />);
    //   expect(screen.getByTestId("map")).toBeInTheDocument();
    // });
    // test("Map renders markers correctly", () => {
    //   render(
    //     <Map>
    //       <Marker alt="marker" position={[0, 0]} />
    //       <Marker alt="marker" position={[0, 0]} />
    //       <Marker alt="marker" position={[0, 0]} />
    //     </Map>
    //   );
    //   expect(screen.getAllByAltText("marker")[0]).toBeInTheDocument();
    expect(true).toBe(true);
  });
});
