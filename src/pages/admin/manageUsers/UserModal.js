import React, { useEffect, useState, useContext, useRef } from "react";
import { Modal, Button, Container } from "react-bootstrap";
import Form from "../../../components/form/Form";
import { users, roles } from "../../../services/serviceWrapper";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import CheckboxGroup from "../../../components/inputs/checkboxGroup/CheckboxGroup";
import { UserContext } from "../../../context/user/UserContext";
import { asArray } from "../../../utils/utils";
import { ACTION } from "../../../utils/constants";
import "./ManageUsers.scss";

const UserModal = props => {
  const [selectedRoles, setSelectedRoles] = useState();
  const [allRoles, setAllRoles] = useState([]);
  const [refreshKey, setRefreshKey] = useState();
  const [updatePassword, setUpdatePassword] = useState(false);
  const { getUserState, userAction } = useContext(UserContext);

  const cb = function(result) {};
  const row = props.editRowDetails || {};
  const user = getUserState();

  const cbRoles = function(result) {
    const coll = result.value
      .map(item => {
        if (item.checked) {
          return { roleId: item.roleId, roleDescription: item.roleDescription };
        }
      })
      .filter(Boolean);

    setSelectedRoles(coll);
  };

  const isCheckedRole = (roleToBeChecked, activeRoles) => {
    let boolVal = false;
    activeRoles.map(activeRole => {
      if (activeRole.roleId === roleToBeChecked.roleId) {
        boolVal = true;
      }
    });
    return boolVal;
  };

  const transformRoles = asArray(allRoles).map(role => {
    let isChecked = false;
    if (props.isEdit) {
      isChecked = isCheckedRole(role, props.editRowDetails.roles);
    }

    return {
      ...role,
      label: role.roleDescription,
      key: role.roleId,
      type: "checkbox",
      checked: isChecked
    };
  });

  const rcb = {
    name: "rolesCheckboxes",
    value: transformRoles
  };

  const postSubmit = (status = ACTION.CLOSE, res) => {
    props.onHide();
    props.callback(status);
  };

  const preSubmit = fields => {
    let res = { ...fields[0] };
    //TODO selectedRoles is empty if no change occurs, which makes hard to apply default values
    res.roles = selectedRoles;
    res.password = props.isEdit && !updatePassword ? null : res.password;
    res.isCurrentlyLoggedInUser = row.userId === user.userId;
    res.active = res.active ? 1 : 0;
    delete res["updatePassword"];

    return [res];
  };

  const toggleUpdatePassword = ev => {
    setUpdatePassword(!updatePassword);
    setRefreshKey(ev.value);
  };

  const getPasswordInput = () => {
    const label = updatePassword ? "Enter New Password" : "Password";
    return props.isEdit && !updatePassword ? (
      <></>
    ) : (
      <LabelledInput
        datafield
        labelText={label}
        inputType="password"
        name="password"
        required={true}
        alt="nothing"
        callback={cb}
        spacebetween
      />
    );
  };

  useEffect(() => {
    roles.get().then(res => {
      setAllRoles(res);
    });
  }, []);

  const buttons = props.isEdit
    ? [
        <Button
          type="button"
          className="m-2 outline-dark-outline"
          variant="outline-dark"
          key="delete"
          onClick={() => {
            users.del(props.editRowDetails.userId).then(res => {
              postSubmit(ACTION.DELETE, res);
            });
          }}
        >
          Delete
        </Button>
      ]
    : [];

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Form
            submitService={props.isEdit ? users.put : users.post}
            title=""
            callback={postSubmit}
            action="add"
            submitText="Submit"
            paramCallback={preSubmit}
            cancellable
            key={refreshKey}
            customButtons={buttons}
          >
            {props.isEdit ? (
              <>
                <LabelledInput
                  datafield
                  labelText="Update User's Password"
                  inputType="checkbox"
                  name="updatePassword"
                  required={true}
                  alt="nothing"
                  inputVal={updatePassword}
                  callback={cb}
                  selected={updatePassword}
                  onChange={toggleUpdatePassword}
                  spacebetween
                />
                <LabelledInput
                  datafield
                  labelText="User ID"
                  inputType="text"
                  name="userId"
                  required={true}
                  inputVal={row.userId}
                  alt="nothing"
                  callback={cb}
                  readOnly={true}
                  spacebetween
                ></LabelledInput>
              </>
            ) : (
              <LabelledInput
                datafield
                labelText="User ID"
                inputType="text"
                name="userId"
                required={true}
                inputVal={row.userId}
                alt="nothing"
                callback={cb}
                spacebetween
              />
            )}

            {getPasswordInput()}

            <LabelledInput
              datafield
              labelText="First Name"
              inputType="text"
              name="firstName"
              required={true}
              inputVal={row.firstName}
              alt="nothing"
              callback={cb}
              spacebetween
            />

            <LabelledInput
              datafield
              labelText="Last Name"
              inputType="text"
              name="lastName"
              required={true}
              inputVal={row.lastName}
              alt="nothing"
              callback={cb}
              spacebetween
            />

            <LabelledInput
              datafield
              labelText="Email"
              inputType="email"
              name="email"
              required={true}
              inputVal={row.email}
              alt="nothing"
              callback={cb}
              spacebetween
            />

            <LabelledInput
              datafield="emailEnabled"
              labelText="Enable User Email Notification"
              inputType="checkbox"
              name="emailEnabled"
              required={true}
              alt="nothing"
              inputVal={row.emailEnabled}
              callback={cb}
              selected={row.emailEnabled}
              spacebetween
            />

            <LabelledInput
              datafield
              labelText="Automated Email Notification"
              inputType="checkbox"
              name="highPriorityEmail"
              required={true}
              alt="nothing"
              inputVal={row.highPriorityEmail}
              callback={cb}
              selected={row.highPriorityEmail}
              spacebetween
            />
            {props.isEdit ? (
              <LabelledInput
                datafield
                labelText="User Is Enabled"
                inputType="checkbox"
                name="active"
                required={true}
                alt="nothing"
                inputVal={!!row.active}
                callback={cb}
                selected={!!row.active}
                spacebetween
              />
            ) : (
              <LabelledInput
                datafield
                labelText="User Is Enabled"
                inputType="checkbox"
                name="active"
                required={true}
                alt="nothing"
                inputVal={true}
                callback={cb}
                selected={true}
                spacebetween
              />
            )}

            <div className="um-checkbox">
              <CheckboxGroup
                datafield
                callback={cbRoles}
                inputVal={rcb.value}
                labelText="Roles"
                name="roles"
              />
            </div>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default UserModal;
