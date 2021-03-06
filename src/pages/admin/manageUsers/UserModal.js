// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useEffect, useState, useContext } from "react";
import { Container } from "react-bootstrap";
import Form from "../../../components/form/Form";
import Xl8 from "../../../components/xl8/Xl8";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import Modal, {
  ModalBody,
  ModalHeader,
  ModalTitle
} from "../../../components/modal/Modal";
import ErrorText from "../../../components/errorText/ErrorText";
import { users } from "../../../services/serviceWrapper";
import { roles } from "../../../services/lookupService";
import { UserContext } from "../../../context/user/UserContext";
import { asArray, isValidPassword } from "../../../utils/utils";
import { ACTION, ROLE, USERID } from "../../../utils/constants";
import "./ManageUsers.scss";
import PasswordConstraints from "../../../components/PasswordConstraints/PasswordConstraints";

const UserModal = props => {
  const [allRoles, setAllRoles] = useState([]);
  const { getUserState } = useContext(UserContext);
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const defaultRole = { label: ROLE.FLIGHTVWR, value: undefined, disabled: true };
  const cb = function(result) {};
  const row = props.editRowDetails || {};
  const loggedinUser = getUserState();
  const existingUserIds = asArray(props.userIds);

  const USER_ID_ALREADY_EXIST = (
    <Xl8 xid="um01">
      The user ID is already in the system. Please choose a different user ID.
    </Xl8>
  );
  const USER_ID_TOO_SHORT = <Xl8 xid="um15">User ID is too short</Xl8>;
  const USER_ID_TOO_LONG = <Xl8 xid="um16">User ID is too long</Xl8>;

  const INVALID_PASSWORD_ERROR = (
    <Xl8 xid="um02">The password you entered does not satisfy the password criteria.</Xl8>
  );

  const launchAlert = msg => {
    setAlertContent(msg);
    setShowAlert(true);
  };

  const isLoggedinUser = userId => {
    return loggedinUser.userId === userId;
  };

  const isRoleDisabled = role => {
    return (
      role.roleDescription === ROLE.FLIGHTVWR ||
      (props.isEdit && isLoggedinUser(row.userId))
    );
  };
  const containsDefaultRole = roles => {
    return asArray(roles).find(
      role => role.label === defaultRole.label || role.label === ROLE.ADMIN
    );
  };
  const compareRoles = (role1, role2) => {
    const roleDescription1 = role1.roleDescription?.toUpperCase();
    const roleDescription2 = role2.roleDescription?.toUpperCase();
    if (roleDescription1 < roleDescription2) return -1;
    if (roleDescription1 > roleDescription2) return 1;

    return 0;
  };

  const roleOptions = asArray(allRoles)
    .sort(compareRoles)
    .map(role => {
      return {
        label: role.roleDescription,
        value: role.roleId,
        disabled: isRoleDisabled(role)
      };
    });

  const existingRoles = asArray(props.editRowDetails.roles).map(role => {
    return {
      label: role.roleDescription,
      value: role.roleId,
      disabled: isRoleDisabled(role)
    };
  });

  const selectedRoles = containsDefaultRole(existingRoles)
    ? existingRoles
    : existingRoles.concat(defaultRole);

  const postSubmit = (status, res) => {
    if (status === ACTION.CANCEL) {
      props.onHide();
      setShowAlert(false);
    } else if (res.status !== "SUCCESS") {
      const message = res.message || (
        <Xl8 xid="um03">There was an issue with the server for that request.</Xl8>
      );
      launchAlert(message);
    } else {
      setShowAlert(false);
      props.onHide();
      props.callback(status);
    }
  };

  const preSubmit = fields => {
    let res = { ...fields[0] };
    res.roles = asArray(res.roles).map(role => {
      return { roleId: role.value, roleDescription: role.label };
    });
    res.password = props.isEdit ? null : res.password;
    res.isCurrentlyLoggedInUser = isLoggedinUser(row.userId);
    res.active = res.active ? 1 : 0;

    return [res];
  };

  const validateInputs = fields => {
    let res = { ...fields[0] };
    const dafaultValidObj = { valid: true };
    const validatedUsername = props.isEdit
      ? dafaultValidObj
      : validateUsernameInput(res.userId);

    const validPassword = props.isEdit ? true : isValidPassword(res.password);

    if (!validatedUsername.valid) {
      launchAlert(validatedUsername.info);
    } else if (!validPassword) {
      launchAlert(INVALID_PASSWORD_ERROR);
    }

    return validPassword && validatedUsername.valid;
  };

  const validatePasswordInput = value => {
    const valid = isValidPassword(value);

    return { valid: valid, info: <PasswordConstraints password={value} /> };
  };

  const validateUsernameInput = (username = "") => {
    const emptyString = "";
    const usernameExists = existingUserIds.includes(username.toUpperCase());

    const msg = usernameExists
      ? USER_ID_ALREADY_EXIST
      : username.length < USERID.MIN_LEN
      ? USER_ID_TOO_SHORT
      : username.length > USERID.MAX_LEN
      ? USER_ID_TOO_LONG
      : emptyString;

    const valid = msg === emptyString;

    return { valid: valid, info: msg };
  };

  const getPasswordInput = () => {
    return props.isEdit ? (
      <></>
    ) : (
      <LabelledInput
        datafield
        labelText={<Xl8 xid="um04">Password</Xl8>}
        inputtype="password"
        name="password"
        required={true}
        alt="nothing"
        callback={cb}
        spacebetween
        validateInput={validatePasswordInput}
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
      className="max-600-width-container"
    >
      <ModalHeader closeButton>
        <ModalTitle>{props.title}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Container fluid>
          {showAlert && <ErrorText message={alertContent} />}
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
                labelText={<Xl8 xid="um005">User ID</Xl8>}
                inputtype="text"
                name="userId"
                required={true}
                inputval={row.userId}
                alt="nothing"
                callback={cb}
                readOnly={true}
                spacebetween
              ></LabelledInput>
            ) : (
              <LabelledInput
                datafield
                labelText={<Xl8 xid="um005">User ID</Xl8>}
                inputtype="text"
                name="userId"
                required={true}
                inputval={row.userId}
                alt="nothing"
                callback={cb}
                spacebetween
                validateInput={validateUsernameInput}
              />
            )}

            {getPasswordInput()}

            <LabelledInput
              datafield
              labelText={<Xl8 xid="um007">First Name</Xl8>}
              inputtype="text"
              name="firstName"
              required={true}
              inputval={row.firstName}
              alt="nothing"
              callback={cb}
              spacebetween
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="um008">Last Name</Xl8>}
              inputtype="text"
              name="lastName"
              required={true}
              inputval={row.lastName}
              alt="nothing"
              callback={cb}
              spacebetween
            />

            <LabelledInput
              datafield
              labelText={<Xl8 xid="um009">Email</Xl8>}
              inputtype="email"
              name="email"
              required={true}
              inputval={row.email}
              alt="nothing"
              callback={cb}
              spacebetween
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="um010">Phone Number</Xl8>}
              inputtype="tel"
              name="phoneNumber"
              inputval={row.phoneNumber}
              alt="nothing"
              placeholder="optional"
              callback={cb}
              spacebetween
            />
            <LabelledInput
              name="roles"
              datafield="roles"
              labelText={<Xl8 xid="um015">Roles</Xl8>}
              inputtype="multiSelect"
              inputval={selectedRoles}
              options={roleOptions}
              callback={cb}
              alt="Roles"
              spacebetween
            />

            <LabelledInput
              datafield="emailEnabled"
              labelText={<Xl8 xid="um011">Enable User Email Notification</Xl8>}
              inputtype="checkbox"
              name="emailEnabled"
              required={true}
              alt="nothing"
              inputval={row.emailEnabled}
              callback={cb}
              selected={row.emailEnabled}
              spacebetween
            />

            <LabelledInput
              datafield
              labelText={<Xl8 xid="um012">Automated Email Notification</Xl8>}
              inputtype="checkbox"
              name="highPriorityEmail"
              required={true}
              alt="nothing"
              inputval={row.highPriorityEmail}
              callback={cb}
              selected={row.highPriorityEmail}
              spacebetween
            />
            {props.isEdit ? (
              <LabelledInput
                datafield
                labelText={<Xl8 xid="um013">User Is Enabled</Xl8>}
                inputtype="checkbox"
                name="active"
                required={true}
                alt="nothing"
                inputval={!!row.active}
                callback={cb}
                selected={!!row.active}
                readOnly={isLoggedinUser(row.userId)}
                spacebetween
              />
            ) : (
              <LabelledInput
                datafield
                labelText={<Xl8 xid="um014">User Is Enabled</Xl8>}
                inputtype="checkbox"
                name="active"
                required={true}
                alt="nothing"
                inputval={true}
                callback={cb}
                selected={true}
                spacebetween
              />
            )}
          </Form>
        </Container>
      </ModalBody>
    </Modal>
  );
};

export default UserModal;
