import React, { createContext, useReducer } from "react";
import Cookies from "js-cookie";
import { hasData } from "../../utils/utils";

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
        setStorage("user", action.user);
        return action.user;
      }
      case "logoff": {
        sessionStorage.removeItem("user");
        Cookies.remove("JSESSIONID");
        setStorage("user", initialState);
        return initialState;
      }
      case "lastRule": {
        let storedUser = JSON.parse(sessionStorage.getItem("user"));
        storedUser.lastRule = action.lastRule;
        console.log(storedUser);
        setStorage("user", storedUser);
        return action.user;
      }
      case "dropRule": {
        let storedUser = JSON.parse(sessionStorage.getItem("user"));
        storedUser.lastQuery = {};
        setStorage("user", storedUser);
        return action.user;
      }
      default:
        setStorage("user", initialState);
        return initialState;
    }
  };

  const [userState, userAction] = useReducer(
    UserReducer,
    sessionStorage.getItem("user") || initialState
  );

  const getUserState = () => {
    if (userState.authenticated) return userState;

    const storedUser = JSON.parse(sessionStorage.getItem("user"));

    if (hasData(storedUser) && storedUser.authenticated) {
      return storedUser;
    }
    return userAction({ type: "default" });
  };

  return <Provider value={{ getUserState, userAction }}>{children}</Provider>;
};

export default UserProvider;
