// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React from "react";
import "./ErrorText.scss";

const ErrorText = props => {
  return <div className="error-text">{props.message}</div>;
};

export default ErrorText;
