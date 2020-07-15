import React from "react";

import "./Overlay.scss";
import { Popover, OverlayTrigger } from "react-bootstrap";

const Overlay = props => {
  return (
    <OverlayTrigger
      trigger={props.trigger}
      rootClose
      placement="top"
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
