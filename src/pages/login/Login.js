import React, { useState, useEffect, useContext } from "react";
import Form from "../../components/form/Form";
import LabelledInput from "../../components/labelledInput/LabelledInput";
import { login } from "../../services/serviceWrapper";
import { Alert, Card, Button } from "react-bootstrap";
import { navigate, Link } from "@reach/router";
import { UserContext } from "../../context/user/UserContext";
import "./Login.scss";

const Login = () => {
  const ctx = useContext(UserContext);
  const [alertVis, setAlertVis] = useState(false);

  useEffect(() => {
    ctx.userAction({ type: "logoff" });
  }, []);

  const loginHandler = (status, res) => {
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
    <div className="container-fluid">
      <div className="row no-gutter">
        <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
        <div className="col-md-8 col-lg-6">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-md-9 col-lg-8 mx-auto">
                  <h3 className="login-heading mb-4">Welcome to GTAS!</h3>
                  <Form
                    title=""
                    submitText="Login"
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
                  <Link class="small" to="/forgot-password">
                    Forgot password?
                  </Link>
                  <div>
                    {alertVis ? (
                      <Alert
                        variant="danger"
                        dismissible
                        onClose={() => setAlertVis(false)}
                      >
                        Login failed.
                      </Alert>
                    ) : (
                      <Button variant="outline-info" onClick={() => navigate("/signup")}>
                        Sign Up
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
