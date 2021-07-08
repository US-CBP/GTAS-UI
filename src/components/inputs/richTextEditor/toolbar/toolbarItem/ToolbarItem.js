import React from "react";
import "./ToolbarItem.scss";

const ToolbarItem = props => {
  return (
    <div
      isActive={props.isActive}
      key={props.key}
      className={`${props.isActive && "active-toolbar-item"} toolbar-item`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export default ToolbarItem;
