import React, { useState, useEffect } from "react";
import Table from "../../../components/table/Table";
import { watchlistcats } from "../../../services/serviceWrapper";
import Title from "../../../components/title/Title";
import { Container, Button, Row, Col, Modal } from "react-bootstrap";
import WatchlistModal from "./WatchlistModal";

const WatchlistCats = ({ name }) => {
  const cb = function() {};

  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([{}]);
  const [refreshKey, setRefreshKey] = useState(1);

  const refresh = () => {
    setRefreshKey(refreshKey + 1);
  };

  return (
    <Container fluid>
      <Row>
        <Col sm={4}>
          <Title title={name}></Title>
        </Col>
        <Col sm={{ span: 4, offset: 4 }}>
          <Button variant="outline-dark" onClick={() => setShowModal(true)}>
            Add to Watchlist
          </Button>
          <WatchlistModal
            show={showModal}
            onHide={() => setShowModal(false)}
            refresh={refresh}
            callback={cb}
          />
        </Col>
      </Row>
      <Table
        service={watchlistcats.get}
        id="Watchlist Category"
        key={refreshKey}
        callback={cb}
      ></Table>
    </Container>
  );
};

export default WatchlistCats;
