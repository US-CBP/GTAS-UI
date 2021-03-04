// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useState, useEffect } from "react";
import Form from "../../components/form/Form";
import LabelledInput from "../../components/labelledInput/LabelledInput";
import { resetPassword } from "../../services/serviceWrapper";
import { Container, Alert, Col } from "react-bootstrap";
import Main from "../../components/main/Main";
import Xl8 from "../../components/xl8/Xl8";
import {
  clearInvalidFieldHighlight,
  hasData,
  highlightInvalidField,
  isValidPassword
} from "../../utils/utils";
import { useParams, Link } from "@reach/router";
import { FULLPATH_TO } from "../../utils/constants";
import PasswordConstraints from "../../components/PasswordConstraints/PasswordConstraints";

const ResetPassword = props => {
  const { resetToken, username } = useParams();
  const [validToken, setValidToken] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState(false);
  const [newPassword, setNewPassword] = useState();
  const [confirmedPassword, setConfirmedPassword] = useState();
  const cb = () => {};
  const passwordsDoNotMatchError = (
    <Xl8 xid="pass012">The passwords you entered do not match</Xl8>
  );
  const invalidPasswordError = (
    <Xl8 xid="pass013">
      The password you entered does not satisfy the password criteria.
    </Xl8>
  );
  const passwordResetCallback = (action, res) => {
    if (hasData(res) && res.status === "FAILURE") {
      setErrorMessage(res.message);
      setDisplayErrorMessage(true);
    } else if (hasData(res) && res.status === "SUCCESS") {
      setDisplaySuccessMessage(true);
      setDisplayErrorMessage(false);
    }
  };
  const changeInput = input => {
    if (input.name === "password") {
      clearInvalidFieldHighlight("password");
      setNewPassword(input.value);
    }
    if (input.name === "passwordConfirm") {
      clearInvalidFieldHighlight("passwordConfirm");
      setConfirmedPassword(input.value);
    }
  };

  const validateInputs = fields => {
    const passwordsMatch = confirmedPassword === newPassword;
    const validPassword = isValidPassword(newPassword);

    if (!validPassword) {
      setErrorMessage(invalidPasswordError);
      highlightInvalidField("password");
    } else if (!passwordsMatch) {
      setErrorMessage(passwordsDoNotMatchError);
      highlightInvalidField("passwordConfirm");
    }

    return passwordsMatch && validPassword;
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
    <Main className="unauthed bg-image">
      <Container
        className="login d-flex align-items-center py-5 justify-content-around"
        fluid
      >
        <Col className="unauthed-form">
          {validToken ? (
            <>
              {displayErrorMessage && (
                <Alert variant="danger">
                  {errorMessage}
                  <br />
                  <Link to={FULLPATH_TO.FORGOTPWD}>
                    <Xl8 xid="passres002">Send another password reset link?</Xl8>
                  </Link>
                </Alert>
              )}
              {displaySuccessMessage ? (
                <Alert variant="success">
                  <Xl8 xid="passres003">Your password has been reset! Click </Xl8>
                  <Link to={FULLPATH_TO.LOGIN}>
                    <Xl8 xid="passres004">here </Xl8>
                  </Link>
                  <Xl8 xid="passres005">to login to GTAS</Xl8>
                </Alert>
              ) : (
                <div>
                  <PasswordConstraints password={newPassword} errorText={errorMessage} />
                  <Form
                    submitService={resetPassword.post}
                    title=""
                    callback={passwordResetCallback}
                    action="add"
                    redirectTo={FULLPATH_TO.LOGIN}
                    paramCallback={preSubmitCallback}
                    validateInputs={validateInputs}
                    cancellable
                  >
                    <LabelledInput
                      datafield
                      labelText={<Xl8 xid="pass004">New password</Xl8>}
                      inputtype="password"
                      name="password"
                      required={true}
                      inputval=""
                      alt="nothing"
                      callback={cb}
                      onChange={changeInput}
                    />
                    <LabelledInput
                      datafield
                      labelText={<Xl8 xid="pass005">Confirm new password</Xl8>}
                      inputtype="password"
                      name="passwordConfirm"
                      required={true}
                      inputval={confirmedPassword}
                      alt="nothing"
                      callback={cb}
                      onChange={changeInput}
                    />
                  </Form>
                </div>
              )}
            </>
          ) : (
            <>
              <Alert variant="danger">
                <Xl8 xid="passres006">Invalid token provided. Please try again!</Xl8>
              </Alert>
              <br />
              <Link to={FULLPATH_TO.LOGIN}>Back to Login</Link>
            </>
          )}
        </Col>
      </Container>
    </Main>
  );
};

export default ResetPassword;
