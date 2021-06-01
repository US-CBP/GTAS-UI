// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useEffect, useState } from "react";
import Xl8 from "../../../components/xl8/Xl8";
import CardWithTable from "../../../components/cardWithTable/CardWithTable";
import { paxFlightHistory, paxFullTravelHistory } from "../../../services/serviceWrapper";
import { asArray, hasData, localeDate } from "../../../utils/utils";
import { Link } from "@reach/router";

const FlightHistory = props => {
  const headers = {
    fullFlightNumber: <Xl8 xid="fh001">Flight</Xl8>,
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

  const parseFlightData = dataArray => {
    return dataArray.map(data => {
      return {
        ...data,
        id: data.flightId,
        etd: localeDate(data.etd),
        eta: localeDate(data.eta),
        fullFlightNumber: addLinkToFlight(data)
      };
    });
  };

  const fetchData = () => {
    paxFlightHistory.get(props.flightId, props.paxId).then(res => {
      const historyData = asArray(res).sort(sortFlightByEta);
      const data = parseFlightData(historyData);

      setcurrentFlightHistory(data);
    });

    paxFullTravelHistory.get(props.flightId, props.paxId).then(res => {
      const historyData = asArray(res).sort(sortFlightByEta);
      const data = parseFlightData(historyData);

      setFullTravelHistory(data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="one-column-container">
      <div className="grid-single-col">
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
      </div>
    </div>
  );
};

export default FlightHistory;
