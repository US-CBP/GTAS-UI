// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useContext, useState, useMemo } from "react";
import { asArray, hasData } from "../../utils/utils";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { LookupContext } from "../../context/data/LookupContext";

const ToolTipWrapper = props => {
  const className = props?.className || "overlay-content";
  const { getCachedKeyValues, getSingleKeyValue } = useContext(LookupContext);
  const initToolTipState = "Loading...";
  const notFound = "Not Found";
  const [toolTipVal, setToolTipVal] = useState(initToolTipState);
  const val = props.data.val;
  const lkup = props.data.lkup;
  const title = props.data.title;

  const renderTooltip = props => (
    <Popover {...props}>
      <Popover.Content className={className}>{toolTipVal}</Popover.Content>
    </Popover>
  );

  const getToolTipValue = () => {
    if (title) {
      setToolTipVal(title);
      return;
    }

    setToolTipVal(initToolTipState);
    getSingleKeyValue(lkup, false, val).then(type => {
      setToolTipVal(type.title || notFound);
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
      //onExited={() => setToolTipVal(initToolTipState)}
      overlay={renderTooltip}
    >
      <span>{data.val}</span>
    </OverlayTrigger>
  );
};

export default ToolTipWrapper;
