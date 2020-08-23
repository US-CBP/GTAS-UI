import React, { useState } from "react";
import Form from "../../components/form/Form";
import LabelledInput from "../../components/labelledInput/LabelledInput";
import { forgotPassword } from "../../services/serviceWrapper";
import { Container, Alert } from "react-bootstrap";
import Title from "../../components/title/Title";
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
    <Container className="password-reset-container" fluid>
      <Title title="Reset Password" uri={props.uri} />

      {resetLinkSent ? (
        <>
          <Alert variant="success">
            A password reset link is sent to your mail. Please follow the instructions on
            the email to reset your password.
          </Alert>
          <Link to="/login">Login to GTAS</Link>
        </>
      ) : (
        <>
          {displayErrorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form
            submitService={forgotPassword.post}
            title=""
            callback={forgotPasswordCallback}
            action="add"
            submitText="Submit"
            redirectTo="/login"
            cancellabl
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
    </Container>
  );
};

export default ForgotPassword;
