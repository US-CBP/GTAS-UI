import React, { useState, useEffect } from "react";
import Tabs from "../../components/tabs/Tabs";
import { Button, Navbar, Nav } from "react-bootstrap";
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
import { passengerTypeMapper, asArray } from "../../utils/utils";
import EventNotesModal from "./evenNotesModal/EventNotesModal";
import DownloadReport from "./downloadReports/DownloadReports";
import Notification from "./notification/Notification";
import ChangeHitStatus from "./changeHitStatus/ChangeHitStatus";
import CreateManualHit from "./createManualHit/CreateManualHit";
import Stepper from "../../components/stepper/Stepper";
import AddToWatchlist from "./addToWatchList/AddToWatchlist";
import { Link } from "@reach/router";

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
      {
        label: "Seat",
        value: (
          <Link
            to={`/gtas/seat-chart/${res.flightId}/${res.paxId}/${res.seat}`}
            style={{ color: "#8fdeef" }}
          >
            {res.seat}
          </Link>
        )
      },
      { label: "Passenger Type", value: passengerTypeMapper(res.passengerType) },
      { label: "Last PNR Recieved", value: res.pnrVo?.transmissionDate },
      { label: "Last APIS Recieved", value: res.apisMessageVo?.transmissionDate }
    ];
  };

  const flightBadgeData = res => {
    return {
      arrival: `${res.flightDestination} ${res.etaLocalTZ}`,
      departure: `${res.flightOrigin} ${res.etdLocalTZ}`,
      flightnumber: `${res.carrier}${res.flightNumber}`
    };
  };

  const getTidyFlightLegData = fLegs => {
    fLegs.sort((fl1, fl2) => {
      if (fl1.legNumber < fl2.legNumber) return -1;
      if (fl1.legNumber > fl2.legNumber) return 1;
      else return 0;
    });

    const completeFlight = []; //holds all legs through out the complete flight
    let completeLeg = []; //holds all contious legs (where current.orign == prev.destination)
    fLegs.forEach((leg, index) => {
      leg.legNumber = index + 1;

      if (completeLeg.length === 0) {
        completeLeg.push({ label: leg.originAirport, active: true });
      } else if (fLegs[index].originAirport !== leg.originAirport) {
        completeFlight.push(completeLeg); //leg ended
        completeLeg = [{ label: leg.originAirport, active: true }]; //start a new leg
      } else {
        completeLeg[completeLeg.length - 1].active = true;
      }
      completeLeg.push({ label: leg.destinationAirport, active: false });
    });
    completeFlight.push(completeLeg);

    return completeFlight;
  };

  const [flightBadge, setFlightBadge] = useState({});
  const [pax, setPax] = useState([]);
  const [pnr, setPnr] = useState({});
  const [apisMessage, setApisMessage] = useState({});
  const [hitSummaryRefreshKey, setHitSummaryRefreshKey] = useState();
  const [eventNoteRefreshKey, setEventNoteRefreshKey] = useState();
  const [hasOpenHit, setHasOpenHit] = useState(false);
  const [hasHit, setHasHit] = useState(false);
  const [flightLegsSegmentData, setFlightLegsSegmentData] = useState([]);
  const [hasApisRecord, setHasApisRecod] = useState(false);
  const [hasPnrRecord, setHasPnrRecord] = useState(false);
  const [watchlistData, setWatchlistData] = useState({});

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
          setHasHit={setHasHit}
        />
      )
    },
    ...(hasApisRecord ? [{ title: "APIS", link: <APIS data={apisMessage}></APIS> }] : []),
    ...(hasPnrRecord ? [{ title: "PNR", link: <PNR data={pnr} /> }] : []),
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
  const FlightLegSegments = () => {
    return flightLegsSegmentData.map((fl, index) => <Stepper key={index} steps={fl} />);
  };

  const fetchData = () => {
    paxdetails.get(props.flightId, props.paxId).then(res => {
      setPax(getPaxInfo(res));
      setFlightBadge(flightBadgeData(res));
      setPnr(res.pnrVo);
      setApisMessage(res.apisMessageVo);
      setFlightLegsSegmentData(getTidyFlightLegData(asArray(res.pnrVo?.flightLegs)));
      setHasApisRecod(res.apisMessageVo?.apisRecordExists || false);
      setHasPnrRecord(res.pnrVo?.pnrRecordExists || false);

      const p = { firstName: res.firstName, lastName: res.lastName, dob: res.dob };
      setWatchlistData({ passenger: p, documents: res.documents });
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
        <FlightLegSegments />
      </SideNav>
      <Main className="paxdetail-container">
        <Navbar>
          <Navbar.Brand>Passenger Detail</Navbar.Brand>
          <Nav className="paxdetails-action-buttons">
            <EventNotesModal
              paxId={props.paxId}
              setEventNoteRefreshKey={setEventNoteRefreshKey}
            />
            <DownloadReport paxId={props.paxId} flightId={props.flightId} />
            <AddToWatchlist watchlistItems={watchlistData} />
            <CreateManualHit
              paxId={props.paxId}
              flightId={props.flightId}
              callback={setHitSummaryRefreshKey}
            />
            <Notification paxId={props.paxId} />
            {hasHit && (
              <ChangeHitStatus updateStatus={updateHitStatus} hasOpenHit={hasOpenHit} />
            )}
          </Nav>
        </Navbar>

        <Tabs tabs={tabs} />
      </Main>
    </>
  );
};

export default PaxDetail;
