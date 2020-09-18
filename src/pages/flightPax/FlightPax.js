import React, { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import { flightPassengers } from "../../services/serviceWrapper";
import Title from "../../components/title/Title";
import Xid from "../../components/xid/Xid";
import LabelledInput from "../../components/labelledInput/LabelledInput";
import SidenavContainer from "../../components/sidenavContainer/SidenavContainer";
import { Col, Tabs, Tab } from "react-bootstrap";
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
      // item.name = `${item.lastName}, ${item.firstName} ${item.middleName}`;
      item.docNumber = item.documents?.length > 0 ? item.documents[0] : ""; // TODO Documents: shd show all or none here.
      item.age = getAge(item.dob) ? ` (${getAge(item.dob)})` : "";
      item.dobStr = new Date(item.dob).toISOString().slice(0, -14);
      item.dobAge = `${alt(localeDateOnly(item.dobStr))} ${item.age}`;
      item.rulehit = item.onRuleHitList ? 1 : "";
      item.watchhit = item.onWatchList ? 1 : "";
      return item;
    });
  };

  const headers = [
    {
      Accessor: "rulehit"
    },
    {
      Accessor: "watchhit"
    },
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
      Cell: ({ row }) => <div>{row.original.dobAge}</div>
    },
    { Accessor: "docNumber" },
    { Accessor: "nationality" }
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
      <Tab eventKey="all" title={<Xid xid="7">All</Xid>}></Tab>
      <Tab eventKey="hits" title="Hits"></Tab>
    </Tabs>
  );

  const titleTabCallback = ev => {
    const id = ev.split("-")[2];

    setTab(id);
  };

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
        <Title
          title="Flight Passengers"
          leftChild={tabs}
          leftCb={titleTabCallback}
        ></Title>
        <Table
          key={key}
          header={headers}
          data={data}
          id="Flight Passengers"
          callback={cb}
        ></Table>
      </Main>
    </>
  );
};

export default FlightPax;
