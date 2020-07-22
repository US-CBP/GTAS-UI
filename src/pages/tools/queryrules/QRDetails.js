import React from "react";
import Table from "../../../components/table/Table";
import { querypax } from "../../../services/serviceWrapper";
import Title from "../../../components/title/Title";

const QRDetails = () => {
  const cb = function(result) {};

  return (
    <div className="container">
      <Title title="Query Details for now"></Title>

      <div className="columns">
        <div className="top">
          <Table service={querypax.get} id="foo" callback={cb}></Table>
        </div>
      </div>
    </div>
  );
};

export default QRDetails;
