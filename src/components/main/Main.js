import React from "react";
import "./Main.css";

const Main = props => {
  const style = props.className || "main";
  return <div className={style}>{props.children}</div>;
};

export default Main;
