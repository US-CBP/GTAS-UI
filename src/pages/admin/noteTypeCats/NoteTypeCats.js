import React, { useState } from "react";
import Table from "../../../components/table/Table";
import { notetypes } from "../../../services/serviceWrapper";
import Title from "../../../components/title/Title";
import { Button, Col, Container, Row } from "react-bootstrap";
import NoteTypeModal from "../noteTypeCats/NoteTypeModal.js";

const NoteTypeCats = ({ name }) => {
  const cb = function(result) {};
  const [showModal, setShowModal] = useState(false);

  return (
    <Container fluid>
      <Row>
        <Col sm={4}>
          <Title title={name}></Title>
        </Col>
        <Col sm={{ span: 4, offset: 4 }}>
          <Button variant="outline-dark" onClick={() => setShowModal(true)}>
            Add Note Type Category
          </Button>
          <NoteTypeModal
            show={showModal}
            onHide={() => setShowModal(false)}
            callback={cb}
          />
        </Col>
      </Row>
      <Table service={notetypes.get} id="noteTypes" callback={cb}></Table>
    </Container>
  );
};

export default NoteTypeCats;
