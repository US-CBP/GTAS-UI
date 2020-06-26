import React, {useEffect, useState} from "react";
import { Col, Button, Container } from "react-bootstrap";
import Table from "../../../components/table/Table";
import { userService, users } from "../../../services/serviceWrapper";
import Title from "../../../components/title/Title";
// import Xl8 from "../../../components/xl8/Xl8";
// import SideNav from "../../../components/sidenav/SideNav";

import "./ManageUsers.scss";
import CreateUserModal from "./CreateUserModal";

const ManageUsers = props => {
  const cb = function(result) {};
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(1);
  const [isEditModal, setIsEditModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("Create New User");
  const [editRowDetails, setEditRowDetails] = useState({});

  const refresh = () => {
    setRefreshKey(refreshKey + 1);
  };

  const openEditModal = (rowDetails) => {
    setIsEditModal(true);
    setModalTitle("Edit User");
    setEditRowDetails(rowDetails);
    setShowModal(true);
  };

  const headers =  [
    {
      Accessor: "Edit",
      Cell: ({row}) => {
        return (
            <div className="icon-col">
              <i
                  className="fa fa-pencil-square-o qbrb-icon"
                  onClick={() => openEditModal(row.original)}
              ></i>
            </div>
        );
      }
    },
    { Accessor: "active",
      Cell: ({row}) => {
        if(row.original.active === 1) {return <div> Yes </div>}
        else return <div> No </div>
    }
    },
    { Accessor: "userId" },
    { Accessor: "firstName" },
    { Accessor: "lastName" },
    { Accessor: "emailEnabled" },
    { Accessor: "highPriorityEmail" },
  ];

  const button = (
    <Button
      block
      variant="ternary"
      className="btn btn-outline-info"
      name={props.name}
      placeholder={props.placeholder}
      onClick={() => {
        setShowModal(true)
        setModalTitle("Create New User")
        setIsEditModal(false)
        setEditRowDetails({});
      }}
      required={props.required}
      value={props.inputVal}
      alt={props.alt}
    >
      Add New User
    </Button>
  );

  return (
    <>
      <Container fluid>
        <Title title="Manage Users" leftChild={button}></Title>
        <Table
          id="users"
          service={users.get}
          callback={cb}
          ignoredFields={["roles", "password"]}
          key={refreshKey}
          header={headers}
        ></Table>
        <CreateUserModal
          show={showModal}
          callback={cb}
          onHide = { () => setShowModal(false)}
          isEdit = {isEditModal}
          title = {modalTitle}
          editRowDetails = {editRowDetails}
          refresh = {refresh}
        />
      </Container>
    </>
  );
};

export default ManageUsers;
