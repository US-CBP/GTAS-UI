import React, { useEffect, useState } from "react";
import Title from "../../../components/title/Title";
import { Container } from "react-bootstrap";
import CardWithTable from "../../../components/cardWithTable/CardWithTable";
import { paxFlightHistory, paxFullTravelHistory } from "../../../services/serviceWrapper";

const FlightHistory = props => {
  const headers = {
    fullFlightNumber: "Flight Number",
    etdDate: "Departure",
    etaDate: "Arrival",
    originCountry: "Origin Country",
    origin: "Origin Airport",
    destinationCountry: "Destination Country",
    destination: "Destination Airport"
  };
  const [currentFlightHistory, setcurrentFlightHistory] = useState([]);
  const [fullTravelHistory, setFullTravelHistory] = useState([]);

  const fetchData = () => {
    paxFlightHistory.get(props.flightId, props.paxId).then(res => {
      setcurrentFlightHistory(res);
    });
    paxFullTravelHistory.get(props.flightId, props.paxId).then(res => {
      setFullTravelHistory(res);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container fluid className="paxdetail-container">
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
