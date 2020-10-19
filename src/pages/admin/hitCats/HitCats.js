import React, { useState, useEffect } from "react";
import Table from "../../../components/table/Table";
import {hitcats, users} from "../../../services/serviceWrapper";
import Title from "../../../components/title/Title";
import Xl8 from "../../../components/xl8/Xl8";
import Main from "../../../components/main/Main";
import {Button, Dropdown, DropdownButton} from "react-bootstrap";
import HitModal from "./HitModal";
import Confirm from "../../../components/confirmationModal/Confirm";

const HitCats = ({ name }) => {
  const cb = function() {};
  const addNewCat = <Xl8 xid="wlc001">Add Category</Xl8>;
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(1);
  const [isEditModal, setIsEditModal] = useState(false);
  const [editRowDetails,setEditRowDetails] = useState();
  const [modalTitle, setModalTitle] = useState(addNewCat);

  const openEditModal = rowDetails => {
    setIsEditModal(true);
    setModalTitle(<Xl8 xid="manc001">Edit Category</Xl8>);
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
                    <Xl8 xid="wlc007">Please confirm to delete a category with categoryId: </Xl8>{" "}
                        {row.original.id}
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
                            <Xl8 xid="wlc008">Delete Hit Category</Xl8>
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
      Accessor: "id",
      Xl8: true,
      Header: ["wlc002", "Id"]
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
    }
  ];
  const refresh = () => {
    setRefreshKey(refreshKey + 1);
  };

  const cats = (
    <Button variant="outline-dark" onClick={() =>{
        setModalTitle(addNewCat);
        setEditRowDetails({});
        setIsEditModal(false);
        setShowModal(true);
    }}>
      {addNewCat}
    </Button>
  );

  const deleteCat = rowDetails => {
    hitcats.del(rowDetails.id).then(res => {
      setRefreshKey(refreshKey+1);
    });
  };

  return (
    <Main className="full">
      <Title title={name} rightChild={cats}></Title>
      <Table
        service={hitcats.get}
        key={refreshKey}
        callback={cb}
        header={headers}
      ></Table>
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
