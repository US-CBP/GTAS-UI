import React, { useState } from "react";
import Table from "../../../../components/table/Table";
import Xl8 from "../../../../components/xl8/Xl8";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { codeEditor } from "../../../../services/serviceWrapper";
import CreditCardTypeModal from "./CreditCardTypeModal";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";

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

  const restoreAll = () => {
    codeEditor.put.restoreCctypeAll().then(res => {
      refresh();
    });
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
              className="fa fa-pencil-square-o table-icon"
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
    <div>
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
      <Fab icon={<i className="fa fa-plus" />} variant="info">
        <Action
          text={<Xl8 xid="cct004">Add Type</Xl8>}
          onClick={() => {
            setShowModal(true);
            setModalTitle(<Xl8 xid="cct004">Add Type</Xl8>);
            setIsEditModal(false);
            setEditRowDetails({});
          }}
        >
          <i className="fa fa-plus" />
        </Action>
        <Action
          text={<Xl8 xid="cou005">Restore All Types</Xl8>}
          variant="rtf-red"
          onClick={restoreAll}
        >
          <i className="fa fa-recycle" />
        </Action>
      </Fab>
    </div>
  );
};

export default CreditCardType;
