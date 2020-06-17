import React from "react";
import "./CountdownBadge.css";
import { Row } from "react-bootstrap";
import { alt } from "../../utils/utils";

const CountdownBadge = props => {
  if (!props.future) return <></>;

  const future = new Date(props.future) || "";
  const now = props.now || new Date();

  const padded = str => {
    return alt(str, "0")
      .toString()
      .padStart(2, "0");
  };

  const altZero = val => {
    if (val == 0) return ""; //allow coersion
    return val;
  };

  let days = "",
    hours = "",
    minutes = "",
    seconds = "";

  let delta = (future - now) / 1000;
  days = altZero(Math.floor(delta / 86400));
  delta = Math.abs(delta);

  // if (days > 0) {
  hours = altZero(padded(Math.floor(delta / 3600) % 24));
  delta -= hours * 3600;

  minutes = padded(Math.floor(delta / 60) % 60);
  delta -= minutes * 60;

  seconds = (delta % 60, 2).toFixed(2);
  // }

  return (
    <Row flex="true" no-wrap="true" className="bio-row">
      <div className="icon-div">
        {days}
        {/* <i className={getClass("E", "fa fa-lg fa-eye")}></i> */}
      </div>
      <div className="icon-div">{hours}</div>
      <div className="icon-div">{minutes}</div>
    </Row>
  );
};

export default CountdownBadge;
