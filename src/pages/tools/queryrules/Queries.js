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
  const cb = function(result) {};

  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(0);

  const [modalTitle, setModalTitle] = useState(`Add Query`);

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
            onClick={() => launchModal(row.original.id)}
          ></i>
        </div>
      )
    },
    { Accessor: "title" },
    { Accessor: "description" }
  ];

  const launchModal = recordId => {
    setId(recordId);
    if (!isNaN(recordId)) {
      const title = recordId > 0 ? `Edit Query` : `Add Query`;
      setModalTitle(title);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setId(0);
    setShowModal(false);
  };

  return (
    <Container fluid>
      <Title title="Queries" rightChild={button}></Title>
      <Table service={query.get} id="Queries" callback={cb} header={header}></Table>
      <QRModal
        show={showModal}
        onHide={closeModal}
        callback={cb}
        title={modalTitle}
        id={id}
      />
    </Container>
  );
};

export default Queries;
