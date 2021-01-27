// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useEffect, useState } from "react";
import Seat from "./seat/Seat";
import { Container, Row, CardDeck, Card } from "react-bootstrap";
import { seats } from "../../services/serviceWrapper";
import { asArray, localeDate } from "../../utils/utils";
import { Link, useParams } from "@reach/router";
// import SeatInfo from "./seatInfo/SeatInfo";
import Legend from "./legend/Legend";
// import FlightInfo from "./flightInfo/FlighInfo";
import SeatChartCard from "./seatChartCard/SeatChartCard";
import Loading from "../loading/Loading";
import Xl8 from "../xl8/Xl8";
import "./SeatChart.scss";

const SeatChart = ({ location }) => {
  const { flightId, paxId, currentPaxSeat } = useParams();
  const [reservedSeatsInfo, setReservedSeatsInfo] = useState({});
  const [columnWithReservedSeat, setColumnWithReservedSeat] = useState([]);
  const [rowsWithReservedSeat, setRowsWithReservedSeat] = useState([]);
  const [selectedSeatInfo, setSelectedSeatInfo] = useState({});
  const [showPending, setShowPending] = useState(true);

  const getRow = letter => {
    const row = [];
    columnWithReservedSeat.forEach(col => {
      const seatNumber = `${col}${letter}`;
      row.push(
        <Seat
          seatNumber={seatNumber}
          seatInfo={reservedSeatsInfo[seatNumber]}
          selected={currentPaxSeat === seatNumber}
          key={seatNumber}
          className={
            selectedSeatInfo.coTravellers?.includes(seatNumber) ? "co-traveler" : ""
          }
        />
      );
    });

    return row;
  };

  const processData = seatsInfo => {
    const mappedSeatInfo = {};
    const colsWithReservedSeat = []; // contains all column that have at least one reserved seat.
    const rowsWithReservedSeat = [];
    asArray(seatsInfo).map(info => {
      mappedSeatInfo[info.number] = info;

      const number = info.number.slice(0, -1); //remove letter (row) from the seat
      const letter = info.number.charAt(number.length);
      if (colsWithReservedSeat.indexOf(number) === -1) colsWithReservedSeat.push(number);
      if (rowsWithReservedSeat.indexOf(letter) === -1) rowsWithReservedSeat.push(letter);
    });
    setReservedSeatsInfo(mappedSeatInfo);
    colsWithReservedSeat.sort((x, y) => x - y);
    rowsWithReservedSeat.sort().reverse();
    setColumnWithReservedSeat(colsWithReservedSeat);
    setRowsWithReservedSeat(rowsWithReservedSeat);
  };

  const getClassNameByRow = row => {
    return row === 3
      ? "right-of-middle-rows"
      : row === rowsWithReservedSeat.length - 4
      ? "left-of-middle-rows"
      : "";
  };

  useEffect(() => {
    seats.get(flightId).then(res => {
      processData(res);
      setShowPending(false);
    });
  }, []);

  useEffect(() => {
    setSelectedSeatInfo(reservedSeatsInfo[currentPaxSeat] || {});
  }, [reservedSeatsInfo]);

  const flightInfoData = [
    {
      label: <Xl8 xid="seat004">Flight Number</Xl8>,
      value: location.state?.flightNumber
    },
    {
      label: <Xl8 xid="seat005">Arrival</Xl8>,
      value: localeDate(location.state?.arrival)
    },
    {
      label: <Xl8 xid="seat006">Departure</Xl8>,
      value: localeDate(location.state?.departure)
    }
  ];

  const seatInfoData = [
    { label: <Xl8 xid="seat007">Last Name</Xl8>, value: selectedSeatInfo.lastName },
    {
      label: <Xl8 xid="seat008">First Name</Xl8>,
      value: selectedSeatInfo.firstName
    },
    {
      label: <Xl8 xid="seat009">Middle Name</Xl8>,
      value: selectedSeatInfo.middleInitial
    },
    {
      label: <Xl8 xid="seat010">Seat Number</Xl8>,
      value: selectedSeatInfo.number
    }
  ];
  const linkToFlightPax = <Link to={`/gtas/flightpax/${flightId}`}>Flightpax</Link>;

  const linkToPaxdetails = (
    <Link to={`/gtas/paxDetail/${flightId}/${paxId}`}>Show passenger details</Link>
  );

  return (
    <Container fluid>
      {showPending && <Loading></Loading>}
      <div className="seat-chart">
        {asArray(rowsWithReservedSeat).map((row, index) => (
          <Row className={getClassNameByRow(index)} key={index}>
            {getRow(row)}
          </Row>
        ))}
      </div>
      <CardDeck className="seat-info-display">
        <Card>
          <Card.Header>
            <Xl8 xid="seat001">Legend</Xl8>
          </Card.Header>
          <Legend cotravellersCount={selectedSeatInfo.coTravellers?.length || 0} />
        </Card>
        <Card>
          <Card.Header>
            <Xl8 xid="seat002">Flight Information</Xl8>
          </Card.Header>
          <SeatChartCard data={flightInfoData} link={linkToFlightPax} />
        </Card>
        <Card>
          <Card.Header>
            <Xl8 xid="seat003">Passenger Information</Xl8>
          </Card.Header>
          <SeatChartCard data={seatInfoData} link={linkToPaxdetails} />
        </Card>
      </CardDeck>
    </Container>
  );
};

export default SeatChart;
