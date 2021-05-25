// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "@reach/router";
import Seat from "./seat/Seat";
import Legend from "./legend/Legend";
import SeatChartCard from "./seatChartCard/SeatChartCard";
import Loading from "../loading/Loading";
import Xl8 from "../xl8/Xl8";
import SearchSeat from "./searchSeat/SearchSeat";
import SidenavContainer from "../sidenavContainer/SidenavContainer";
import Main from "../main/Main";
import { seats } from "../../services/serviceWrapper";
import { Row, CardDeck, Card } from "react-bootstrap";
import { asArray, hasData, localeDate } from "../../utils/utils";
import "./SeatChart.scss";

const SeatChart = ({ location }) => {
  const { flightId, paxId, currentPaxSeat } = useParams();
  const [reservedSeatsInfo, setReservedSeatsInfo] = useState({});
  const [columnWithReservedSeat, setColumnWithReservedSeat] = useState([]);
  const [rowsWithReservedSeat, setRowsWithReservedSeat] = useState([]);
  const [selectedSeatInfo, setSelectedSeatInfo] = useState({});
  const [showPending, setShowPending] = useState(true);
  const [searchedSeats, setSearchedSeats] = useState();
  const [showPax, setShowPax] = useState();
  const seatRefs = useRef({});
  const searchRef = useRef({});

  const resetSearch = () => {
    asArray(searchedSeats).forEach(seatNumber => {
      const seat = seatRefs.current[seatNumber];
      seat.classList.remove("search-result");
    });
  };

  const searchCallback = searchResult => {
    resetSearch();
    setSearchedSeats(searchResult);
    asArray(searchResult).forEach(seatNumber => {
      const seat = seatRefs.current[seatNumber];
      seat.classList.add("search-result");
      seat.focus();
    });
  };

  const getRow = letter => {
    const row = [];
    columnWithReservedSeat.forEach(col => {
      const seatNumber = `${col}${letter}`;
      let isSelected = false;
      currentPaxSeat.split(",").forEach(seatNum => {
        if (seatNum.trim() === seatNumber) {
          isSelected = true;
        }
      });
      row.push(
        <Seat
          ref={seat => (seatRefs.current[seatNumber] = seat)}
          seatNumber={seatNumber}
          seatInfo={reservedSeatsInfo[seatNumber]}
          selected={isSelected}
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

    // hide the pax tile if we are not viewing a specific pax yet
    if ((paxId === currentPaxSeat) === "all") setShowPax(false);
  }, []);

  useEffect(() => {
    setSelectedSeatInfo(reservedSeatsInfo[currentPaxSeat.split(",")[0]] || {});
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
    {
      label: <Xl8 xid="seat007">Last Name</Xl8>,
      value: hasData(selectedSeatInfo.lastName)
        ? selectedSeatInfo.lastName
        : location.state.lastName
    },
    {
      label: <Xl8 xid="seat008">First Name</Xl8>,
      value: hasData(selectedSeatInfo.firstName)
        ? selectedSeatInfo.firstName
        : location.state.firstName
    },
    {
      label: <Xl8 xid="seat009">Middle Name</Xl8>,
      value: hasData(selectedSeatInfo.middleName)
        ? selectedSeatInfo.middleName
        : location.state.middleName
    },
    {
      label: <Xl8 xid="seat010">Seat Number</Xl8>,
      value:
        currentPaxSeat.split(",").length > 1
          ? currentPaxSeat
          : hasData(selectedSeatInfo.number)
          ? selectedSeatInfo.number
          : "N/A"
    }
  ];
  const linkToFlightPax = (
    <Link to={`/gtas/flightpax/${flightId}`}>
      <Xl8 xid="seat011">Show flight passengers</Xl8>
    </Link>
  );

  const linkToPaxdetails = (
    <Link to={`/gtas/paxDetail/${flightId}/${paxId}`}>
      <Xl8 xid="seat012">Show passenger details</Xl8>
    </Link>
  );

  return (
    <>
      <SidenavContainer>
        <SearchSeat
          ref={searchRef}
          reservedSeats={Object.values(reservedSeatsInfo)}
          searchCallback={searchCallback}
          resetFilterForm={resetSearch}
        />
      </SidenavContainer>
      <Main>
        {showPending && <Loading></Loading>}
        <div className="seat-chart">
          <div className="seat-chart-row-container">
            {asArray(rowsWithReservedSeat).map((row, index) => (
              <Row className={`seat-chart-row ${getClassNameByRow(index)}`} key={index}>
                {getRow(row)}
              </Row>
            ))}
          </div>
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
          {showPax && (
            <Card>
              <Card.Header>
                <Xl8 xid="seat003">Passenger Information</Xl8>
              </Card.Header>
              <SeatChartCard data={seatInfoData} link={linkToPaxdetails} />
            </Card>
          )}
        </CardDeck>
      </Main>
    </>
  );
};

export default SeatChart;
