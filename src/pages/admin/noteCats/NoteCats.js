import React, { useState } from "react";
import Table from "../../../components/table/Table";
import { notetypes } from "../../../services/serviceWrapper";
import Title from "../../../components/title/Title";
import Xl8 from "../../../components/xl8/Xl8";
import Main from "../../../components/main/Main";
import { Button, Row } from "react-bootstrap";
import NoteTypeModal from "./NoteModal.js";

const NoteCats = ({ name }) => {
  const cb = function(result) {};
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(1);
  const headers = [
    {
      Accessor: "id",
      Xl8: true,
      Header: ["ntc002", "Id"]
    },
    {
      Accessor: "noteType",
      Xl8: true,
      Header: ["ntc003", "Note Type"]
    }
  ];

  const refresh = () => {
    setRefreshKey(refreshKey + 1);
  };

  const addCat = (
    <Button variant="info" onClick={() => setShowModal(true)}>
      <Xl8 xid="ntc001">Add Category</Xl8>
    </Button>
  );

  return (
    <Main className="full bg-white">
      <Title title={name} rightChild={addCat}></Title>
      <Row></Row>
      <Table
        service={notetypes.get}
        key={refreshKey}
        callback={cb}
        header={headers}
      ></Table>
      <NoteTypeModal
        show={showModal}
        onHide={() => setShowModal(false)}
        refresh={refresh}
        callback={cb}
      />
    </Main>
  );
};

export default NoteCats;
