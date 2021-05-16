// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useState, useEffect } from "react";
import { LK } from "../../utils/constants";
import { alt } from "../../utils/utils";
import LazyLoad from "react-lazyload";
import "./LazyImage.scss";

const LazyImage = ({ val, type }) => {
  const extension = type === LK.COUNTRY ? "svg" : "png";
  const [src, setSrc] = useState();
  const altVal = alt(val);

  /**
   * APB TODO - code handling link carrier values here and in Tooltipwrap is fragile - needs refacking
   * Need to consolidate the logic and structure the components better (also cardwithtable), they are currently very leaky
   */
  // if we receive the full flight number for a carrier, eg UA1010, extract the carrier code
  let cleanVal = altVal.length === undefined ? altVal.props?.children : altVal;
  cleanVal =
    type === LK.CARRIER && cleanVal.length === 6 ? cleanVal.slice(0, 2) : cleanVal;

  useEffect(() => {
    setSrc(`${process.env.PUBLIC_URL}/flags/${type}/${cleanVal}.${extension}`);
  }, []);

  return (
    <>
      <LazyLoad height={25} offset={100} overflow className="lazy-image-wrapper">
        <img alt={cleanVal} src={src} className="lazy-image" />
      </LazyLoad>
    </>
  );
};

export default LazyImage;
