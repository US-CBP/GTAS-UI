import React, { useState, useEffect } from "react";
import Title from "../../components/title/Title";
import { Link } from "@reach/router";
import Tabs from "../../components/tabs/Tabs";
import { Row, Container, Col, Form } from "react-bootstrap";
import "./PaxDetail.scss";
import PaxInfo from "../../components/paxInfo/PaxInfo";
import SideNav from "../../components/sidenav/SideNav";
import Main from "../../components/main/Main";
import {
  paxdetails,
  paxFlightHisoty,
  paxFullTravelHistory
} from "../../services/serviceWrapper";
import Summary from "./summary/Summary";
import PNR from "./pnr/PNR";
import APIS from "./apis/APIS";
import FlightHistory from "./flightHistory/FlightHistory";
import LinkAnalysis from "./linkAnalysis/LinkAnalysis";

const PaxDetail = props => {
  const passengerTypesMap = {
    P: "Passenger",
    C: "Crew",
    I: "Intransit"
  };
  const getPaxInfo = res => {
    return [
      {
        label: "Last Name",
        value: res.lastName
      },
      { label: "First Name", value: res.firstName },
      { label: "Middle Name", value: res.middleName },
      { label: "Age", value: res.age },
      { label: "DOB", value: res.dob },
      { label: "Gender", value: res.gender },
      { label: "Nationality", value: res.nationality },
      { label: "Residence", value: res.residenceCountry },
      { label: "Seat", value: res.seat },
      {
        label: "Passenger Type",
        value: passengerTypesMap[res.passengerType || ""]
      },
      { label: "Last PNR Recieved", value: res.pnrVo?.transmissionDate }
    ];
  };

  const flightBadgeData = res => {
    return {
      eta: res.etaLocalTZ,
      etd: res.etdLocalTZ,
      origin: res.flightOrigin,
      destination: res.flightDestination,
      flightnumber: `${res.carrier}${res.flightNumber}`
    };
  };

  const [flightBadge, setFlightBadge] = useState({});
  const [pax, setPax] = useState([]);
  const [pnr, setPnr] = useState({});
  const [apisMessage, setApisMessage] = useState({});

  const tabs = [
    { title: "Summary", link: <Summary paxId={props.paxId} flightId={props.flightId} /> },
    { title: "APIS", link: <APIS data={apisMessage}></APIS> },
    { title: "PNR", link: <PNR data={pnr} /> },
    {
      title: "Flight History",
      link: <FlightHistory paxId={props.paxId} flightId={props.flightId} />
    },
    { title: "Link Analysis", link: <LinkAnalysis /> }
  ];

  const fetchData = () => {
    paxdetails.get(props.flightId, props.paxId).then(res => {
      setPax(getPaxInfo(res));
      setFlightBadge(flightBadgeData(res));
      setPnr(res.pnrVo);
      setApisMessage(res.apisMessageVo);
    });
  };

  useEffect(() => {
    fetchData();
  }, [props.flightId, props.paxId]);

  return (
    <>
      <SideNav className="paxdetails-side-nav">
        <br />
        <PaxInfo pax={pax} badgeprops={flightBadge}></PaxInfo>
      </SideNav>
      <Main className="paxdetail-container">
        <Title title="Passenger Detail" uri={props.uri} />

        <Tabs tabs={tabs} />
      </Main>
    </>
  );
};

export default PaxDetail;
