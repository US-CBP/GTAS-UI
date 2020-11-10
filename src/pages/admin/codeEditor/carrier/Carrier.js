import React, { useState } from "react";
import Table from "../../../../components/table/Table";
import Xl8 from "../../../../components/xl8/Xl8";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { codeEditor } from "../../../../services/serviceWrapper";
import CarrierModal from "./CarrierModal";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";

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
    setModalTitle(<Xl8 xid="car001">Edit Carrier</Xl8>);
    setEditRowDetails(rowDetails);
    setShowModal(true);
  };

  const headers = [
    {
      Accessor: "Edit",
      Xl8: true,
      Header: ["edit001", "Edit"],
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
    { Accessor: "name", Xl8: true, Header: ["car005", "Name"] }
  ];

  const restoreAll = () => {
    codeEditor.put.restoreCarriersAll().then(res => {
      refresh();
    });
  };

  return (
    <div>
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
        callback={cb}
        header={headers}
        key={refreshKey}
        enableColumnFilter={true}
      ></Table>
      <Fab icon={<i className="fa fa-plus" />} variant="info">
        <Action
          text={<Xl8 xid="car002">Add Carrier</Xl8>}
          onClick={() => {
            setShowModal(true);
            setModalTitle(<Xl8 xid="car002">Add Carrier</Xl8>);
            setIsEditModal(false);
            setEditRowDetails({});
          }}
        >
          <i className="fa fa-plus" />
        </Action>
        <Action
          text={<Xl8 xid="car003">Restore All Carriers</Xl8>}
          variant="rtf-red"
          onClick={restoreAll}
        >
          <i className="fa fa-recycle" />
        </Action>
      </Fab>
    </div>
  );
};

export default Carriers;
