// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useContext, useState, useMemo } from "react";
import { asArray, hasData } from "../../utils/utils";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { LookupContext } from "../../context/data/LookupContext";

const ToolTipWrapper = props => {
  const className = props?.className || "overlay-content";
  const { getCachedKeyValues } = useContext(LookupContext);
  const initToolTipState = "Loading...";
  const [toolTipVal, setToolTipVal] = useState(initToolTipState);
  const val = props.data.val;
  const lkup = props.data.lkup;

  const renderTooltip = props => (
    <Popover {...props}>
      <Popover.Content className={className}>{toolTipVal}</Popover.Content>
    </Popover>
  );

  const getToolTipValue = () => {
    setToolTipVal(initToolTipState);
    getCachedKeyValues(lkup).then(types => {
      const type = asArray(types).find(t => {
        return t.value === val;
      });
      setToolTipVal(type.title);
    });
  };

  const data = {
    val: val,
    lookup: lkup,
    placement: hasData(props.data.placement) ? props.data.placement : "top",
    show: hasData(props.data.show) ? props.data.show : 250,
    hide: hasData(props.data.hide) ? props.data.hide : 400
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
