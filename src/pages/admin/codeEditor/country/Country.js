import React, { useState } from "react";
import Table from "../../../../components/table/Table";
import Xl8 from "../../../../components/xl8/Xl8";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { codeEditor } from "../../../../services/serviceWrapper";
import CountryModal from "./CountryModal";
import ConfirmationModal from "../../../../components/confirmationModal/ConfirmationModal";
import { ACTION } from "../../../../utils/constants";

const Countries = ({ name }) => {
  const cb = function(result) {};
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(1);
  const [isEditModal, setIsEditModal] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [action, setAction] = useState();
  const [editRowDetails, setEditRowDetails] = useState({});
  const [confirmModalHeader, setConfirmModalHeader] = useState();
  const [confirmModalMessage, setConfirmModalMessage] = useState();
  const [showConfirm, setShowConfirm] = useState(false);

  const refresh = () => {
    setRefreshKey(refreshKey + 1);
  };

  const openEditModal = rowDetails => {
    setIsEditModal(true);
    setModalTitle(<Xl8 xid="cou001">Edit Country:</Xl8>);
    setEditRowDetails(rowDetails);
    setShowModal(true);
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
    }
    setAction(action);
    setShowConfirm(true);
    setShowModal(false);
  };

  const restoreCode = () => {
    codeEditor.put.restoreCountry(editRowDetails).then(res => {
      refresh();
    });
  };

  const deleteCode = () => {
    codeEditor.delete.deleteCountry(editRowDetails?.id).then(res => {
      refresh();
    });
  };

  const handleConfirm = confirmed => {
    if (confirmed) {
      action === ACTION.DELETE ? deleteCode() : restoreCode();
    } else setShowModal(true);

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
    { Accessor: "iso2", Xl8: true, Header: ["iso2001", "ISO2"] },
    { Accessor: "iso3", Xl8: true, Header: ["iso3001", "ISO3"] },
    { Accessor: "isoNumeric", Xl8: true, Header: ["isonum001", "ISO Numeric"] },
    { Accessor: "name", Xl8: true, Header: ["cou005", "Name"] }
  ];

  return (
    <div>
      <div className="action-button-div">
        <DropdownButton variant="info" title={<Xl8 xid="manu002">Choose Action</Xl8>}>
          <Dropdown.Item
            as="button"
            onClick={() => {
              setShowModal(true);
              setModalTitle(<Xl8 xid="cou004">Add Country:</Xl8>);
              setIsEditModal(false);
              setEditRowDetails({});
            }}
          >
            <Xl8 xid="cou004">Add Country:</Xl8>
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => {
              codeEditor.put.restoreCountriesAll().then(res => {
                refresh();
              });
            }}
          >
            {<Xl8 xid="cou003">Restore All Countries</Xl8>}
          </Dropdown.Item>
        </DropdownButton>
      </div>
      <CountryModal
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
        service={codeEditor.get.countryCodes}
        callback={cb}
        header={headers}
        key={refreshKey}
        enableColumnFilter={true}
      ></Table>
    </div>
  );
};

export default Countries;
