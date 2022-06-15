import React from "react";
import { screen, render } from "@testing-library/react";
import { Loading } from "../components/Loading";

test("Renders Loading component correctly", () => {
  render(<Loading />);
  expect(screen.getByText(/Attempting to connect/)).toBeInTheDocument();
});
