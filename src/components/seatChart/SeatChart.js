import React, { useEffect, useState } from "react";
import Seat from "./seat/Seat";
import { Container, Row } from "react-bootstrap";
import "./SeatChart.scss";
import { seats } from "../../services/serviceWrapper";
import { asArray, hasData } from "../../utils/utils";
import { useParams, navigate, Link } from "@reach/router";

const SeatChart = props => {
  const { flightId, currentPaxSeat } = useParams();
  const [reserevedSeatsInfo, setReservedSeatsInfo] = useState({});
  const [columnWithReservedSeat, setColumnWithReservedSeat] = useState([]);
  const [selectedSeatInfo, setSelectedSeatInfo] = useState();

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

  const seatNumberToSeatInfoMap = seatsInfo => {
    const mappedSeatInfo = {};
    asArray(seatsInfo).map(info => (mappedSeatInfo[info.number] = info));
    setReservedSeatsInfo(mappedSeatInfo);
  };

  const getColumnWithReservedSeat = seatsInfo => {
    const rows = [];
    asArray(seatsInfo).map(info => {
      const number = info.number.slice(0, -1);
      if (rows.indexOf(number) === -1) rows[number] = number;
    });
    rows.sort((x, y) => x - y);
    return rows;
  };

  useEffect(() => {
    seats.get(flightId).then(res => {
      seatNumberToSeatInfoMap(res);
      setColumnWithReservedSeat(getColumnWithReservedSeat(res));
    });
  }, []);

  useEffect(() => {
    setSelectedSeatInfo(reserevedSeatsInfo[currentPaxSeat] || {});
  }, [currentPaxSeat, reserevedSeatsInfo]);

  return (
    <Container fluid>
      <div className="seat-chart">
        <div>
          <Row>{getRow("A")}</Row>
          <Row>{getRow("B")}</Row>
          <Row>{getRow("C")}</Row>
        </div>

        <div className="middle-rows">
          <Row>{getRow("D")}</Row>
          <Row>{getRow("E")}</Row>
          <Row>{getRow("F")}</Row>
          <Row>{getRow("G")}</Row>
        </div>

        <div>
          <Row>{getRow("H")}</Row>
          <Row>{getRow("J")}</Row>
          <Row>{getRow("K")}</Row>
        </div>
      </div>
      {hasData(selectedSeatInfo) ? (
        <div className="seat-info-display">
          <h5>Selected seat Info</h5>
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            <li>
              <b>First Name:</b> {selectedSeatInfo.firstName}
            </li>
            <li>
              <b>Last Name:</b> {selectedSeatInfo.lastName}
            </li>
            <li>
              <b>Middle Name:</b> {selectedSeatInfo.middleInitial}
            </li>
            <li>
              <b>Seat Number:</b> {selectedSeatInfo.number}
            </li>
          </ul>
          <Link to={`/gtas/paxDetail/${flightId}/${selectedSeatInfo.paxId}`}>
            Show passenger details
          </Link>
        </div>
      ) : (
        ""
      )}
    </Container>
  );
};

export default SeatChart;
