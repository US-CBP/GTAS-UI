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
