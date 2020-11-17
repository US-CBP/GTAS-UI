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
      return item;
    });
  };

  const headers = [
    {
      Accessor: "rulehit",
      Xl8: true,
      Header: ["fp011", "Rule Hit"],
      disableGroupBy: true,
      aggregate: "sum",
      Aggregated: ({ value }) => `${value} Hits`
    },
    {
      Accessor: "watchhit",
      Xl8: true,
      Header: ["fp012", "Watch Hit"],
      disableGroupBy: true,
      aggregate: "sum",
      Aggregated: ({ value }) => `${value} Hits`
    },
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
        return item.onRuleHitList || item.onWatchList;
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
      flightDestination: flightData.destination,
      flightOrigin: flightData.origin,
      eta: flightData.eta,
      etd: flightData.etd
    };
  };

  return (
    <>
      <SidenavContainer>
        <Col className="notopmargin">
          <div className="filterform-container">
            <br />
            <FlightBadge data={getFlightData()}></FlightBadge>
            <br />
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
          title={<Xl8 xid="fp010">Flight Passengers</Xl8>}
          leftChild={tabs}
          leftCb={titleTabCallback}
        ></Title>
        <Table
          key={key}
          header={headers}
          data={data}
          id="Flight Passengers"
          callback={cb}
          disableGroupBy={false}
          enableColumnFilter={true}
        ></Table>
      </Main>
    </>
  );
};

export default FlightPax;
