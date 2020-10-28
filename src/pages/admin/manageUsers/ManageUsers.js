import React, { useContext, useEffect, useState } from "react";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";
import Table from "../../../components/table/Table";
import Main from "../../../components/main/Main";
import { users } from "../../../services/serviceWrapper";
import Title from "../../../components/title/Title";
import Xl8 from "../../../components/xl8/Xl8";
import { asArray } from "../../../utils/utils";
import { ACTION } from "../../../utils/constants";

import "./ManageUsers.scss";
import UserModal from "./UserModal";
import Confirm from "../../../components/confirmationModal/Confirm";
import ChangePasswordModal from "./changePasswordModal/ChangePasswordModal";
import Toast from "../../../components/toast/Toast";
import { UserContext } from "../../../context/user/UserContext";

const ManageUsers = props => {
  const addNewUser = <Xl8 xid="manu007">Add New User</Xl8>;
  const [data, setData] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(1);
  const [isEditModal, setIsEditModal] = useState(false);
  const [modalTitle, setModalTitle] = useState(addNewUser);
  const [editRowDetails, setEditRowDetails] = useState({});
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState();
  const [showToast, setShowToast] = useState(false);

  const PASSWORD_CHANGE_CONFIRMATION = (
    <>
      <Xl8 xid="manu018"> You have changed a password for: </Xl8>
      <span>{selectedUserId}</span>
    </>
  );
  const PASSWORD_CHANGE_CONFIRMATION_HEADER = <Xl8 xid="manu019">Change Password</Xl8>;

  const { getUserState } = useContext(UserContext);

  const isLoggedinUser = userId => {
    const loggedinUser = getUserState();
    return loggedinUser.userId === userId;
  };
  const cb = function(status = ACTION.CLOSE, result) {
    if (status !== ACTION.CLOSE && status !== ACTION.CANCEL) fetchData();
  };

  const openEditModal = rowDetails => {
    setIsEditModal(true);
    setModalTitle(<Xl8 xid="manu001">Edit User</Xl8>);
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
      Xl8: true,
      Header: ["edit001", "Edit"],
      disableFilters: true,
      disableSortBy: true,
      Cell: ({ row }) => {
        return (
          <div className="text-center edit-user">
            <DropdownButton
              variant="outline-info"
              title={<Xl8 xid="manu002">Choose Action</Xl8>}
            >
              <Dropdown.Item as="button" onClick={() => openEditModal(row.original)}>
                <Xl8 xid="manu001">Edit User</Xl8>
              </Dropdown.Item>
              {!isLoggedinUser(row.original.userId) && (
                <Dropdown.Item
                  as="button"
                  onClick={() => changePassword(row.original.userId)}
                >
                  <Xl8 xid="manu003">Change Password</Xl8>
                </Dropdown.Item>
              )}
              <Confirm
                header={<Xl8 xid="manu004">Confirm User Deletion</Xl8>}
                message={
                  <span>
                    <Xl8 xid="manu005">Please confirm to delete a user with userId: </Xl8>{" "}
                    {row.original.userId}
                  </span>
                }
              >
                {confirm =>
                  !isLoggedinUser(row.original.userId) && (
                    <Dropdown.Item
                      as="button"
                      onClick={confirm(() => {
                        deleteUser(row.original);
                      })}
                    >
                      <Xl8 xid="manu006">Delete User</Xl8>
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
      Accessor: "active",
      Xl8: true,
      Header: ["manu011", "Active"],
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
    { Accessor: "userId", Xl8: true, Header: ["manu012", "User ID"] },
    { Accessor: "firstName", Xl8: true, Header: ["manu013", "First Name"] },
    { Accessor: "lastName", Xl8: true, Header: ["manu014", "Last Name"] },
    { Accessor: "email", Xl8: true, Header: ["manu015", "Email"] },
    { Accessor: "phoneNumber", Xl8: true, Header: ["manu016", "Phone Number"] },
    {
      Accessor: "emailEnabledInt",
      Xl8: true,
      Header: ["manu017", "User Email Notification"],
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
      Xl8: true,
      Header: ["manu017", "Automated Email Notification"],
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
        setModalTitle(addNewUser);
        setIsEditModal(false);
        setEditRowDetails({});
      }}
      required={props.required}
      value={props.inputVal}
      alt={props.alt}
    >
      {addNewUser}
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
        <Title title={<Xl8 xid="manu008">Manage Users</Xl8>} rightChild={button}></Title>
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
          userIds={asArray(data).map(user => user.userId)}
        />
        <ChangePasswordModal
          show={showChangePasswordModal}
          onHide={() => setShowChangePasswordModal(false)}
          userId={selectedUserId}
          callback={changePasswordCallback}
        />
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          header={PASSWORD_CHANGE_CONFIRMATION_HEADER}
          body={PASSWORD_CHANGE_CONFIRMATION}
          variant={"success"}
          containerClass={"toast-container"}
        />
      </Main>
    </>
  );
};

export default ManageUsers;
