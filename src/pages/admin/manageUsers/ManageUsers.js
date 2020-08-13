import React, { useEffect, useState } from "react";
import { Button, Container, DropdownButton, Dropdown } from "react-bootstrap";
import Table from "../../../components/table/Table";
import { users } from "../../../services/serviceWrapper";
import Title from "../../../components/title/Title";
import { asArray } from "../../../utils/utils";
import { ACTION } from "../../../utils/constants";

import "./ManageUsers.scss";
import UserModal from "./UserModal";
import { navigate } from "@reach/router";

const ManageUsers = props => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(1);
  const [isEditModal, setIsEditModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add New User");
  const [editRowDetails, setEditRowDetails] = useState({});

  const cb = function(status = ACTION.CLOSE, result) {
    if (status !== ACTION.CLOSE && status !== ACTION.CANCEL) fetchData();
  };

  const openEditModal = rowDetails => {
    setIsEditModal(true);
    setModalTitle("Edit User");
    setEditRowDetails(rowDetails);
    setShowModal(true);
  };

  const changePassword = userId => {
    navigate(`/gtas/user/change-password/${userId}`);
  };

  const headers = [
    {
      Accessor: "Edit",
      Cell: ({ row }) => {
        return (
          <div className="text-center edit-user">
            <DropdownButton variant="outline-info" title="Choose Action">
              <Dropdown.Item as="button" onClick={() => openEditModal(row.original)}>
                Edit User
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                onClick={() => changePassword(row.original.userId)}
              >
                Change Password
              </Dropdown.Item>
            </DropdownButton>
          </div>
        );
      }
    },
    {
      Accessor: "active",
      Cell: ({ row }) => {
        return (
          <div className="text-center">
            <i
              className={`fa fa-lg ${
                !!row.original.active ? "fa-check-square text-success" : ""
              }`}
            ></i>
          </div>
        );
      }
    },
    { Accessor: "userId" },
    { Accessor: "firstName" },
    { Accessor: "lastName" },
    { Accessor: "email" },
    {
      Accessor: "emailEnabledInt",
      Cell: ({ row }) => {
        return (
          <div className="text-center">
            <i
              className={`fa fa-lg ${
                !!row.original.emailEnabled ? "fa-check-square text-success" : ""
              }`}
            ></i>
          </div>
        );
      }
    },
    {
      Accessor: "highPriorityEmailInt",
      Cell: ({ row }) => {
        return (
          <div className="text-center">
            <i
              className={`fa fa-lg ${
                !!row.original.highPriorityEmail ? "fa-check-square text-success" : ""
              }`}
            ></i>
          </div>
        );
      }
    }
  ];

  const button = (
    <Button
      variant="ternary"
      className="btn btn-outline-info"
      name={props.name}
      placeholder={props.placeholder}
      onClick={() => {
        setShowModal(true);
        setModalTitle("Add New User");
        setIsEditModal(false);
        setEditRowDetails({});
      }}
      required={props.required}
      value={props.inputVal}
      alt={props.alt}
    >
      Add New User
    </Button>
  );

  const parseData = raw => {
    return asArray(raw).map(row => {
      // Table component workaround.
      // For boolean fields, set false/null values to 0 and true to 1 so they sort as expected.
      // We pass this to the table and build the headers using the Int fields in place of the original bool fields.
      // Otherwise, weird things happen.
      return {
        emailEnabledInt: row.emailEnabled ? 1 : 0,
        highPriorityEmailInt: row.highPriorityEmail ? 1 : 0,
        activeInt: row.active ? 1 : 0,
        ...row
      };
    });
  };

  const fetchData = () => {
    users.get.getAllNonArchived().then(res => {
      setData(parseData(res));
      setRefreshKey(refreshKey + 1);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Container fluid>
        <Title title="Manage Users" rightChild={button}></Title>
        <Table
          id="users"
          data={data}
          callback={cb}
          key={refreshKey}
          header={headers}
        ></Table>
        <UserModal
          show={showModal}
          callback={cb}
          onHide={() => setShowModal(false)}
          isEdit={isEditModal}
          title={modalTitle}
          editRowDetails={editRowDetails}
        />
      </Container>
    </>
  );
};

export default ManageUsers;
