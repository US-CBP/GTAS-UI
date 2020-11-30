import React, { useState, useEffect } from "react";
import CardWithTable from "../../../components/cardWithTable/CardWithTable";
import Xl8 from "../../../components/xl8/Xl8";
import {
  paxWatchListLink,
  flightpaxHitSummary,
  paxEventNotesHistory,
  historicalHits
} from "../../../services/serviceWrapper";
import {
  localeDate,
  asArray,
  hasData,
  localeDateOnly,
  formatRuleConditions
} from "../../../utils/utils";
import { CardColumns } from "react-bootstrap";
import "./Summary.scss";
import { HIT_STATUS } from "../../../utils/constants";
import { Link } from "@reach/router";

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
    },
    historicalHits: {
      category: <Xl8 xid="sum026">Category</Xl8>,
      passengerDocNumber: <Xl8 xid="sum027">Document Number</Xl8>,
      ruleConditions: <Xl8 xid="sum028">Conditions</Xl8>,
      flightDate: <Xl8 xid="sum029">Flight ID</Xl8>,
      flightPaxLink: <Xl8 xid="sum030">Info</Xl8>
    }
  };

  const setHasOpenHit = props.setHasOpenHit;
  const setHasHit = props.setHasHit;
  const [watchListLinks, setWatchListLinks] = useState([]);
  const [paxHitSummary, setPaxHitSummary] = useState([]);
  const [eventNotes, setEventNotes] = useState([]);
  const [historicalEventNotes, setHistoricalEventNotes] = useState([]);
  const [paxHistoricalHits, setPaxHistoricalHits] = useState([]);

  const parseDocumentData = documents => {
    const parsedDocs = asArray(documents).map(document => {
      const expirationDate = Date.parse(document.expirationDate);
      return {
        ...document,
        expirationDate: localeDateOnly(expirationDate)
      };
    });
    return parsedDocs;
  };

  const getLinkToPaxDetails = linkData => {
    return (
      <Link to={`/gtas/paxDetail/${linkData.flightId}/${linkData.paxId}`}>Details</Link>
    );
  };

  const fetchWatchlistNamesData = () => {
    paxWatchListLink.get(null, props.paxId).then(res => {
      const data = asArray(res).map(pwl => {
        const watchListDOB = Date.parse(pwl.watchListDOB);
        return {
          ...pwl,
          watchListDOB: localeDateOnly(watchListDOB),
          percentMatch: `${pwl.percentMatch * 100}%`
        };
      });
      setWatchListLinks(data);
    });
  };

  const fetchHitSummaryData = () => {
    flightpaxHitSummary.get(props.flightId, props.paxId).then(res => {
      const formattedResults = asArray(res).map(rec => {
        return { ...rec, ruleConditions: formatRuleConditions(rec.ruleConditions) };
      });
      setPaxHitSummary(formattedResults);
      const openHit = hasData(res)
        ? res.find(
            hit => hit.status === HIT_STATUS.NEW || hit.status === HIT_STATUS.REOPENED
          )
        : undefined;
      setHasHit(hasData(res));
      setHasOpenHit(openHit !== undefined);
    });
  };

  const fetchHistoricalHitsData = () => {
    historicalHits.get(props.paxId).then(res => {
      const parsedData = asArray(res).map(hit => {
        return {
          ...hit,
          flightPaxLink: getLinkToPaxDetails(hit),
          ruleConditions: formatRuleConditions(hit.ruleConditions)
        };
      });
      setPaxHistoricalHits(parsedData);
    });
  };

  useEffect(() => {
    fetchHitSummaryData();
  }, [props.paxId, props.hitSummaryRefreshKey]);

  useEffect(() => {
    fetchHistoricalHitsData();
    fetchWatchlistNamesData();
  }, [props.paxId]);

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
  }, [props.eventNoteRefreshKey, props.paxId]);

  return (
    <div className="paxdetail-container">
      <CardColumns>
        <CardWithTable
          data={paxHitSummary}
          headers={headers.paxHitSummary}
          title={<Xl8 xid="sum021">Current Hits Summary</Xl8>}
          refresh={fetchHitSummaryData}
        />

        <CardWithTable
          data={parseDocumentData(props.documents)}
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
          title={<Xl8 xid="sum024">Event Notes</Xl8>}
        />
        <CardWithTable
          data={historicalEventNotes}
          headers={headers.eventNotes}
          title={<Xl8 xid="sum025">Prior Event Notes</Xl8>}
        />
        <CardWithTable
          data={paxHistoricalHits}
          headers={headers.historicalHits}
          title={<Xl8 xid="sum031">Historical Hits</Xl8>}
        />
      </CardColumns>
    </div>
  );
};

export default Summary;
