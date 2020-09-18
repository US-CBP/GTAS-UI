import React, { useState, useEffect } from "react";
import Title from "../../../components/title/Title";
import { Tabs, Tab, Container } from "react-bootstrap";
import { navigate } from "@reach/router";
import { titleCase } from "../../../utils/utils";

import "./CodeEditor.css";

const CodeEditor = props => {
  const tabcontent = props.children.props.children;
  const [tab, setTab] = useState(props.startTab);

  const tabHandler = ev => {
    const tabname = ev
      .split("-")
      .pop()
      .toLowerCase();

    setTab(tabname);
  };

  useEffect(() => {
    navigate(`/gtas/admin/codeeditor/${tab}`);
  }, [tab]);

  const headerTabs = (
    <Tabs defaultActiveKey={props.startTab} id="codeTabs">
      {tabcontent.map(tab => {
        return (
          <Tab
            eventKey={tab.props.path.toLowerCase()}
            title={tab.props.name}
            key={tab.props.path}
          ></Tab>
        );
      })}
    </Tabs>
  );

  let tabMap = {};
  tabcontent.forEach(tab => {
    tabMap[tab.props.path] = <div {...tab.props.name.props}></div>;
  });

  return (
    <Container fluid>
      <Title title={tabMap[tab]} leftChild={headerTabs} leftCb={tabHandler} />
      {props.children}
    </Container>
  );
};

export default CodeEditor;
