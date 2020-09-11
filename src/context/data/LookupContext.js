import React, { createContext, useReducer } from "react";
import { CTX } from "../../utils/constants";

const initialState = [];

export const LookupContext = createContext();

const setStorage = (key, val) => {
  sessionStorage.setItem(key, JSON.stringify(val));
  console.log(key, val);
};

const LookupProvider = ({ children }) => {
  const { Provider } = LookupContext;

  const LookupReducer = (state, action) => {
    console.log(state, action);

    switch (action.type) {
      case CTX.COUNTRIES: {
        sessionStorage.removeItem(CTX.COUNTRIES);
        setStorage(CTX.COUNTRIES, action.countries);
        return state;
      }
      case CTX.AIRPORTS: {
        sessionStorage.removeItem(CTX.AIRPORTS);
        setStorage(CTX.AIRPORTS, state);
        return state;
      }
      case CTX.CARRIERS: {
        sessionStorage.removeItem(CTX.CARRIERS);
        setStorage(CTX.CARRIERS, state);
        return state;
      }
      case CTX.RULECATS: {
        sessionStorage.removeItem(CTX.RULECATS);
        setStorage(CTX.RULECATS, state);
        return state;
      }
      default:
        return [];
    }
  };

  const [lookupState, lookupAction] = useReducer(
    LookupReducer,
    sessionStorage.getItem(initialState)
  );

  const getLookupState = type => {
    return JSON.parse(sessionStorage.getItem(type)) || initialState;
  };

  return <Provider value={{ getLookupState, lookupAction }}>{children}</Provider>;
};

export default LookupProvider;
