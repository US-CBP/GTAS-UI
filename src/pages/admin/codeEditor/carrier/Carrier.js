import React, { useState } from "react";
import Table from "../../../../components/table/Table";
import Xl8 from "../../../../components/xl8/Xl8";
import { codeEditor } from "../../../../services/serviceWrapper";
import CarrierModal from "./CarrierModal";
import { ACTION } from "../../../../utils/constants";
import ConfirmationModal from "../../../../components/confirmationModal/ConfirmationModal";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";

const Carriers = ({ name }) => {
  const cb = function(result) {};
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(1);
  const [isEditModal, setIsEditModal] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [editRowDetails, setEditRowDetails] = useState({});
  const [action, setAction] = useState();
  const [confirmModalHeader, setConfirmModalHeader] = useState();
  const [confirmModalMessage, setConfirmModalMessage] = useState();
  const [showConfirm, setShowConfirm] = useState(false);

  const refresh = () => {
    setRefreshKey(refreshKey + 1);
  };

  const openEditModal = rowDetails => {
    setIsEditModal(true);
    setModalTitle(<Xl8 xid="car001">Edit Carrier</Xl8>);
    setEditRowDetails(rowDetails);
    setShowModal(true);
  };

  const confirm = action => {
    if (action === ACTION.UPDATE) {
      setConfirmModalHeader(<Xl8 xid="carConf001">Restore Carrier Code</Xl8>);
      setConfirmModalMessage(
        <Xl8 xid="carConf002">Please confirm to restore the carrier code</Xl8>
      );
    } else if (action === ACTION.DELETE) {
      setConfirmModalHeader(<Xl8 xid="carConf003">Delete Carrier Code</Xl8>);
      setConfirmModalMessage(
        <Xl8 xid="carConf004">Please confirm to delete the carrier code</Xl8>
      );
    } else if (action === ACTION.UPDATEALL) {
      setConfirmModalHeader(<Xl8 xid="carConf004">Restore All Carrier Codes</Xl8>);
      setConfirmModalMessage(
        <Xl8 xid="carConf005">Please confirm to restore all carrier codes</Xl8>
      );
    }
    setAction(action);
    setShowConfirm(true);
    setShowModal(false);
  };

  const restoreCode = () => {
    codeEditor.put.restoreCarrier(editRowDetails).then(res => {
      refresh();
    });
  };

  const deleteCode = () => {
    codeEditor.delete.deleteCarrier(editRowDetails?.id).then(res => {
      refresh();
    });
  };

  const handleConfirm = confirmed => {
    if (confirmed) {
      if (action === ACTION.DELETE) deleteCode();
      if (action === ACTION.UPDATE) restoreCode();
      if (action === ACTION.UPDATEALL) restoreAll();
    } else if (action !== ACTION.UPDATEALL) setShowModal(true);

    setShowConfirm(false);
  };

  const restoreAll = () => {
    codeEditor.put.restoreCarriersAll().then(res => {
      refresh();
    });
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
    { Accessor: "icao", Xl8: true, Header: ["icao001", "ICAO"] },
    { Accessor: "name", Xl8: true, Header: ["car005", "Name"] }
  ];

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
        actionCallback={confirm}
      />
      <ConfirmationModal
        show={showConfirm}
        callback={handleConfirm}
        header={confirmModalHeader}
        message={confirmModalMessage}
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
          onClick={() => confirm(ACTION.UPDATEALL)}
        >
          <i className="fa fa-recycle" />
        </Action>
      </Fab>
    </div>
  );
};

export default Carriers;
