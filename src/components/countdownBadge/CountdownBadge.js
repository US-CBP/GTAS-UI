import React from "react";
import { Row, Badge } from "react-bootstrap";
import { alt } from "../../utils/utils";
import "./CountdownBadge.css";

//TODO - refactor. clean and possibly move the calcs to utils.
const CountdownBadge = props => {
  if (!props.future) return <></>;

  const incoming = new Date(props.future);
  const now = props.now || new Date();

  const pad = val => {
    if (isNaN(val)) return 0;

    const sign = +val < 0 ? "-" : "";
    const res = alt(Math.abs(val), "0")
      .toString()
      .padStart(2, "0");
    return `${sign}${res}`;
  };

  const altZero = val => {
    if (+val === 0 || isNaN(+val)) return "";
    return val;
  };

  const delta = (incoming - now) / 1000;
  const isPos = delta > 0;
  const round = isPos ? Math.floor : Math.ceil;
  const parse = val => altZero(pad(val));

  const dayraw = round(delta / 86400);
  const hrsraw = round(delta / 3600) % 24;
  const minraw = round(delta / 60) % 60;
  const days = altZero(dayraw);
  const hours = !days ? parse(hrsraw) : pad(Math.abs(hrsraw));
  const minutes = !days && !hours ? parse(minraw) : pad(Math.abs(minraw));

  const getStyle = () => {
    if (dayraw > 1) return "";

    if (!isPos) return "bordered cdb-gray";
    if (dayraw === 1) return "bordered cdb-green";
    if (hrsraw >= 12) return "bordered cdb-yellow";
    if (hrsraw >= 1) return "bordered cdb-orange";

    return "bordered cdb-red";
  };

  return (
    <Row flex="true" no-wrap="true" className={`cdb-row ${getStyle()}`}>
      <div className="cdb-days-div">{days}</div>
      <div>{hours}</div>
      <div>:{minutes}</div>
    </Row>
  );
};

export default CountdownBadge;
