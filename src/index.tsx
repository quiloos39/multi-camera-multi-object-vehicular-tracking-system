import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "leaflet/dist/leaflet.css";
import "./styles/global.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CameraPage from "./pages/CameraPage";
import CamerasPage from "./pages/CamerasPage";
import ErrorPage from "./pages/ErrorPage";
import CarsPage from "./pages/CarsPage";
import { StateProvider } from "./context/StateProvider";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StateProvider>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Navigate to="/cameras" replace />} />
        <Route path="cameras">
          <Route index element={<CamerasPage />} />
          <Route path=":id" element={<CameraPage />} />
        </Route>
        <Route path="/cars" element={<CarsPage />} />
      </Routes>
    </BrowserRouter>
  </StateProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
