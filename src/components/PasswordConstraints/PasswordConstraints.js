import React from "react";
import {
  containslowerChar,
  containsNumber,
  containsSpecialChar,
  containsUpperChar,
  hasData,
  satisfiesLengthConstraint
} from "../../utils/utils";
import ErrorText from "../errorText/ErrorText";
import Xl8 from "../xl8/Xl8";
import "./PasswordConstraints.scss";

const PasswordConstraints = props => {
  const password = props.password;
  const errorText = props.errorText;
  const satisfiedIcon = "pass-constraint-check fa fa-check-square";
  const unsatisfiedIcon = "pass-constraint-x fa fa-times";
  const emptySpace = " ";
  let constraints = {};
  if (hasData(password)) {
    constraints = {
      length: satisfiesLengthConstraint(password) ? satisfiedIcon : unsatisfiedIcon,
      specialChar: containsSpecialChar(password) ? satisfiedIcon : unsatisfiedIcon,
      number: containsNumber(password) ? satisfiedIcon : unsatisfiedIcon,
      upperChar: containsUpperChar(password) ? satisfiedIcon : unsatisfiedIcon,
      lowerChar: containslowerChar(password) ? satisfiedIcon : unsatisfiedIcon
    };
  }

  return (
    <div className="password-constraint-container">
      <ul>
        <li style={{ "list-style-type": "none" }}>
          <h5>
            <Xl8 xid="passConst001">Your password should contain:</Xl8>
          </h5>
        </li>
        <li>
          <Xl8 xid="passConst002">10 to 20 characters</Xl8>
          {emptySpace}
          <i className={constraints.length}></i>
        </li>
        <li>
          <Xl8 xid="passConst003">At least one special character</Xl8>(!@#$%^&?*)
          {emptySpace}
          <i className={constraints.specialChar}></i>
        </li>
        <li>
          <Xl8 xid="passConst004">At least one number</Xl8>
          {emptySpace}
          <i className={constraints.number}></i>
        </li>
        <li>
          <Xl8 xid="passConst005">At least one upper case character</Xl8>
          {emptySpace}
          <i className={constraints.upperChar}></i>
        </li>
        <li>
          <Xl8 xid="passConst006">At least one lower case character</Xl8>
          {emptySpace}
          <i className={constraints.lowerChar}></i>
        </li>
      </ul>

      <ErrorText message={errorText} />
    </div>
  );
};

export default PasswordConstraints;
