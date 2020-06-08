import React from "react";
import Table from "../../components/table/Table";
import { errorlog } from "../../services/serviceWrapper";
import Title from "../../components/title/Title";
import { Container } from "react-bootstrap";

const Dashboard = () => {
  return (
    <div>
      <Container>
        <Title title="Dashboard"></Title>
      </Container>
      <Container fluid className="box2">
        <Table service={errorlog.get} id="foo"></Table>
      </Container>
    </div>
  );
};

export default Dashboard;
