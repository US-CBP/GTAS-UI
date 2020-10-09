import React, { useState } from "react";
import Table from "../../../components/table/Table";
import Title from "../../../components/title/Title";
import Xl8 from "../../../components/xl8/Xl8";
import Main from "../../../components/main/Main";
import { Button } from "react-bootstrap";
import { QR, ACTION } from "../../../utils/constants";

import { query } from "../../../services/serviceWrapper";
import QRModal from "./QRModal";
import "./QueryRules.css";

const Queries = props => {
  const cb = function(status, res) {
    if (status === ACTION.SAVE || status === ACTION.DELETE || status === ACTION.CLOSE) {
      closeModal();
      setTablekey(tablekey + 1);
    }
  };

  const addQuery = <Xl8 xid="">Add Query</Xl8>;
  const editQuery = <Xl8 xid="">Edit Query</Xl8>;
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(0);
  const [record, setRecord] = useState({});
  const [key, setKey] = useState(0);
  const [tablekey, setTablekey] = useState(0);

  const [modalTitle, setModalTitle] = useState(addQuery);

  const button = (
    <Button
      variant="ternary"
      className="btn btn-outline-info"
      onClick={() => launchModal()}
      alt={props.alt}
    >
      {addQuery}
    </Button>
  );

  const header = [
    {
      Accessor: "id",
      Xl8: true,
      Header: ["edit001", "Edit"],
      Cell: ({ row }) => (
        <div className="icon-col">
          <i
            className="fa fa-pencil-square-o qbrb-icon"
            onClick={() => launchModal(row.original.id, row.original)}
          ></i>
        </div>
      )
    },
    { Accessor: "title", Xl8: true, Header: ["q004", "Title"] },
    { Accessor: "description", Xl8: true, Header: ["q005", "Description"] }
  ];

  const launchModal = (recordId, record) => {
    const title = recordId ? editQuery : addQuery;

    setKey(key + 1);
    setId(recordId);
    setRecord(record);
    setModalTitle(title);
    setShowModal(true);
  };

  const closeModal = () => {
    setId();
    setRecord({});
    setTablekey(tablekey + 1);
    setShowModal(false);
  };

  return (
    <Main className="full">
      <Title title={<Xl8 xid="q002">Queries</Xl8>} rightChild={button}></Title>
      <Table
        service={query.get}
        callback={cb}
        header={header}
        key={`table${tablekey}`}
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
    </Main>
  );
};

export default Queries;
