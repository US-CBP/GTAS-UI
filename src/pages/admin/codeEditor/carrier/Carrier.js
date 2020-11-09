import React, { useState } from "react";
import Table from "../../../../components/table/Table";
import Xl8 from "../../../../components/xl8/Xl8";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { codeEditor } from "../../../../services/serviceWrapper";
import CarrierModal from "./CarrierModal";

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
