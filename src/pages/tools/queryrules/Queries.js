import React, { useState, useEffect } from "react";
import Table from "../../../components/table/Table";
import Title from "../../../components/title/Title";
import { Button, Container, Tabs, Tab } from "react-bootstrap";
// import { navigate } from "@reach/router";

import { query } from "../../../services/serviceWrapper";
// import { titleCase } from "../../../utils/utils";
import QRModal from "./QRModal";
import "./QueryRules.css";

const Queries = props => {
  const cb = function(result) {
    if (result === "SAVE" || result === "DELETE" || result === "CLOSE") {
      closeModal();
      setTablekey(tablekey + 1);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(0);
  const [record, setRecord] = useState({});
  const [key, setKey] = useState(0);
  const [tablekey, setTablekey] = useState(0);

  const [modalTitle, setModalTitle] = useState(`Add Query`);

  const button = (
    <Button
      block
      variant="ternary"
      className="btn btn-outline-info"
      onClick={() => launchModal(0)}
      alt={props.alt}
    >
      {`Create new Query`}
    </Button>
  );

  const header = [
    {
      Accessor: "id",
      Header: "Edit",
      Cell: ({ row }) => (
        <div className="icon-col">
          <i
            className="fa fa-pencil-square-o qbrb-icon"
            onClick={() => launchModal(row.original.id, row.original)}
          ></i>
        </div>
      )
    },
    { Accessor: "title" },
    { Accessor: "description" }
  ];

  const launchModal = (recordId, record) => {
    const title = (recordId || 0) > 0 ? `Edit Query` : `Add Query`;

    setKey(key + 1);
    setId(recordId);
    setRecord(record);
    setModalTitle(title);
    setShowModal(true);
  };

  const closeModal = () => {
    setId();
    setRecord({});
    setKey(key + 1);
    setShowModal(false);
  };

  return (
    <Container fluid>
      <Title title="Queries" rightChild={button}></Title>
      <Table
        service={query.get}
        id="Queries"
        callback={cb}
        header={header}
        key={`t${tablekey}`}
      ></Table>
      <QRModal
        show={showModal}
        onHide={closeModal}
        callback={cb}
        key={key}
        data={record}
        title={modalTitle}
        id={id}
        service={query}
      />
    </Container>
  );
};

export default Queries;
