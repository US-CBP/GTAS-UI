// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useState, useContext } from "react";
import Table from "../../../../components/table/Table";
import Xl8 from "../../../../components/xl8/Xl8";
import CreditCardTypeModal from "./CreditCardTypeModal";
import ConfirmationModal from "../../../../components/confirmationModal/ConfirmationModal";
import { LookupContext } from "../../../../context/data/LookupContext";
import { codeEditor } from "../../../../services/lookupService";
import { ACTION, LK } from "../../../../utils/constants";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";

const CreditCardType = () => {
  const cb = () => {};
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(1);
  const [isEditModal, setIsEditModal] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [editRowDetails, setEditRowDetails] = useState({});
  const [action, setAction] = useState();
  const [confirmModalHeader, setConfirmModalHeader] = useState();
  const [confirmModalMessage, setConfirmModalMessage] = useState();
  const [showConfirm, setShowConfirm] = useState(false);
  const { refreshAndReturn } = useContext(LookupContext);
  const type = LK.CCTYPE;

  const refresh = () => {
    setRefreshKey(refreshKey + 1);
    setEditRowDetails({});
  };

  const restoreAll = () => {
    codeEditor.put.restoreAll(type).then(res => {
      refresh();
    });
  };

  const openEditModal = rowDetails => {
    setIsEditModal(true);
    setModalTitle(<Xl8 xid="cct001">Edit Type</Xl8>);
    setEditRowDetails(rowDetails);
    setShowModal(true);
  };

  const closeEditModal = () => {
    setEditRowDetails({});
    setShowModal(false);
  };

  const confirm = action => {
    if (action === ACTION.UPDATE) {
      setConfirmModalHeader(<Xl8 xid="cctConf001">Restore Credit Card Type Code</Xl8>);
      setConfirmModalMessage(
        <Xl8 xid="cctConf002">Please confirm to restore the credit card type code</Xl8>
      );
    } else if (action === ACTION.DELETE) {
      setConfirmModalHeader(<Xl8 xid="cctConf003">Delete Credit Card Type Code</Xl8>);
      setConfirmModalMessage(
        <Xl8 xid="cctConf004">Please confirm to delete the credit card type code</Xl8>
      );
    } else if (action === ACTION.UPDATEALL) {
      setConfirmModalHeader(
        <Xl8 xid="cctConf005">Restore All Credit Card Type Codes</Xl8>
      );
      setConfirmModalMessage(
        <Xl8 xid="cctConf006">Please confirm to restore all credit card type codes</Xl8>
      );
    }
    setAction(action);
    setShowConfirm(true);
    setShowModal(false);
  };

  const restoreCode = () => {
    codeEditor.put.restore(type, editRowDetails).then(res => {
      refresh();
    });
  };

  const deleteCode = () => {
    codeEditor.del(type, editRowDetails?.id).then(res => {
      refresh();
    });
  };

  const handleConfirm = confirmed => {
    if (confirmed) {
      if (action === ACTION.DELETE) deleteCode();
      else if (action === ACTION.UPDATE) restoreCode();
      else if (action === ACTION.UPDATEALL) restoreAll();
    } else if (action !== ACTION.UPDATEALL) setShowModal(true);

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
    { Accessor: "code", Xl8: true, Header: ["cct002", "Code"] },
    { Accessor: "description", Xl8: true, Header: ["cct003", "Description"] }
  ];

  return (
    <div>
      <CreditCardTypeModal
        show={showModal}
        onHide={closeEditModal}
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
        service={() => refreshAndReturn(type)}
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
          onClick={() => confirm(ACTION.UPDATEALL)}
        >
          <i className="fa fa-recycle" />
        </Action>
      </Fab>
    </div>
  );
};

export default CreditCardType;
