// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React from "react";
import "./Main.css";

const Main = props => {
  const style = props.className || "main";
  return (
    <div className={style}>
      <div className="main-inner">{props.children}</div>
    </div>
  );
};

export default Main;
