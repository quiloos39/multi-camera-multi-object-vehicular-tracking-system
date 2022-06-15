import React from "react";
import { screen, render } from "@testing-library/react";
import { ConnectError } from "../components/ConnectError";

test("Renders ConnectError component correctly", () => {
  render(<ConnectError />);
  expect(screen.getByText("Something bad happened.")).toBeInTheDocument();
});
