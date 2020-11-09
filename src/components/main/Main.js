import React from "react";
import "./Main.css";

const Main = props => {
  const style = props.className || "main";
  return (
    <div className={style}>
      <div className="main-inner">{props.children}</div>
    </div>
  );
};

export default Main;
