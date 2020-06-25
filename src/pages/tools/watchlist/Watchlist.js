import React, { useState, useEffect } from "react";
import Table from "../../../components/table/Table";
import Title from "../../../components/title/Title";
import { Button, Container, Tabs, Tab } from "react-bootstrap";
import { navigate } from "@reach/router";

import { wlpax, wldocs } from "../../../services/serviceWrapper";
import { hasData } from "../../../utils/utils";
import WLModal from "./WLModal";
import "./Watchlist.css";

const Watchlist = props => {
  const cb = function(result) {};
  const TAB = { PAX: ["pax", "Passenger"], DOX: ["dox", "Document"] };
  const mode = (props.mode || "").toLowerCase();
  const isDox = mode === TAB.DOX[0];

  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(0);
  const [key, setKey] = useState(0);
  const [data, setData] = useState([]);
  const [tab, setTab] = useState(isDox ? TAB.DOX : TAB.PAX); // default to pax when no param is in the uri
  const [modalTitle, setModalTitle] = useState(tab[1]);

  const docTemplate = `{"@class":"gov.gtas.model.watchlist.json.WatchlistSpec","name":"Document","entity":"DOCUMENT",
  "watchlistItems":[{"id":null,"action":"Create","terms":[{"entity":"DOCUMENT","field":"documentType","type":"string","value":"{doctype}"},
  {"entity":"DOCUMENT","field":"documentNumber","type":"string","value":"{docnum}"},{"entity":"DOCUMENT","field":"categoryId","type":"integer","value":"{catid}}"}]}]}`;

  const button = (
    <Button
      block
      variant="ternary"
      className="btn btn-outline-info"
      name={props.name}
      placeholder={props.placeholder}
      onClick={() => launchModal(0)}
      required={props.required}
      value={props.inputVal}
      alt={props.alt}
    >
      {`Add ${tab[1]}`}
    </Button>
  );

  const launchModal = recordId => {
    setId(recordId);
    if (!isNaN(recordId)) {
      const title = recordId > 0 ? `Edit ${tab[1]}` : `Add ${tab[1]}`;
      setModalTitle(title);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setId(0);
    setShowModal(false);
  };

  const tabs = (
    <Tabs defaultActiveKey={tab[0]} id="wlTabs">
      <Tab eventKey={TAB.PAX[0]} title={TAB.PAX[1]}></Tab>
      <Tab eventKey={TAB.DOX[0]} title={TAB.DOX[1]}></Tab>
    </Tabs>
  );

  const titleTabCallback = ev => {
    // only respond to tab click events. Clicking the header button has no effect
    if (ev.length === 0) return;

    const id = ev.split("-")[2];

    if ((id || "").toLowerCase() === TAB.DOX[0]) {
      setTab(TAB.DOX);
      navigate(`/gtas/tools/watchlist/dox`);
    } else {
      setTab(TAB.PAX);
      navigate(`/gtas/tools/watchlist/pax`);
    }
  };

  useEffect(() => {
    const service = tab[0] === TAB.DOX[0] ? wldocs : wlpax;

    // Grab the value for the term whose field equals the name param.
    // So if coll.terms = [{"field": "examplename", "value": "examplevalue"}, {"field": "othername", "value": "othervalue"}]
    // getPropertyVal(coll, "examplename") returns "examplevalue"
    const getPropertyVal = (coll, name) => {
      return (coll.terms.filter(term => term.field === name)[0] || {}).value;
    };

    service.get().then(res => {
      let parsed = [];

      // Backend is sending us an object meant for running rules on the backend,
      // so until we refactor that code, we have to filter through all the data we don't need here
      // and restructure it as a flat object. See #45.
      if (hasData(res)) {
        parsed = res.map(item => {
          const firstName = getPropertyVal(item, "firstName");
          const lastName = getPropertyVal(item, "lastName");
          const dob = getPropertyVal(item, "dob");
          const categoryId = getPropertyVal(item, "categoryId");
          const documentType = getPropertyVal(item, "documentType");
          const documentNumber = getPropertyVal(item, "documentNumber");

          //TODO: consolidate pax/doc fetches??
          if (tab[0] === TAB.PAX[0])
            return {
              id: item.id,
              firstName: firstName,
              lastName: lastName,
              dob: dob,
              categoryId: categoryId
            };

          return {
            id: item.id,
            documentNumber: documentNumber,
            documentType: documentType,
            categoryId: categoryId
          };
        });
      }

      setData(parsed);
      setKey(key + 1);
    });
  }, [tab]);

  return (
    <Container fluid>
      <Title
        title="Watchlists"
        leftChild={tabs}
        leftCb={titleTabCallback}
        rightChild={button}
      ></Title>
      <Table data={data} key={key} id={tab[0]} callback={cb}></Table>
      <WLModal
        show={showModal}
        onHide={closeModal}
        callback={cb}
        title={modalTitle}
        id={id}
      />
    </Container>
  );
};

export default Watchlist;
