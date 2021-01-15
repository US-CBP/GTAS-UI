// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React from "react";
import { Link } from "@reach/router";

const ActionButton = props => {
  return (
    <nav className="breadcrumb is-centered" aria-label="breadcrumbs">
      {props.children}
    </nav>
  );
};

export default ActionButton;
