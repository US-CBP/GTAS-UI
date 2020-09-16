import React, { useState } from "react";
import Table from "../../../components/table/Table";
import { notetypes } from "../../../services/serviceWrapper";
import Title from "../../../components/title/Title";
import Main from "../../../components/main/Main";
import { Button, Col, Container, Row } from "react-bootstrap";
import NoteTypeModal from "../noteTypeCats/NoteTypeModal.js";

const NoteTypeCats = ({ name }) => {
  const cb = function(result) {};
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(1);

  const refresh = () => {
    setRefreshKey(refreshKey + 1);
  };

  const addCat = (
    <Button variant="outline-dark" onClick={() => setShowModal(true)}>
      Add Category
    </Button>
  );

  return (
    <Main className="full">
      <Title title={name} rightChild={addCat}></Title>
      <Row></Row>
      <Table
        service={notetypes.get}
        id="noteTypes"
        key={refreshKey}
        callback={cb}
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

export default NoteTypeCats;
