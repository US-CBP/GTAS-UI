import React, { useState } from "react";
import Table from "../../../../components/table/Table";
import Xl8 from "../../../../components/xl8/Xl8";
import { Button, Container } from "react-bootstrap";
import { codeEditor } from "../../../../services/serviceWrapper";
import CreditCardTypeModal from "./CreditCardTypeModal";

const CreditCardType = ({ name }) => {
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
    setModalTitle(<Xl8 xid="cct001">Edit Type</Xl8>);
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
              className="fa fa-pencil-square-o qbrb-icon-edit"
              onClick={() => openEditModal(row.original)}
            ></i>
          </div>
        );
      }
    },
    { Accessor: "code", Xl8: true, Header: ["cct002", "Code"] },
    { Accessor: "description", Xl8: true, Header: ["cct003", "Description"] }
  ];

  return (
    <Container fluid>
      <div className="action-button-div">
        <Button
          variant="outline-dark"
          onClick={() => {
            setShowModal(true);
            setModalTitle(<Xl8 xid="cct004">Add Type</Xl8>);
            setIsEditModal(false);
            setEditRowDetails({});
          }}
        >
          {<Xl8 xid="cct004">Add Type</Xl8>}
        </Button>
        <Button
          variant="outline-dark"
          onClick={() => {
            codeEditor.put.restoreCctypeAll().then(res => {
              refresh();
            });
          }}
        >
          {<Xl8 xid="cou005">Restore All Types</Xl8>}
        </Button>
      </div>
      <CreditCardTypeModal
        show={showModal}
        onHide={() => setShowModal(false)}
        isEdit={isEditModal}
        title={modalTitle}
        editRowDetails={editRowDetails}
        refresh={refresh}
        callback={cb}
      />

      <Table
        service={codeEditor.get.cctypeCodes}
        callback={cb}
        header={headers}
        key={refreshKey}
        enableColumnFilter={true}
      ></Table>
    </Container>
  );
};

export default CreditCardType;
