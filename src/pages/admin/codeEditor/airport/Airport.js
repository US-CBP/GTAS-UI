import React, { useState } from "react";
import Table from "../../../../components/table/Table";
// import Title from "../../../../components/title/Title";
import Xl8 from "../../../../components/xl8/Xl8";
import { Button, Container } from "react-bootstrap";
import { codeEditor } from "../../../../services/serviceWrapper";
import AirportModal from "./AirportModal";

const Airports = ({ name }) => {
  const cb = function(result) {};
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(1);
  const [isEditModal, setIsEditModal] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [editRowDetails, setEditRowDetails] = useState({});

  const addAirport = <Xl8 xid="airp002">Add Airport</Xl8>;
  const editAirport = <Xl8 xid="airp003">Edit Airport</Xl8>;

  const refresh = () => {
    setRefreshKey(refreshKey + 1);
  };

  const openEditModal = rowDetails => {
    setIsEditModal(true);
    setModalTitle(editAirport);
    setEditRowDetails(rowDetails);
    setShowModal(true);
  };

  const headers = [
    {
      Accessor: "Edit",
      Xl8: true,
      Header: ["edit001", "Edit"],
      disableFilters: true,
      disableSortBy: true,
      Cell: ({ row }) => {
        return (
          <div className="icon-col">
            <i
              className="fa fa-pencil-square-o table-icon"
              onClick={() => openEditModal(row.original)}
            ></i>
          </div>
        );
      }
    },
    { Accessor: "iata", Xl8: true, Header: ["iata001", "IATA"] },
    { Accessor: "icao", Xl8: true, Header: ["icao001", "ICAO"] },
    { Accessor: "name", Xl8: true, Header: ["airp005", "Name"] },
    { Accessor: "city", Xl8: true, Header: ["airp006", "City"] },
    { Accessor: "country", Xl8: true, Header: ["airp007", "Country"] },
    { Accessor: "latitude", Xl8: true, Header: ["lati001", "Latitude"] },
    { Accessor: "longitude", Xl8: true, Header: ["long001", "Longitude"] }
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
          variant="info"
          onClick={() => {
            setShowModal(true);
            setModalTitle(addAirport);
            setIsEditModal(false);
            setEditRowDetails({});
          }}
        >
          {addAirport}
        </Button>

        <Button
          variant="info"
          onClick={() => {
            codeEditor.put.restoreAirportsAll().then(res => {
              refresh();
            });
          }}
        >
          {<Xl8 xid="airp002">Restore All Airports</Xl8>}
        </Button>
      </div>

      <Table
        service={codeEditor.get.airportCodes}
        callback={cb}
        header={headers}
        key={refreshKey}
        enableColumnFilter={true}
      ></Table>
    </Container>
  );
};

export default Airports;
