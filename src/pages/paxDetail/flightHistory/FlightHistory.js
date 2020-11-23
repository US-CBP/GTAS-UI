import React, { useEffect, useState } from "react";
import Xl8 from "../../../components/xl8/Xl8";
import { CardColumns } from "react-bootstrap";
import Main from "../../../components/main/Main";
import CardWithTable from "../../../components/cardWithTable/CardWithTable";
import { paxFlightHistory, paxFullTravelHistory } from "../../../services/serviceWrapper";
import { asArray, hasData, localeDate } from "../../../utils/utils";
import { Link } from "@reach/router";

const FlightHistory = props => {
  const headers = {
    fullFlightNumber: <Xl8 xid="fh001">Flight Number</Xl8>,
    etd: <Xl8 xid="fh002">Departure</Xl8>,
    eta: <Xl8 xid="fh003">Arrival</Xl8>,
    originCountry: <Xl8 xid="fh004">Origin Country</Xl8>,
    origin: <Xl8 xid="fh005">Origin Airport</Xl8>,
    destinationCountry: <Xl8 xid="fh006">Destination Country</Xl8>,
    destination: <Xl8 xid="fh007">Destination Airport</Xl8>
  };
  const [currentFlightHistory, setcurrentFlightHistory] = useState([]);
  const [fullTravelHistory, setFullTravelHistory] = useState([]);

  const sortFlightByEta = (flight1, flight2) => {
    return flight2.eta - flight1.eta;
  };

  const addLinkToFlight = flight => {
    //Only prime flights need a link
    const flightId = flight.flightId || flight.id;
    const isPrimeFlight = !flight.bookingDetail && hasData(flight.direction);
    const stateData = {
      direction: flight.direction,
      eta: flight.eta,
      etd: flight.etd,
      fullFlightNumber: flight.fullFlightNumber,
      flightDestination: flight.destination,
      flightOrigin: flight.origin,
      passengerCount: flight.passengerCount
    };

    return isPrimeFlight ? (
      <Link to={"/gtas/flightpax/" + flightId} state={{ data: stateData }}>
        {flight.fullFlightNumber}
      </Link>
    ) : (
      flight.fullFlightNumber
    );
  };
  const parseFlightData = data => {
    return {
      ...data,
      etd: localeDate(data.etd),
      eta: localeDate(data.eta),
      fullFlightNumber: addLinkToFlight(data)
    };
  };

  const fetchData = () => {
    paxFlightHistory.get(props.flightId, props.paxId).then(res => {
      const historyData = asArray(res)
        .sort(sortFlightByEta)
        .map(data => parseFlightData(data));

      setcurrentFlightHistory(historyData);
    });

    paxFullTravelHistory.get(props.flightId, props.paxId).then(res => {
      const historyData = asArray(res)
        .sort(sortFlightByEta)
        .map(data => parseFlightData(data));

      setFullTravelHistory(historyData);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="paxdetail-container">
      <CardColumns>
        <CardWithTable
          data={currentFlightHistory}
          headers={headers}
          className="pd-gridstack-2 flex-grow-0"
          title={<Xl8 xid="fh009">Current Itinerary</Xl8>}
        />
        <CardWithTable
          data={fullTravelHistory}
          headers={headers}
          className="pd-gridstack-2 flex-grow-1"
          title={<Xl8 xid="fh010">Total Flight History</Xl8>}
        />
      </CardColumns>
    </div>
  );
};

export default FlightHistory;
