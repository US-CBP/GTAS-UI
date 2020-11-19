import React, { useState } from "react";
import Form from "../../components/form/Form";
import LabelledInput from "../../components/labelledInput/LabelledInput";
import { forgotPassword } from "../../services/serviceWrapper";
import { Container, Alert, Col } from "react-bootstrap";
import Title from "../../components/title/Title";
import Main from "../../components/main/Main";
import Xl8 from "../../components/xl8/Xl8";
import { hasData } from "../../utils/utils";
import { Link } from "@reach/router";

const ForgotPassword = props => {
  const cb = () => {};

  const [resetLinkSent, setResetLinkSetnt] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

  const forgotPasswordCallback = (action, res) => {
    const responseStatus = hasData(res) ? res.status : "";
    if (responseStatus === "SUCCESS") {
      setResetLinkSetnt(true);
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
        <Col className="unauthed-form">
          {resetLinkSent ? (
            <>
              <Alert variant="success">
                A password reset link is sent to your mail. Please follow the instructions
                on the email to reset your password.
              </Alert>
              <Link to="/login">Login to GTAS</Link>
            </>
          ) : (
            <>
              {displayErrorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              <div className="text-center h3">
                <Xl8 xid="fopa001">Reset Password</Xl8>
              </div>
              <br />
              <Form
                submitService={forgotPassword.post}
                title=""
                callback={forgotPasswordCallback}
                action="add"
                redirectTo="/login"
                cancellable
              >
                <LabelledInput
                  datafield
                  labelText="User Id"
                  inputType="text"
                  name="userId"
                  required={true}
                  inputVal=""
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

export default ForgotPassword;
