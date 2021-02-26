// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React from "react";
import "./Loading.scss";

export default function Loading() {
  return (
    <div>
      <div className="loading">
        <svg class="spinner" viewBox="25 25 50 50">
          <circle
            className="path"
            fill="none"
            stroke-width="4"
            stroke-miterlimit="10"
            cx="50"
            cy="50"
            r="20"
          ></circle>
        </svg>
      </div>
    </div>
  );
}
