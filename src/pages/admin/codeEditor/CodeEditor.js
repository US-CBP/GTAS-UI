import React, { useState } from "react";
// import Tabs from "../../../components/tabs/Tabs";
import Title from "../../../components/title/Title";
import { Tabs, Tab, Container } from "react-bootstrap";
import Main from "../../../components/main/Main";
import { navigate } from "@reach/router";

const CodeEditor = props => {
  const tabcontent = props.children.props.children;
  const [rightHeaderChild, setRightHeaderChild] = useState();

  const leftCbHandler = ev => {
    console.log(ev);
  };

  const leftHeaderChild = (
    <Tabs defaultActiveKey="countries" id="codeTabs">
      {tabcontent.map((tab, idx) => {
        return <Tab eventKey={tab.props.name.toLowerCase()} title={tab.props.name}></Tab>;
      })}
    </Tabs>
  );

  return (
    <Container fluid>
      <Title
        title=""
        uri={props.uri}
        leftChild={leftHeaderChild}
        leftCb={leftCbHandler}
      />
      {props.children}
    </Container>
  );
};

export default CodeEditor;
