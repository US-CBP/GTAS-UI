import React, { useState } from "react";
import Table from "../../../../components/table/Table";
import Title from "../../../../components/title/Title";
import Xid from "../../../../components/xid/Xid";
import { Button, Col, Container, Row } from "react-bootstrap";
import { codeEditor, users } from "../../../../services/serviceWrapper";
import AirportModal from "./AirportModal";

const Airports = ({ name }) => {
  const cb = function(result) {};
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(1);
  const [isEditModal, setIsEditModal] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [editRowDetails, setEditRowDetails] = useState({});

  const refresh = () => {
    setRefreshKey(refreshKey + 1);
  };

  const openEditModal = rowDetails => {
    setIsEditModal(true);
    setModalTitle("Edit Airport");
    setEditRowDetails(rowDetails);
    setShowModal(true);
  };

  const headers = [
    {
      Accessor: "Edit",
      disableFilters: true,
      disableSortBy: true,
      Cell: ({ row }) => {
        return (
          <div className="icon-col">
            <i
              className="fa fa-pencil-square-o qbrb-icon"
              onClick={() => openEditModal(row.original)}
            ></i>
          </div>
        );
      }
    },
    { Accessor: "iata" },
    { Accessor: "icao" },
    { Accessor: "name" },
    { Accessor: "city" },
    { Accessor: "country" },
    { Accessor: "latitude" },
    { Accessor: "longitude" }
  ];

  return (
    <Container fluid>
      <AirportModal
        show={showModal}
        onHide={() => setShowModal(false)}
        isEdit={isEditModal}
        title={modalTitle}
        editRowDetails={editRowDetails}
        refresh={refresh}
        callback={cb}
      />

      <div className="action-button-div">
        <Button
          variant="outline-dark"
          onClick={() => {
            setShowModal(true);
            setModalTitle("Add Airport");
            setIsEditModal(false);
            setEditRowDetails({});
          }}
        >
          {<Xid xid="7">Add Airport</Xid>}
        </Button>

        <Button
          variant="outline-dark"
          onClick={() => {
            codeEditor.put.restoreAirportsAll().then(res => {
              refresh();
            });
          }}
        >
          {<Xid xid="7">Restore All Airports</Xid>}
        </Button>
      </div>

      <Table
        service={codeEditor.get.airportCodes}
        id="airports"
        callback={cb}
        header={headers}
        key={refreshKey}
        enableColumnFilter={true}
      ></Table>
    </Container>
  );
};

export default Airports;
