import React, { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import Title from "../../components/title/Title";
import Xl8 from "../../components/xl8/Xl8";
import FlightBadge from "../../components/flightBadge/FlightBadge";
// import LabelledInput from "../../components/labelledInput/LabelledInput";
import SidenavContainer from "../../components/sidenavContainer/SidenavContainer";
import CountdownBadge from "../../components/countdownBadge/CountdownBadge";
import { Col, Tabs, Tab } from "react-bootstrap";
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
  localeDate,
  sortableDate
} from "../../utils/utils";
import { ROLE } from "../../utils/constants";
import "./FlightPax.css";

const FlightPax = props => {
  const cb = function(result) {};

  const [data, setData] = useState();
  const [hitData, setHitData] = useState();
  const [allData, setAllData] = useState();
  const [tab, setTab] = useState("all");
  const [key, setKey] = useState(0);
  const flightData = hasData(props.location.state?.data) ? props.location.state.data : {};

  const hasAnyHits = item => {
    if (item.watchListCount > 0 || item.manualHitCount > 0 || item.fuzzyHitCount > 0 || item.ruleHitCount > 0
        || item.graphHitCount > 0 || item.externalHitCount > 0) {
      return true;
    }
    return false;
  }

  const parseData = data => {
    return asArray(data).map(item => {
      const displayDobDate = localeDateOnly(
        new Date(item.dob).toISOString().slice(0, -14)
      );
      item.docNumber = item.documents?.length > 0 ? item.documents[0] : ""; // TODO Documents: shd show all or none here.
      item.age = getAge(item.dob) ? ` (${getAge(item.dob)})` : "";
      item.dobStr = `${sortableDate(new Date(item.dob))} ${displayDobDate} ${item.age}`;
      item.dobAge = `${alt(displayDobDate)} ${item.age}`;
      item.rulehit = item.onRuleHitList ? 1 : "";
      item.watchhit = item.onWatchList ? 1 : "";
      item.hitCounts = `${item.lowPrioHitCount || 0}${item.medPrioHitCount ||
        0}${item.highPrioHitCount || 0}`;
      item.aggregateHitsCount = {
        low: item.lowPrioHitCount,
        med: item.medPrioHitCount,
        high: item.highPrioHitCount
      };
      return item;
    });
  };

  const hitHeaders = [
    {
      Accessor: "ruleHitCount",
      Xl8: true,
      Header: ["fp011", "Rule Hits"],
      disableGroupBy: true,
      aggregate: "sum",
      Aggregated: ({ value }) => `${value} Hits`
    },
    {
      Accessor: "watchlistHitCount",
      Xl8: true,
      Header: ["fp012", "Watchlist Hits"],
      disableGroupBy: true,
      aggregate: "sum",
      Aggregated: ({ value }) => `${value} Hits`
    },
    {
      Accessor: "graphHitCount",
      Xl8: true,
      Header: ["fp022", "Graph Hits"],
      disableGroupBy: true,
      aggregate: "sum",
      Aggregated: ({ value }) => `${value} Hits`
    },
    {
      Accessor: "fuzzyHitCount",
      Xl8: true,
      Header: ["fp023", "Partial Hits"],
      disableGroupBy: true,
      aggregate: "sum",
      Aggregated: ({ value }) => `${value} Hits`
    },
    {
      Accessor: "manualHitCount",
      Xl8: true,
      Header: ["fp024", "Manual Hits"],
      disableGroupBy: true,
      aggregate: "sum",
      Aggregated: ({ value }) => `${value} Hits`
    },
    {
      Accessor: "externalHitCount",
      Xl8: true,
      Header: ["fp025", "External Hits"],
      disableGroupBy: true,
      aggregate: "sum",
      Aggregated: ({ value }) => `${value} Hits`
    }
  ];

  const aggregateHitHeader = {
    Accessor: "hitCounts",
    Xl8: true,
    Header: ["fp026", "Hit Aggregates"],
    disableGroupBy: true,
    Cell: ({ row }) => {
      return (
        <span
          style={{
            "justify-content": "space-between",
            display: "flex",
            "align-items": "baseline",
            marginLeft: "5px",
            marginRight: "5px"
          }}
        >
          {row.original.aggregateHitsCount.low > 0 && (
            <span>
              <i
                className="fa fa-flag"
                style={{ color: "#FCF300" }}
                title="normal severity"
              ></i>
              {row.original.aggregateHitsCount.low}
            </span>
          )}
          {row.original.aggregateHitsCount.med > 0 && (
            <span>
              <i
                className="fa fa-flag"
                style={{ color: "orange" }}
                title="high severity"
              ></i>
              {row.original.aggregateHitsCount.med}
            </span>
          )}
          {row.original.aggregateHitsCount.high > 0 && (
            <span>
              <i className="fa fa-flag" style={{ color: "red" }} title="top severity"></i>{" "}
              {row.original.aggregateHitsCount.high}
            </span>
          )}
        </span>
      );
    }
  };
  const arrayHeaderFixer = tab !== "hits" ? [aggregateHitHeader] : hitHeaders;
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
      aggregate: "count",
      Aggregated: ({}) => ``
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
      aggregate: "count",
      Aggregated: ({}) => ``
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
            {/* { label: <Xl8 xid="pd008">First Name</Xl8>, value: res.firstName },
      { label: <Xl8 xid="pd009">Middle Name</Xl8>, value: res.middleName }, */}

            <table class="table table-sm table-borderless">
              <tbody>
                <tr class="flightpax-row">
                  <td class="left">
                    <Xl8 xid="fp006">Direction:</Xl8>
                  </td>
                  <td class="right">{flightData.direction}</td>
                </tr>
                <tr class="flightpax-row">
                  <td class="left">
                    <Xl8 xid="fp009">Passengers:</Xl8>
                  </td>
                  <td class="right">{flightData.passengerCount}</td>
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
