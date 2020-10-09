import React, { createContext, useReducer } from "react";
import Cookies from "js-cookie";
import { hasData } from "../../utils/utils";

const USERSTORE = "user";
const initialState = {
  authenticated: false,
  fullName: undefined,
  userId: undefined,
  userRoles: [],
  userToken: undefined,
  queryPageSize: 25,
  userPageSize: 25,
  landingPage: undefined,
  emailEnabled: undefined,
  highPriorityEmail: undefined,
  lastRule: {},
  lastQuery: {}
};

export const UserContext = createContext();

const setStorage = (key, val) => {
  sessionStorage.setItem(key, JSON.stringify(val));
};

const UserProvider = ({ children }) => {
  const { Provider } = UserContext;

  const UserReducer = (state, action) => {
    switch (action.type) {
      case "refresh":
      case "login": {
        setStorage(USERSTORE, action.user);
        return action.user;
      }
      case "logoff": {
        sessionStorage.removeItem(USERSTORE);
        Cookies.remove("JSESSIONID");
        setStorage(USERSTORE, initialState);
        return initialState;
      }
      case "lastRule": {
        let storedUser = JSON.parse(sessionStorage.getItem(USERSTORE));
        storedUser.lastRule = action.lastRule;
        setStorage(USERSTORE, storedUser);
        return action.user;
      }
      case "dropRule": {
        let storedUser = JSON.parse(sessionStorage.getItem(USERSTORE));
        storedUser.lastQuery = {};
        setStorage(USERSTORE, storedUser);
        return action.user;
      }
      default:
        setStorage(USERSTORE, initialState);
        return initialState;
    }
  };

  const [userState, userAction] = useReducer(
    UserReducer,
    sessionStorage.getItem(USERSTORE) || initialState
  );

  const getUserState = () => {
    if (userState.authenticated) return userState;

    const storedUser = JSON.parse(sessionStorage.getItem(USERSTORE));

    if (hasData(storedUser) && storedUser.authenticated) {
      return storedUser;
    }
    return userAction({ type: "default" });
  };

  return <Provider value={{ getUserState, userAction }}>{children}</Provider>;
};

export default UserProvider;
