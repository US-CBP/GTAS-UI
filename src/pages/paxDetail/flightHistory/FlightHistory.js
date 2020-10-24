import React, { useEffect, useState } from "react";
import Xl8 from "../../../components/xl8/Xl8";
import { CardColumns } from "react-bootstrap";
import Main from "../../../components/main/Main";
import CardWithTable from "../../../components/cardWithTable/CardWithTable";
import { paxFlightHistory, paxFullTravelHistory } from "../../../services/serviceWrapper";
import { asArray, localeDate } from "../../../utils/utils";
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

  const parseFlightData = data => {
    return {
      ...data,
      etd: localeDate(data.etd),
      eta: localeDate(data.eta)
    };
  };

  const fetchData = () => {
    paxFlightHistory.get(props.flightId, props.paxId).then(res => {
      const historyData = asArray(res).map(data => parseFlightData(data));
      setcurrentFlightHistory(historyData);
    });

    paxFullTravelHistory.get(props.flightId, props.paxId).then(res => {
      const historyData = asArray(res).map(data => parseFlightData(data));
      setFullTravelHistory(historyData);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Main className="one-column-container">
      <CardColumns>
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
      </CardColumns>
    </Main>
  );
};

export default FlightHistory;
