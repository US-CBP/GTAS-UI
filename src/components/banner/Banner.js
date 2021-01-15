// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useState } from "react";
import { Alert } from "react-bootstrap";
/**
 *
 * **This is a simple Notification Banner for displaying dismissable messages to the user.**
 */

//  * We are currently assuming this is a dummy display and that parent pages will not need to know when the banner is closed.
// If we decide the parent needs this info, convert this to a hook and handle the onClose in the parent.

const Banner = ({ id, styleName, text, defaultState }) => {
  const [state, setState] = useState(defaultState);

  if (!state) {
    return null;
  }

  const close = () => {
    setState(false);
  };

  if (text !== undefined) {
    return (
      <div id={id} className={`notification is-${styleName}`}>
        <Alert variant={styleName} onClose={close} dismissible>
          <p>{text}</p>
        </Alert>
      </div>
    );
  }

  return null;
};

export default Banner;
