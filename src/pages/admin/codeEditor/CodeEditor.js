import React, { useState, useEffect } from "react";
import Title from "../../../components/title/Title";
import Xl8 from "../../../components/xl8/Xl8";
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

  // const tabs = (
  //   <Tabs defaultActiveKey={RULETAB.MY} id="qrTabs">
  //     <Tab
  //       eventKey={RULETAB.MY}
  //       title={
  //         <Xl8 xid="rul003" id="qrTabs-tab-my">
  //           My Rules
  //         </Xl8>
  //       }
  //     ></Tab>
  //     <Tab
  //       eventKey={RULETAB.ALL}
  //       title={
  //         <Xl8 xid="rul004" id="qrTabs-tab-all">
  //           All Rules
  //         </Xl8>
  //       }
  //     ></Tab>
  //   </Tabs>
  // );

  const headerTabs = (
    <Tabs defaultActiveKey={props.startTab} id="codeTabs">
      <Tab
        eventKey="country"
        title={
          <Xl8 xid="app022" id="codeTabs-tab-country">
            Country
          </Xl8>
        }
        key="country"
      ></Tab>
      <Tab
        eventKey="airport"
        title={
          <Xl8 xid="app023" id="codeTabs-tab-airport">
            Airport
          </Xl8>
        }
        key="airport"
      ></Tab>
      <Tab
        eventKey="carrier"
        title={
          <Xl8 xid="app024" id="codeTabs-tab-carrier">
            Carrier
          </Xl8>
        }
        key="carrier"
      ></Tab>

      {/* {tabcontent.map(tab => {
        return (
          <Tab
            eventKey={tab.props.path.toLowerCase()}
            title={tab.props.name}
            key={tab.props.path}
          ></Tab>
        );
      })} */}
    </Tabs>
  );

  let tabMap = {};
  tabcontent.forEach(tab => {
    tabMap[tab.props.path] = tab.props.name;
  });

  return (
    <Container fluid>
      <Title title={tabMap[tab]} leftChild={headerTabs} leftCb={tabHandler} key={tab} />
      {props.children}
    </Container>
  );
};

export default CodeEditor;
