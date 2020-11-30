import React from "react";
import "./ErrorText.scss";

const ErrorText = props => {
  return <div className="error-text">{props.message}</div>;
};

export default ErrorText;
