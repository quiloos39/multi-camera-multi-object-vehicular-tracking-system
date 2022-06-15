import React, { useContext, useEffect, useRef, useState } from "react";
import { Container } from "../components/Container";
import { Input } from "../components/Input";
import { Map } from "../components/Map";
import { Navigation } from "../components/Navigation";
import { Title } from "../components/Title";
import { StateContext } from "../context/StateProvider";
import { useNavigate } from "react-router-dom";

export default function CarsPage() {
  const navigate = useNavigate();
  const timerRef = useRef<NodeJS.Timeout>();
  const { cars } = useContext(StateContext);

  const allCars = (
    <div className="space-y-10">
      {cars.map((car) => (
        <div key={car.id} className="cursor-pointer" onClick={() => navigate(`/cameras/${car.camera}`)}>
          <div className="h-24">{car.thumbnail}</div>
          <p className="font-bold">ID: {car.id}</p>
          <p className="font-bold">Camera ID: {car.camera}</p>
        </div>
      ))}
    </div>
  );
  return (
    <Container>
      <Navigation>
        <Title>Search for a car</Title>
        <Input placeholder="Ex. Blue car" />
        {allCars}
      </Navigation>
      <Map />
    </Container>
  );
}
