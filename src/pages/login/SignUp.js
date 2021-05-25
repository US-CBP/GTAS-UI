// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useEffect, useState } from "react";
import { Container, Alert, Col } from "react-bootstrap";
import Form from "../../components/form/Form";
import Main from "../../components/main/Main";
import { signup, physicalLocations } from "../../services/serviceWrapper";
import LabelledInput from "../../components/labelledInput/LabelledInput";
import Xl8 from "../../components/xl8/Xl8";
import { asArray, hasData, getTodaysBackground } from "../../utils/utils";
import { Link } from "@reach/router";
import "./Login.scss";
import { FULLPATH_TO } from "../../utils/constants";

const SignUp = props => {
  const [errorMsg, setErrorMsg] = useState("");
  const [displaySuccessMsg, setDisplaySuccessMsg] = useState(false);
  const [displayErrorMsg, setDisplayErrorMsg] = useState(false);
  const [locations, setLocations] = useState([]);
  const USER_ID_TOO_SHORT = <Xl8 xid="um15">User ID is too short</Xl8>;
  const USER_ID_TOO_LONG = <Xl8 xid="um15">User ID is too long</Xl8>;
  const ALERTS_TYPES = { SUCCESS: "SUCCESS", FAILURE: "FAILURE" };

  const cb = () => {};

  const launchAlert = (type, msg) => {
    if (type === ALERTS_TYPES.FAILURE) {
      setErrorMsg(msg);
      setDisplaySuccessMsg(false);
      setDisplayErrorMsg(true);
    } else {
      setDisplayErrorMsg(false);
      setDisplaySuccessMsg(true);
    }
  };

  const signupCallback = (status, res) => {
    if (hasData(res) && res.status === "FAILURE") {
      launchAlert(ALERTS_TYPES.FAILURE, res.message);
    } else {
      launchAlert(ALERTS_TYPES.SUCCESS);
    }
  };
  const validateUsernameInput = (username = "") => {
    const maxLen = 50;
    const minLen = 3;
    const emptyString = "";

    const msg =
      username.length < minLen
        ? USER_ID_TOO_SHORT
        : username.length > maxLen
        ? USER_ID_TOO_LONG
        : emptyString;

    const valid = msg === emptyString;

    return { valid: valid, info: msg };
  };
  const validateInputs = inputs => {
    const username = asArray(inputs)[0]["username"];
    const validatedUsername = validateUsernameInput(username);
    launchAlert(ALERTS_TYPES.FAILURE, validatedUsername.info);
    return validatedUsername.valid;
  };

  useEffect(() => {
    physicalLocations.get().then(res => {
      const data = asArray(res).map(location => {
        return { label: location.name, value: location.id };
      });
      setLocations(data);
    });
  }, []);

  return (
    <Main className={`unauthed bg-image ${getTodaysBackground("background")}`}>
      <Container
        className="login d-flex align-items-center py-5 justify-content-around"
        fluid
      >
        <Col className="unauthed-form">
          {displayErrorMsg && (
            <Alert variant="danger" dismissible onClose={() => setDisplayErrorMsg(false)}>
              {errorMsg}
            </Alert>
          )}

          {displaySuccessMsg ? (
            <>
              <Alert variant="success">
                <Xl8 xid="sup009">
                  Your request has been sent! You will receive a confirmation email upon
                  approval.
                </Xl8>
              </Alert>
              <Link to={FULLPATH_TO.LOGIN}>
                <Xl8 xid="sup010">Login</Xl8>
              </Link>
            </>
          ) : (
            <>
              <div className="text-center h3">
                <Xl8 xid="sup001">Sign Up</Xl8>
              </div>
              <Form
                submitService={signup.post}
                title=""
                callback={signupCallback}
                action="add"
                redirectTo={FULLPATH_TO.LOGIN}
                cancellable
                key={locations}
                validateInputs={validateInputs}
              >
                <LabelledInput
                  datafield
                  labelText={<Xl8 xid="sup002">First Name</Xl8>}
                  inputtype="text"
                  name="firstName"
                  required={true}
                  inputval=""
                  alt="nothing"
                  callback={cb}
                  spacebetween
                />
                <LabelledInput
                  datafield
                  labelText={<Xl8 xid="sup003">Last Name</Xl8>}
                  inputtype="text"
                  name="lastName"
                  required={true}
                  inputval=""
                  alt="nothing"
                  callback={cb}
                  spacebetween
                />
                <LabelledInput
                  datafield
                  labelText={<Xl8 xid="sup004">User Name</Xl8>}
                  inputtype="text"
                  name="username"
                  required={true}
                  inputval=""
                  alt="nothing"
                  callback={cb}
                  validateInput={validateUsernameInput}
                  spacebetween
                />
                <LabelledInput
                  datafield
                  labelText={<Xl8 xid="sup005">Email</Xl8>}
                  inputtype="email"
                  name="email"
                  required={true}
                  inputval=""
                  alt="nothing"
                  callback={cb}
                  spacebetween
                />
                <LabelledInput
                  datafield
                  labelText={<Xl8 xid="sup006">Phone Number</Xl8>}
                  inputtype="tel"
                  name="phoneNumber"
                  inputval=""
                  alt="nothing"
                  placeholder="optional"
                  callback={cb}
                  spacebetween
                />
                <LabelledInput
                  datafield
                  labelText={<Xl8 xid="sup007">Location</Xl8>}
                  inputtype="select"
                  name="signupLocationId"
                  required={true}
                  inputval=""
                  options={locations}
                  alt="nothing"
                  callback={cb}
                  spacebetween
                />
                <LabelledInput
                  datafield
                  labelText={<Xl8 xid="sup008">Supervisor</Xl8>}
                  inputtype="text"
                  name="supervisor"
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

export default SignUp;
