// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useState, useEffect, useContext } from "react";
import Table from "../../components/table/Table";
import Title from "../../components/title/Title";
import LabelledInput from "../../components/labelledInput/LabelledInput";
import FilterForm from "../../components/filterForm2/FilterForm";
import Main from "../../components/main/Main";
import SidenavContainer from "../../components/sidenavContainer/SidenavContainer";
import CountdownBadge from "../../components/countdownBadge/CountdownBadge";
import HitsBadge from "../../components/hitsBadge/HitsBadge";
import LazyImage from "../../components/lazyImage/LazyImage";
import Xl8 from "../../components/xl8/Xl8";
import { UserContext } from "../../context/user/UserContext";
import { flights } from "../../services/serviceWrapper";
import {
  hasData,
  alt,
  localeDate,
  asArray,
  aboveZero,
  lpad5,
  dateComparator
} from "../../utils/utils";
import { TIME, ROLE, LK, TABTYPE, EXPORTFILENAME } from "../../utils/constants";
import { Col, Tabs, Tab } from "react-bootstrap";
import { LookupContext } from "../../context/data/LookupContext";
import ToolTipWrapper from "../../components/tooltipWrapper/TooltipWrapper";
import "./Flights.css";
import "../../components/tabs/Tabs.css";

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
  const [allData, setAllData] = useState([]);
  const [airportFaves, setAirportFaves] = useState();
  const [tab, setTab] = useState(TABTYPE.ALL);
  const [tablekey, setTablekey] = useState(0);
  const [tableState, setTableState] = useState(initTableState);
  const [isLoading, setIsLoading] = useState(false);
  const [exportFileName, setExportFileName] = useState();

  const { getCachedCoreFields } = useContext(LookupContext);

  const hasAnyHits = item => {
    if (
      item.listHitCount > 0 ||
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

  const setDataWrapper = (data, retainState) => {
    if (!retainState) setTableState(initTableState);

    const roles = getUserState().userRoles;

    const parsedAll = asArray(data).map(item => {
      const future = item.direction === "O" ? item.etd : item.eta;
      item.timer = future;

      if (roles.includes(ROLE.ADMIN) || roles.includes(ROLE.PAXVWR))
        item.sendRowToLink = `/gtas/flightpax/${item.id}`;

      const severity = alt(item.ruleHitCount, 0) + alt(item.listHitCount, 0);
      item.severity = aboveZero(severity);

      //Display null on hitcounts that are 0
      item.listHitCount = aboveZero(item.listHitCount);
      item.ruleHitCount = aboveZero(item.ruleHitCount);
      item.graphHitCount = aboveZero(item.graphHitCount);
      item.fuzzyHitCount = aboveZero(item.fuzzyHitCount);
      item.externalHitCount = aboveZero(item.externalHitCount);
      item.manualHitCount = aboveZero(item.manualHitCount);
      item.departure = localeDate(item.etd);
      item.arrival = localeDate(item.eta);

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

    const parsedHits = parsedAll.filter(item => {
      return hasAnyHits(item);
    });

    setAllData(alt(parsedAll, []));
    setHitData(alt(parsedHits, []));

    setTablekey(tablekey + 1);
    setIsLoading(false);
  };

  const preFetchCallback = fields => {
    setIsLoading(true);
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

  const getTooltip = ttipKey => {
    const record = airportFaves.find(ap => ap.value === ttipKey);
    return record?.title;
  };

  const aggregateHitHeader = {
    Accessor: "hitCounts",
    Xl8: true,
    Header: ["fl024", "Hit Aggregates"],
    disableExport: true,
    disableGroupBy: true,
    Cell: ({ row }) => {
      return (
        <HitsBadge
          high={row.original.aggregateHitsCount.high}
          med={row.original.aggregateHitsCount.med}
          low={row.original.aggregateHitsCount.low}
        ></HitsBadge>
      );
    }
  };

  const hitHeaders = [
    { Accessor: "listHitCount", Xl8: true, Header: ["fl013", "Watchlist Hits"] },
    { Accessor: "ruleHitCount", Xl8: true, Header: ["fl014", "Rule Hits"] },
    { Accessor: "graphHitCount", Xl8: true, Header: ["fl015", "Graph Hits"] },
    { Accessor: "fuzzyHitCount", Xl8: true, Header: ["fl016", "Partial Hits"] },
    { Accessor: "externalHitCount", Xl8: true, Header: ["fl017", "External Hits"] },
    { Accessor: "manualHitCount", Xl8: true, Header: ["fl023", "Manual Hits"] }
  ];

  const arrayHeaderFixer = tab !== TABTYPE.HITS ? [aggregateHitHeader] : hitHeaders;
  const Headers = [
    {
      Accessor: "timer",
      Xl8: true,
      Header: ["fl009", "Timer"],
      Cell: ({ row }) => (
        <CountdownBadge
          future={row.original.timer}
          baseline={new Date()}
          direction={row.original.direction}
        ></CountdownBadge>
      )
    },
    {
      Accessor: "departure",
      Xl8: true,
      Header: ["fl011", "Departure"],
      sortType: (row1, row2) =>
        dateComparator(row1.original.departure, row2.original.departure)
    },
    {
      Accessor: "arrival",
      Xl8: true,
      Header: ["fl010", "Arrival"],
      sortType: (row1, row2) =>
        dateComparator(row1.original.arrival, row2.original.arrival)
    },
    {
      Accessor: "fullFlightNumber",
      Xl8: true,
      Header: ["fl019", "Flight"],
      Cell: ({ row }) => (
        <>
          <LazyImage val={row.original.fullFlightNumber} type={LK.CARRIER}></LazyImage>
          <ToolTipWrapper
            data={{
              val: row.original.fullFlightNumber,
              lkup: LK.CARRIER
            }}
          ></ToolTipWrapper>
        </>
      )
    },
    {
      Accessor: "origin",
      Xl8: true,
      Header: ["fl020", "Origin"],
      Cell: ({ row }) => (
        <ToolTipWrapper
          data={{
            val: row.original.origin,
            lkup: LK.AIRPORT,
            title: getTooltip(row.original.origin)
          }}
        ></ToolTipWrapper>
      )
    },
    {
      Accessor: "destination",
      Xl8: true,
      Header: ["fl021", "Destination"],
      Cell: ({ row }) => (
        <ToolTipWrapper
          data={{
            val: row.original.destination,
            lkup: LK.AIRPORT,
            title: getTooltip(row.original.destination)
          }}
        ></ToolTipWrapper>
      )
    },

    ...arrayHeaderFixer,
    {
      Accessor: "passengerCount",
      Xl8: true,
      Header: ["fl018", "Passengers"],
      Cell: ({ row }) => row.original.passengerCount
    },
    { Accessor: "direction", Xl8: true, Header: ["fl022", "Direction"] }
  ];

  useEffect(() => {
    if (tab === TABTYPE.HITS) {
      setData(hitData);
      setExportFileName(EXPORTFILENAME.FLIGHT.HITS);
    } else {
      setData(allData);
      setExportFileName(EXPORTFILENAME.FLIGHT.ALL);
    }

    const newkey = tablekey + 1;
    setTablekey(newkey);
  }, [hitData, tab]);

  useEffect(() => {
    getCachedCoreFields(LK.AIRPORT, false).then(res => {
      if (!hasData(airportFaves) || res?.length > airportFaves.length) {
        const resOrInitial = hasData(res) ? res : [{}];

        setAirportFaves(resOrInitial);
      }
    });
  }, [allData]);

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

  const getTableState = () => tableState;

  const tabs = (
    <Tabs defaultActiveKey={TABTYPE.ALL} id="flightTabs" className="gtas-tabs">
      <Tab
        eventKey={TABTYPE.ALL}
        title={
          <Xl8 xid="fl001" id="flightTabs-tab-all">
            All
          </Xl8>
        }
      ></Tab>
      <Tab
        eventKey={TABTYPE.HITS}
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
              labelText={<Xl8 xid="fl003">Origin Airports</Xl8>}
              datafield="originAirports"
              name="originAirports"
              inputtype="text"
              callback={cb}
              alt={<Xl8 xid="0">Origin Airports</Xl8>}
            />
            <LabelledInput
              labelText={<Xl8 xid="fl004">Destination Airports</Xl8>}
              datafield="destinationAirports"
              name="destinationAirports"
              inputtype="text"
              callback={cb}
              alt={<Xl8 xid="1"> Destination Airports</Xl8>}
            />
            <LabelledInput
              datafield="flightNumber"
              labelText={<Xl8 xid="fl005">Flight</Xl8>}
              inputtype="text"
              name="flightNumber"
              callback={cb}
              alt={<Xl8 xid="7">Flight</Xl8>}
            />
            <LabelledInput
              datafield="direction"
              inputtype="select"
              labelText={<Xl8 xid="fl006">Direction</Xl8>}
              inputStyle="form-select"
              callback={cb}
              name="direction"
              options={directions}
              alt={<Xl8 xid="7">Flight Direction</Xl8>}
            />
            <LabelledInput
              labelText={<Xl8 xid="fl007">Hour Range</Xl8>}
              inputtype="select"
              name="hourRange"
              inputval="96"
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
        {hasData(airportFaves) && (
          <Table
            data={data}
            key={tablekey}
            header={Headers}
            callback={cb}
            stateVals={getTableState}
            stateCb={stateCallback}
            isLoading={isLoading}
            exportFileName={exportFileName}
          />
        )}
      </Main>
    </>
  );
};

export default Flights;
