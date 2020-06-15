import React from "react";
import Table from "../../../components/table/Table";
// import {  } from "../../../services/serviceWrapper";
import Title from "../../../components/title/Title";
import { Container } from "react-bootstrap";
import CardWithTable from "../../../components/cardWithTable/CardWithTable";

const FlightHistory = props => {
  console.log(props.fullTravelHistory);
  const currentFlightHistory = props.currentFlightHistory || [];
  const fullTravelHistory = props.fullTravelHistory || [];
  const headers = {
    fullFlightNumber: "Flight Number",
    etdDate: "Departure",
    etaDate: "Arrival",
    originCountry: "Origin Country",
    origin: "Origin Airport",
    destinationCountry: "Destination Country",
    destination: "Destination Airport"
  };
  return (
    <Container>
      <Title title="Flight History"></Title>
      <CardWithTable
        data={currentFlightHistory}
        headers={headers}
        title="Current Itinerary"
      />
      <CardWithTable
        data={fullTravelHistory}
        headers={headers}
        title={`Total Flight History(${fullTravelHistory.length})`}
      />
    </Container>
  );
};

export default FlightHistory;
