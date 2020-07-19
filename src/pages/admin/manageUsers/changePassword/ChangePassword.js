import React, { useRef, useState } from "react";
import Form from "../../../../components/form/Form";
import { changePassword } from "../../../../services/serviceWrapper";
import LabelledInput from "../../../../components/labelledInput/LabelledInput";
import { Container, Alert } from "react-bootstrap";
import Title from "../../../../components/title/Title";
import "./ChangePassword.scss";
import { hasData } from "../../../../utils/utils";

const ChangePassword = props => {
  const oldPasswordRef = useRef("");
  const newPasswordRef = useRef("");
  const confirmedPasswordRef = useRef("");
  const confirmedRef = useRef(false);
  const [style, setStyle] = useState("");
  const [displaySuccessMsg, setDisplaySuccessMsg] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [displayErrorMsg, setDisplayErrorMsg] = useState(false);

  const checkPasswordMatch = () => {
    confirmedRef.current = confirmedPasswordRef.current === newPasswordRef.current;
    confirmedRef.current
      ? setStyle("passwords-match")
      : setStyle("passwords-do-not-match");
  };
  const onOldPasswordChange = value => {
    oldPasswordRef.current = value;
  };
  const onNewPassChange = newValue => {
    newPasswordRef.current = newValue;
    checkPasswordMatch();
  };

  const onConfirmPasswordChange = newValue => {
    confirmedPasswordRef.current = newValue;
    checkPasswordMatch();
  };

  const cb = () => {};
  const passwordChangeCallback = res => {
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
          key={confirmedRef.current}
          redirectTo="/gtas/flights" //TODO: for now, on form cancel navigate to gtas default page
          cancellable
        >
          <LabelledInput
            datafield
            labelText="Old Password"
            inputType="password"
            name="oldPassword"
            required={true}
            inputVal={oldPasswordRef.current}
            alt="nothing"
            callback={cb}
            onChange={onOldPasswordChange}
            spacebetween
          />
          <LabelledInput
            datafield
            labelText="New Password"
            inputType="password"
            name="newPassword"
            required={true}
            inputVal={newPasswordRef.current}
            alt="nothing"
            callback={cb}
            onChange={onNewPassChange}
            spacebetween
          />
          <LabelledInput
            datafield
            labelText="Confirm New Password"
            inputType="password"
            name="confirmPassword"
            required={true}
            inputVal={confirmedPasswordRef.current}
            alt="nothing"
            callback={cb}
            onChange={onConfirmPasswordChange}
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
