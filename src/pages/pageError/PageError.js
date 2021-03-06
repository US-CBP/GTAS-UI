// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React from "react";
import Title from "../../Components/title/Title";
import { Link } from "./node_modules/@reach/router";

const PageError = () => {
  return (
    <div className="container">
      <Title title="Custom Error Page"></Title>

      <div className="columns">
        <div className="column">
          <div className="box2">
            <div className="top">
              <Link to="/flights">Flights</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageError;
