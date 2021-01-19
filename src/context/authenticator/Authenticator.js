// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useContext } from "react";
import { Redirect } from "@reach/router";
import { UserContext } from "../user/UserContext";
import { FULLPATH_TO } from "../../utils/constants";

const Authenticator = props => {
  const { getUserState } = useContext(UserContext);
  const user = getUserState() || {};

  if (!user?.authenticated) return <Redirect to={FULLPATH_TO.LOGIN} noThrow></Redirect>;

  return <>{props.children}</>;
};

export default Authenticator;
