import { render, screen } from "@testing-library/react";
import React from "react";
import { Navigation } from "../components/Navigation";

test("Test navigation component renders correctly and displays car and camera nav items", () => {
  render(<Navigation />);
  expect(screen.getByAltText("car")).toBeInTheDocument();
  expect(screen.getByAltText("camera")).toBeInTheDocument();
});
