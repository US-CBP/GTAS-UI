import React, { useEffect, useState, useContext, useRef } from "react";
import { Modal, Button, Container, Alert } from "react-bootstrap";
import Form from "../../../components/form/Form";
import Xl8 from "../../../components/xl8/Xl8";
import { users, roles } from "../../../services/serviceWrapper";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import CheckboxGroup from "../../../components/inputs/checkboxGroup/CheckboxGroup";
import { UserContext } from "../../../context/user/UserContext";
import { asArray } from "../../../utils/utils";
import { ACTION, ROLE } from "../../../utils/constants";
import "./ManageUsers.scss";

const UserModal = props => {
  const [selectedRoles, setSelectedRoles] = useState();
  const [allRoles, setAllRoles] = useState([]);
  const { getUserState, userAction } = useContext(UserContext);
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [variant, setVariant] = useState("");

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
    let isDisabled = false;
    if (props.isEdit && role.roleDescription !== ROLE.FLIGHTVWR) {
      isChecked = isCheckedRole(role, props.editRowDetails.roles);
    } else if (role.roleDescription === ROLE.FLIGHTVWR) {
      isChecked = true;
      isDisabled = true;
    }
    return {
      ...role,
      label: role.roleDescription,
      key: role.roleId,
      type: "checkbox",
      checked: isChecked,
      disabled: isDisabled
    };
  });

  const rcb = {
    name: "rolesCheckboxes",
    value: transformRoles
  };

  const postSubmit = (status, res) => {
    if (status === ACTION.CANCEL) {
      props.onHide();
    } else {
      res.status === "SUCCESS" ? setVariant("success") : setVariant("danger");
      let message;
      if (res.message === undefined || res.message === "") {
        message = "There was an issue with the server for that request.";
      } else {
        message = res.message;
      }
      /* setAlertContent(message);
      setShowAlert(true);*/
      props.onHide();
      props.callback(status);
    }
  };

  const preSubmit = fields => {
    let res = { ...fields[0] };
    //TODO selectedRoles is empty if no change occurs, which makes hard to apply default values
    res.roles = selectedRoles;
    res.password = props.isEdit ? null : res.password;
    res.isCurrentlyLoggedInUser = row.userId === user.userId;
    res.active = res.active ? 1 : 0;

    return [res];
  };

  const getPasswordInput = () => {
    return props.isEdit ? (
      <></>
    ) : (
      <LabelledInput
        datafield
        labelText={<Xl8 xid="um01">Password</Xl8>}
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
          {<Xl8 xid="um02">Delete</Xl8>}
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
      <Alert show={showAlert} variant={variant}>
        {alertContent}
        <hr />
        <Button onClick={() => setShowAlert(false)} variant="outline-success">
          {<Xl8 xid="form003">Confirm</Xl8>}
        </Button>
      </Alert>
      <Modal.Body>
        <Container fluid>
          <Form
            submitService={props.isEdit ? users.put : users.post}
            title=""
            callback={postSubmit}
            action="add"
            paramCallback={preSubmit}
            cancellable
            customButtons={buttons}
          >
            {props.isEdit ? (
              <LabelledInput
                datafield
                labelText={<Xl8 xid="um003">User ID:</Xl8>}
                inputType="text"
                name="userId"
                required={true}
                inputVal={row.userId}
                alt="nothing"
                callback={cb}
                readOnly={true}
                spacebetween
              ></LabelledInput>
            ) : (
              <LabelledInput
                datafield
                labelText={<Xl8 xid="um003">User ID:</Xl8>}
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
              labelText={<Xl8 xid="um004">First Name:</Xl8>}
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
              labelText={<Xl8 xid="um005">Last Name:</Xl8>}
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
              labelText={<Xl8 xid="um006">Email:</Xl8>}
              inputType="email"
              name="email"
              required={true}
              inputVal={row.email}
              alt="nothing"
              callback={cb}
              spacebetween
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="um007">Phone Number:</Xl8>}
              inputType="tel"
              name="phoneNumber"
              inputVal={row.phoneNumber}
              alt="nothing"
              placeholder="optional"
              callback={cb}
              spacebetween
            />

            <LabelledInput
              datafield="emailEnabled"
              labelText={<Xl8 xid="um007">Enable User Email Notification:</Xl8>}
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
              labelText={<Xl8 xid="um007">Automated Email Notification:</Xl8>}
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
                labelText={<Xl8 xid="um007">User Is Enabled:</Xl8>}
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
                labelText={<Xl8 xid="um007">User Is Enabled:</Xl8>}
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
                labelText={<Xl8 xid="um007">Roles:</Xl8>}
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
