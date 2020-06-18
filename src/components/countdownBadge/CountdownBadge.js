import React from "react";
import { Row, Badge } from "react-bootstrap";
import { alt } from "../../utils/utils";
import "./CountdownBadge.css";
// import { DAYS } from "../../utils/constans";

//TODO - refactor. clean and possibly move the calcs to utils.
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

  if (!days) hours = altZero(padded(Math.floor(delta / 3600) % 24));
  else hours = padded(Math.floor(delta / 3600) % 24);

  delta -= hours * 3600;

  minutes = padded(Math.floor(delta / 60) % 60);
  delta -= minutes * 60;

  seconds = (delta % 60, 2).toFixed(2);

  const dayStyle = () => {
    if (days > 2) return "cdb-violet";
    if (days > 1) return "cdb-blue";
    if (days == 1) return "cdb-green";

    return "";
  };

  const hourStyle =
    !days && hours >= 15 ? "cdb-yellow" : !days && hours < 15 ? "cdb-orange" : "";
  const minuteStyle = !days && !hours && minutes > 0 ? "cdb-red" : "";

  return (
    <Row flex="true" no-wrap="true" className="cdb-row">
      <div className="icon-div">
        <Badge className={dayStyle()}>{days}</Badge>
      </div>
      <div className="icon-div">
        <Badge className={hourStyle}>{hours}</Badge>
      </div>
      <div className="icon-div">
        :<Badge className={minuteStyle}>{minutes}</Badge>
      </div>
    </Row>
  );
};

export default CountdownBadge;
