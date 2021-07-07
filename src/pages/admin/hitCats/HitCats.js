// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.
import React, { useState, useContext } from "react";

import Table from "../../../components/table/Table";
import Title from "../../../components/title/Title";
import Xl8 from "../../../components/xl8/Xl8";
import Main from "../../../components/main/Main";
import HitModal from "./HitModal";
import Confirm from "../../../components/confirmationModal/Confirm";

import { LookupContext } from "../../../context/data/LookupContext";
import { hitcats } from "../../../services/lookupService";
import { EXPORTFILENAME, LK } from "../../../utils/constants";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Fab } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import { getBooleanExportValue } from "../../../utils/utils";

const HitCats = ({ name }) => {
  const cb = () => {};
  const addNewCat = <Xl8 xid="wlm001">Add Category</Xl8>;
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(1);
  const [isEditModal, setIsEditModal] = useState(false);
  const [editRowDetails, setEditRowDetails] = useState();
  const [modalTitle, setModalTitle] = useState(addNewCat);
  const { refreshPartial } = useContext(LookupContext);

  const openEditModal = rowDetails => {
    setIsEditModal(true);
    setModalTitle(<Xl8 xid="wlm002">Edit Category</Xl8>);
    setEditRowDetails(rowDetails);
    setShowModal(true);
  };

  const headers = [
    {
      Accessor: "Edit",
      Xl8: true,
      Header: ["edit001", "Edit"],
      disableFilters: true,
      disableSortBy: true,
      disableExport: true,
      Cell: ({ row }) => {
        return (
          <div className="text-center edit-user">
            <DropdownButton
              variant="outline-info"
              title={<Xl8 xid="manc002">Choose Action</Xl8>}
            >
              <Dropdown.Item as="button" onClick={() => openEditModal(row.original)}>
                <Xl8 xid="wlc006">Edit Category</Xl8>
              </Dropdown.Item>
              <Confirm
                header={<Xl8 xid="manc004">Confirm Category Deletion</Xl8>}
                message={
                  <span>
                    <Xl8 xid="wlc007">
                      Please click confirm to delete a category with label:
                    </Xl8>
                    {row.original.label}
                  </span>
                }
              >
                {confirm => (
                  <Dropdown.Item
                    as="button"
                    onClick={confirm(() => {
                      deleteCat(row.original);
                    })}
                  >
                    <Xl8 xid="wlc008">Delete Hit Category</Xl8>
                  </Dropdown.Item>
                )}
              </Confirm>
            </DropdownButton>
          </div>
        );
      }
    },
    {
      Accessor: "label",
      Xl8: true,
      Header: ["wlc003", "Label"]
    },
    {
      Accessor: "description",
      Xl8: true,
      Header: ["wlc004", "Description"]
    },
    {
      Accessor: "severity",
      Xl8: true,
      Header: ["wlc005", "Severity"]
    },
    {
      Accessor: "promoteToLookout",
      Xl8: true,
      Header: ["wlc006", "Auto-Promote"],
      isBoolean: true,
      getColumnExportValue: () => "Auto-Promote",
      getCellExportValue: row => getBooleanExportValue(row.original.promoteToLookout),
      Cell: ({ row }) => {
        return (
          <div className="text-center">
            <i
              className={`fa fa-lg ${
                !!row.original.promoteToLookout ? "fa-check-square text-success" : ""
              }`}
            ></i>
          </div>
        );
      }
    }
  ];
  const refresh = () => {
    setRefreshKey(refreshKey + 1);
  };

  const setupEditModal = () => {
    setModalTitle(addNewCat);
    setEditRowDetails({});
    setIsEditModal(false);
    setShowModal(!showModal);
  };

  const deleteCat = rowDetails => {
    hitcats.del(rowDetails.id).then(res => {
      setRefreshKey(refreshKey + 1);
    });
  };

  return (
    <Main className="full bg-white">
      <Title title={name}></Title>
      <Table
        service={() => refreshPartial(LK.HITCAT)}
        key={refreshKey}
        callback={cb}
        header={headers}
        exportFileName={EXPORTFILENAME.HITCAT}
      ></Table>
      <Fab
        icon={<i className="fa fa-plus nospin" />}
        variant="info"
        onClick={setupEditModal}
      ></Fab>

      <HitModal
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

export default HitCats;
