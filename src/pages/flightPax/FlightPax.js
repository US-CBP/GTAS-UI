// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import Title from "../../components/title/Title";
import Xl8 from "../../components/xl8/Xl8";
import FlightBadge from "../../components/flightBadge/FlightBadge";
import SidenavContainer from "../../components/sidenavContainer/SidenavContainer";
import CountdownBadge from "../../components/countdownBadge/CountdownBadge";
import HitsBadge from "../../components/hitsBadge/HitsBadge";
import Main from "../../components/main/Main";
import RoleAuthenticator from "../../context/roleAuthenticator/RoleAuthenticator";
import { Link } from "@reach/router";

import { flightPassengers } from "../../services/serviceWrapper";
import {
  asArray,
  hasData,
  getAge,
  alt,
  localeDateOnly,
  aboveZero,
  lpad5,
  sortableDate
} from "../../utils/utils";
import { ROLE } from "../../utils/constants";
import { Col, Tabs, Tab } from "react-bootstrap";
import "./FlightPax.css";

const FlightPax = props => {
  const cb = () => {};

  const [data, setData] = useState();
  const [hitData, setHitData] = useState();
  const [allData, setAllData] = useState();
  const [tab, setTab] = useState("all");
  const [key, setKey] = useState(0);
  const flightData = hasData(props.location.state?.data) ? props.location.state.data : {};

  const hasAnyHits = item => {
    if (
      item.watchlistHitCount > 0 ||
      item.manualHitCount > 0 ||
      item.fuzzyHitCount > 0 ||
      item.ruleHitCount > 0 ||
      item.graphHitCount > 0 ||
      item.externalHitCount > 0
    ) {
      return true;
    }
    return false;
  };

  const parseData = data => {
    return asArray(data).map(item => {
      const displayDobDate = new Date(item.dob).toLocaleDateString();
      item.docNumber = item.documents?.length > 0 ? item.documents[0] : ""; // TODO Documents: shd show all or none here.
      item.age = getAge(item.dob) ? ` (${getAge(item.dob)})` : "";
      item.dobStr = `${sortableDate(new Date(item.dob))} ${displayDobDate} ${item.age}`;
      item.dobAge = `${alt(displayDobDate)} ${item.age}`;
      item.rulehit = item.onRuleHitList ? 1 : "";
      item.watchhit = item.onWatchList ? 1 : "";
      item.hitCounts = `${lpad5(item.highPrioHitCount)}:${lpad5(
        item.medPrioHitCount
      )}:${lpad5(item.lowPrioHitCount)}`;

      item.aggregateHitsCount = {
        low: item.lowPrioHitCount,
        med: item.medPrioHitCount,
        high: item.highPrioHitCount
      };

      return item;
    });
  };

  // For an array of hitCounts strings for all travelers in a co-traveler group we get the sum of all hits.
  // This aggregation allows us to sort the hitCounts col by severity using the colon-delimited strings
  // and still capture the total number of hits when the table is grouped by reservation number (co-travelers).
  // So for a co-traveler hit array like this:
  //    ["00002:00003:00000", "00000:00002:00000", "00000:00000:00001"]
  // where each string represents the hits for a single co-traveler, we sum all the numeric sections
  const sumCotravelerHits = cotravelerHits => {
    const groupHitTotal = cotravelerHits.reduce(
      (totalHitsAccumulator, hitCountString) => {
        const sum = hitCountString
          .split(":")
          .reduce((currentPaxTotal, hitSection) => +currentPaxTotal + +hitSection, 0);
        return +sum + totalHitsAccumulator;
      },
      0
    );

    return groupHitTotal;
  };

  const hitHeaders = [
    {
      Accessor: "ruleHitCount",
      Xl8: true,
      Header: ["fp011", "Rule Hits"],
      disableGroupBy: true,
      aggregate: "sum",
      Aggregated: ({ value }) => aboveZero(value)
    },
    {
      Accessor: "watchlistHitCount",
      Xl8: true,
      Header: ["fp012", "Watchlist Hits"],
      disableGroupBy: true,
      aggregate: "sum",
      Aggregated: ({ value }) => aboveZero(value)
    },
    {
      Accessor: "graphHitCount",
      Xl8: true,
      Header: ["fp022", "Graph Hits"],
      disableGroupBy: true,
      aggregate: "sum",
      Aggregated: ({ value }) => aboveZero(value)
    },
    {
      Accessor: "fuzzyHitCount",
      Xl8: true,
      Header: ["fp023", "Partial Hits"],
      disableGroupBy: true,
      aggregate: "sum",
      Aggregated: ({ value }) => aboveZero(value)
    },
    {
      Accessor: "manualHitCount",
      Xl8: true,
      Header: ["fp024", "Manual Hits"],
      disableGroupBy: true,
      aggregate: "sum",
      Aggregated: ({ value }) => aboveZero(value)
    },
    {
      Accessor: "externalHitCount",
      Xl8: true,
      Header: ["fp025", "External Hits"],
      disableGroupBy: true,
      aggregate: "sum",
      Aggregated: ({ value }) => aboveZero(value)
    }
  ];

  const aggregateHitHeader = [
    {
      Accessor: "hitCounts",
      Xl8: true,
      Header: ["fp026", "Hit Aggregates"],
      disableGroupBy: true,
      aggregate: sumCotravelerHits,
      Aggregated: ({ value }) => aboveZero(value),
      Cell: ({ row }) => (
        <HitsBadge
          high={row.original.aggregateHitsCount.high}
          med={row.original.aggregateHitsCount.med}
          low={row.original.aggregateHitsCount.low}
        ></HitsBadge>
      )
    }
  ];

  const arrayHeaderFixer = tab !== "hits" ? aggregateHitHeader : hitHeaders;
  const headers = [
    ...arrayHeaderFixer,
    {
      Accessor: "passengerType",
      Xl8: true,
      Header: ["fp013", "Passenger Type"],
      disableGroupBy: true
    },
    {
      Accessor: "lastName",
      Xl8: true,
      Header: ["fp014", "Last Name"],
      Cell: ({ row }) => {
        return (
          <RoleAuthenticator
            alt={row.original.lastName}
            roles={[ROLE.ADMIN, ROLE.PAXVWR]}
          >
            <Link to={`/gtas/paxDetail/${props.id}/${row.original.id}`}>
              {row.original.lastName}
            </Link>
          </RoleAuthenticator>
        );
      },
      disableGroupBy: true,
      Aggregated: () => ``
    },
    {
      Accessor: "firstName",
      Xl8: true,
      Header: ["fp015", "First Name"],
      disableGroupBy: true
    },
    {
      Accessor: "middleName",
      Xl8: true,
      Header: ["fp016", "Middle Name"],
      disableGroupBy: true
    },
    { Accessor: "gender", Xl8: true, Header: ["fp017", "Gender"], disableGroupBy: true },
    {
      Accessor: "dobStr",
      Xl8: true,
      Header: ["fp018", "DOB"],
      Cell: ({ row }) => <div>{row.original.dobAge}</div>,
      disableGroupBy: true,
      Aggregated: () => ``
    },
    {
      Accessor: "docNumber",
      Xl8: true,
      Header: ["fp019", "Doc Number"],
      disableGroupBy: true
    },
    {
      Accessor: "nationality",
      Xl8: true,
      Header: ["fp020", "Nationality"],
      disableGroupBy: true
    },
    { Accessor: "coTravellerId", Xl8: true, Header: ["fp021", "PNR Record Loc."] }
  ];

  useEffect(() => {
    flightPassengers.get(props.id).then(res => {
      if (!hasData(res)) {
        setAllData([]);
        setHitData([]);
        return;
      }

      let parsed = parseData(res);

      const parsedHits = parsed.filter(item => {
        return hasAnyHits(item);
      });

      setAllData(parsed);
      setHitData(parsedHits);
      setKey(1);
    });
  }, [props.id]);

  useEffect(() => {
    if (tab === "hits") setData(hitData);
    else setData(allData);

    const newkey = key + 1;
    setKey(newkey);
  }, [hitData, tab]);

  const tabs = (
    <Tabs defaultActiveKey="all" id="flightPaxTabs">
      <Tab
        eventKey="all"
        title={
          <Xl8 xid="fp001" id="flightPaxTabs-tab-all">
            All
          </Xl8>
        }
      ></Tab>
      <Tab
        eventKey="hits"
        title={
          <Xl8 xid="fp002" id="flightPaxTabs-tab-hits">
            Hits
          </Xl8>
        }
      ></Tab>
    </Tabs>
  );

  const titleTabCallback = ev => {
    const id = ev.split("-")[2];

    setTab(id);
  };

  const getFlightData = () => {
    return {
      flightNumber: flightData.fullFlightNumber,
      carrier: "",
      flightDestination: flightData.destination || flightData.flightDestination,
      flightOrigin: flightData.origin || flightData.flightOrigin,
      eta: flightData.eta,
      etd: flightData.etd
    };
  };

  return (
    <>
      <SidenavContainer>
        <br />
        <FlightBadge data={getFlightData()}></FlightBadge>
        <Col className="notopmargin">
          <div className="filterform-container form">
            <div className="flightpax-countdown-container">
              <CountdownBadge
                future={flightData.direction === "O" ? flightData.etd : flightData.eta}
                baseline={Date.now()}
                direction={flightData.direction}
              ></CountdownBadge>
            </div>
            <br />

            <table className="table table-sm table-borderless">
              <tbody>
                <tr className="flightpax-row">
                  <td className="left">
                    <Xl8 xid="fp006">Direction:</Xl8>
                  </td>
                  <td className="right">{flightData.direction}</td>
                </tr>
                <tr className="flightpax-row">
                  <td className="left">
                    <Xl8 xid="fp009">Passengers:</Xl8>
                  </td>
                  <td className="right">{flightData.passengerCount}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Col>
      </SidenavContainer>
      <Main>
        <Title
          title={<Xl8 xid="fp010">Passengers</Xl8>}
          leftChild={tabs}
          leftCb={titleTabCallback}
        ></Title>
        <Table
          key={key}
          header={headers}
          data={data}
          id="Passengers"
          callback={cb}
          disableGroupBy={false}
          enableColumnFilter={true}
        ></Table>
      </Main>
    </>
  );
};

export default FlightPax;
