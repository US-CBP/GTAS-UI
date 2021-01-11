import React from "react";
import "./Title.css";
import { hasData } from "../../utils/utils";

const Title = props => {
  const className = props.className || "title";
  const leftCb = props.leftCb;
  const cb = ev => {
    const id = ev.target.id;

    if (hasData(leftCb)) leftCb(id);
  };

  return (
    <div className={className}>
      {props.rightChild && (
        <span className="action-span" onClick={ev => cb(ev)}>
          {props.rightChild}
        </span>
      )}
      <span className="title-span">{props.title}</span>
      <span className="tab-span" onClick={ev => cb(ev)}>
        {props.leftChild}
      </span>
    </div>
  );
};

export default Title;
