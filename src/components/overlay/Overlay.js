// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React from "react";

import "./Overlay.scss";
import { Popover, OverlayTrigger } from "react-bootstrap";

const Overlay = props => {
  return (
    <OverlayTrigger
      trigger={props.trigger}
      rootClose
      placement={props.placement || "top"}
      overlay={
        <Popover>
          <Popover.Content className="overlay-content">{props.content}</Popover.Content>
        </Popover>
      }
    >
      {props.children}
    </OverlayTrigger>
  );
};

export default Overlay;
