import { render } from "@testing-library/react";
import { StrictMode } from "react";

import { MapContainer } from "react-leaflet";

describe("MapContainer", () => {
  test("renders the containing div", () => {
    const { container } = render(
      <StrictMode>
        <MapContainer center={[0, 0]} zoom={10} />
      </StrictMode>
    );
    expect(container).toMatchSnapshot();
  });

  test("sets center and zoom props", (done) => {
    const center = [1.2, 3.4];
    const zoom = 10;

    const ref = (map) => {
      if (map !== null) {
        expect(map.getCenter()).toEqual({ lat: 1.2, lng: 3.4 });
        expect(map.getZoom()).toBe(zoom);
        done();
      }
    };

    render(<MapContainer center={center} zoom={zoom} ref={ref} />);
  });
});
