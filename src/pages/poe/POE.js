import React from "react";
import Kanban from "../../components/kanban/Kanban";
import Title from "../../components/title/Title";
import Main from "../../components/main/Main";
import Xl8 from "../../components/xl8/Xl8";

const POE = props => {
  return (
    <Main className="full-cards">
      <Title title={<Xl8 xid="poe001">POE</Xl8>}></Title>
      <Kanban />
    </Main>
  );
};

export default POE;
