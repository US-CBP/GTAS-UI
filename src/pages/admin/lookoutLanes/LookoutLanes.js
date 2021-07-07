// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.
import React, { useState, useContext } from "react";

import Table from "../../../components/table/Table";
import Title from "../../../components/title/Title";
import Xl8 from "../../../components/xl8/Xl8";
import Main from "../../../components/main/Main";
import Confirm from "../../../components/confirmationModal/Confirm";

import { Dropdown, DropdownButton } from "react-bootstrap";
import { Fab } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import { poe } from "../../../services/serviceWrapper";
import LookoutModal from "./LookoutModal";
import { EXPORTFILENAME } from "../../../utils/constants";

const LookoutLanes = ({ name }) => {
  const cb = () => {};
  const addNewLane = <Xl8 xid="lkout001">Add Lane</Xl8>;
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(1);
  const [isEditModal, setIsEditModal] = useState(false);
  const [editRowDetails, setEditRowDetails] = useState();
  const [modalTitle, setModalTitle] = useState(addNewLane);

  const openEditModal = rowDetails => {
    setIsEditModal(true);
    setModalTitle(<Xl8 xid="lkout002">Edit Lane</Xl8>);
    setEditRowDetails(rowDetails);
    setShowModal(true);
  };

  const headers = [
    {
      Accessor: "Edit",
      Xl8: true,
      Header: ["lkoutedit001", "Edit"],
      disableFilters: true,
      disableSortBy: true,
      disableExport: true,
      Cell: ({ row }) => {
        return (
          <div className="text-center edit-user">
            <DropdownButton
              variant="outline-info"
              title={<Xl8 xid="lkout003">Choose Action</Xl8>}
            >
              <Dropdown.Item as="button" onClick={() => openEditModal(row.original)}>
                <Xl8 xid="lkout004">Edit Lane</Xl8>
              </Dropdown.Item>
              <Confirm
                header={<Xl8 xid="manc004">Confirm Lane Deletion</Xl8>}
                message={
                  <span>
                    <Xl8 xid="lkout005">
                      Please click confirm to delete a lane with display name:
                    </Xl8>
                    {row.original.displayName}
                  </span>
                }
              >
                {confirm => (
                  <Dropdown.Item
                    as="button"
                    onClick={confirm(() => {
                      deleteLane(row.original);
                    })}
                  >
                    <Xl8 xid="lkout006">Delete Lookout Lane</Xl8>
                  </Dropdown.Item>
                )}
              </Confirm>
            </DropdownButton>
          </div>
        );
      }
    },
    {
      Accessor: "displayName",
      Xl8: true,
      Header: ["lkout007", "Display Name"]
    },
    {
      Accessor: "status",
      Xl8: true,
      Header: ["lkout008", "Status"]
    },
    {
      Accessor: "ord",
      Xl8: true,
      Header: ["lkout009", "Order"],
      getColumnExportValue: () => "Order"
    }
  ];
  const refresh = () => {
    setRefreshKey(refreshKey + 1);
  };

  const setupEditModal = () => {
    setModalTitle(addNewLane);
    setEditRowDetails({});
    setIsEditModal(false);
    setShowModal(!showModal);
  };

  const deleteLane = rowDetails => {
    poe.del.deleteLane(rowDetails.id).then(res => {
      setRefreshKey(refreshKey + 1);
    });
  };

  return (
    <Main className="full bg-white">
      <Title title={name}></Title>
      <Table
        service={poe.get.getAllLanes}
        key={refreshKey}
        callback={cb}
        header={headers}
        exportFileName={EXPORTFILENAME.LOOKOUTLANES}
      ></Table>
      <Fab
        icon={<i className="fa fa-plus nospin" />}
        variant="info"
        onClick={setupEditModal}
      ></Fab>

      <LookoutModal
        show={showModal}
        onHide={() => setShowModal(false)}
        refresh={refresh}
        callback={cb}
        isEdit={isEditModal}
        title={modalTitle}
        editRowDetails={editRowDetails}
      />
    </Main>
  );
};

export default LookoutLanes;
