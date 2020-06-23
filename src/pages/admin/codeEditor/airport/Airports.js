import React, { useState } from "react";
import Table from "../../../../components/table/Table";
import Title from "../../../../components/title/Title";
import { Button, Col, Container, Row } from "react-bootstrap";
import { codeEditor } from "../../../../services/serviceWrapper";
import AddAirportModal from "./AddAirportModal";

const Airports = ({ name }) => {
  const cb = function(result) {};
  const [showModal, setShowModal] = useState(false);
  const visibleCols = [
    "iata",
    "icao",
    "name",
    "city",
    "country",
    "latitude",
    "longitude"
  ];

  return (
    <Container fluid>
      <Row>
        <Col sm={{ span: 3, offset: 1 }}>
          <Button variant="outline-dark" onClick={() => setShowModal(true)}>
            Add Carrier
          </Button>
          <AddAirportModal
            show={showModal}
            onHide={() => setShowModal(false)}
            callback={cb}
          />
        </Col>
        <Col sm={3}>
          <Title title={name}></Title>
        </Col>
        <Col sm={{ span: 3, offset: 1 }}>
          <Button variant="outline-dark" onClick={codeEditor.put.restoreAirportsAll}>
            Restore All Airports
          </Button>
        </Col>
      </Row>

      <Table
        service={codeEditor.get.airportCodes}
        id="airports"
        callback={cb}
        header={visibleCols}
      ></Table>
    </Container>
  );
};

export default Airports;
