import React, { useState, useEffect } from "react";
import Table from "../../../components/table/Table";
import { watchlistcats } from "../../../services/serviceWrapper";
import Title from "../../../components/title/Title";
import Xid from "../../../components/xid/Xid";
import Main from "../../../components/main/Main";
import { Button } from "react-bootstrap";
import WatchlistModal from "./WatchlistModal";

const WatchlistCats = ({ name }) => {
  const cb = function() {};

  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([{}]);
  const [refreshKey, setRefreshKey] = useState(1);

  const refresh = () => {
    setRefreshKey(refreshKey + 1);
  };

  const cats = (
    <Button variant="outline-dark" onClick={() => setShowModal(true)}>
      {<Xid xid="7">Add Category</Xid>}
    </Button>
  );

  return (
    <Main className="full">
      <Title title={name} rightChild={cats}></Title>
      <Table
        service={watchlistcats.get}
        id="Watchlist Categories"
        key={refreshKey}
        callback={cb}
      ></Table>
      <WatchlistModal
        show={showModal}
        onHide={() => setShowModal(false)}
        refresh={refresh}
        callback={cb}
      />
    </Main>
  );
};

export default WatchlistCats;
