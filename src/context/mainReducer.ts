import { Map, Car, Camera, InitialStateType } from "../ts/global";

type Actions =
  | { type: "car/update"; payload: Car[] }
  | { type: "camera/update"; payload: Camera[] }
  | { type: "socket/connected" }
  | { type: "socket/error" }
  | { type: "menu/toggle" }
  | { type: "map/update"; payload: Map };

export function mainReducer(state: InitialStateType, action: Actions) {
  switch (action.type) {
    case "map/update":
      return {
        ...state,
        map: {
          center: action.payload.center,
          zoom: action.payload.zoom,
        },
      };
    case "menu/toggle":
      return {
        ...state,
        showMenu: !state.showMenu,
      };
    case "car/update":
      return {
        ...state,
        cars: action.payload,
      };
    case "camera/update":
      return {
        ...state,
        cameras: action.payload,
      };
    case "socket/connected":
      return {
        ...state,
        loading: false,
        connected: true,
      };
    case "socket/error":
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}
