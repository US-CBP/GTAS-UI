import React, { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import { flightPassengers } from "../../services/serviceWrapper";
import Title from "../../components/title/Title";
import Xl8 from "../../components/xl8/Xl8";
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
    { Accessor: "rulehit", Xl8: true, Header: ["fp011", "Rule Hit"] },
    { Accessor: "watchhit", Xl8: true, Header: ["fp012", "Watch Hit"] },
    { Accessor: "passengerType", Xl8: true, Header: ["fp013", "Passenger Type"] },
    {
      Accessor: "lastName",
      Xl8: true,
      Header: ["fp014", "Last Name"],
      Cell: ({ row }) => {
        return (
          <Link to={`/gtas/paxDetail/${props.id}/${row.original.id}`}>
            {row.original.lastName}
          </Link>
        );
      }
    },
    { Accessor: "firstName", Xl8: true, Header: ["fp015", "First Name"] },
    { Accessor: "middleName", Xl8: true, Header: ["fp016", "Middle Name"] },
    { Accessor: "gender", Xl8: true, Header: ["fp017", "Gender"] },
    {
      Accessor: "dobStr",
      Xl8: true,
      Header: ["fp018", "DOB"],
      Cell: ({ row }) => <div>{row.original.dobAge}</div>
    },
    { Accessor: "docNumber", Xl8: true, Header: ["fp019", "Doc Number"] },
    { Accessor: "nationality", Xl8: true, Header: ["fp020", "Nationality"] }
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

  return (
    <>
      <SidenavContainer>
        <Col>
          <br />
          <LabelledInput
            // labelText="Flight:"
            alt={<Xl8 xid="fp003">Flight</Xl8>}
            inputStyle="big-name-sidebar"
            inputType="label"
            inputVal={flightData.fullFlightNumber}
          />
          <LabelledInput
            labelText={<Xl8 xid="fp004">Origin:</Xl8>}
            alt={<Xl8 xid="7">Origin</Xl8>}
            inputType="label"
            inputVal={flightData.origin}
            inputStyle="form-static"
          />

          <div>
            <LabelledInput
              labelText={<Xl8 xid="fp005">Destination:</Xl8>}
              alt={<Xl8 xid="7">Destination</Xl8>}
              inputType="label"
              inputVal={flightData.destination}
              inputStyle="form-static"
            />
            <LabelledInput
              labelText={<Xl8 xid="fp006">Direction:</Xl8>}
              alt={<Xl8 xid="7">Direction</Xl8>}
              inputType="label"
              inputVal={flightData.direction}
              inputStyle="form-static"
            />
            <LabelledInput
              labelText={<Xl8 xid="fp007">Arrival:</Xl8>}
              alt={<Xl8 xid="7">Arrival</Xl8>}
              inputType="label"
              inputVal={localeDate(flightData.eta)}
              inputStyle="form-static"
            />
            <LabelledInput
              labelText={<Xl8 xid="fp008">Departure:</Xl8>}
              alt={<Xl8 xid="7">Departure</Xl8>}
              inputType="label"
              inputVal={localeDate(flightData.etd)}
              inputStyle="form-static"
            />
            <LabelledInput
              labelText={<Xl8 xid="fp009">Passenger Count:</Xl8>}
              alt={<Xl8 xid="7">Passenger Count</Xl8>}
              inputType="label"
              inputVal={flightData.passengerCount}
              inputStyle="form-static"
            />
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
        ></Table>
      </Main>
    </>
  );
};

export default FlightPax;
