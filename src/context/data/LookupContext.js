// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { createContext, useReducer } from "react";
import { CTX } from "../../utils/constants";

const initialState = [];

export const LookupContext = createContext();

const setStorage = (key, val) => {
  sessionStorage.setItem(key, JSON.stringify(val));
};

const LookupProvider = ({ children }) => {
  const { Provider } = LookupContext;

  const LookupReducer = (state, action) => {
    switch (action.type) {
      case CTX.COUNTRIES: {
        setStorage(CTX.COUNTRIES, action.data);
        return action.data;
      }
      case CTX.AIRPORTS: {
        setStorage(CTX.AIRPORTS, action.data);
        return action.data;
      }
      case CTX.AIRPORTCODES: {
        setStorage(CTX.AIRPORTCODES, action.data);
        return action.data;
      }
      case CTX.CARRIERS: {
        setStorage(CTX.CARRIERS, action.data);
        return action.data;
      }
      case CTX.RULECATS: {
        setStorage(CTX.RULECATS, action.data);
        return action.data;
      }
      case CTX.CCTYPES: {
        setStorage(CTX.CCTYPES, action.data);
        return action.data;
      }
      case "lastRule": {
        setStorage("lastRule", action.data);
        return action.data;
      }
      case "removeRule": {
        sessionStorage.removeItem("lastRule");
        return [];
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
