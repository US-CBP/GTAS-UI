import React, { useState } from "react";
import { Tabs as RBTabs } from "react-bootstrap";
import "./Tabs.css";
import { Tab } from "react-bootstrap";

const Tabs = props => {
  const [key, setKey] = useState();
  const tablist = props.tabs.map(tab => {
    return (
      <Tab eventKey={tab.title} key={tab.title} {...tab}>
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
