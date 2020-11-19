import React, { useEffect, useState } from "react";
import { Container, Alert, Col } from "react-bootstrap";
import Form from "../../components/form/Form";
import Main from "../../components/main/Main";
import { signup, physicalLocations } from "../../services/serviceWrapper";
import LabelledInput from "../../components/labelledInput/LabelledInput";
import Title from "../../components/title/Title";
import Xl8 from "../../components/xl8/Xl8";
import { asArray, hasData } from "../../utils/utils";
import { Link } from "@reach/router";
import "./Login.scss";

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
              <Link to="/">
                <Xl8 xid="sup010">Home</Xl8>
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
                redirectTo="/login"
                cancellable
                key={locations}
              >
                <LabelledInput
                  datafield
                  labelText={<Xl8 xid="sup002">First Name</Xl8>}
                  inputType="text"
                  name="firstName"
                  required={true}
                  inputVal=""
                  alt="nothing"
                  callback={cb}
                />
                <LabelledInput
                  datafield
                  labelText={<Xl8 xid="sup003">Last Name</Xl8>}
                  inputType="text"
                  name="lastName"
                  required={true}
                  inputVal=""
                  alt="nothing"
                  callback={cb}
                />
                <LabelledInput
                  datafield
                  labelText={<Xl8 xid="sup004">User Name</Xl8>}
                  inputType="text"
                  name="username"
                  required={true}
                  inputVal=""
                  alt="nothing"
                  callback={cb}
                />
                <LabelledInput
                  datafield
                  labelText={<Xl8 xid="sup005">Email</Xl8>}
                  inputType="email"
                  name="email"
                  required={true}
                  inputVal=""
                  alt="nothing"
                  callback={cb}
                />
                <LabelledInput
                  datafield
                  labelText={<Xl8 xid="sup006">Phone Number</Xl8>}
                  inputType="tel"
                  name="phoneNumber"
                  inputVal=""
                  alt="nothing"
                  placeholder="optional"
                  callback={cb}
                />
                <LabelledInput
                  datafield
                  labelText={<Xl8 xid="sup007">Location</Xl8>}
                  inputType="select"
                  name="signupLocationId"
                  required={true}
                  inputVal=""
                  options={locations}
                  alt="nothing"
                  callback={cb}
                />
                <LabelledInput
                  datafield
                  labelText={<Xl8 xid="sup008">Supervisor</Xl8>}
                  inputType="text"
                  name="supervisor"
                  required={true}
                  inputVal=""
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
