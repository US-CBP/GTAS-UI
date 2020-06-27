import React, { useState, useEffect } from "react";
import { localeDate, asArray } from "../../../utils/utils";
import {
  paxdetails,
  paxWatchListLink,
  flightpaxHitSummary,
  paxEventNotesHistory
} from "../../../services/serviceWrapper";
import { CardDeck, Card, Container } from "react-bootstrap";
import "./Summary.scss";
import CardWithTable from "../../../components/cardWithTable/CardWithTable";
import { composeInitialProps } from "react-i18next";

const Summary = props => {
  const headers = {
    documents: {
      documentNumber: "Document Number",
      documentType: "Type",
      issuanceCountry: "Issuance Country",
      expirationDate: "Expiration Date",
      messageType: "Source"
    },
    watchListLinks: {
      watchlistCategory: "Category",
      watchListLastName: "Last Name",
      watchListFirstName: "First Name",
      watchListDOB: "DOB",
      percentMatch: "Match %"
    },
    paxHitSummary: {
      status: "Status",
      severity: "Severity",
      author: "Author",
      category: "Category",
      ruleDesc: "Title",
      ruleConditions: "Conditions"
    },
    eventNotes: {
      plainTextNote: "Note",
      noteType: "Note Type",
      createdBy: "Created By",
      createdAt: "Created At"
    }
  };

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
      const openHit = res.find(hit => hit.status === "NEW" || hit.status === "Re_Opened");
      props.setHasOpenHit(openHit != undefined);
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
          const type = (note.notetypes || []).map(t => {
            return t.noteType;
          });
          return {
            ...note,
            createdAt: localeDate(note.createdAt),
            notetype: type.toString()
          };
        })
        .slice(0, 10);
      setHistoricalEventNotes(notesData);
    });
  }, [props.eventNoteRefreshKey]);

  return (
    <Container fluid className="summary-container">
      <CardDeck>
        <CardWithTable
          data={paxHitSummary}
          headers={headers.paxHitSummary}
          title="Passenger Current Hits summary"
          key={props.hitSummaryRefreshKey}
        />

        <CardWithTable data={documents} headers={headers.documents} title="Documents" />
        <CardWithTable
          data={watchListLinks}
          headers={headers.watchListLinks}
          title="Watchlist Name Comparison"
        />

        <CardWithTable
          data={eventNotes}
          headers={headers.eventNotes}
          title="Event Note History"
          key={props.eventNoteRefreshKey}
        />
        <CardWithTable
          data={historicalEventNotes}
          headers={headers.eventNotes}
          title={`Previous Notes History (Up to 10)`}
          key={props.eventNoteRefreshKey}
        />
      </CardDeck>
    </Container>
  );
};

export default Summary;
