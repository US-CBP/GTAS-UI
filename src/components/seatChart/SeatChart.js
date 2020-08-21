import React, { useEffect, useState } from "react";
import Seat from "./seat/Seat";
import { Container, Row } from "react-bootstrap";
import "./SeatChart.scss";
import { seats } from "../../services/serviceWrapper";
import { asArray } from "../../utils/utils";

const SeatChart = props => {
  const [reserevedSeatsInfo, setReservedSeatsInfo] = useState({});

  const getRow = letter => {
    const row = [];
    for (let i = 1; i < 87; i++) {
      const seatNumber = `${i}${letter}`;
      row.push(
        <Seat
          seatNumber={seatNumber}
          seatInfo={reserevedSeatsInfo[seatNumber]}
          key={seatNumber}
        />
      );
    }

    return row;
  };

  const seatNumberToSeatInfoMap = seatsInfo => {
    const mappedSeatInfo = {};
    asArray(seatsInfo).map(info => (mappedSeatInfo[info.number] = info));
    setReservedSeatsInfo(mappedSeatInfo);
  };

  useEffect(() => {
    seats.get(1).then(res => {
      seatNumberToSeatInfoMap(res);
    });
  }, []);

  return (
    <Container fluid className="seat-chart">
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
    </Container>
  );
};

export default SeatChart;
