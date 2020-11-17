import React, { useState } from "react";
import Table from "../../../../components/table/Table";
import Xl8 from "../../../../components/xl8/Xl8";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { codeEditor } from "../../../../services/serviceWrapper";
import CarrierModal from "./CarrierModal";
import { ACTION } from "../../../../utils/constants";
import ConfirmationModal from "../../../../components/confirmationModal/ConfirmationModal";

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
      setConfirmModalHeader(<Xl8 xid="airpConf001">Restore Carrier Code</Xl8>);
      setConfirmModalMessage(
        <Xl8 xid="airpConf002">Please confirm to restore the carrier code</Xl8>
      );
    } else if (action === ACTION.DELETE) {
      setConfirmModalHeader(<Xl8 xid="airpConf003">Delete Carrier Code</Xl8>);
      setConfirmModalMessage(
        <Xl8 xid="airpConf004">Please confirm to delete the carrier code</Xl8>
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
      action === ACTION.DELETE ? deleteCode() : restoreCode();
    } else setShowModal(true);

    setShowConfirm(false);
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

  return (
    <div>
      <div className="action-button-div">
        <DropdownButton variant="info" title={<Xl8 xid="manu002">Choose Action</Xl8>}>
          <Dropdown.Item
            as="button"
            onClick={() => {
              setShowModal(true);
              setModalTitle(<Xl8 xid="car002">Add Carrier</Xl8>);
              setIsEditModal(false);
              setEditRowDetails({});
            }}
          >
            <Xl8 xid="car002">Add Carrier</Xl8>
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => {
              codeEditor.put.restoreCarriersAll().then(res => {
                refresh();
              });
            }}
          >
            {<Xl8 xid="car003">Restore All Carriers</Xl8>}
          </Dropdown.Item>
        </DropdownButton>
      </div>

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
    </div>
  );
};

export default Carriers;
