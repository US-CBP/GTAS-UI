import React, { useState, useEffect } from "react";
import Title from "../../components/title/Title";
import { Link } from "@reach/router";
import Tabs from "../../components/tabs/Tabs";
import { Button, Navbar, Nav, SplitButton, Dropdown } from "react-bootstrap";
import "./PaxDetail.scss";
import PaxInfo from "../../components/paxInfo/PaxInfo";
import SideNav from "../../components/sidenav/SideNav";
import Main from "../../components/main/Main";
import { paxdetails, cases } from "../../services/serviceWrapper";
import Summary from "./summary/Summary";
import PNR from "./pnr/PNR";
import APIS from "./apis/APIS";
import FlightHistory from "./flightHistory/FlightHistory";
import LinkAnalysis from "./linkAnalysis/LinkAnalysis";
import { passengerTypeMapper } from "../../utils/utils";
import EventNotesModal from "./evenNotesModal/EventNotesModal";
import DownloadReport from "./downloadReports/DownloadReports";
import Notification from "./notification/Notification";
import ChangeHitStatus from "./changeHitStatus/ChangeHitStatus";

const PaxDetail = props => {
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
      { label: "Passenger Type", value: passengerTypeMapper(res.passengerType) },
      { label: "Last PNR Recieved", value: res.pnrVo?.transmissionDate },
      { label: "Last APIS Recieved", value: res.apisMessageVo?.transmissionDate }
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
  const [hitSummaryRefreshKey, setHitSummaryRefreshKey] = useState();
  const [eventNoteRefreshKey, setEventNoteRefreshKey] = useState();
  const [hasOpenHit, setHasOpenHit] = useState(false);

  const tabs = [
    {
      title: "Summary",
      link: (
        <Summary
          paxId={props.paxId}
          flightId={props.flightId}
          hitSummaryRefreshKey={hitSummaryRefreshKey}
          eventNoteRefreshKey={eventNoteRefreshKey}
          setHasOpenHit={setHasOpenHit}
        />
      )
    },
    { title: "APIS", link: <APIS data={apisMessage}></APIS> },
    { title: "PNR", link: <PNR data={pnr} /> },
    {
      title: "Flight History",
      link: <FlightHistory paxId={props.paxId} flightId={props.flightId} />
    },
    { title: "Link Analysis", link: <LinkAnalysis /> }
  ];

  const updateHitStatus = (status, confirmed) => {
    if (confirmed) {
      cases.updateStatus(props.paxId, status).then(() => {
        setHitSummaryRefreshKey(status);
      });
    }
  };

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
  }, []);

  return (
    <>
      <SideNav className="paxdetails-side-nav">
        <br />
        <PaxInfo pax={pax} badgeprops={flightBadge}></PaxInfo>
        <hr />
      </SideNav>
      <Main className="paxdetail-container">
        <Navbar>
          <Navbar.Brand>Passenger Detail</Navbar.Brand>
          <Nav>
            <EventNotesModal
              paxId={props.paxId}
              setEventNoteRefreshKey={setEventNoteRefreshKey}
            />
            <DownloadReport paxId={props.paxId} flightId={props.flightId} />

            <Button variant="outline-danger" size="sm">
              Add To Watchlist
            </Button>
            <Button variant="outline-danger" size="sm">
              Create Manual Hit
            </Button>
            <Notification paxId={props.paxId} />
            <ChangeHitStatus updateStatus={updateHitStatus} hasOpenHit={hasOpenHit} />
          </Nav>
        </Navbar>

        <Tabs tabs={tabs} />
      </Main>
    </>
  );
};

export default PaxDetail;
