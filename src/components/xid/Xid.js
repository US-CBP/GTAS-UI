import React from "react";
import { asArray } from "../../utils/utils";
// import { useTranslation } from "react-i18next";
// import "./Xl8.css";

const Xid = props => {
  return <div xid={props.xid}>{props.children}</div>;
};

export default Xid;
