import React, { useState, useEffect } from "react";
import Table from "../../../components/table/Table";
import { hitcats } from "../../../services/serviceWrapper";
import Title from "../../../components/title/Title";
import Xl8 from "../../../components/xl8/Xl8";
import Main from "../../../components/main/Main";
import { Button } from "react-bootstrap";
import HitModal from "./HitModal";

const HitCats = ({ name }) => {
  const cb = function() {};

  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(1);

  const headers = [
    {
      Accessor: "id",
      Xl8: true,
      Header: ["wlc002", "Id"]
    },
    {
      Accessor: "label",
      Xl8: true,
      Header: ["wlc003", "Label"]
    },
    {
      Accessor: "description",
      Xl8: true,
      Header: ["wlc004", "Description"]
    },
    {
      Accessor: "severity",
      Xl8: true,
      Header: ["wlc005", "Severity"]
    }
  ];
  const refresh = () => {
    setRefreshKey(refreshKey + 1);
  };

  const cats = (
    <Button variant="info" onClick={() => setShowModal(true)}>
      {<Xl8 xid="wlc001">Add Category</Xl8>}
    </Button>
  );

  return (
    <Main className="full bg-white">
      <Title title={name} rightChild={cats}></Title>
      <Table
        service={hitcats.get}
        key={refreshKey}
        callback={cb}
        header={headers}
      ></Table>
      <HitModal
        show={showModal}
        onHide={() => setShowModal(false)}
        refresh={refresh}
        callback={cb}
      />
    </Main>
  );
};

export default HitCats;
