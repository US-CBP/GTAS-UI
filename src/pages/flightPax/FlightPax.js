import React, { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import Title from "../../components/title/Title";
import LabelledInput from "../../components/labelledInput/LabelledInput";
import SidenavContainer from "../../components/sidenavContainer/SidenavContainer";
import { passengers } from "../../services/serviceWrapper";
import { Link } from "@reach/router";
import {
  asArray,
  hasData,
  getAge,
  alt,
  localeDateOnly,
  localeDate
} from "../../utils/utils";
import Main from "../../components/main/Main";
import { Col } from "react-bootstrap";

const FlightPax = props => {
  const cb = function(result) {};

  const [data, setData] = useState([]);
  const [key, setKey] = useState(0);
  const flightData = hasData(props.location.state?.data) ? props.location.state.data : {};

  const parseData = data => {
    return asArray(data).map(item => {
      // item.name = `${item.lastName}, ${item.firstName} ${item.middleName}`;
      item.docNumber = item.documents?.length > 0 ? item.documents[0] : ""; // TODO Documents: shd show all or none here.
      item.age = getAge(item.dob) ? ` (${getAge(item.dob)})` : "";
      item.dobStr = new Date(item.dob).toISOString().slice(0, -14);
      item.dobAge = `${alt(localeDateOnly(item.dobStr))} ${item.age}`;

      return item;
    });
  };

  const headers = [
    { Accessor: "onRuleHitList", Header: "Rule Hits" },
    { Accessor: "onWatchList", Header: "Watchlist Hits" },
    { Accessor: "passengerType", Header: "Type" },
    {
      Accessor: "lastName",
      Cell: ({ row }) => {
        return (
          <Link to={`/gtas/paxDetail/${props.id}/${row.original.id}`}>
            {row.original.lastName}
          </Link>
        );
      }
    },
    { Accessor: "firstName" },
    { Accessor: "middleName" },
    { Accessor: "gender" },
    {
      Accessor: "dobStr",
      Header: "DOB",
      Cell: ({ row }) => row.original.dobAge
    },
    { Accessor: "docNumber" },
    { Accessor: "nationality" }
  ];

  useEffect(() => {
    passengers.get(props.id).then(res => {
      if (!hasData(res)) {
        setData([]);
        return;
      }

      let parsed = parseData(res);

      setData(parsed);
      setKey(1);
    });
  }, [props.id]);

  return (
    <>
      <SidenavContainer>
        <Col>
          <br />
          <LabelledInput
            // labelText="Flight:"
            alt="Flight"
            inputStyle="big-name-sidebar"
            inputType="label"
            inputVal={flightData.fullFlightNumber}
          />
          <LabelledInput
            labelText="Origin:"
            alt="Origin"
            inputType="label"
            inputVal={flightData.origin}
            inputStyle="form-static"
          />

          <div>
            <LabelledInput
              labelText="Destination:"
              alt="Destination"
              inputType="label"
              inputVal={flightData.destination}
              inputStyle="form-static"
            />
            <LabelledInput
              labelText="Direction:"
              alt="Direction"
              inputType="label"
              inputVal={flightData.direction}
              inputStyle="form-static"
            />
            <LabelledInput
              labelText="Arrival:"
              alt="Arrival"
              inputType="label"
              inputVal={localeDate(flightData.eta)}
              inputStyle="form-static"
            />
            <LabelledInput
              labelText="Departure:"
              alt="Departure"
              inputType="label"
              inputVal={localeDate(flightData.etd)}
              inputStyle="form-static"
            />
            <LabelledInput
              labelText="Passenger Count:"
              alt="Passenger Count"
              inputType="label"
              inputVal={flightData.passengerCount}
              inputStyle="form-static"
            />
            {/* <LabelledInput
            labelText="Age:"
            alt="Age"
            inputType="label"
            inputVal={qdata.age}
            spacebetween
          /> */}
          </div>
        </Col>
      </SidenavContainer>
      <Main>
        <Title title="Flight Passengers"></Title>
        <Table
          key={key}
          header={headers}
          data={data}
          id="Flight Passegers"
          callback={cb}
        ></Table>
      </Main>
    </>
  );
};

export default FlightPax;
