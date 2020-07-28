import React, { useState } from "react";
import Table from "../../../../components/table/Table";
import { Button, Container } from "react-bootstrap";
import { codeEditor } from "../../../../services/serviceWrapper";
import CarrierModal from "./CarrierModal";

const Carriers = ({ name }) => {
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
    setModalTitle("Edit Carrier");
    setEditRowDetails(rowDetails);
    setShowModal(true);
  };

  const headers = [
    {
      Accessor: "Edit",
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
    { Accessor: "name" }
  ];

  return (
    <Container fluid>
      <div className="action-button-div">
        <Button
          variant="outline-dark"
          onClick={() => {
            setShowModal(true);
            setModalTitle("Add Carrier");
            setIsEditModal(false);
            setEditRowDetails({});
          }}
        >
          Add Carrier
        </Button>
        <Button
          variant="outline-dark"
          onClick={() => {
            codeEditor.put.restoreCarriersAll().then(res => {
              refresh();
            });
          }}
        >
          Restore All Carriers
        </Button>
      </div>

      <CarrierModal
        show={showModal}
        onHide={() => setShowModal(false)}
        isEdit={isEditModal}
        title={modalTitle}
        editRowDetails={editRowDetails}
        refresh={refresh}
        callback={cb}
      />

      <Table
        service={codeEditor.get.carrierCodes}
        id="carriers"
        callback={cb}
        header={headers}
        key={refreshKey}
      ></Table>
    </Container>
  );
};

export default Carriers;
