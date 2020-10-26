import React, { useState, useEffect } from "react";
import Form from "../../../../components/form/Form";
import { changePassword } from "../../../../services/serviceWrapper";
import LabelledInput from "../../../../components/labelledInput/LabelledInput";
import { Container, Alert } from "react-bootstrap";
import Title from "../../../../components/title/Title";
import Xl8 from "../../../../components/xl8/Xl8";
import "./ChangePassword.scss";
import { hasData, isValidPassword } from "../../../../utils/utils";

const ChangePassword = props => {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmedPassword, setConfirmedPassword] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [displayErrorMsg, setDisplayErrorMsg] = useState(false);
  const [style, setStyle] = useState("passwords-do-not-match");
  const chagneByAdmin = hasData(props.userId);

  const service = chagneByAdmin ? changePassword.byAdmin : changePassword.byloggedInUser;

  const recordId = props.userId || "";

  const passwordRule = (
    <ul>
      <li style={{ "list-style-type": "none" }}>
        <h5>
          <Xl8 xid="pass014">Your password should contain:</Xl8>
        </h5>
      </li>
      <li>
        <Xl8 xid="pass006">10 to 20 characters</Xl8>
      </li>
      <li>
        <Xl8 xid="pass007">{`At least one special character (!@#$%^&?*)`}</Xl8>
      </li>
      <li>
        <Xl8 xid="pass008">At least one number</Xl8>
      </li>
      <li>
        <Xl8 xid="pass009">At least one letter</Xl8>
      </li>
      <li>
        <Xl8 xid="pass010">At least one upper case character</Xl8>
      </li>
      <li>
        <Xl8 xid="pass011">At least one lower case character</Xl8>
      </li>
    </ul>
  );

  const passwordsDoNotMatchError = (
    <Xl8 xid="pass012">The Passwords you entered do not match</Xl8>
  );
  const invalidPasswordError = (
    <Xl8 xid="pass013">
      The password you entered does not satisfy the password criteria.
    </Xl8>
  );

  const showAlert = message => {
    setErrorMessage(message);
    setDisplayErrorMsg(true);
  };

  const changeInput = input => {
    if (input.name === "oldPassword") {
      setOldPassword(input.value);
    }
    if (input.name === "newPassword") {
      setNewPassword(input.value);
    }
    if (input.name === "confirmPassword") {
      setConfirmedPassword(input.value);
    }
  };

  const validateInputs = fields => {
    const passwordsMatch = confirmedPassword === newPassword;
    const validPassword = isValidPassword(newPassword);

    if (!validPassword) {
      showAlert(invalidPasswordError);
    } else if (!passwordsMatch) {
      showAlert(passwordsDoNotMatchError);
    }

    return passwordsMatch && validPassword;
  };

  useEffect(() => {
    setDisplayErrorMsg(false);
    if (confirmedPassword?.length >= 10 && confirmedPassword === newPassword) {
      setStyle("passwords-match");
    } else {
      setStyle("passwords-do-not-match");
    }
  }, [newPassword, confirmedPassword]);

  const cb = () => {};
  const passwordChangeCallback = (status, res) => {
    const callback = props.callback || cb;

    if (status === "Cancel") callback(status);
    else {
      const responseStatus = hasData(res) ? res.status : "";
      const message = hasData(res) ? res.message : "";

      if (responseStatus === "SUCCESS") {
        setDisplayErrorMsg(false);
        callback(status);
      } else {
        //Incase the user provided wrong password for the old password field
        //Or other System errors
        setErrorMessage(message);
        setDisplayErrorMsg(true);
      }
    }
  };

  return (
    <Container className="change-password-container">
      <Title title={<Xl8 xid="pass001">Change Password</Xl8>} uri={props.uri} />
      <div className="password-rules">{passwordRule}</div>
      {displayErrorMsg && (
        <Alert variant="danger" dismissible onClose={() => setDisplayErrorMsg(false)}>
          {errorMessage}
        </Alert>
      )}

      <Form
        submitService={service}
        title=""
        callback={passwordChangeCallback}
        validateInputs={validateInputs}
        action="add"
        cancellable
        recordId={recordId}
        key={style}
      >
        {chagneByAdmin ? (
          <></>
        ) : (
          <LabelledInput
            datafield
            labelText={<Xl8 xid="pass003">Old password</Xl8>}
            inputType="password"
            name="oldPassword"
            required={true}
            inputVal={oldPassword}
            alt={<Xl8 xid="7">Old password</Xl8>}
            callback={cb}
            onChange={changeInput}
            spacebetween
          />
        )}
        <LabelledInput
          datafield
          labelText={<Xl8 xid="pass004">New password</Xl8>}
          inputType="password"
          name="newPassword"
          required={true}
          inputVal={newPassword}
          alt={<Xl8 xid="7">New password</Xl8>}
          callback={cb}
          onChange={changeInput}
          spacebetween
        />
        <LabelledInput
          datafield
          labelText={<Xl8 xid="pass005">Confirm password</Xl8>}
          inputType="password"
          name="confirmPassword"
          required={true}
          inputVal={confirmedPassword}
          alt="nothing"
          callback={cb}
          onChange={changeInput}
          className={style}
          spacebetween
        />
      </Form>
    </Container>
  );
};

ChangePassword.propTypes = {};

export default ChangePassword;
