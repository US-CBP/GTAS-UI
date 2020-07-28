import React from "react";
// import Tabs from "../../../components/tabs/Tabs";
import Title from "../../../components/title/Title";
import { Tabs, Tab, Container } from "react-bootstrap";
import Main from "../../../components/main/Main";
import { navigate } from "@reach/router";

const CodeEditor = props => {
  const tabcontent = props.children.props.children;

  const cb = () => {};

  const tabs = (
    <Tabs defaultActiveKey="airport" id="editorTabs">
      {tabcontent.map((tab, idx) => {
        return (
          <Tab
            eventKey={tab.props.name}
            title={tab.props.name}
            onclick={() => navigate(tab.props.name)}
          ></Tab>
        );
      })}
    </Tabs>
  );

  return (
    <Container fluid>
      <Title title="" uri={props.uri} leftChild={tabs} leftCb={cb} />
      {/* <Tabs tabs={tablist} /> */}
      {props.children}
    </Container>
  );
};

export default CodeEditor;
