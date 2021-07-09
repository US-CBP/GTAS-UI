// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useEffect, useState } from "react";
import { alt, hasData } from "../../utils/utils";
import "./CountdownBadge.css";
import Xl8 from "../xl8/Xl8";
import { TIME } from "../../utils/constants";

const CountdownBadge = props => {
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [dayraw, setDayraw] = useState();
  const [hrsraw, setHrsraw] = useState();
  const [sign, setSign] = useState();
  const [isPos, setIsPos] = useState();

  const incoming = new Date(props.future);
  const pad = val => {
    if (isNaN(val)) return 0;

    const sign = val < 0 ? "-" : "";
    const res = alt(Math.abs(val), "0")
      .toString()
      .padStart(2, "0");
    return `${sign}${res}`;
  };

  const altZero = (val, alt = "") => {
    if (+val === 0 || isNaN(+val)) return alt;
    return val;
  };
  const parse = (val, alt) => altZero(pad(val), alt);

  //TODO - refactor. clean and possibly move the calcs to utils.
  const calcTimer = () => {
    const now = new Date();
    const deltaRaw = (incoming - now) / 1000;
    const isPos = deltaRaw >= 0;
    const delta = Math.abs(deltaRaw);

    const dayraw = Math.floor(delta / 86400);
    const hrsraw = Math.floor(delta / 3600) % 24;
    const minraw = Math.floor(delta / 60) % 60;
    const days = altZero(dayraw);
    const hours = !days ? parse(hrsraw) : pad(Math.abs(hrsraw));
    const minutes = !days && !hours ? parse(minraw, "00") : pad(Math.abs(minraw));

    setSign(isPos ? "" : "-");
    setDayraw(dayraw);
    setHrsraw(hrsraw);
    setMinutes(minutes);
    setIsPos(isPos);
    setDays(days);
    setHours(hours);
    setMinutes(minutes);
  };

  const getIconClass = () => {
    const dir = props.direction;
    if (!dir) return "";

    return dir === "I" ? "img-arrival" : dir === "O" ? "img-departure" : "";
  };

  const d = <Xl8 xid="cdb001">d</Xl8>;
  const h = <Xl8 xid="cdb002">h</Xl8>;
  const m = <Xl8 xid="cdb003">m</Xl8>;

  const getStyle = () => {
    if (dayraw > 1) return "bordered cdb-white";

    if (!isPos) return "bordered cdb-gray";
    if (dayraw === 1) return "bordered cdb-green";
    if (hrsraw >= 12) return "bordered cdb-yellow";
    if (hrsraw >= 1) return "bordered cdb-orange";

    return "bordered cdb-red";
  };

  const getSpanStyle = val => {
    if (hasData(val)) return "cdb-days-div";
    return "";
  };

  useEffect(() => {
    calcTimer();
  }, [incoming]);

  useEffect(() => {
    const interval = setInterval(() => {
      calcTimer();
    }, TIME.MINUTE);

    return () => clearInterval(interval);
  }, []);

  if (!props.future) return <></>;

  return (
    <div className="text-center" key={incoming}>
      <div flex="true" no-wrap="true" className={`cdb-row sm ${getStyle()}`}>
        <span className={getIconClass()}></span>
        <span>{sign}</span>
        <span className={getSpanStyle(days)}>
          {days}
          {hasData(days) && d}
        </span>
        <span className={getSpanStyle(hours)}>
          {hours}
          {hasData(hours) && h}
        </span>
        <span className={getSpanStyle(minutes)}>
          {minutes}
          {hasData(minutes) && m}
        </span>
      </div>
    </div>
  );
};

export default CountdownBadge;
