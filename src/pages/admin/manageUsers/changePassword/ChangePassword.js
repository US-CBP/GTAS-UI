import React, { useRef, useState, useEffect } from "react";
import Form from "../../../../components/form/Form";
import { changePassword } from "../../../../services/serviceWrapper";
import LabelledInput from "../../../../components/labelledInput/LabelledInput";
import { Container, Alert } from "react-bootstrap";
import Title from "../../../../components/title/Title";
import "./ChangePassword.scss";
import { hasData } from "../../../../utils/utils";

const ChangePassword = props => {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmedPassword, setConfirmedPassword] = useState();
  const [style, setStyle] = useState("passwords-do-not-match");
  const [displaySuccessMsg, setDisplaySuccessMsg] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [displayErrorMsg, setDisplayErrorMsg] = useState(false);

  const checkPasswordMatch = () => {
    if (confirmedPassword === newPassword) {
      setStyle("passwords-match");
    } else setStyle("passwords-do-not-match");
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

  //
  useEffect(() => {
    if (confirmedPassword?.length >= 10 && confirmedPassword === newPassword) {
      setStyle("passwords-match");
    } else {
      setStyle("passwords-do-not-match");
    }
  }, [oldPassword, newPassword, confirmedPassword]);

  const cb = () => {};
  const passwordChangeCallback = (status, res) => {
    const responseStatus = hasData(res) ? res.status : "";
    const message = hasData(res) ? res.message : "";

    if (responseStatus === "SUCCESS") {
      setDisplaySuccessMsg(true);
    } else {
      setErrorMessage(message);
      setDisplayErrorMsg(true);
    }
  };

  return (
    <Container className="change-password-container">
      <Title title="Change Password" uri={props.uri} />
      {displayErrorMsg && (
        <Alert variant="danger" dismissible onClose={() => setDisplayErrorMsg(false)}>
          {errorMessage}
        </Alert>
      )}

      {displaySuccessMsg ? (
        <Alert variant="success">Your password has been changed successfully!!</Alert>
      ) : (
        <Form
          submitService={changePassword.put}
          title=""
          callback={passwordChangeCallback}
          action="add"
          submitText="Submit"
          redirectTo="/gtas/flights" //TODO: for now, on form cancel navigate to gtas default page
          cancellable
          key={style}
        >
          <LabelledInput
            datafield
            labelText="Old Password"
            inputType="password"
            name="oldPassword"
            required={true}
            inputVal={oldPassword}
            alt="nothing"
            callback={cb}
            onChange={changeInput}
            spacebetween
          />
          <LabelledInput
            datafield
            labelText="New Password"
            inputType="password"
            name="newPassword"
            required={true}
            inputVal={newPassword}
            alt="nothing"
            callback={cb}
            onChange={changeInput}
            spacebetween
          />
          <LabelledInput
            datafield
            labelText="Confirm New Password"
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
      )}
    </Container>
  );
};

ChangePassword.propTypes = {};

export default ChangePassword;
