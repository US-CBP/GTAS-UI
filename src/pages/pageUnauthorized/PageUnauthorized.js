import React from "react";
import Title from "../../components/title/Title";
import Xl8 from "../../components/xl8/Xl8";

const PageUnauthorized = () => {
  return (
    <div className="container">
      <Title title={<Xl8 xid="una001">Unauthorized User</Xl8>}></Title>

      <div className="columns">
        <div className="column">
          <div className="box2">
            <div className="top">
              {<Xl8 xid="una001">You are not authorized to view this page.</Xl8>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageUnauthorized;
