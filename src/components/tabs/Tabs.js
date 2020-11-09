import React, { useState } from "react";
import { Tabs as RBTabs } from "react-bootstrap";
import { Tab } from "react-bootstrap";
import "./Tabs.css";

const Tabs = props => {
  const [key, setKey] = useState();
  const tablist = props.tabs.map(tab => {
    return (
      <Tab eventKey={tab.titleText} key={tab.titleText} {...tab}>
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
