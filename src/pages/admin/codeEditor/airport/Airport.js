import React, { useState } from "react";
import Table from "../../../../components/table/Table";
import Xl8 from "../../../../components/xl8/Xl8";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { codeEditor } from "../../../../services/serviceWrapper";
import AirportModal from "./AirportModal";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";

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

  const restoreAll = () => {
    codeEditor.put.restoreAirportsAll().then(res => {
      refresh();
    });
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
    <div>
      <AirportModal
        show={showModal}
        onHide={() => setShowModal(false)}
        isEdit={isEditModal}
        title={modalTitle}
        editRowDetails={editRowDetails}
        refresh={refresh}
        callback={cb}
      />

      <Table
        service={codeEditor.get.airportCodes}
        callback={cb}
        header={headers}
        key={refreshKey}
        enableColumnFilter={true}
      ></Table>
      <Fab icon={<i className="fa fa-plus" />} variant="info" event="click">
        <Action
          text={addAirport}
          onClick={() => {
            setShowModal(true);
            setModalTitle(addAirport);
            setIsEditModal(false);
            setEditRowDetails({});
          }}
        >
          <i className="fa fa-plus" />
        </Action>
        <Action
          text={<Xl8 xid="airp002">Restore All Airports</Xl8>}
          variant="rtf-red"
          onClick={restoreAll}
        >
          <i className="fa fa-recycle" />
        </Action>
      </Fab>
    </div>
  );
};

export default Airports;
