// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

export const NO_URI = "No URI was received in props";

export const QR = {
  RULE: "Rule",
  QUERY: "Query",
  MY: "my",
  ALL: "all"
};

export const RULETAB = {
  MY: "my",
  ALL: "all"
};

export const MODE = {
  ADD: "Add",
  EDIT: "Edit"
};

export const ACTION = {
  SAVE: "Save",
  DELETE: "Delete",
  CANCEL: "Cancel",
  CLOSE: "Close",
  UPDATE: "Update",
  RUN: "Run",
  UPDATEALL: "Update All"
};

export const STATUS = {
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE"
};

export const HIT_STATUS = {
  REVIEWED: "Reviewed",
  NEW: "New",
  REOPENED: "Re_opened"
};

export const DIRECTION = {
  I: "Inbound",
  O: "Outbound",
  C: "Continuance"
};

export const ROLE = {
  ADMIN: "Admin",
  QRYMGR: "Manage Queries",
  PAXVWR: "View Passenger",
  WLMGR: "Manage Watch List",
  RULEMGR: "Manage Rules",
  HITMGR: "Manage Hits",
  FLIGHTVWR: "View Flights",
  ANY: "Any"
};

export const LK = {
  COUNTRY: "country",
  CARRIER: "carrier",
  AIRPORT: "airport",
  CCTYPE: "cctype",
  HITCAT: "hitcats",
  NOTETYPE: "notetype",
  ROLE: "role"
};

export const CTX = {
  CARRIERS: "carriers",
  COUNTRIES: "countries",
  AIRPORTS: "airports",
  AIRPORTCODES: "airportcodes",
  CCTYPES: "cctypes",
  RULECATS: "rulecats"
};

// router paths to the most commonly referenced pages
// may also need a util to build partials
export const FULLPATH_TO = {
  LOGIN: "/login",
  FLIGHTS: "/gtas/flights",
  FORGOTPWD: "/forgot-password",
  RESETPWD: "/reset-password",
  SIGNUP: "/signup",
  FORGOTUSERNAME: "/forgot-username"
};

export const TIME = {
  MINUTE: 60000,
  MINUTES_2: 120000,
  MINUTES_10: 600000,
  MINUTES_25: 1500000,
  SECS_30: 30000,
  SECS_10: 10000,
  SECOND: 1000
};

export const MS = secs => secs * 1000;
export const SECONDS = secs => secs;
export const SECSToMS = secs => MS(secs);

export const MINUTES = mins => {
  const rate = 60;
  return {
    inMs: () => mins * SECSToMS(rate),
    inSeconds: () => mins * SECONDS(rate)
  };
};

export const HOURS = hours => {
  const rate = 60;
  return {
    inMs: () => hours * MINUTES(rate).inMs(),
    inSeconds: () => hours * MINUTES(rate).inSeconds(),
    inMinutes: () => hours * rate
  };
};

export const DAYS = days => {
  const rate = 60;
  return {
    inHours: () => days * rate,
    inMs: () => days * HOURS(rate).inMs(),
    inSeconds: () => days * HOURS(rate).inSeconds()
  };
};

export const UNDEFINEDCHAR = "ꞏ"; // unicode U+A78F. Char not mapped to any language char, good as a delimiter.

export const FORCE = {
  FULL: 0,
  PARTIAL: 1
};
