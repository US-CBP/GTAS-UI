import React, { useState, useEffect, useContext } from "react";
import Form from "../../components/form/Form";
import LabelledInput from "../../components/labelledInput/LabelledInput";
import { login } from "../../services/serviceWrapper";
import { Alert, Card, Button } from "react-bootstrap";
import { navigate, Link } from "@reach/router";
import { UserContext } from "../../context/user/UserContext";
import "./Login.scss";
import Logo from "../../images/WCO_GTAS_logo.svg";

const Login = () => {
  const ctx = useContext(UserContext);
  const [alertVis, setAlertVis] = useState(false);

  useEffect(() => {
    if (ctx) {
      ctx.userAction({ type: "logoff" });
    }
  }, []);

  const loginHandler = (status, res) => {
    console.log("status:", status, "res:", res);

    if (res?.userId) {
      const newuser = {
        authenticated: true,
        fullName: `${res.lastName}, ${res.firstName}`,
        userId: res.userId,
        userRoles: res.roles.map(item => item.roleDescription),
        // userToken: Cookies.get("JSESSIONID"),
        queryPageSize: 25,
        userPageSize: 25,
        landingPage: undefined,
        emailEnabled: res.emailEnabled,
        highPriorityEmail: res.highPriorityEmail
      };

      ctx.userAction({ user: newuser, type: "login" });
      navigate("/gtas/flights");
    }

    setAlertVis(true);
  };

  return (
    <div className="login-page-container">
      <Card className="transparent-white-card">
        <Card.Img variant="top" src={Logo} className="logo" />
        <div className="placeholder"></div>
        <Card.Body className="login-card-body">
          <Link to="/forgot-password">Forgot my password</Link>
          <br />
          <Form
            title=""
            submitText="LOGIN"
            submitService={login.post}
            callback={loginHandler}
            id="loginform"
          >
            <LabelledInput
              inputType="text"
              alt="Enter the user name"
              name="username"
              labelText=""
              placeholder="Username"
              datafield="username"
              required="required"
              inputVal=""
              autofocus="true"
              className="login-labeled-input"
            />
            <LabelledInput
              inputType="password"
              alt="Enter the password"
              name="password"
              labelText=""
              placeholder="Password"
              datafield="password"
              required="required"
              inputVal=""
              className="login-labeled-input"
            />
          </Form>
          <div>
            {alertVis ? (
              <Alert variant="danger" dismissible onClose={() => setAlertVis(false)}>
                Login failed.
              </Alert>
            ) : (
              <Button variant="outline-info" onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
