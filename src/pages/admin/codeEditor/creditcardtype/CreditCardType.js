import React, { useState } from "react";
import Table from "../../../../components/table/Table";
import Xl8 from "../../../../components/xl8/Xl8";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { codeEditor } from "../../../../services/serviceWrapper";
import CreditCardTypeModal from "./CreditCardTypeModal";
import { ACTION } from "../../../../utils/constants";
import ConfirmationModal from "../../../../components/confirmationModal/ConfirmationModal";

const CreditCardType = ({ name }) => {
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
    setModalTitle(<Xl8 xid="cct001">Edit Type</Xl8>);
    setEditRowDetails(rowDetails);
    setShowModal(true);
  };
  const confirm = action => {
    if (action === ACTION.UPDATE) {
      setConfirmModalHeader(<Xl8 xid="airpConf001">Restore Credit Card Type Code</Xl8>);
      setConfirmModalMessage(
        <Xl8 xid="airpConf002">Please confirm to restore the credit card type code</Xl8>
      );
    } else if (action === ACTION.DELETE) {
      setConfirmModalHeader(<Xl8 xid="airpConf003">Delete Credit Card Type Code</Xl8>);
      setConfirmModalMessage(
        <Xl8 xid="airpConf004">Please confirm to delete the credit card type code</Xl8>
      );
    }
    setAction(action);
    setShowConfirm(true);
    setShowModal(false);
  };

  const restoreCode = () => {
    codeEditor.put.restoreCctype(editRowDetails).then(res => {
      refresh();
    });
  };

  const deleteCode = () => {
    codeEditor.delete.deleteCctype(editRowDetails?.id).then(res => {
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
    { Accessor: "code", Xl8: true, Header: ["cct002", "Code"] },
    { Accessor: "description", Xl8: true, Header: ["cct003", "Description"] }
  ];

  return (
    <div>
      <div className="action-button-div">
        <DropdownButton variant="info" title={<Xl8 xid="manu002">Choose Action</Xl8>}>
          <Dropdown.Item
            as="button"
            onClick={() => {
              setShowModal(true);
              setModalTitle(<Xl8 xid="cct004">Add Type</Xl8>);
              setIsEditModal(false);
              setEditRowDetails({});
            }}
          >
            {<Xl8 xid="cct004">Add Type</Xl8>}
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => {
              codeEditor.put.restoreCctypeAll().then(res => {
                refresh();
              });
            }}
          >
            {<Xl8 xid="cou005">Restore All Types</Xl8>}
          </Dropdown.Item>
        </DropdownButton>
      </div>

      <CreditCardTypeModal
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
        service={codeEditor.get.cctypeCodes}
        callback={cb}
        header={headers}
        key={refreshKey}
        enableColumnFilter={true}
      ></Table>
    </div>
  );
};

export default CreditCardType;
