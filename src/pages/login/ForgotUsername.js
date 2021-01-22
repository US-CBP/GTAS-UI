// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useState } from "react";
import Form from "../../components/form/Form";
import LabelledInput from "../../components/labelledInput/LabelledInput";
import { forgotUsername } from "../../services/serviceWrapper";
import { Container, Alert, Col } from "react-bootstrap";
import Main from "../../components/main/Main";
import Xl8 from "../../components/xl8/Xl8";
import { hasData } from "../../utils/utils";
import { Link } from "@reach/router";
import { FULLPATH_TO } from "../../utils/constants";

const ForgotUsername = props => {
  const cb = () => {};

  const [emailSent, setEmailSetnt] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

  const forgotUsernameCallback = (action, res) => {
    const responseStatus = hasData(res) ? res.status : "";
    if (responseStatus === "SUCCESS") {
      setEmailSetnt(true);
      setDisplayErrorMessage(false);
    } else if (responseStatus === "FAILURE") {
      setErrorMessage(res.message);
      setDisplayErrorMessage(true);
    }
  };

  return (
    <Main className="unauthed bg-image">
      <Container
        className="login d-flex align-items-center py-5 justify-content-around"
        fluid
      >
        <Col className="unauthed-form forgot-pwd">
          {emailSent ? (
            <>
              <Alert variant="success">
                <Xl8 xid="fun001">
                  Your username is sent to your email. Check your mailbox.
                </Xl8>
              </Alert>
              <Link to={FULLPATH_TO.LOGIN}>
                <Xl8 xid="fun002">Login to GTAS</Xl8>
              </Link>
            </>
          ) : (
            <>
              {displayErrorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              <div className="text-center h3">
                <Xl8 xid="fun003">Forgot your username?</Xl8>
              </div>
              <p>
                <Xl8 xid="fun004">
                  Please enter the email address associated to your account.
                </Xl8>
              </p>
              <br />
              <Form
                submitService={forgotUsername.post}
                title=""
                callback={forgotUsernameCallback}
                action="add"
                redirectTo={FULLPATH_TO.LOGIN}
                cancellable
              >
                <LabelledInput
                  datafield
                  labelText="Email"
                  inputtype="text"
                  name="userEmail"
                  required={true}
                  inputval=""
                  alt="nothing"
                  callback={cb}
                  spacebetween
                />
              </Form>
            </>
          )}
        </Col>
      </Container>
    </Main>
  );
};

export default ForgotUsername;
