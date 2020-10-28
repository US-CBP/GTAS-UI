import React, { useState } from "react";
import Kanban from "../../components/kanban/Kanban";
import Title from "../../components/title/Title";
import { Container } from "react-bootstrap";

const POE = props => {
  return (
    <Container fluid>
      <Title title="POE"></Title>
      <Kanban />
    </Container>
  );
};

export default POE;
