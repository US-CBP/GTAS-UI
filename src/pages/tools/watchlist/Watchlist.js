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
  const isPax = mode === TAB.PAX[0];

  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(0);
  const [data, setData] = useState([]);
  const [tab, setTab] = useState(isPax ? TAB.PAX : TAB.DOX);
  const [modalTitle, setModalTitle] = useState(tab[1]);

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
      {`Create new ${tab[1]}`}
    </Button>
  );

  // const header = [
  //   {
  //     Accessor: "entity"
  //   },
  //   {
  //     Accessor: "name",
  //     Cell: ({ row }) => <div className="wide-col">{row.original.title}</div>
  //   }
  // ];

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
    const id = ev.split("-")[2];

    if ((id || "").toLowerCase() === TAB.PAX[0]) {
      setTab(TAB.PAX);
      navigate(`/gtas/tools/watchlist/pax`);
    } else {
      setTab(TAB.DOX);
      navigate(`/gtas/tools/watchlist/dox`);
    }
  };

  useEffect(() => {
    const service = tab[0] === TAB.PAX[0] ? wlpax : wldocs;

    service.get().then(res => {
      let parsed = [];

      if (hasData(res)) {
        parsed = res.map(item => {
          const firstName = item.terms.filter(term => term.field === "firstName")[0];
          const lastName = item.terms.filter(term => term.field === "lastName")[0];
          const dob = item.terms.filter(term => term.field === "dob")[0];
          const categoryId = item.terms.filter(term => term.field === "categoryId")[0];
          const documentType = item.terms.filter(
            term => term.field === "documentType"
          )[0];
          const documentNumber = item.terms.filter(
            term => term.field === "documentNumber"
          )[0];

          //TODO: consolidate pax/doc fetches??
          if (tab[0] === TAB.PAX[0])
            return {
              id: item.id,
              firstName: (firstName || {}).value,
              lastName: (lastName || {}).value,
              dob: (dob || {}).value,
              // documentNumber: (documentNumber || {}).value,
              // documentType: (documentType || {}).value,
              categoryId: (categoryId || {}).value
            };

          return {
            id: item.id,
            // firstName: (firstName || {}).value,
            // lastName: (lastName || {}).value,
            // dob: (dob || {}).value,
            documentNumber: (documentNumber || {}).value,
            documentType: (documentType || {}).value,
            categoryId: (categoryId || {}).value
          };
        });
      }

      setData(parsed);
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
      <Table data={data} key={data} id={tab[0]} callback={cb}></Table>
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
