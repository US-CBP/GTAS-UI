// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React from "react";
import Table from "../../../components/table/Table";
import { users } from "../../../services/serviceWrapper";
import Title from "../../../components/title/Title";

const SeatsMap = () => {
  const cb = function(result) {};

  return (
    <div className="container">
      <Title title="Seats Map"></Title>

      <div className="columns">
        <div className="top">
          <Table service={users.get.getAllNonArchived} id="foo" callback={cb}></Table>
        </div>
      </div>
    </div>
  );
};

export default SeatsMap;
