import React, { useState, useEffect, useContext } from "react";
import Table from "../../components/table/Table";
import Title from "../../components/title/Title";
import LabelledInput from "../../components/labelledInput/LabelledInput";
import FilterForm from "../../components/filterForm2/FilterForm";
import Main from "../../components/main/Main";
import SidenavContainer from "../../components/sidenavContainer/SidenavContainer";
import CountdownBadge from "../../components/countdownBadge/CountdownBadge";

import Xl8 from "../../components/xl8/Xl8";
import RoleAuthenticator from "../../context/roleAuthenticator/RoleAuthenticator";
import { UserContext } from "../../context/user/UserContext";

import { Link } from "@reach/router";
import { flights } from "../../services/serviceWrapper";
import { hasData, alt, localeDate, asArray } from "../../utils/utils";
import { TIME, ROLE } from "../../utils/constants";
import { Col, Tabs, Tab } from "react-bootstrap";
import "./Flights.css";

const Flights = props => {
  const cb = () => {};
  const initTableState = {
    pageIndex: 0,
    pageSize: 50,
    sortBy: [{ id: "timer", desc: false }]
  };

  const { getUserState } = useContext(UserContext);
  const [data, setData] = useState();
  const [hitData, setHitData] = useState();
  const [allData, setAllData] = useState();
  const [tab, setTab] = useState("all");
  const [tablekey, setTablekey] = useState(0);
  const [tableState, setTableState] = useState(initTableState);

  const hasAnyHits = item => {
    if (item.listHitCount > 0 || item.manualHitCount > 0 || item.fuzzyHitCount > 0 || item.ruleHitCount > 0
        || item.graphHitCount > 0 || item.externalHitCount > 0) {
      return true;
    }
    return false;
  }

  const setDataWrapper = (data, retainState) => {
    if (!retainState) setTableState(initTableState);

    const roles = getUserState().userRoles;

    const parsedAll = asArray(data).map(item => {
      const future = item.direction === "O" ? item.etd : item.eta;
      item.timer = future;

      if (roles.includes(ROLE.ADMIN) || roles.includes(ROLE.PAXVWR))
        item.sendRowToLink = `/gtas/flightpax/${item.id}`;

      const severity = alt(item.ruleHitCount, 0) + alt(item.listHitCount, 0);
      item.severity = severity > 0 ? severity : "";

      //Display null on hitcounts that are 0
      if(item.listHitCount === 0) {item.listHitCount=""};
      if(item.ruleHitCount === 0) {item.ruleHitCount=""};
      if(item.graphHitCount === 0) {item.graphHitCount=""};
      if(item.fuzzyHitCount === 0) {item.fuzzyHitCount=""};
      if(item.externalHitCount === 0) {item.externalHitCount=""};
      if(item.manualHitCount === 0) {item.manualHitCount=""};

      item.hitCounts = `${item.lowPrioHitCount || 0}${item.medPrioHitCount ||
      0}${item.highPrioHitCount || 0}`;
      item.aggregateHitsCount = {
        low: item.lowPrioHitCount,
        med: item.medPrioHitCount,
        high: item.highPrioHitCount
      };

      return item;
    });

    const parsedHits = parsedAll.filter(item => {
      return hasAnyHits(item);
    });

    setAllData(alt(parsedAll, []));
    setHitData(alt(parsedHits, []));

    const newkey = tablekey + 1;
    setTablekey(newkey);
  };

  //TODO: refactor
  const preFetchCallback = fields => {
    const range = +fields["hourRange"] || 96; // default to 96 hours

    let etaEnd = new Date();
    etaEnd.setHours(etaEnd.getHours() + range);

    const fieldscopy = Object.assign([], fields);
    delete fieldscopy["hourRange"]; // hourRange is not passed directly to the backend

    const oneHourAgo = new Date().setHours(new Date().getHours() - 1);
    let paramObject = { etaStart: oneHourAgo, etaEnd: etaEnd };

    const fieldNames = Object.keys(fieldscopy);
    fieldNames.forEach(name => {
      if (hasData(fieldscopy[name])) {
        if (name === "destinationAirports" || name === "originAirports") {
          // retrieve raw comma- or whitespace-separated text, convert to array, remove empties.
          const airports = fieldscopy[name]
            .replace(/[,]/g, " ")
            .split(" ")
            .filter(Boolean);
          paramObject[name] = [...new Set(airports)]; // scrub duplicate vals
        } else paramObject[name] = fieldscopy[name];
      }
    });

    return "?request=" + encodeURIComponent(JSON.stringify(paramObject));
  };

  const now = new Date();

  const aggregateHitHeader = {
    Accessor: "hitCounts",
    Xl8: true,
    Header: ["fl024", "Hit Aggregates"],
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

  const hitHeaders = [
    { Accessor: "listHitCount", Xl8: true, Header: ["fl013", "Watchlist Hits"] },
    { Accessor: "ruleHitCount", Xl8: true, Header: ["fl014", "Rule Hits"] },
    { Accessor: "graphHitCount", Xl8: true, Header: ["fl015", "Graph Hits"] },
    { Accessor: "fuzzyHitCount", Xl8: true, Header: ["fl016", "Partial Hits"] },
    { Accessor: "externalHitCount", Xl8: true, Header: ["fl017", "External Hits"] },
    { Accessor: "manualHitCount", Xl8: true, Header: ["fl023", "Manual Hits"] },
  ];

  const arrayHeaderFixer = tab !== "hits" ? [aggregateHitHeader] : hitHeaders;
  const Headers = [
    {
      Accessor: "timer",
      Xl8: true,
      Header: ["fl009", "Timer"],
      Cell: ({ row }) => (
        <CountdownBadge
          future={row.original.timer}
          baseline={now}
          direction={row.original.direction}
        ></CountdownBadge>
      )
    },
    {
      Accessor: "eta",
      Xl8: true,
      Header: ["fl010", "Arrival"],
      Cell: ({ row }) => localeDate(row.original.eta)
    },
    {
      Accessor: "etd",
      Xl8: true,
      Header: ["fl011", "Departure"],
      Cell: ({ row }) => localeDate(row.original.etd)
    },
      ...arrayHeaderFixer,
    {
      Accessor: "passengerCount",
      Xl8: true,
      Header: ["fl018", "Passengers"],
      Cell: ({ row }) => (
        <RoleAuthenticator
          alt={row.original.passengerCount}
          roles={[ROLE.ADMIN, ROLE.PAXVWR]}
        >
          <Link to={"../flightpax/" + row.original.id}>
            {row.original.passengerCount}
          </Link>
        </RoleAuthenticator>
      )
    },
    { Accessor: "fullFlightNumber", Xl8: true, Header: ["fl019", "Flight"] },
    { Accessor: "origin", Xl8: true, Header: ["fl020", "Origin"] },
    { Accessor: "destination", Xl8: true, Header: ["fl021", "Destination"] },
    { Accessor: "direction", Xl8: true, Header: ["fl022", "Direction"] }
  ];

  useEffect(() => {
    if (tab === "hits") setData(hitData);
    else setData(allData);

    const newkey = tablekey + 1;
    setTablekey(newkey);
  }, [hitData, tab]);

  const directions = [
    { value: "A", label: "All" },
    { value: "I", label: "Inbound" },
    { value: "O", label: "Outbound" }
  ];

  const stateCallback = latestState => {
    if (
      alt(latestState.pageSize) !== alt(tableState.pageSize) ||
      alt(latestState.pageIndex) !== alt(tableState.pageIndex) ||
      alt(latestState.sortBy) !== alt(tableState.sortBy)
    ) {
      setTableState(latestState);
    }
  };

  const getTableState = () => {
    return tableState;
  };

  const tabs = (
    <Tabs defaultActiveKey="all" id="flightTabs">
      <Tab
        eventKey="all"
        title={
          <Xl8 xid="fl001" id="flightTabs-tab-all">
            All
          </Xl8>
        }
      ></Tab>
      <Tab
        eventKey="hits"
        title={
          <Xl8 xid="fl002" id="flightTabs-tab-hits">
            Hits
          </Xl8>
        }
      ></Tab>
    </Tabs>
  );

  const titleTabCallback = ev => {
    const id = ev.split("-")[2];

    if (id) setTab(id);
  };

  return (
    <>
      <SidenavContainer>
        <Col className="notopmargin">
          <FilterForm
            service={flights.get}
            paramCallback={preFetchCallback}
            callback={setDataWrapper}
            interval={TIME.MINUTE}
          >
            <LabelledInput
              labelText={<Xl8 xid="fl003"> Origin Airports</Xl8>}
              datafield="originAirports"
              name="originAirports"
              inputType="text"
              callback={cb}
              alt={<Xl8 xid="0">Origin Airports</Xl8>}
            />
            <LabelledInput
              labelText={<Xl8 xid="fl004"> Destination Airports</Xl8>}
              datafield="destinationAirports"
              name="destinationAirports"
              inputType="text"
              callback={cb}
              alt={<Xl8 xid="1"> Destination Airports</Xl8>}
            />
            <LabelledInput
              datafield="flightNumber"
              labelText={<Xl8 xid="fl005">Flight Number</Xl8>}
              inputType="text"
              name="flightNumber"
              callback={cb}
              alt={<Xl8 xid="7">Flight Number</Xl8>}
            />
            <LabelledInput
              datafield="direction"
              inputType="select"
              labelText={<Xl8 xid="fl006">Direction</Xl8>}
              inputStyle="form-select"
              callback={cb}
              name="direction"
              options={directions}
              alt={<Xl8 xid="7">Flight Direction</Xl8>}
            />
            <LabelledInput
              labelText={<Xl8 xid="fl007">Hour Range</Xl8>}
              inputType="select"
              name="hourRange"
              inputVal="96"
              inputStyle="form-select"
              datafield="hourRange"
              options={[
                { value: "6", label: "+6 hours" },
                { value: "12", label: "+12 hours" },
                { value: "24", label: "+24 hours" },
                { value: "48", label: "+48 hours" },
                { value: "96", label: "+96 hours" }
              ]}
              callback={cb}
              alt=""
            />
          </FilterForm>
        </Col>
      </SidenavContainer>
      <Main>
        <Title
          title={<Xl8 xid="fl008">Flights</Xl8>}
          uri={props.uri}
          leftChild={tabs}
          leftCb={titleTabCallback}
        />
        <Table
          data={data}
          key={tablekey}
          header={Headers}
          callback={cb}
          stateVals={getTableState}
          stateCb={stateCallback}
        />
      </Main>
    </>
  );
};

export default Flights;
