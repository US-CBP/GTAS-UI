import React, { useEffect, useState } from "react";
import { Container, Alert } from "react-bootstrap";
import Form from "../../components/form/Form";
import { signup, physicalLocations } from "../../services/serviceWrapper";
import LabelledInput from "../../components/labelledInput/LabelledInput";
import "./SignUp.scss";
import Title from "../../components/title/Title";
import { asArray, hasData } from "../../utils/utils";
import { Link } from "@reach/router";

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

  return (
    <Container className="sign-up-container" fluid>
      <Title title="Sign Up" />
      {displayErrorMsg && (
        <Alert variant="danger" dismissible onClose={() => setDisplayErrorMsg(false)}>
          {errorMsg}
        </Alert>
      )}

      {displaySuccessMsg ? (
        <>
          <Alert variant="success">
            Your request has been sent! You will receive a confirmation email upon
            approval.
          </Alert>
          <Link to="/">Home</Link>
        </>
      ) : (
        <Form
          submitService={signup.post}
          title=""
          callback={signupCallback}
          action="add"
          submitText="Submit"
          redirectTo="/login"
          cancellable
          key={locations}
        >
          <LabelledInput
            datafield
            labelText="First Name"
            inputType="text"
            name="firstName"
            required={true}
            inputVal=""
            alt="nothing"
            callback={cb}
          />
          <LabelledInput
            datafield
            labelText="Last Name"
            inputType="text"
            name="lastName"
            required={true}
            inputVal=""
            alt="nothing"
            callback={cb}
          />
          <LabelledInput
            datafield
            labelText="User Name"
            inputType="text"
            name="username"
            required={true}
            inputVal=""
            alt="nothing"
            callback={cb}
          />
          <LabelledInput
            datafield
            labelText="Email"
            inputType="email"
            name="email"
            required={true}
            inputVal=""
            alt="nothing"
            callback={cb}
          />
          <LabelledInput
            datafield
            labelText="Location"
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
            labelText="Supervisor"
            inputType="text"
            name="supervisor"
            required={true}
            inputVal=""
            alt="nothing"
            callback={cb}
          />
        </Form>
      )}
    </Container>
  );
};

export default SignUp;
