import React, { useState, useEffect } from "react";
import Tabs from "../../components/tabs/Tabs";
import ChromeTabs from "../../components/chrometabs/ChromeTabs";
import FlightBadge from "../../components/flightBadge/FlightBadge";
import { DropdownButton, Col } from "react-bootstrap";
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
import EventNotesModal from "../evenNotesModal/EventNotesModal";
import DownloadReport from "./downloadReports/DownloadReports";
import Notification from "./notification/Notification";
import ChangeHitStatus from "./changeHitStatus/ChangeHitStatus";
import CreateManualHit from "./createManualHit/CreateManualHit";
import Stepper from "../../components/stepper/Stepper";
import AddToWatchlist from "./addToWatchList/AddToWatchlist";
import UploadAttachment from "./uploadAttachment/UploadAttachment";
import AttachmentModal from "./uploadAttachment/AttachmentModal";
import { paxdetails, cases } from "../../services/serviceWrapper";
import { asArray, hasData } from "../../utils/utils";
import "./PaxDetail.scss";
import { ACTION } from "../../utils/constants";
import { Link } from "@reach/router";

const PaxDetail = props => {
  const [flightBadge, setFlightBadge] = useState({});
  const [pax, setPax] = useState([]);
  const [pnr, setPnr] = useState({});
  const [apisMessage, setApisMessage] = useState({});
  const [hitSummaryRefreshKey, setHitSummaryRefreshKey] = useState();
  const [attachmentRefreshKey, setAttachmentRefreshKey] = useState(0);
  const [eventNoteRefreshKey, setEventNoteRefreshKey] = useState();
  const [hasOpenHit, setHasOpenHit] = useState(false);
  const [hasHit, setHasHit] = useState(false);
  const [flightLegsSegmentData, setFlightLegsSegmentData] = useState();
  const [hasApisRecord, setHasApisRecord] = useState(false);
  const [hasPnrRecord, setHasPnrRecord] = useState(false);
  const [watchlistData, setWatchlistData] = useState({});
  const [paxDetailsData, setPaxDetailsData] = useState();
  const [paxDocuments, setPaxDocuments] = useState([]);

  const cb = () => {};
  const refreshEventNotesCard = () => {
    setEventNoteRefreshKey(new Date());
  };
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
    ...(hasData(paxDetailsData)
      ? [
          {
            title: <Xl8 xid="pd005">Link Analysis</Xl8>,
            titleText: "Link Analysis",
            link: <LinkAnalysis paxData={paxDetailsData} />
          }
        ]
      : []),
    {
      titleText: "Attachments",
      title: <Xl8 xid="pd006">Attachments</Xl8>,
      link: (
        <UploadAttachment
          paxId={props.paxId}
          attachmentRefreshKey={attachmentRefreshKey}
        />
      )
    }
  ];

  const updateHitStatus = (status, confirmed) => {
    if (confirmed) {
      cases.updateStatus(props.paxId, status).then(() => {
        setHitSummaryRefreshKey(status);
      });
    }
  };

  const updateAttachmentList = (status, resp) => {
    if (status !== ACTION.CLOSE && status !== ACTION.CANCEL)
      setAttachmentRefreshKey(attachmentRefreshKey + 1);
  };

  const paxinfoData = res => {
    return {
      lastPnrReceived: res.pnrVo?.transmissionDate,
      lastApisReceived: res.apisMessageVo?.transmissionDate,
      lastName: res.lastName,
      middleName: res.middleName,
      firstName: res.firstName,
      age: res.age,
      dob: res.dob,
      gender: res.gender,
      nationality: res.nationality,
      residenceCountry: res.residenceCountry,
      seat: res.seat,
      eta: res.eta,
      etd: res.etd,
      flightId: props.flightId,
      flightNumber: `${res.carrier}${res.flightNumber}`,
      paxId: props.paxId,
      passengerType: res.passengerType
    };
  };

  const addLinkToFlight = data => {
    const fullFlightNumber = data.carrier + data.flightNumber;
    const stateData = {
      direction: data.direction,
      eta: data.eta,
      etd: data.etd,
      fullFlightNumber: fullFlightNumber,
      flightDestination: data.destination,
      flightOrigin: data.origin,
      passengerCount: data.passengerCount
    };
    return (
      <Link
        to={"/gtas/flightpax/" + data.flightId}
        state={{ data: stateData }}
        className="pax-info-link"
      >
        {fullFlightNumber}
      </Link>
    );
  };
  const getFlightBadgeData = res => {
    return {
      flightNumber: addLinkToFlight(res),
      carrier: "",
      flightDestination: res.destination,
      flightOrigin: res.origin,
      eta: res.eta,
      etd: res.etd,
      flightNumberHasLink: true
    };
  };

  const fetchData = () => {
    paxdetails.get(props.flightId, props.paxId).then(res => {
      setPax(paxinfoData(res));
      setFlightBadge(getFlightBadgeData(res));
      setPnr({ ...res.pnrVo, flightId: props.flightId });
      setApisMessage(res.apisMessageVo);
      setFlightLegsSegmentData(asArray(res.pnrVo?.flightLegs));
      setHasApisRecord(res.apisMessageVo?.apisRecordExists || false);
      setHasPnrRecord(res.pnrVo?.pnrRecordExists || false);
      setPaxDetailsData(res);
      const p = { firstName: res.firstName, lastName: res.lastName, dob: res.dob };
      setWatchlistData({ passenger: p, documents: res.documents });
      setPaxDocuments(res.documents);
    });
  };

  useEffect(() => {
    fetchData();
  }, [props.paxId]);

  // TODO: refac tabs as child routes, load data per page.
  const actions = (
    <DropdownButton
      variant="info"
      title={<Xl8 xid="manu002">Choose Action</Xl8>}
      className="m-1"
    >
      <AttachmentModal
        callback={updateAttachmentList}
        paxId={props.paxId}
      ></AttachmentModal>
      <EventNotesModal paxId={props.paxId} callback={refreshEventNotesCard} />
      <AddToWatchlist watchlistItems={watchlistData} />
      <CreateManualHit
        paxId={props.paxId}
        flightId={props.flightId}
        callback={setHitSummaryRefreshKey}
      />
      <DownloadReport paxId={props.paxId} flightId={props.flightId} />
      <Notification paxId={props.paxId} />
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
          {hasData(flightLegsSegmentData) && <Stepper steps={flightLegsSegmentData} />}
        </Col>
      </SidenavContainer>
      <Main className="main">
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
