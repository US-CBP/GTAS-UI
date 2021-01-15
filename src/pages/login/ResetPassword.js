// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useState, useEffect } from "react";
import Form from "../../components/form/Form";
import LabelledInput from "../../components/labelledInput/LabelledInput";
import { resetPassword } from "../../services/serviceWrapper";
import { Container, Alert, Col } from "react-bootstrap";
import Title from "../../components/title/Title";
import Main from "../../components/main/Main";
import Xl8 from "../../components/xl8/Xl8";
import { hasData } from "../../utils/utils";
import { useParams, Link } from "@reach/router";
import { FULLPATH_TO } from "../../utils/constants";

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
                    <Xl8 xid="passres004">here</Xl8>
                  </Link>
                  <Xl8 xid="passres005">to login to GTAS</Xl8>
                </Alert>
              ) : (
                <Form
                  submitService={resetPassword.post}
                  title=""
                  callback={passwordResetCallback}
                  action="add"
                  redirectTo={FULLPATH_TO.LOGIN}
                  paramCallback={preSubmitCallback}
                  cancellable
                >
                  <LabelledInput
                    datafield
                    labelText={<Xl8 xid="pass004">New password</Xl8>}
                    inputType="password"
                    name="password"
                    required={true}
                    inputVal=""
                    alt="nothing"
                    callback={cb}
                  />
                  <LabelledInput
                    datafield
                    labelText={<Xl8 xid="pass005">Confirm new password</Xl8>}
                    inputType="password"
                    name="passwordConfirm"
                    required={true}
                    inputVal=""
                    alt="nothing"
                    callback={cb}
                  />
                </Form>
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
