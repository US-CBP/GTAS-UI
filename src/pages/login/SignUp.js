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
import { asArray, hasData } from "../../utils/utils";
import { Link } from "@reach/router";
import "./Login.scss";
import { FULLPATH_TO } from "../../utils/constants";

const SignUp = props => {
  const [errorMsg, setErrorMsg] = useState("");
  const [displaySuccessMsg, setDisplaySuccessMsg] = useState(false);
  const [displayErrorMsg, setDisplayErrorMsg] = useState(false);
  const [locations, setLocations] = useState([]);
  const cb = () => {};

  const signupCallback = (status, res) => {
    if (hasData(res) && res.status === "FAILURE") {
      setErrorMsg(res.message);
      setDisplaySuccessMsg(false);
      setDisplayErrorMsg(true);
    } else {
      setDisplayErrorMsg(false);
      setDisplaySuccessMsg(true);
    }
  };
  useEffect(() => {
    physicalLocations.get().then(res => {
      const data = asArray(res).map(location => {
        return { label: location.name, value: location.id };
      });
      setLocations(data);
    });
  }, []);

  // <Container className="sign-up-container" fluid>
  //   <Title title={<Xl8 xid="sup001">Sign Up</Xl8>} />

  return (
    <Main className="unauthed bg-image">
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
