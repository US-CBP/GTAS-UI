// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useState, useEffect } from "react";
import LazyLoad from "react-lazyload";
import { Popover, OverlayTrigger } from "react-bootstrap";
import { LK } from "../../utils/constants";
import { alt } from "../../utils/utils";
import "./LazyImage.scss";

const LazyImage = ({ val, type, size, nozoom }) => {
  const extension = type === LK.COUNTRY ? "svg" : "png";
  const [src, setSrc] = useState();
  const altVal = alt(val);
  const zoomEnabled = !nozoom; // enabled by default
  const placeholderHeight = size || 25;

  /**
   * APB TODO - code handling link carrier values here and in Tooltipwrap is fragile - needs refacking
   * Need to consolidate the logic and structure the components better (also cardwithtable), they are currently very leaky
   */
  // if we receive the full flight number for a carrier, eg UA1010, extract the carrier code
  let dataReady = altVal.length === undefined ? altVal.props?.children : altVal;
  dataReady =
    type === LK.CARRIER && dataReady.length === 6 ? dataReady.slice(0, 2) : dataReady;

  useEffect(() => {
    setSrc(`${process.env.PUBLIC_URL}/flags/${type}/${dataReady}.${extension}`);
  }, []);

  return (
    <>
      {dataReady && zoomEnabled && (
        <LazyLoad height={placeholderHeight} overflow className="lazy-image-wrapper">
          <OverlayTrigger
            trigger={["click"]}
            rootClose
            placement={"top"}
            overlay={
              <Popover>
                <Popover.Content className="lazy-image-full">
                  <img alt={dataReady} src={src} />
                </Popover.Content>
              </Popover>
            }
          >
            <img alt={dataReady} src={src} className="lazy-image" />
          </OverlayTrigger>
        </LazyLoad>
      )}
      {dataReady && !zoomEnabled && (
        <LazyLoad height={placeholderHeight} overflow className="lazy-image-wrapper">
          <img alt={dataReady} src={src} className="lazy-image" />
        </LazyLoad>
      )}
    </>
  );
};

export default LazyImage;
