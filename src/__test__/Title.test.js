import React from "react";
import { screen, render } from "@testing-library/react";
import { Title } from "../components/Title";

test("Renders Title component correctly", () => {
  const testString = "Hello world";
  render(<Title>{testString}</Title>);

  expect(screen.getByText(testString)).toBeInTheDocument();
});
