import React from "react";
import { render, screen } from "@testing-library/react";
import { Container } from "../components/Container";

test("Container component renders correctly", () => {
  render(<Container />);
});
