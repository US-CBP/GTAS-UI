import React, { useRef, useState, useEffect } from "react";
import Form from "../../../../components/form/Form";
import { changePassword } from "../../../../services/serviceWrapper";
import LabelledInput from "../../../../components/labelledInput/LabelledInput";
import { Container, Alert } from "react-bootstrap";
import Title from "../../../../components/title/Title";
import Xl8 from "../../../../components/xl8/Xl8";
import "./ChangePassword.scss";
import { hasData } from "../../../../utils/utils";
import { navigate, useParams } from "@reach/router";

const ChangePassword = props => {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmedPassword, setConfirmedPassword] = useState();
  const [style, setStyle] = useState("passwords-do-not-match");
  const [displaySuccessMsg, setDisplaySuccessMsg] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [displayErrorMsg, setDisplayErrorMsg] = useState(false);

  const params = useParams();
  const service = hasData(params.userId)
    ? changePassword.byAdmin
    : changePassword.byloggedInUser;
  const recordId = hasData(params.userId) ? params.userId : "";

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
    if (status === "Cancel") navigate(-1);
    else {
      const responseStatus = hasData(res) ? res.status : "";
      const message = hasData(res) ? res.message : "";

      if (responseStatus === "SUCCESS") {
        setDisplayErrorMsg(false);
        setDisplaySuccessMsg(true);
      } else {
        setErrorMessage(message);
        setDisplayErrorMsg(true);
      }
    }
  };

  return (
    <Container className="change-password-container">
      <Title title={<Xl8 xid="7">Change Password</Xl8>} uri={props.uri} />
      {displayErrorMsg && (
        <Alert variant="danger" dismissible onClose={() => setDisplayErrorMsg(false)}>
          {errorMessage}
        </Alert>
      )}

      {displaySuccessMsg ? (
        <Alert variant="success">Your password has been changed successfully!!</Alert>
      ) : (
        <Form
          submitService={service}
          title=""
          callback={passwordChangeCallback}
          action="add"
          cancellable
          key={style}
          recordId={recordId}
        >
          {hasData(params.userId) ? (
            <></>
          ) : (
            <LabelledInput
              datafield
              labelText={<Xl8 xid="7">Old password</Xl8>}
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
            labelText={<Xl8 xid="7">New password</Xl8>}
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
            labelText={<Xl8 xid="7">Confirm new password</Xl8>}
            inputType="password"
            name="confirmPassword"
            required={true}
            inputVal={confirmedPassword}
            alt={<Xl8 xid="7">Confirm new password</Xl8>}
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
