import React, { useState, useContext } from "react";
import Table from "../../../../components/table/Table";
import Xl8 from "../../../../components/xl8/Xl8";
import AirportModal from "./AirportModal";
import ConfirmationModal from "../../../../components/confirmationModal/ConfirmationModal";
import { codeEditor } from "../../../../services/lookupService";
import { LookupContext } from "../../../../context/data/LookupContext";
import { ACTION, LK } from "../../../../utils/constants";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";

const Airports = () => {
  const cb = () => {};
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(1);
  const [isEditModal, setIsEditModal] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [editRowDetails, setEditRowDetails] = useState({});
  const [action, setAction] = useState();
  const [confirmModalHeader, setConfirmModalHeader] = useState();
  const [confirmModalMessage, setConfirmModalMessage] = useState();
  const { refreshAndReturn } = useContext(LookupContext);

  const addAirport = <Xl8 xid="airp002">Add Airport</Xl8>;
  const editAirport = <Xl8 xid="airp003">Edit Airport</Xl8>;
  const type = LK.AIRPORT;

  const refresh = () => {
    setRefreshKey(refreshKey + 1);
    setEditRowDetails({});
  };

  const openEditModal = rowDetails => {
    setIsEditModal(true);
    setModalTitle(editAirport);
    setEditRowDetails(rowDetails);
    setShowModal(true);
  };

  const closeEditModal = () => {
    setEditRowDetails({});
    setShowModal(false);
  };

  const confirm = action => {
    if (action === ACTION.UPDATE) {
      setConfirmModalHeader(<Xl8 xid="airpConf001">Restore Airport Code</Xl8>);
      setConfirmModalMessage(
        <Xl8 xid="airpConf002">Please confirm to restore the airport code</Xl8>
      );
    } else if (action === ACTION.DELETE) {
      setConfirmModalHeader(<Xl8 xid="airpConf003">Delete Airport Code</Xl8>);
      setConfirmModalMessage(
        <Xl8 xid="airpConf004">Please confirm to delete the airport code</Xl8>
      );
    } else if (action === ACTION.UPDATEALL) {
      setConfirmModalHeader(<Xl8 xid="airpConf005">Restore All Airport Codes</Xl8>);
      setConfirmModalMessage(
        <Xl8 xid="airpConf006">Please confirm to restore all airport codes</Xl8>
      );
    }
    setAction(action);
    setShowConfirm(true);
    setShowModal(false);
  };

  const restoreCode = () => {
    codeEditor.put.restore(type, editRowDetails).then(() => {
      refresh();
    });
  };

  const deleteCode = () => {
    codeEditor.del(type, editRowDetails?.id).then(() => {
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
          onClick={() => confirm(ACTION.UPDATEALL)}
        >
          <i className="fa fa-recycle" />
        </Action>
      </Fab>
    </div>
  );
};

export default Airports;
