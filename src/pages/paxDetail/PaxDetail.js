import React, { useState, useEffect } from "react";
import Title from "../../components/title/Title";
import { Link } from "@reach/router";
import Tabs from "../../components/tabs/Tabs";
import { Row, Container, Col, Form } from "react-bootstrap";
import "./PaxDetail.scss";
import PaxInfo from "../../components/paxInfo/PaxInfo";
import SideNav from "../../components/sidenav/SideNav";
import Main from "../../components/main/Main";
import { paxdetails } from "../../services/serviceWrapper";

const PaxDetail = props => {
  const tabcontent = props.children.props.children;
  const tabs = [
    { title: "Summary", link: tabcontent[0] },
    { title: "APIS", link: tabcontent[1] },
    { title: "PNR", link: tabcontent[2] },
    { title: "Flight History", link: tabcontent[3] },
    { title: "Link Analysis", link: tabcontent[4] }
  ];

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
        value: passengerTypesMap[res.passengerType] || res.passengerType
      },
      { label: "Last PNR Recieved", value: res.pnrVo.transmissionDate }
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
  const [documents, setDocuments] = useState([]);

  const fetchData = () => {
    paxdetails.get(props.flightId, props.paxId).then(res => {
      setPax(getPaxInfo(res));
      setDocuments(res.documents);
      setFlightBadge(flightBadgeData(res));
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
      <Main>
        <Title title="Passenger Detail" uri={props.uri} />

        <Tabs tabs={tabs} />
      </Main>
    </>
  );
};

export default PaxDetail;
