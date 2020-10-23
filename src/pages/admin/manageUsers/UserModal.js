import React, { useEffect, useState, useContext, useRef } from "react";
import { Modal, Container } from "react-bootstrap";
import Form from "../../../components/form/Form";
import Xl8 from "../../../components/xl8/Xl8";
import { users, roles } from "../../../services/serviceWrapper";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import CheckboxGroup from "../../../components/inputs/checkboxGroup/CheckboxGroup";
import { UserContext } from "../../../context/user/UserContext";
import { asArray, isValidPassword } from "../../../utils/utils";
import { ACTION, ROLE } from "../../../utils/constants";
import "./ManageUsers.scss";
import Toast from "../../../components/toast/Toast";

const UserModal = props => {
  const [selectedRoles, setSelectedRoles] = useState();
  const [allRoles, setAllRoles] = useState([]);
  const { getUserState } = useContext(UserContext);
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");

  const cb = function(result) {};
  const row = props.editRowDetails || {};
  const loggedinUser = getUserState();

  const isLoggedinUser = userId => {
    return loggedinUser.userId === userId;
  };
  const loggedinUserHasAdminRole = () => {
    const roles = loggedinUser.userRoles;
    return roles.includes(ROLE.ADMIN);
  };

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
    if (props.isEdit && isLoggedinUser(row.userId) && loggedinUserHasAdminRole()) {
      isDisabled = true;
    }
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
      setShowAlert(false);
    } else if (res.status !== "SUCCESS") {
      const message = res.message || (
        <Xl8 xid="um03">There was an issue with the server for that request.</Xl8>
      );
      setAlertContent(message);
      setShowAlert(true);
    } else {
      setShowAlert(false);
      props.onHide();
      props.callback(status);
    }
  };

  const preSubmit = fields => {
    let res = { ...fields[0] };
    //TODO selectedRoles is empty if no change occurs, which makes hard to apply default values
    res.roles = selectedRoles;
    res.password = props.isEdit ? null : res.password;
    res.isCurrentlyLoggedInUser = isLoggedinUser(row.userId);
    res.active = res.active ? 1 : 0;

    return [res];
  };

  const validateInputs = fields => {
    const existingUserIds = asArray(props.userIds);
    let res = { ...fields[0] };
    const INVALID_USER_ERROR = (
      <Xl8 xid="um01">
        The user ID is already in the system. Please choose a different user ID.
      </Xl8>
    );
    const INVALID_PASSWORD_ERROR = (
      <Xl8 xid="um02">
        The password you entered does not satisfy the password criteria.
      </Xl8>
    );
    let validPassword = true;
    let validUserId = true;

    if (!props.isEdit) {
      validPassword = isValidPassword(res.password);
      validUserId = !existingUserIds.includes(res.userId?.toUpperCase());
    }
    if (!validUserId) {
      setAlertContent(INVALID_USER_ERROR);
      setShowAlert(true);
    } else if (!validPassword) {
      setAlertContent(INVALID_PASSWORD_ERROR);
      setShowAlert(true);
    }

    return validPassword && validUserId;
  };

  const getPasswordInput = () => {
    return props.isEdit ? (
      <></>
    ) : (
      <LabelledInput
        datafield
        labelText={<Xl8 xid="um04">Password</Xl8>}
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

  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.onHide();
        setShowAlert(false);
      }}
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
            paramCallback={preSubmit}
            cancellable
            validateInputs={validateInputs}
          >
            {props.isEdit ? (
              <LabelledInput
                datafield
                labelText={<Xl8 xid="um005">User ID:</Xl8>}
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
                labelText={<Xl8 xid="um005">User ID:</Xl8>}
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
              labelText={<Xl8 xid="um007">First Name:</Xl8>}
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
              labelText={<Xl8 xid="um008">Last Name:</Xl8>}
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
              labelText={<Xl8 xid="um009">Email:</Xl8>}
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
              labelText={<Xl8 xid="um010">Phone Number:</Xl8>}
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
              labelText={<Xl8 xid="um011">Enable User Email Notification:</Xl8>}
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
              labelText={<Xl8 xid="um012">Automated Email Notification:</Xl8>}
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
                labelText={<Xl8 xid="um013">User Is Enabled:</Xl8>}
                inputType="checkbox"
                name="active"
                required={true}
                alt="nothing"
                inputVal={!!row.active}
                callback={cb}
                selected={!!row.active}
                readOnly={isLoggedinUser(row.userId)}
                spacebetween
              />
            ) : (
              <LabelledInput
                datafield
                labelText={<Xl8 xid="um014">User Is Enabled:</Xl8>}
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
                labelText={<Xl8 xid="um015">Roles:</Xl8>}
                name="roles"
              />
            </div>
          </Form>

          <Toast
            onClose={() => setShowAlert(false)}
            show={showAlert}
            header={<Xl8 xid="um016">Add / Edit User</Xl8>}
            body={alertContent}
            variant={"danger"}
          />
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default UserModal;
