// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React from "react";
import Table from "../../components/table/Table";
import { errorlog } from "../../services/serviceWrapper";
import Title from "../../components/title/Title";
import { Container } from "react-bootstrap";

const Dashboard = () => {
  return (
    <div>
      <Container>
        <Title title="Dashboards"></Title>
      </Container>
      <Container fluid className="box2">
        <Table service={errorlog.get} id="foo"></Table>
      </Container>
    </div>
  );
};

export default Dashboard;
