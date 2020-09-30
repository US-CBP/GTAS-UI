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
import { set } from "js-cookie";
import Title from "../title/Title";

const SeatChart = ({ location }) => {
  const { flightId, currentPaxSeat } = useParams();
  const [reserevedSeatsInfo, setReservedSeatsInfo] = useState({});
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
    setSelectedSeatInfo(reserevedSeatsInfo[currentPaxSeat] || {});
  }, [reserevedSeatsInfo]);

  return (
    <Container fluid>
      {showPending && <Loading></Loading>}
      <div className="seat-chart">
        {asArray(rowsWithReservedSeat).map((row, index) => (
          <Row className={getClassNameByRow(index)}>{getRow(row)}</Row>
        ))}
      </div>
      <CardDeck className="seat-info-display">
        <Card>
          <Card.Header>
            <Title title="Legends"></Title>
          </Card.Header>
          <Legend cotravellersCount={selectedSeatInfo.coTravellers?.length || 0} />
        </Card>
        <Card>
          <Card.Header>
            <Title title="Flight Information" />
          </Card.Header>
          <FlightInfo
            arrival={location.state.arrival}
            departure={location.state.departure}
            flightNumber={location.state.flightNumber}
            flightId={location.state.flightId}
          />
        </Card>
        <Card>
          <Card.Header>
            <Title title="Selected Seat's Information" />
          </Card.Header>
          <SeatInfo info={selectedSeatInfo} />
        </Card>
      </CardDeck>
    </Container>
  );
};

export default SeatChart;
