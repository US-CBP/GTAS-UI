import React, { useState, useEffect } from "react";
import { localeDate, asArray, hasData } from "../../../utils/utils";
import {
  paxdetails,
  paxWatchListLink,
  flightpaxHitSummary,
  paxEventNotesHistory
} from "../../../services/serviceWrapper";
import { Container, CardColumns } from "react-bootstrap";
import "./Summary.scss";
import CardWithTable from "../../../components/cardWithTable/CardWithTable";
import Xl8 from "../../../components/xl8/Xl8";
// import { composeInitialProps } from "react-i18next";

const Summary = props => {
  const headers = {
    documents: {
      documentNumber: <Xl8 xid="sum001">Document Number</Xl8>,
      documentType: <Xl8 xid="sum002">Type</Xl8>,
      issuanceCountry: <Xl8 xid="sum003">Issuance Country</Xl8>,
      expirationDate: <Xl8 xid="sum004">Expiration Date</Xl8>,
      messageType: <Xl8 xid="sum005">Source</Xl8>
    },
    watchListLinks: {
      watchlistCategory: <Xl8 xid="sum006">Category</Xl8>,
      watchListLastName: <Xl8 xid="sum007">Last Name</Xl8>,
      watchListFirstName: <Xl8 xid="sum008">First Name</Xl8>,
      watchListDOB: <Xl8 xid="sum009">DOB</Xl8>,
      percentMatch: <Xl8 xid="sum010">Match %</Xl8>
    },
    paxHitSummary: {
      status: <Xl8 xid="sum011">Status</Xl8>,
      severity: <Xl8 xid="sum012">Severity</Xl8>,
      author: <Xl8 xid="sum013">Author</Xl8>,
      category: <Xl8 xid="sum014">Category</Xl8>,
      ruleDesc: <Xl8 xid="sum015">Title</Xl8>,
      ruleConditions: <Xl8 xid="sum016">Conditions</Xl8>
    },
    eventNotes: {
      plainTextNote: <Xl8 xid="sum017">Note</Xl8>,
      noteType: <Xl8 xid="sum018">Note Type</Xl8>,
      createdBy: <Xl8 xid="sum019">Created By</Xl8>,
      createdAt: <Xl8 xid="sum020">Created At</Xl8>
    }
  };

  const setHasOpenHit = props.setHasOpenHit;
  const setHasHit = props.setHasHit;
  const [documents, setDocuments] = useState([]);
  const [watchListLinks, setWatchListLinks] = useState([]);
  const [paxHitSummary, setPaxHitSummary] = useState([]);
  const [eventNotes, setEventNotes] = useState([]);
  const [historicalEventNotes, setHistoricalEventNotes] = useState([]);

  useEffect(() => {
    paxdetails.get(props.flightId, props.paxId).then(res => {
      setDocuments(res.documents);
    });
  }, []);

  useEffect(() => {
    paxWatchListLink.get(null, props.paxId).then(res => {
      const data = asArray(res).map(pwl => {
        return {
          ...pwl,
          percentMatch: `${pwl.percentMatch * 100}%`
        };
      });
      setWatchListLinks(data);
    });
  }, []);

  useEffect(() => {
    flightpaxHitSummary.get(props.flightId, props.paxId).then(res => {
      setPaxHitSummary(res);
      const openHit = hasData(res)
        ? res.find(hit => hit.status === "New" || hit.status === "Re_Opened")
        : undefined;
      setHasHit(hasData(res));
      setHasOpenHit(openHit !== undefined);
    });
  }, [props.hitSummaryRefreshKey]);

  useEffect(() => {
    paxEventNotesHistory.get(props.paxId, false).then(res => {
      const notesData = res.paxNotes?.map(note => {
        const type = (note.noteType || []).map(t => {
          return t.noteType;
        });
        return {
          ...note,
          createdAt: localeDate(note.createdAt),
          noteType: type.toString()
        };
      });
      setEventNotes(notesData);
    });
    paxEventNotesHistory.get(props.paxId, true).then(res => {
      const notesData = res.paxNotes
        ?.map(note => {
          const type = (note.noteTypes || []).map(t => {
            return t.noteType;
          });
          return {
            ...note,
            createdAt: localeDate(note.createdAt),
            noteType: type.toString()
          };
        })
        .slice(0, 10);
      setHistoricalEventNotes(notesData);
    });
  }, [props.eventNoteRefreshKey]);

  return (
    <Container fluid className="summary-container">
      <CardColumns>
        <CardWithTable
          data={paxHitSummary}
          headers={headers.paxHitSummary}
          title={<Xl8 xid="sum021">Passenger Current Hits summary</Xl8>}
        />

        <CardWithTable
          data={documents}
          headers={headers.documents}
          title={<Xl8 xid="sum022">Documents</Xl8>}
        />
        <CardWithTable
          data={watchListLinks}
          headers={headers.watchListLinks}
          title={<Xl8 xid="sum023">Watchlist Name Comparison</Xl8>}
        />

        <CardWithTable
          data={eventNotes}
          headers={headers.eventNotes}
          title={<Xl8 xid="sum024">Event Note History</Xl8>}
        />
        <CardWithTable
          data={historicalEventNotes}
          headers={headers.eventNotes}
          title={<Xl8 xid="sum025">Previous Note History</Xl8>}
        />
      </CardColumns>
    </Container>
  );
};

export default Summary;
