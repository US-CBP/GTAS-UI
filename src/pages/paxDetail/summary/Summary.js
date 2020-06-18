import React, { useState, useEffect } from "react";
import Table from "../../../components/table/Table";
import { localeDate, asArray } from "../../../utils/utils";
import {
  users,
  paxdetails,
  paxWatchListLink,
  flightpaxHitSummary,
  paxEventNotesHistory,
  notetypes
} from "../../../services/serviceWrapper";
import { CardDeck, Card, Container } from "react-bootstrap";
import Accordion from "../../../components/accordion/Accordion";
import "./Summary.scss";
import CardWithTable from "../../../components/cardWithTable/CardWithTable";

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

  const fetchData = () => {
    paxdetails.get(props.flightId, props.paxId).then(res => {
      setDocuments(res.documents);
    });
    paxWatchListLink.get(null, props.paxId).then(res => {
      const data = asArray(res).map(pwl => {
        return {
          ...pwl,
          percentMatch: `${pwl.percentMatch * 100}%`
        };
      });
      setWatchListLinks(data);
    });

    flightpaxHitSummary.get(props.flightId, props.paxId).then(res => {
      setPaxHitSummary(res);
    });
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
  };

  useEffect(() => {
    fetchData();
  }, [props.flightId, props.paxId]);

  return (
    <Container fluid className="summary-container">
      <CardWithTable
        data={paxHitSummary}
        headers={headers.paxHitSummary}
        title="Passenger Current Hits summary"
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
      />
      <CardWithTable
        data={historicalEventNotes}
        headers={headers.eventNotes}
        title={`Previous Notes History (Up to 10)`}
      />
    </Container>
  );
};

export default Summary;
