import React, { useEffect, useState } from "react";
import Seat from "./seat/Seat";
import { Container, Row, CardDeck, Card } from "react-bootstrap";
import "./SeatChart.scss";
import { seats } from "../../services/serviceWrapper";
import { asArray } from "../../utils/utils";
import { useParams } from "@reach/router";
import SeatInfo from "./seatInfo/SeatInfo";
import Legend from "./legend/Legend";
import FlightInfo from "./flightInfo/FlighInfo";
import Loading from "../loading/Loading";

const SeatChart = ({ location }) => {
  const { flightId, currentPaxSeat } = useParams();
  const [reserevedSeatsInfo, setReservedSeatsInfo] = useState({});
  const [columnWithReservedSeat, setColumnWithReservedSeat] = useState([]);
  const [selectedSeatInfo, setSelectedSeatInfo] = useState({});
  const [showPending, setShowPending] = useState(true);

  const getRow = letter => {
    const row = [];
    columnWithReservedSeat.forEach(col => {
      const seatNumber = `${col}${letter}`;
      row.push(
        <Seat
          seatNumber={seatNumber}
          seatInfo={reserevedSeatsInfo[seatNumber]}
          selected={currentPaxSeat === seatNumber}
          key={seatNumber}
          className={
            selectedSeatInfo.coTravellers.includes(seatNumber) ? "co-traveler" : ""
          }
        />
      );
    });

    return row;
  };

  const processData = seatsInfo => {
    const mappedSeatInfo = {};
    const colsWithReservedSeat = []; // contains all column that have at least one reserved seat.
    asArray(seatsInfo).map(info => {
      mappedSeatInfo[info.number] = info;

      const number = info.number.slice(0, -1); //remove letter (row) from the seat
      if (colsWithReservedSeat.indexOf(number) === -1) colsWithReservedSeat.push(number);
    });
    setReservedSeatsInfo(mappedSeatInfo);
    colsWithReservedSeat.sort((x, y) => x - y);
    setColumnWithReservedSeat(colsWithReservedSeat);
  };

  useEffect(() => {
    seats.get(flightId).then(res => {
      processData(res);
      setShowPending(false);
    });
  }, []);

  useEffect(() => {
    setSelectedSeatInfo(reserevedSeatsInfo[currentPaxSeat] || {});
  }, [reserevedSeatsInfo]);

  return (
    <Container fluid>
      {showPending && <Loading></Loading>}
      <div className="seat-chart">
        <div>
          <Row>{getRow("K")}</Row>
          <Row>{getRow("J")}</Row>
          <Row>{getRow("H")}</Row>
        </div>
        <div className="middle-rows">
          <Row>{getRow("G")}</Row>
          <Row>{getRow("F")}</Row>
          <Row>{getRow("E")}</Row>
          <Row>{getRow("D")}</Row>
        </div>
        <div>
          <Row>{getRow("C")}</Row>
          <Row>{getRow("B")}</Row>
          <Row>{getRow("A")}</Row>
        </div>
      </div>
      <CardDeck className="seat-info-display">
        <Card>
          <Legend cotravellersCount={selectedSeatInfo.coTravellers?.length || 0} />
        </Card>
        <Card>
          <FlightInfo
            arrival={location.state.arrival}
            departure={location.state.departure}
            flightNumber={location.state.flightNumber}
            flightId={location.state.flightId}
          />
        </Card>
        <Card>
          <SeatInfo info={selectedSeatInfo} />
        </Card>
      </CardDeck>
    </Container>
  );
};

export default SeatChart;
