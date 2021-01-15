// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React from "react";
import Title from "../../components/title/Title";
import Xl8 from "../../components/xl8/Xl8";
import { Link } from "@reach/router";

const Page404 = () => {
  return (
    <div className="container">
      <Title title={<Xl8 xid="una001">Page Not Found</Xl8>}></Title>

      <div className="columns">
        <div className="column">
          <div className="box2">
            <div className="top">
              {
                <Xl8 xid="una001">
                  You have attempted to browse to an unknown resource.
                </Xl8>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page404;
