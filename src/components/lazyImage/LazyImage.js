// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useCallback, useState, useEffect } from "react";
import { LK } from "../../utils/constants";
// import { localeMonthDayTime, hasData, alt, asArray } from "../../utils/utils";
import LazyLoad from "react-lazyload";
import "./LazyImage.scss";

const LazyImage = ({ val, type }) => {
  const extension = type === LK.COUNTRY ? "svg" : "png";
  const [src, setSrc] = useState();

  useEffect(() => {
    setSrc(`${process.env.PUBLIC_URL}/flags/${type}/${val}.${extension}`);
  }, [val]);

  return (
    <>
      <LazyLoad height={25} offset={100} overflow className="lazy-image-wrapper">
        <img alt={val} src={src} className="lazy-image" />
      </LazyLoad>
    </>
  );
};

export default LazyImage;
