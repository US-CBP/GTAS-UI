import React from "react";
import "./Title.css";
// import { Tabs, Tab } from "react-bootstrap";
import { hasData } from "../../utils/utils";
// import Breadcrumbs from "../breadcrumbs/Breadcrumbs";

const Title = props => {
  const leftCb = props.leftCb;
  const cb = ev => {
    const id = ev.target.id;

    if (hasData(leftCb)) {
      leftCb(id);
    }
  };

  return (
    <div className="title">
      <span className="left-span" onClick={ev => cb(ev)}>
        {props.leftChild}
      </span>
      <span className="title-span">{props.title}</span>
    </div>
  );
};

export default Title;
