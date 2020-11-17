import React, { useState } from "react";
import Table from "../../../../components/table/Table";
// import Title from "../../../../components/title/Title";
import Xl8 from "../../../../components/xl8/Xl8";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { codeEditor } from "../../../../services/serviceWrapper";
import AirportModal from "./AirportModal";
import ConfirmationModal from "../../../../components/confirmationModal/ConfirmationModal";

const Airports = ({ name }) => {
  const cb = function(result) {};
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
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

  const confirm = () => {
    setShowConfirm(true);
    setShowModal(false);
  };

  const restoreCode = () => {
    codeEditor.put.restoreAirport(editRowDetails).then(res => {
      refresh();
    });
  };

  const handleConfirm = confirmed => {
    if (confirmed) restoreCode();
    else setShowModal(true);

    setShowConfirm(false);
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
        restoreSpecificCode={confirm}
      />
      <ConfirmationModal
        show={showConfirm}
        confirm={handleConfirm}
        header={<Xl8 xid="airpConf001">Restore Airport Code</Xl8>}
        message={<Xl8 xid="airpConf002">Please confirm to resetore the airport code</Xl8>}
      />

      <div className="action-button-div">
        <DropdownButton variant="info" title={<Xl8 xid="manu002">Choose Action</Xl8>}>
          <Dropdown.Item
            as="button"
            onClick={() => {
              setShowModal(true);
              setModalTitle(addAirport);
              setIsEditModal(false);
              setEditRowDetails({});
            }}
          >
            {addAirport}
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => {
              codeEditor.put.restoreAirportsAll().then(res => {
                refresh();
              });
            }}
          >
            {<Xl8 xid="airp002">Restore All Airports</Xl8>}
          </Dropdown.Item>
        </DropdownButton>
      </div>

      <Table
        service={codeEditor.get.airportCodes}
        callback={cb}
        header={headers}
        key={refreshKey}
        enableColumnFilter={true}
      ></Table>
    </div>
  );
};

export default Airports;
