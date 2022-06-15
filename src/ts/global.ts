export interface MapCoordinates {
  lat: number;
  lon: number;
}

export interface Car {
  id: string;
  camera: Camera["id"];
  label: string;
  thumbnail: any;
}

export interface Camera {
  id: string;
  coordinates: MapCoordinates;
  thumbnail?: HTMLImageElement;
}

export interface FrameResponse {
  frames: {
    [key: string]: string;
  };
  boxes: {
    [key: string]: number[][];
  };
  ids: {
    [key: string]: string[];
  };
  labels: {
    [key: string]: number[];
  };
}

export interface CameraResponse {
  [key: string]: {
    lat: number;
    lon: number;
  };
}

export interface BoundingBox {
  x: number;
  y: number;
  w: number;
  h: number;
  id: string;
  label: string;
}

export interface Frame {
  image: HTMLImageElement;
  boundingBoxes: BoundingBox[];
}

export type Buffer = Frame[];

export interface InitialStateType {
  loading: boolean;
  connected: boolean;
  error: boolean;
  showMenu: boolean;
  map: Map;
}

export interface SvgIconProps {
  fill: React.SVGAttributes<SVGPathElement>["fill"];
  height: React.SVGAttributes<SVGPathElement>["height"];
  width: React.SVGAttributes<SVGPathElement>["width"];
  className: React.SVGAttributes<SVGSVGElement>["className"];
  onClick: React.SVGAttributes<SVGSVGElement>["onClick"];
}

export interface Map {
  center: [number, number];
  zoom: number;
}
