// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useState, useEffect, useContext } from "react";
import Form from "../../components/form/Form";
// import Xl8 from "../../components/xl8/Xl8";
import LabelledInput from "../../components/labelledInput/LabelledInput";
import { navigate, Link } from "@reach/router";
import { UserContext } from "../../context/user/UserContext";
import { LiveEditContext } from "../../context/translation/LiveEditContext";
import { login } from "../../services/serviceWrapper";
import { Alert, Button } from "react-bootstrap";

import "./Login.scss";
import { FULLPATH_TO } from "../../utils/constants";

const Login = () => {
  const ctx = useContext(UserContext);
  const { action } = useContext(LiveEditContext);
  const [alertVis, setAlertVis] = useState(false);

  useEffect(() => {
    action({ type: "read" });
    action({ type: "hide" });
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
      navigate(FULLPATH_TO.FLIGHTS);
    }

    setAlertVis(true);
  };

  const customButton = (
    <Button variant="outline-info" onClick={() => navigate(FULLPATH_TO.SIGNUP)}>
      Sign Up
    </Button>
  );

  return (
    <div className="container-fluid">
      <div className="row no-gutter">
        <div className="d-none d-md-flex col-md-7 col-lg-7 bg-image"></div>
        <div className="col-md-5 col-lg-5">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-md-10 mx-auto text-center">
                  <div className="gtas-logo"></div>
                  <br />
                  <br />
                  <h3 className="login-heading mb-4">GTAS</h3>
                  <br />
                  <Form
                    title=""
                    submitText="Login"
                    submitService={login.post}
                    callback={loginHandler}
                    customButtons={customButton}
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
                  <Link class="small" to={FULLPATH_TO.FORGOTPWD}>
                    Forgot password?
                  </Link>
                  <div>
                    {alertVis && (
                      <Alert
                        variant="danger"
                        dismissible
                        onClose={() => setAlertVis(false)}
                      >
                        Login failed.
                      </Alert>
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
