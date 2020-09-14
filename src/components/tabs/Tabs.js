import React, { useState } from "react";
import { Tabs as RBTabs } from "react-bootstrap";
import "./Tabs.css";
import { Tab } from "react-bootstrap";

const Tabs = props => {
  const [key, setKey] = useState("Summary");
  const tablist = props.tabs.map(tab => {
    return (
      <Tab eventKey={tab.title} title={tab.title} key={tab.title}>
        {tab.link}
      </Tab>
    );
  });
  return (
    <RBTabs className="gtas-tabs" activeKey={key} onSelect={k => setKey(k)}>
      {tablist}
    </RBTabs>
  );
};
export default Tabs;
