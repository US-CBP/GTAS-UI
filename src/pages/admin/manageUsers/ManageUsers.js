import React, { useEffect, useState } from "react";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";
import Table from "../../../components/table/Table";
import Main from "../../../components/main/Main";
import { users } from "../../../services/serviceWrapper";
import Title from "../../../components/title/Title";
import { asArray } from "../../../utils/utils";
import { ACTION } from "../../../utils/constants";

import "./ManageUsers.scss";
import UserModal from "./UserModal";
import Confirm from "../../../components/confirmationModal/Confirm";
import ChangePasswordModal from "./changePasswordModal/ChangePasswordModal";
import Toast from "../../../components/toast/Toast";

const ManageUsers = props => {
  const [data, setData] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(1);
  const [isEditModal, setIsEditModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add New User");
  const [editRowDetails, setEditRowDetails] = useState({});
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState();
  const [showTost, setShowToast] = useState(false);
  const [toastHeader, setToastHeader] = useState("");
  const [toastBodyText, setToastBodyText] = useState("");
  const [toastVariant, setToastVariant] = useState("");

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
    setSelectedUserId(userId);
    setShowChangePasswordModal(true);
  };

  const changePasswordCallback = (status, res) => {
    setShowChangePasswordModal(false);

    if (status !== ACTION.CANCEL) {
      setToastHeader("Change Password: " + res.status);
      setToastBodyText(res.message);
      setToastVariant(res.status === "FAILURE" ? "danger" : "success");
      setShowToast(true);
    }
  };

  const deleteUser = rowDetails => {
    users.del(rowDetails.userId).then(res => {
      cb(ACTION.DELETE, res);
    });
  };

  const headers = [
    {
      Accessor: "Edit",
      disableFilters: true,
      disableSortBy: true,
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
              <Confirm
                header="Confirm User Deletion"
                message={`Please confirm to delete a user with userId: ${row.original.userId}`}
              >
                {confirm => (
                  <Dropdown.Item
                    as="button"
                    onClick={confirm(() => {
                      deleteUser(row.original);
                    })}
                  >
                    Delete User
                  </Dropdown.Item>
                )}
              </Confirm>
            </DropdownButton>
          </div>
        );
      }
    },
    {
      Accessor: "active",
      isBoolean: true,
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
    { Accessor: "phoneNumber" },
    {
      Accessor: "emailEnabledInt",
      Header: "User Email Notification",
      isBoolean: true,
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
      Header: "Automated Email Notification",
      isBoolean: true,
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
      <Main className="full">
        <Title title="Manage Users" rightChild={button}></Title>
        <Table
          id="users"
          data={data}
          callback={cb}
          key={refreshKey}
          header={headers}
          enableColumnFilter={true}
        ></Table>
        <UserModal
          show={showModal}
          callback={cb}
          onHide={() => setShowModal(false)}
          isEdit={isEditModal}
          title={modalTitle}
          editRowDetails={editRowDetails}
        />
        <ChangePasswordModal
          show={showChangePasswordModal}
          onHide={() => setShowChangePasswordModal(false)}
          userId={selectedUserId}
          callback={changePasswordCallback}
        />
        <Toast
          onClose={() => setShowToast(false)}
          show={showTost}
          header={toastHeader}
          body={toastBodyText}
          variant={toastVariant}
        />
      </Main>
    </>
  );
};

export default ManageUsers;
