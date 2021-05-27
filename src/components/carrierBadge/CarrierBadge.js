// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React from "react";
import { hasData } from "../../utils/utils";
import LazyImage from "../lazyImage/LazyImage";
import { LK } from "../../utils/constants";
import "./CarrierBadge.scss";

const CarrierBadge = props => {
  const src = props.src;

  if (!hasData(src)) return <></>;

  return (
    <div className="carrier-badge nozoom">
      <LazyImage val={src} type={LK.CARRIER} size="70" nozoom></LazyImage>
    </div>
  );
};

export default CarrierBadge;
