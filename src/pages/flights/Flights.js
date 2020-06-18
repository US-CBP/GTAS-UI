import React, { useState, useContext, useEffect } from "react";
import Table from "../../components/table/Table";
import { flights } from "../../services/serviceWrapper";
import Title from "../../components/title/Title";
import { Link } from "@reach/router";
import LabelledInput from "../../components/labelledInput/LabelledInput";
// import LabelledSelectInput from "../../components/inputs/LabelledSelectInput/LabelledSelectInput";
import FilterForm from "../../components/filterForm2/FilterForm";
import "react-datepicker/dist/react-datepicker.css";
import "./Flights.css";
import { Col } from "react-bootstrap";
// import LabelledDateTimePickerStartEnd from "../../components/inputs/LabelledDateTimePickerStartEnd/LabelledDateTimePickerStartEnd";
import Main from "../../components/main/Main";
import SideNav from "../../components/sidenav/SideNav";
import CountdownBadge from "../../components/countdownBadge/CountdownBadge";
// import { components } from "react-select";
import { hasData, alt, localeDate, asArray } from "../../utils/utils";
import { TIME } from "../../utils/constants";

const Flights = props => {
  const cb = () => {};
  const initTableState = {
    pageIndex: 0,
    pageSize: 50,
    sortBy: [{ id: "timer", desc: false }]
  };

  const [data, setData] = useState([{}]);
  const [tableState, setTableState] = useState(initTableState);

  const setDataWrapper = (data, retainState) => {
    if (!retainState) setTableState(initTableState);

    const parsedData = asArray(data).map(item => {
      const future = item.direction === "O" ? item.etd : item.eta;
      item.timer = future;
      item.sendRowToLink = `/gtas/flightpax/${item.id}`;

      return item;
    });

    setData(alt(parsedData, []));
    // const newkey = tablekey + 1;
    // setTablekey(newkey);
  };

  //TODO: refactor
  const preFetchCallback = fields => {
    const range = +fields["hourRange"] || 48; // coerce fields[hourRange] values to numeric else default to 48 hours

    let etaEnd = new Date();
    etaEnd.setHours(etaEnd.getHours() + range);

    const fieldscopy = Object.assign([], fields);
    delete fieldscopy["hourRange"]; // hourRange is not passed directly to the backend

    let paramObject = { etaStart: new Date(), etaEnd: etaEnd };

    const fieldNames = Object.keys(fieldscopy);
    fieldNames.forEach(name => {
      if (hasData(fieldscopy[name])) {
        if (name === "destinationAirports" || name === "originAirports") {
          // retrieve raw comma or whitespace separated text, convert to array, remove empties.
          const airports = fieldscopy[name]
            .replace(",", " ")
            .split(" ")
            .filter(Boolean);
          paramObject[name] = [...new Set(airports)]; // scrub duplicate vals
        } else paramObject[name] = fieldscopy[name];
      }
    });

    return "?request=" + encodeURIComponent(JSON.stringify(paramObject));
  };

  const now = new Date();

  const Headers = [
    {
      Accessor: "timer",
      Cell: ({ row }) => (
        <CountdownBadge future={row.original.timer} baseline={now}></CountdownBadge>
      )
    },
    {
      Accessor: "eta",
      Header: "Arrival",
      Cell: ({ row }) => localeDate(row.original.eta)
    },
    {
      Accessor: "etd",
      Header: "Departure",
      Cell: ({ row }) => localeDate(row.original.etd)
    },
    {
      Accessor: "passengerCount",
      Header: "Passengers",
      Cell: ({ row }) => (
        <Link to={"../flightpax/" + row.original.id}>{row.original.passengerCount}</Link>
      )
    },
    { Accessor: "fullFlightNumber", Header: "Flight" },
    { Accessor: "origin" },
    { Accessor: "destination" },
    { Accessor: "direction" },
    { Accessor: "severity" }
    // TODO: how to summarize hits??
    // { Accessor: "ruleHitCount" },
    // { Accessor: "listHitCount" },
    // { Accessor: "graphHitCount" }
  ];

  const directions = [
    { value: "A", label: "All" },
    { value: "I", label: "Inbound" },
    { value: "O", label: "Outbound" }
    // { value: "C", label: "Continuance" }
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

  return (
    <>
      <SideNav>
        <Col>
          <FilterForm
            service={flights.get}
            paramCallback={preFetchCallback}
            callback={setDataWrapper}
            interval={TIME.MINUTE}
          >
            <br />
            <LabelledInput
              labelText="Origin Airports"
              datafield="originAirports"
              name="originAirports"
              inputType="text"
              callback={cb}
              alt="Origin Airports"
            />
            <LabelledInput
              labelText="Destination Airports"
              datafield="destinationAirports"
              name="destinationAirports"
              inputType="text"
              callback={cb}
              alt="Destination Airports"
            />
            <LabelledInput
              datafield="flightNumber"
              labelText="Flight Number"
              inputType="text"
              name="flightNumber"
              callback={cb}
              alt="nothing"
            />
            <LabelledInput
              datafield="direction"
              inputType="select"
              labelText="Direction"
              inputStyle="form-select"
              callback={cb}
              name="direction"
              options={directions}
            />
            <LabelledInput
              labelText="Hour Range"
              inputType="select"
              name="hourRange"
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
              alt="nothing"
            />
          </FilterForm>
        </Col>
      </SideNav>
      <Main>
        <Title title="Flights" uri={props.uri} />
        <Table
          data={data}
          key={data}
          id="Flights"
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
