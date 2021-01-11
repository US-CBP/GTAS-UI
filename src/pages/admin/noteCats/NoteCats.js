import React, { useState, useContext } from "react";
import Table from "../../../components/table/Table";
import Title from "../../../components/title/Title";
import Xl8 from "../../../components/xl8/Xl8";
import Main from "../../../components/main/Main";
import { Dropdown, DropdownButton, Row } from "react-bootstrap";
import NoteTypeModal from "./NoteModal.js";
import Confirm from "../../../components/confirmationModal/Confirm";
import { notetypes } from "../../../services/serviceWrapper";
import { LookupContext } from "../../../context/data/LookupContext";
import { LK } from "../../../utils/constants";

import { Fab } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";

const NoteCats = ({ name }) => {
  const cb = () => {};
  const addNewCat = <Xl8 xid="ntm001">Add Note Category</Xl8>;
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(1);
  const [isEditModal, setIsEditModal] = useState(false);
  const [editRowDetails, setEditRowDetails] = useState();
  const [modalTitle, setModalTitle] = useState(addNewCat);
  const { refreshAndReturn } = useContext(LookupContext);

  const openEditModal = rowDetails => {
    setIsEditModal(true);
    setModalTitle(<Xl8 xid="ntm002">Edit Category</Xl8>);
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
      Cell: ({ row }) => {
        return (
          <div className="text-center">
            <DropdownButton
              variant="outline-info"
              title={<Xl8 xid="manu002">Choose Action</Xl8>}
            >
              <Dropdown.Item as="button" onClick={() => openEditModal(row.original)}>
                <Xl8 xid="ntc005">Edit Note Category</Xl8>
              </Dropdown.Item>
              <Confirm
                header={<Xl8 xid="ntc006">Confirm Note Category Deletion</Xl8>}
                message={
                  <span>
                    <Xl8 xid="ntc007">
                      Please click confirm to delete this note category:
                    </Xl8>
                    <br />
                    <br />
                    {row.original.noteType}
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
                    <Xl8 xid="ntc008">Delete Category</Xl8>
                  </Dropdown.Item>
                )}
              </Confirm>
            </DropdownButton>
          </div>
        );
      }
    },
    {
      Accessor: "noteType",
      Xl8: true,
      Header: ["ntc003", "Note Type"]
    }
  ];

  const refresh = () => {
    setRefreshKey(refreshKey + 1);
  };

  const setupModal = () => {
    if (showModal) return setShowModal(false);

    setModalTitle(addNewCat);
    setEditRowDetails({});
    setIsEditModal(false);
    setShowModal(true);
  };

  const deleteCat = rowDetails => {
    notetypes.del(rowDetails.id).then(res => {
      refresh();
    });
  };

  return (
    <Main className="full bg-white">
      <Title title={name}></Title>
      <Row></Row>
      <Table
        service={() => refreshAndReturn(LK.NOTETYPE)}
        key={refreshKey}
        callback={cb}
        header={headers}
      ></Table>
      <Fab
        icon={<i className="fa fa-plus nospin" />}
        variant="info"
        onClick={() => setupModal()}
      ></Fab>

      <NoteTypeModal
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

export default NoteCats;
