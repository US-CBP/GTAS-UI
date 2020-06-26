import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Table from "../../../components/table/Table";
import { users } from "../../../services/serviceWrapper";
import Title from "../../../components/title/Title";
// import Xl8 from "../../../components/xl8/Xl8";
// import SideNav from "../../../components/sidenav/SideNav";

import "./ManageUsers.scss";
import CreateUserModal from "./CreateUserModal";
import { asArray } from "../../../utils/utils";

const ManageUsers = props => {
  const cb = function(result) {};
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(1);
  const [isEditModal, setIsEditModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("Create New User");
  const [editRowDetails, setEditRowDetails] = useState({});

  const refresh = () => {
    setRefreshKey(refreshKey + 1);
  };

  const openEditModal = rowDetails => {
    setIsEditModal(true);
    setModalTitle("Edit User");
    setEditRowDetails(rowDetails);
    setShowModal(true);
  };

  const headers = [
    {
      Accessor: "Edit",
      Cell: ({ row }) => {
        return (
          <div className="text-center">
            <i
              className="fa fa-lg fa-pencil-square-o qbrb-icon"
              onClick={() => openEditModal(row.original)}
            ></i>
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
      block
      variant="ternary"
      className="btn btn-outline-info"
      name={props.name}
      placeholder={props.placeholder}
      onClick={() => {
        setShowModal(true);
        setModalTitle("Create New User");
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

  // fetch the data when the page loads so we can massage the bools before passing it into the table
  useEffect(() => {
    users.get().then(res => {
      setData(parseData(res));
      setRefreshKey(refreshKey + 1);
    });
  }, []);

  return (
    <>
      <Container fluid>
        <Title title="Manage Users" leftChild={button}></Title>
        <Table
          id="users"
          data={data}
          callback={cb}
          key={refreshKey}
          header={headers}
        ></Table>
        <CreateUserModal
          show={showModal}
          callback={cb}
          onHide={() => setShowModal(false)}
          isEdit={isEditModal}
          title={modalTitle}
          editRowDetails={editRowDetails}
          refresh={refresh}
        />
      </Container>
    </>
  );
};

export default ManageUsers;
