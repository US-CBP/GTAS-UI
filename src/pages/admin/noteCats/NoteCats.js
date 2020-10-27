import React, { useState } from "react";
import Table from "../../../components/table/Table";
import {notetypes} from "../../../services/serviceWrapper";
import Title from "../../../components/title/Title";
import Xl8 from "../../../components/xl8/Xl8";
import Main from "../../../components/main/Main";
import {Button, Dropdown, DropdownButton, Row} from "react-bootstrap";
import NoteTypeModal from "./NoteModal.js";
import Confirm from "../../../components/confirmationModal/Confirm";

const NoteCats = ({ name }) => {
  const cb = function(result) {};
  const addNewCat = <Xl8 xid="ntm001">Add Note Category</Xl8>;
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(1);
  const [isEditModal, setIsEditModal] = useState(false);
  const [editRowDetails,setEditRowDetails] = useState();
  const [modalTitle, setModalTitle] = useState(addNewCat);

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
                          title={<Xl8 xid="ntc004">Choose Action</Xl8>}
                      >
                          <Dropdown.Item as="button" onClick={() => openEditModal(row.original)}>
                              <Xl8 xid="ntc005">Edit Note Category</Xl8>
                          </Dropdown.Item>
                          <Confirm
                              header={<Xl8 xid="ntc006">Confirm Note Category Deletion</Xl8>}
                              message={
                                  <span>
                    <Xl8 xid="ntc007">Please confirm to delete a note category with label: </Xl8>{" "}
                                      {row.original.noteType}
                  </span>
                              }
                          >
                              {confirm =>
                                  (
                                      <Dropdown.Item
                                          as="button"
                                          onClick={confirm(() => {
                                              deleteCat(row.original);
                                          })}
                                      >
                                          <Xl8 xid="ntc008">Delete Category</Xl8>
                                      </Dropdown.Item>
                                  )
                              }
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

  const addCat = (
    <Button variant="outline-dark" onClick={() => {
        setModalTitle(addNewCat);
        setEditRowDetails({});
        setIsEditModal(false);
        setShowModal(true);
    }}>
      <Xl8 xid="ntc001">Add Category</Xl8>
    </Button>
  );

  const deleteCat = rowDetails => {
      notetypes.del(rowDetails.id).then(res => {
          setRefreshKey(refreshKey+1);
      });
  };

  return (
    <Main className="full">
      <Title title={name} rightChild={addCat}></Title>
      <Row></Row>
      <Table
        service={notetypes.get}
        key={refreshKey}
        callback={cb}
        header={headers}
      ></Table>
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
