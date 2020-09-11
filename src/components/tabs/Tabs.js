import React, { useState } from "react";
// import RRTabs from "react-responsive-tabs";
// import "react-responsive-tabs/styles.css";
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
    <RBTabs activeKey={key} onSelect={k => setKey(k)}>
      {tablist}
    </RBTabs>
  );
};
export default Tabs;
