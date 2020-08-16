import React from "react";
import Title from "../../components/title/Title";
import { Container } from "react-bootstrap";

const Dashboard = () => {
  const cb = () => {};

  return (
    <div>
      <Container>
        <Title title="Dashboards"></Title>
      </Container>
      <Container fluid className="box2"></Container>
    </div>
  );
};

export default Dashboard;
