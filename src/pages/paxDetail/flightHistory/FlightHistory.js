import React, { useEffect, useState } from "react";
import Title from "../../../components/title/Title";
import Xl8 from "../../../components/xl8/Xl8";
import { Container } from "react-bootstrap";
import CardWithTable from "../../../components/cardWithTable/CardWithTable";
import { paxFlightHistory, paxFullTravelHistory } from "../../../services/serviceWrapper";

const FlightHistory = props => {
  const headers = {
    fullFlightNumber: <Xl8 xid="fh001">Flight Number</Xl8>,
    etdDate: <Xl8 xid="fh002">Departure</Xl8>,
    etaDate: <Xl8 xid="fh003">Arrival</Xl8>,
    originCountry: <Xl8 xid="fh004">Origin Country</Xl8>,
    origin: <Xl8 xid="fh005">Origin Airport</Xl8>,
    destinationCountry: <Xl8 xid="fh006">Destination Country</Xl8>,
    destination: <Xl8 xid="fh007">Destination Airport</Xl8>
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
    <>
      <Title title={<Xl8 xid="fh008">Flight History</Xl8>}></Title>
      <CardWithTable
        data={currentFlightHistory}
        headers={headers}
        title={<Xl8 xid="fh009">Current Itinerary</Xl8>}
      />
      <CardWithTable
        data={fullTravelHistory}
        headers={headers}
        title={<Xl8 xid="fh010">Total Flight History</Xl8>}
      />
    </>
  );
};

export default FlightHistory;
