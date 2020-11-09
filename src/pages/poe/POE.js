import React from "react";
import Kanban from "../../components/kanban/Kanban";
import Title from "../../components/title/Title";
import Main from "../../components/main/Main";

const POE = props => {
  return (
    <Main className="full-cards">
      <Title title="POE"></Title>
      <Kanban />
    </Main>
  );
};

export default POE;
