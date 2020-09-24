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
  RUN: "Run"
};

export const ROLE = {
  ADMIN: "Admin",
  QRYMGR: "Manage Queries",
  PAXVWR: "View Passenger",
  WLMGR: "Manage Watch List",
  RULEMGR: "Manage Rules",
  SYSADMIN: "SysAdmin",
  HITMGR: "Manage Hits",
  CASEMGR: "Manage Cases",
  FLIGHTVWR: "View Flights",
  ANY: "Any"
};

export const CTX = {
  CARRIERS: "carriers",
  COUNTRIES: "countries",
  AIRPORTS: "airports",
  AIRPORTCODES: "airportcodes",
  RULECATS: "rulecats"
};

export const TIME = {
  MINUTE: 60000,
  MINUTES_2: 120000,
  MINUTES_10: 600000,
  MINUTES_25: 1500000,
  SECS_30: 30000,
  SECS_10: 10000
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
