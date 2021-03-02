import React, { useState } from "react";

// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.
import Form from "../../../../components/form/Form";
import { changePassword } from "../../../../services/serviceWrapper";
import LabelledInput from "../../../../components/labelledInput/LabelledInput";
import { Container } from "react-bootstrap";

import Xl8 from "../../../../components/xl8/Xl8";
import "./ChangePassword.scss";
import {
  clearInvalidFieldHighlight,
  hasData,
  highlightInvalidField,
  isValidPassword
} from "../../../../utils/utils";
import PasswordConstraints from "../../../../components/PasswordConstraints/PasswordConstraints";

const ChangePassword = props => {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmedPassword, setConfirmedPassword] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [formKey, setFormKey] = useState(0);
  const chagneByAdmin = hasData(props.userId);

  const service = chagneByAdmin ? changePassword.byAdmin : changePassword.byloggedInUser;

  const recordId = props.userId || "";

  const passwordsDoNotMatchError = (
    <Xl8 xid="pass012">The passwords you entered do not match</Xl8>
  );
  const invalidPasswordError = (
    <Xl8 xid="pass013">
      The password you entered does not satisfy the password criteria.
    </Xl8>
  );

  const showAlert = message => {
    setErrorMessage(message);
  };

  const changeInput = input => {
    if (input.name === "oldPassword") {
      clearInvalidFieldHighlight("oldPassword");
      setOldPassword(input.value);
    }
    if (input.name === "newPassword") {
      clearInvalidFieldHighlight("newPassword");
      setNewPassword(input.value);
    }
    if (input.name === "confirmPassword") {
      clearInvalidFieldHighlight("confirmPassword");
      setConfirmedPassword(input.value);
    }
  };

  const validateInputs = fields => {
    const passwordsMatch = confirmedPassword === newPassword;
    const validPassword = isValidPassword(newPassword);

    if (!validPassword) {
      showAlert(invalidPasswordError);
      highlightInvalidField("newPassword");
    } else if (!passwordsMatch) {
      showAlert(passwordsDoNotMatchError);
      highlightInvalidField("confirmPassword");
    }

    return passwordsMatch && validPassword;
  };

  const cb = () => {};
  const passwordChangeCallback = (status, res) => {
    const callback = props.callback || cb;

    if (status === "Cancel") callback(status);
    else {
      const responseStatus = hasData(res) ? res.status : "";
      const message = hasData(res) ? res.message : "";

      if (responseStatus === "SUCCESS") {
        callback(status);
      } else {
        //Incase the user provided wrong password for the old password field
        //Or other System errors
        setErrorMessage(message);
        setFormKey(formKey + 1);
        highlightInvalidField("oldPassword");
      }
    }
  };

  return (
    <Container>
      <div className="cp-modal-header dismissible">
        <div className="modal-title h4">
          <Xl8 xid="pass001">Change Password</Xl8>
        </div>
      </div>

      <PasswordConstraints password={newPassword} errorText={errorMessage} />
      <br />
      <Form
        submitService={service}
        title=""
        callback={passwordChangeCallback}
        validateInputs={validateInputs}
        action="add"
        cancellable
        recordId={recordId}
        key={formKey}
      >
        {chagneByAdmin ? (
          <></>
        ) : (
          <LabelledInput
            datafield
            labelText={<Xl8 xid="pass003">Old password</Xl8>}
            inputtype="password"
            name="oldPassword"
            required={true}
            inputval={oldPassword}
            alt={<Xl8 xid="7">Old password</Xl8>}
            callback={cb}
            onChange={changeInput}
            spacebetween
          />
        )}
        <LabelledInput
          datafield
          labelText={<Xl8 xid="pass004">New password</Xl8>}
          inputtype="password"
          name="newPassword"
          required={true}
          inputval={newPassword}
          alt={<Xl8 xid="7">New password</Xl8>}
          callback={cb}
          onChange={changeInput}
          spacebetween
        />
        <LabelledInput
          datafield
          labelText={<Xl8 xid="pass005">Confirm password</Xl8>}
          inputtype="password"
          name="confirmPassword"
          required={true}
          inputval={confirmedPassword}
          alt="nothing"
          callback={cb}
          onChange={changeInput}
          spacebetween
        />
      </Form>
    </Container>
  );
};

ChangePassword.propTypes = {};

export default ChangePassword;
