// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useState, useContext } from "react";
import Table from "../../../../components/table/Table";
import Xl8 from "../../../../components/xl8/Xl8";
import CountryModal from "./CountryModal";
import ConfirmationModal from "../../../../components/confirmationModal/ConfirmationModal";
import { LookupContext } from "../../../../context/data/LookupContext";
import { codeEditor } from "../../../../services/lookupService";
import { ACTION, LK } from "../../../../utils/constants";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";

const Countries = () => {
  const cb = () => {};
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(1);
  const [isEditModal, setIsEditModal] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [action, setAction] = useState();
  const [editRowDetails, setEditRowDetails] = useState();
  const [confirmModalHeader, setConfirmModalHeader] = useState();
  const [confirmModalMessage, setConfirmModalMessage] = useState();
  const [showConfirm, setShowConfirm] = useState(false);
  const { refreshPartial } = useContext(LookupContext);
  const type = LK.COUNTRY;

  const refresh = () => {
    setRefreshKey(refreshKey + 1);
    setEditRowDetails({});
  };

  const openEditModal = rowDetails => {
    setModalTitle(<Xl8 xid="cou001">Edit Country</Xl8>);
    setEditRowDetails(rowDetails);
    setShowModal(true);
    setIsEditModal(true);
  };

  const closeEditModal = () => {
    setEditRowDetails({});
    setShowModal(false);
  };

  const confirm = action => {
    if (action === ACTION.UPDATE) {
      setConfirmModalHeader(<Xl8 xid="couConf001">Restore Country Code</Xl8>);
      setConfirmModalMessage(
        <Xl8 xid="couConf002">Please confirm to restore the country code</Xl8>
      );
    } else if (action === ACTION.DELETE) {
      setConfirmModalHeader(<Xl8 xid="couConf003">Delete Country Code</Xl8>);
      setConfirmModalMessage(
        <Xl8 xid="couConf004">Please confirm to delete the country code</Xl8>
      );
    } else if (action === ACTION.UPDATEALL) {
      setConfirmModalHeader(<Xl8 xid="couConf005">Restore All Country Codes</Xl8>);
      setConfirmModalMessage(
        <Xl8 xid="couConf006">Please confirm to restore all country codes</Xl8>
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

  const restoreAll = () => {
    codeEditor.put.restoreAll(type).then(res => {
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
    { Accessor: "iso2", Xl8: true, Header: ["iso2001", "ISO2"] },
    { Accessor: "iso3", Xl8: true, Header: ["iso3001", "ISO3"] },
    { Accessor: "isoNumeric", Xl8: true, Header: ["isonum001", "ISO Numeric"] },
    { Accessor: "name", Xl8: true, Header: ["cou005", "Name"] }
  ];

  return (
    <div>
      <CountryModal
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
        service={() => refreshPartial(type)}
        callback={cb}
        header={headers}
        key={refreshKey}
        enableColumnFilter={true}
      ></Table>
      <Fab icon={<i className="fa fa-plus" />} variant="info">
        <Action
          text={<Xl8 xid="cou004">Add Country</Xl8>}
          onClick={() => {
            setEditRowDetails({});
            setModalTitle(<Xl8 xid="cou004">Add Country</Xl8>);
            setIsEditModal(false);
            setShowModal(true);
          }}
        >
          <i className="fa fa-plus" />
        </Action>
        <Action
          text={<Xl8 xid="cou003">Restore All Countries</Xl8>}
          variant="rtf-red"
          onClick={() => confirm(ACTION.UPDATEALL)}
        >
          <i className="fa fa-recycle" />
        </Action>
      </Fab>
    </div>
  );
};

export default Countries;
