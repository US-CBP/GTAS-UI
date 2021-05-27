// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/user/UserContext";
import Tabs from "../../components/tabs/Tabs";
import FlightBadge from "../../components/flightBadge/FlightBadge";
import CountdownBadge from "../../components/countdownBadge/CountdownBadge";
import { Col } from "react-bootstrap";
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
import EventNotesModal from "../../components/eventNotesModal/EventNotesModal";
import DownloadReport from "./downloadReports/DownloadReports";
import Notification from "./notification/Notification";
import ChangeHitStatus from "./changeHitStatus/ChangeHitStatus";
import CreateManualHit from "./createManualHit/CreateManualHit";
import Stepper from "../../components/stepper/Stepper";
import AddToWatchlist from "./addToWatchList/AddToWatchlist";
import UploadAttachment from "./uploadAttachment/UploadAttachment";
import AttachmentModal from "./uploadAttachment/AttachmentModal";
import Loading from "../../components/loading/Loading";

import { paxdetails, cases } from "../../services/serviceWrapper";
import { asArray, hasData, titleCase } from "../../utils/utils";
import { ACTION, ROLE, LK } from "../../utils/constants";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import "./PaxDetail.scss";

const PaxDetail = props => {
  const [flightBadge, setFlightBadge] = useState();
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
  const [isLoading, setIsLoading] = useState(false);
  const [isStepperLoading, setIsStepperLoading] = useState(false);
  const nullSeat = "N/A";

  const refreshEventNotesCard = () => {
    setEventNoteRefreshKey(new Date());
  };

  const tabs = [
    {
      title: <Xl8 xid="pd001">Summary</Xl8>,
      titletext: "Summary",
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
            titletext: "APIS",
            link: <APIS data={apisMessage}></APIS>
          }
        ]
      : []),
    ...(hasPnrRecord
      ? [
          {
            title: <Xl8 xid="pd003">PNR</Xl8>,
            titletext: "PNR",
            link: <PNR data={pnr} />
          }
        ]
      : []),
    {
      title: <Xl8 xid="pd004">Flight History</Xl8>,
      titletext: "Flight History",
      link: <FlightHistory paxId={props.paxId} flightId={props.flightId} />
    },
    ...(hasData(paxDetailsData)
      ? [
          {
            title: <Xl8 xid="pd005">Link Analysis</Xl8>,
            titletext: "Link Analysis",
            tabClassName: "large-media-only",
            link: <LinkAnalysis paxData={paxDetailsData} />
          }
        ]
      : []),
    {
      titletext: "Attachments",
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
    if (!hasData(res.seats)) {
      res.seats = nullSeat;
    } else {
      let sts = "";
      res.seats.forEach((elem, idx) => {
        if (idx != res.seats.length - 1) {
          sts = sts + elem + ", ";
        } else {
          if (!hasData(elem)) {
            sts = sts + nullSeat;
          } else {
            sts = sts + elem;
          }
        }
      });
      res.seats = sts;
    }
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
      seat: res.seats,
      eta: res.eta,
      etd: res.etd,
      flightId: props.flightId,
      flightNumber: `${res.carrier}${res.flightNumber}`,
      paxId: props.paxId,
      passengerType: res.passengerType
    };
  };

  const getFlightBadgeData = res => {
    return {
      flightNumber: res.carrier + res.flightNumber,
      fullFlightNumber: res.carrier + res.flightNumber,
      direction: res.direction,
      flightId: res.flightId,
      carrier: res.carrier,
      flightDestination: res.flightDestination,
      flightOrigin: res.flightOrigin,
      eta: res.eta,
      etd: res.etd,
      passengerCount: res.passengerCount,
      flightNumberHasLink: true
    };
  };

  const fetchData = () => {
    setIsLoading(true);
    setIsStepperLoading(true);
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
      setIsLoading(false);
    });
  };

  useEffect(() => {
    setIsStepperLoading(false);
  }, [flightLegsSegmentData]);

  useEffect(() => {
    fetchData();
  }, [props.paxId]);

  const tablist = <Tabs tabs={tabs} />;
  const changeHitStatusText = hasOpenHit ? (
    <Xl8 xid="chs006">Set to REVIEWED</Xl8>
  ) : (
    <Xl8 xid="chs007">Set to RE-OPENED</Xl8>
  );

  const { getUserState } = useContext(UserContext);

  // Todo - refactor knowledge of the required roles up to RoleAuth?
  const hasAuthorizedRoles = roles => {
    const userRoles = getUserState().userRoles.map(item => titleCase(item));
    let isAuthorized = false;
    roles.forEach(element => {
      if (userRoles.includes(titleCase(element))) {
        isAuthorized = true;
      }
    });
    return isAuthorized;
  };

  return (
    <>
      <SidenavContainer>
        <br />
        {hasData(flightBadge) && <FlightBadge data={flightBadge}></FlightBadge>}
        <Col className="notopmargin below-badge">
          <div className="filterform-container form">
            {isLoading && isStepperLoading && <Loading></Loading>}
            {hasData(flightBadge) && !isLoading && (
              <div className="flightpax-countdown-container">
                <CountdownBadge
                  future={
                    flightBadge.direction === "O" ? flightBadge.etd : flightBadge.eta
                  }
                  baseline={Date.now()}
                  direction={flightBadge.direction}
                ></CountdownBadge>
              </div>
            )}
            {!isLoading && (
              <>
                <br />
                <PaxInfo pax={pax}></PaxInfo>
              </>
            )}
            {!isStepperLoading && hasData(flightLegsSegmentData) && (
              <Stepper steps={flightLegsSegmentData} />
            )}
          </div>
        </Col>
      </SidenavContainer>
      <Main className="main">
        <Title
          className="stacker title"
          title={<Xl8 xid="pd019">Passenger Detail</Xl8>}
          leftChild={tablist}
        ></Title>
        <Fab icon={<i className="fa fa-plus" />} variant="info">
          <Action text={<Xl8 xid="not001">Notify Users</Xl8>}>
            <Notification paxId={props.paxId} icon />
          </Action>
          <Action text={<Xl8 xid="rep001">Download Report</Xl8>}>
            <DownloadReport paxId={props.paxId} flightId={props.flightId} icon />
          </Action>
          <Action text={<Xl8 xid="evn001">Add Event Notes</Xl8>}>
            <EventNotesModal paxId={props.paxId} callback={refreshEventNotesCard} icon>
              <i className="fa fa-pencil" />
            </EventNotesModal>
          </Action>
          <Action text={<Xl8 xid="attm007">Add Attachments</Xl8>}>
            <AttachmentModal callback={updateAttachmentList} paxId={props.paxId} icon>
              <i className="fa fa-paperclip" />
            </AttachmentModal>
          </Action>
          {hasAuthorizedRoles([ROLE.ADMIN, ROLE.HITMGR]) && hasHit && (
            <Action text={changeHitStatusText} variant="rtf-red">
              <ChangeHitStatus
                updateStatus={updateHitStatus}
                hasOpenHit={hasOpenHit}
                icon
              />
            </Action>
          )}
          {hasAuthorizedRoles([ROLE.ADMIN, ROLE.HITMGR]) && !hasHit && (
            <Action text={<Xl8 xid="cmh001">Create Manual Hit</Xl8>} variant="rtf-red">
              <CreateManualHit
                paxId={props.paxId}
                flightId={props.flightId}
                callback={setHitSummaryRefreshKey}
                icon
              />
            </Action>
          )}
          {hasAuthorizedRoles([ROLE.ADMIN, ROLE.WLMGR]) && (
            <Action text={<Xl8 xid="atw001">Add to Watchlist</Xl8>} variant="rtf-red">
              <AddToWatchlist watchlistItems={watchlistData} icon />
            </Action>
          )}
        </Fab>
      </Main>
    </>
  );
};

export default PaxDetail;
