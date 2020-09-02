import React, { useState, useEffect } from "react";
import Form from "../../components/form/Form";
import LabelledInput from "../../components/labelledInput/LabelledInput";
import { resetPassword } from "../../services/serviceWrapper";
import { Container, Alert } from "react-bootstrap";
import Title from "../../components/title/Title";
import { hasData } from "../../utils/utils";
import { useParams, Link } from "@reach/router";

const ResetPassword = props => {
  const { resetToken, username } = useParams();
  const [validToken, setValidToken] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState(false);
  const cb = () => {};
  const passwordResetCallback = (action, res) => {
    if (hasData(res) && res.status === "FAILURE") {
      setErrorMessage(res.message);
      setDisplayErrorMessage(true);
    } else if (hasData(res) && res.status === "SUCCESS") {
      setDisplaySuccessMessage(true);
      setDisplayErrorMessage(false);
    }
  };

  const preSubmitCallback = fields => {
    let res = { ...fields[0], resetToken, username };

    return [res];
  };

  useEffect(() => {
    const param = "?token=" + resetToken;
    resetPassword.isValidToken(param).then(res => {
      if (hasData(res.status) && res.status === "SUCCESS") {
        setValidToken(true);
      }
    });
  }, []);

  return (
    <Container className="password-reset-container" fluid>
      <Title title="Reset Password" uri={props.uri} />
      {validToken ? (
        <>
          {displayErrorMessage && (
            <Alert variant="danger">
              {errorMessage}
              <br />
              <Link to="/forgot-password">Send another password reset link?</Link>
            </Alert>
          )}
          {displaySuccessMessage ? (
            <Alert variant="success">
              Your password has been reset! Clike <Link to="/login">here</Link> to login
              to GTAS
            </Alert>
          ) : (
            <Form
              submitService={resetPassword.post}
              title=""
              callback={passwordResetCallback}
              action="add"
              submitText="Submit"
              redirectTo="/login"
              paramCallback={preSubmitCallback}
              cancellable
            >
              <LabelledInput
                datafield
                labelText="New Password"
                inputType="password"
                name="password"
                required={true}
                inputVal=""
                alt="nothing"
                callback={cb}
                spacebetween
              />
              <LabelledInput
                datafield
                labelText="Confirm New Password"
                inputType="password"
                name="passwordConfirm"
                required={true}
                inputVal=""
                alt="nothing"
                callback={cb}
                spacebetween
              />
            </Form>
          )}
        </>
      ) : (
        <Alert variant="danger">Invalid token provided. Please try again!</Alert>
      )}
    </Container>
  );
};

export default ResetPassword;
