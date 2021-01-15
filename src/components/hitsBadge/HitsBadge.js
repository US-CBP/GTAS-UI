// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React from "react";
import "./HitsBadge.css";

const HitsBadge = props => {
  return (
    <span className="hits-table">
      <span className="hits-cell">
        {props.high > 0 && (
          <>
            <i className="fa fa-flag hits-flag high" title="top severity"></i>
            {props.high}
          </>
        )}
      </span>
      <span className="hits-cell">
        {props.med > 0 && (
          <>
            <i className="fa fa-flag hits-flag med" title="high severity"></i>
            {props.med}
          </>
        )}
      </span>
      <span className="hits-cell">
        {props.low > 0 && (
          <>
            <i className="fa fa-flag hits-flag low" title="normal severity"></i>
            {props.low}
          </>
        )}
      </span>
    </span>
  );
};

export default HitsBadge;
