import React, { useContext } from "react";
import { UserContext } from "../user/UserContext";
import { asArray, titleCase } from "../../utils/utils";
import PageUnauthorized from "../../pages/pageUnauthorized/PageUnauthorized";

const UNAUTHED = <PageUnauthorized path="pageUnauthorized"></PageUnauthorized>;

const RoleAuthenticator = props => {
  const alt = props.alt ?? UNAUTHED;
  const { getUserState } = useContext(UserContext);
  let hasRole = false;
  const validUser = getUserState();

  if (!validUser) return alt;

  const userRoles = validUser.userRoles.map(item => titleCase(item));

  (asArray(props.roles) || []).forEach(element => {
    if (userRoles.includes(titleCase(element))) {
      hasRole = true;
      return;
    }
  });

  return hasRole ? <>{props.children}</> : alt;
};

export default RoleAuthenticator;
