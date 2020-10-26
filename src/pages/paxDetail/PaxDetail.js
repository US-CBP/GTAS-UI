import React, { useState, useEffect } from "react";
import Tabs from "../../components/tabs/Tabs";
import ChromeTabs from "../../components/chrometabs/ChromeTabs";
import FlightBadge from "../../components/flightBadge/FlightBadge";
import { Navbar, Nav, DropdownButton, Col } from "react-bootstrap";
import PaxInfo from "../../components/paxInfo/PaxInfo";
import SidenavContainer from "../../components/sidenavContainer/SidenavContainer";
import Main from "../../components/main/Main";
import Title from "../../components/title/Title";
import Xl8 from "../../components/xl8/Xl8";
import Summary from "./summary/Summary";
import PNR from "./pnr/PNR";
import APIS from "./apis/APIS";
import FlightHistory from "./flightHistory/FlightHistory";
import LinkAnalysis from "./linkAnalysis/LinkAnalysis";
import EventNotesModal from "./evenNotesModal/EventNotesModal";
import DownloadReport from "./downloadReports/DownloadReports";
import Notification from "./notification/Notification";
import ChangeHitStatus from "./changeHitStatus/ChangeHitStatus";
import CreateManualHit from "./createManualHit/CreateManualHit";
import Stepper from "../../components/stepper/Stepper";
import AddToWatchlist from "./addToWatchList/AddToWatchlist";
import UploadAttachment from "./uploadAttachment/UploadAttachment";
import AttachmentModal from "./uploadAttachment/AttachmentModal";
import { paxdetails, cases } from "../../services/serviceWrapper";
import {
  asArray,
  hasData,
  localeDate,
  localeDateOnly,
  getFlightBadgeData
} from "../../utils/utils";
import "./PaxDetail.scss";

const PaxDetail = props => {
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
  const [hasApisRecord, setHasApisRecord] = useState(false);
  const [hasPnrRecord, setHasPnrRecord] = useState(false);
  const [watchlistData, setWatchlistData] = useState({});
  const [paxDetailsData, setPaxDetailsData] = useState();
  const [paxDocuments, setPaxDocuments] = useState([]);

  const cb = () => {};
  const tabs = [
    {
      title: <Xl8 xid="pd001">Summary</Xl8>,
      titleText: "Summary",
      link: (
        <Summary
          paxId={props.paxId}
          flightId={props.flightId}
          hitSummaryRefreshKey={hitSummaryRefreshKey}
          eventNoteRefreshKey={eventNoteRefreshKey}
          setHasOpenHit={setHasOpenHit}
          setHasHit={setHasHit}
          documents={paxDocuments}
        />
      )
    },
    ...(hasApisRecord
      ? [
          {
            title: <Xl8 xid="pd002">APIS</Xl8>,
            titleText: "APIS",
            link: <APIS data={apisMessage}></APIS>
          }
        ]
      : []),
    ...(hasPnrRecord
      ? [
          {
            title: <Xl8 xid="pd003">PNR</Xl8>,
            titleText: "PNR",
            link: <PNR data={pnr} />
          }
        ]
      : []),
    {
      title: <Xl8 xid="pd004">Flight History</Xl8>,
      titleText: "Flight History",
      link: <FlightHistory paxId={props.paxId} flightId={props.flightId} />
    },
    // ...(hasData(paxDetailsData)
    //   ? [
    //       {
    //         title: <Xl8 xid="pd005">Link Analysis</Xl8>,
    //         titleText: "Link Analysis",
    //         link: <LinkAnalysis paxData={paxDetailsData} />
    //       }
    //     ]
    //   : []),
    {
      titleText: "Attachments",
      title: <Xl8 xid="pd006">Attachments</Xl8>,
      link: <UploadAttachment paxId={props.paxId} />
    }
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
      setPax(res);
      setFlightBadge(res);
      setPnr(res.pnrVo);
      setApisMessage(res.apisMessageVo);
      setFlightLegsSegmentData(getTidyFlightLegData(asArray(res.pnrVo?.flightLegs)));
      setHasApisRecord(res.apisMessageVo?.apisRecordExists || false);
      setHasPnrRecord(res.pnrVo?.pnrRecordExists || false);
      // setPaxDetailsData(res);
      const p = { firstName: res.firstName, lastName: res.lastName, dob: res.dob };
      setWatchlistData({ passenger: p, documents: res.documents });
      setPaxDocuments(res.documents);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // TODO: refac tabs as child routes, load data per page.
  const actions = (
    <DropdownButton variant="info" title="Choose Action" className="m-1">
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
      <AttachmentModal callback={cb} paxId={props.paxId}></AttachmentModal>
      {hasHit && (
        <ChangeHitStatus updateStatus={updateHitStatus} hasOpenHit={hasOpenHit} />
      )}
    </DropdownButton>
  );

  const tablist = <Tabs tabs={tabs} />;
  return (
    <>
      <SidenavContainer>
        <Col>
          <FlightBadge data={flightBadge}></FlightBadge>
          <PaxInfo pax={pax}></PaxInfo>
          <FlightLegSegments />
        </Col>
      </SidenavContainer>
      <Main className="main">
        {/* <ChromeTabs tabs={tabs}></ChromeTabs> */}
        <Title
          title={<Xl8 xid="pd019">Passenger Detail</Xl8>}
          leftChild={tablist}
          rightChild={actions}
        ></Title>
      </Main>
    </>
  );
};

export default PaxDetail;
