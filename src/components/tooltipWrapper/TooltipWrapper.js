// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useContext, useState } from "react";
import { asArray, hasData } from "../../utils/utils";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { LookupContext } from "../../context/data/LookupContext";

const ToolTipWrapper = props => {
  const className = props?.className || "overlay-content";
  const { getSingleKeyValue } = useContext(LookupContext);
  const notFound = "Not Found";
  const [toolTipVal, setToolTipVal] = useState("Loading...");
  const [isComplete, setIsComplete] = useState();
  const val = props.data.val;
  const lkup = props.data.lkup;
  const title = props.data.title;

  const renderTooltip = props => (
    <Popover {...props}>
      <Popover.Content className={className}>{toolTipVal}</Popover.Content>
    </Popover>
  );

  /** Set the tooltip display text on mouseover if it hasn't already been set. The title should be passed in by the parent,
   * which should fetch on load to get all values for the page at once. For cases where the parent doesn't do the initial
   * fetch or where the initial fetch didn't include this record (eg, it has only records where favorite = true, but this record
   * isn't marked favorite yet), we can do a onesie fetch here with getSingleKeyValue() on the first mouseover and redisplay
   * that value until this tooltip goes out of scope.
   *
   * Note that getSingleKeyValue() automatically marks fetched records as favorite in indexeddb so they will be included all
   * subsequent initial fetcehes. */
  const getToolTipValue = () => {
    if (isComplete) return;

    if (title) {
      setToolTipVal(title);
      setIsComplete(true);
      return;
    }

    getSingleKeyValue(lkup, false, val).then(rec => {
      setToolTipVal(rec.title || notFound);
      setIsComplete(true);
    });
  };

  const data = {
    val: val,
    lookup: lkup,
    placement: props.data?.placement || "top",
    show: props.data?.show || 250,
    hide: props.data?.hide || 400
  };

  return (
    <OverlayTrigger
      placement={data.placement}
      delay={{ show: data.show, hide: data.hide }}
      onEnter={getToolTipValue}
      overlay={renderTooltip}
    >
      <span>{data.val}</span>
    </OverlayTrigger>
  );
};

export default ToolTipWrapper;
