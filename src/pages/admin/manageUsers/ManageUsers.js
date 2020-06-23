import React, { useState } from "react";
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

  const button = (
    <Button
      block
      variant="ternary"
      className="btn btn-outline-info"
      name={props.name}
      placeholder={props.placeholder}
      onClick={() => setShowModal(true)}
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
          service={users.get}
          id="users"
          callback={cb}
          ignoredFields={["roles", "password"]}
        ></Table>
        <CreateUserModal
          show={showModal}
          onHide={() => setShowModal(false)}
          callback={cb}
        />
      </Container>
    </>
  );
};

export default ManageUsers;
