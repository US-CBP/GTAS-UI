import GenericService from "./genericService";
import { hasData } from "../utils/utils";
import { object } from "prop-types";

const GET = "get";
const DELETE = "delete";
const POST = "post";
const PUT = "put";
const AJSON = "application/json, text/plain, */*";
const JSONUTF8 = "application/json;charset=UTF-8";
const FORM = "application/x-www-form-urlencoded";

const LOGINHEADER = {
  "X-Login-Ajax-call": "true",
  "Content-Type": FORM,
  "X-Requested-With": "XMLHttpRequest",
  Accept: AJSON,
  "Accept-Encoding": "gzip, deflate, br"
};

const BASEHEADER = { "Content-Type": JSONUTF8, Accept: AJSON };
const PUTBODY = "The put method requires a valid body parameter.";
const POSTBODY = "The post method requires a valid body or data parameter.";
const PUTID = "The put method requires a valid id parameter.";
const PUTPARAMS = "The put method requires parameters.";
const DELETEID = "The delete method requires a valid id parameter.";

function get(uri, headers, id, params) {
  let uricomplete = `${uri}${hasData(id) ? `/${id}` : ""}${
    hasData(params) ? params : ""
  }`;

  return GenericService({ uri: uricomplete, method: GET, headers: headers });
}

function post(uri, headers, body, data) {
  // if (
  //   !hasData(body) &&
  //   !(body instanceof FormData) &&
  //   !(body instanceof URLSearchParams) &&
  //   !(data instanceof URLSearchParams) &&
  //   !hasData(data)
  // )
  //   throw new TypeError(POSTBODY);

  return GenericService({
    uri: uri,
    method: POST,
    headers: headers,
    body: body
  });
}

function put(uri, headers, id, body) {
  if (!hasData(body)) throw new TypeError(PUTBODY);
  if (!hasData(id)) throw new TypeError(PUTID);

  const query = `\\${id}`;

  return GenericService({
    uri: uri + query,
    method: PUT,
    body: body,
    headers: headers
  });
}

function putNoId(uri, headers, body) {
  if (!hasData(body)) throw new TypeError(PUTBODY);

  return GenericService({
    uri: uri,
    method: PUT,
    body: body,
    headers: headers
  });
}

function del(uri, id) {
  if (!hasData(id)) throw new TypeError(DELETEID);

  return GenericService({ uri: `${uri}\\${id}`, method: DELETE });
}

function postBodyWrapper(body) {
  const objectBody = JSON.stringify({ ...body });
  return objectBody;
}

// APB - ENTITY CONSTANTS and ENTITY METHODS is the only code we should need to touch when adding new endpoints
const BASE_URL = process.env.REACT_APP_BASE_URL;

const LOGIN = `${BASE_URL}gtas/authenticate`;
const USERS = `${BASE_URL}gtas/users/`;
const WLCATS = `${BASE_URL}gtas/wl/watchlistCategories`;
const WLCATSPOST = `${BASE_URL}gtas/wlput/wlcat/`;
const FLIGHTS = `${BASE_URL}gtas/api/flights`;
const AUDITLOG = `${BASE_URL}gtas/auditlog`;
const ERRORLOG = `${BASE_URL}gtas/errorlog`;
const CASES = `${BASE_URL}gtas/hits`;
const SETTINGSINFO = `${BASE_URL}gtas/settingsinfo`;
const GETRULECATS = `${BASE_URL}getRuleCats`;
const PAX = `${BASE_URL}gtas/passengers/passenger`;
const FLIGHTPAXHITSUMMARY = `${BASE_URL}gtas/hit/flightpassenger`;
const FLIGHTPAX = `${BASE_URL}gtas/api/flights/flightpax`;
const LOADERSTATISTICS = `${BASE_URL}gtas/api/statistics`;
const RULE_CATS = `${BASE_URL}gtas/getRuleCats`;
const NOTE_TYPES = `${BASE_URL}gtas/passengers/passenger/notetypes`;
const LOGGEDIN_USER = `${BASE_URL}gtas/user`;
const NOTE_TYPESPOST = `${BASE_URL}gtas/api/noteType`;
const CREATEUSER = `${BASE_URL}gtas/users/1`;
const ROLES = `${BASE_URL}gtas/roles/`;
const CODES_AIRPORT = `${BASE_URL}gtas/api/airport`;
const CODES_COUNTRY = `${BASE_URL}gtas/api/country`;
const CODES_CARRIER = `${BASE_URL}gtas/api/carrier`;
const CODES_RESTOREALL_AIRPORT = `${BASE_URL}gtas/api/airport/restoreAll`;
const CODES_RESTOREALL_COUNTRY = `${BASE_URL}gtas/api/country/restoreAll`;
const CODES_RESTOREALL_CARRIER = `${BASE_URL}gtas/api/carrier/restoreAll`;
const CODES_RESTORE_AIRPORT = `${BASE_URL}gtas/api/airport/restore`;
const CODES_RESTORE_CARRIER = `${BASE_URL}gtas/api/country/restore`;
const CODES_RESTORE_COUNTRY = `${BASE_URL}gtas/api/carrier/restore`;
const PAXDETAILSREPORT = `${BASE_URL}gtas/paxdetailreport`;
// ENTITY METHODS
export const users = {
  get: (id, params) => get(USERS, BASEHEADER, id, params),
  put: (id, body) => put(USERS, BASEHEADER, id, body),
  post: body => post(USERS, BASEHEADER, body)
};
export const watchlistcats = {
  get: (id, params) => get(WLCATS, BASEHEADER, id, params),
  post: body => post(WLCATS, BASEHEADER, body)
};

export const watchlistcatspost = {
  post: body => {
    const objectBody = JSON.stringify({ ...body });
    return post(WLCATSPOST, BASEHEADER, objectBody);
  }
};
export const userService = {
  get: (id, params) => get(USERS, BASEHEADER),
  post: body => {
    const objectBody = JSON.stringify({ ...body });
    return post(CREATEUSER, BASEHEADER, objectBody);
  }
};

export const flights = { get: params => get(FLIGHTS, BASEHEADER, undefined, params) };
export const auditlog = { get: (id, params) => get(AUDITLOG, BASEHEADER) };
export const errorlog = { get: (id, params) => get(ERRORLOG, BASEHEADER) };
export const cases = { get: (id, params) => get(CASES, BASEHEADER) };
export const ruleCats = { get: (id, params) => get(RULE_CATS, BASEHEADER) };
export const settingsinfo = {
  get: (id, params) => get(SETTINGSINFO, BASEHEADER),
  put: body => putNoId(SETTINGSINFO, BASEHEADER, postBodyWrapper(body))
};
export const getrulecats = { get: (id, params) => get(GETRULECATS, BASEHEADER) };
export const paxdetails = {
  get: (flightId, paxId) => {
    const path = `${PAX}/${paxId}/details?flightId=${flightId}`;
    return get(path, BASEHEADER);
  }
};
export const paxFlightHisoty = {
  get: (flightId, paxId) => {
    const path = `${PAX}/flighthistory?paxId=${paxId}&flightId=${flightId}`;
    return get(path, BASEHEADER);
  }
};
export const paxFullTravelHistory = {
  get: (flightId, paxId) => {
    const path = `${PAX}/bookingdetailhistory?paxId=${paxId}&flightId=${flightId}`;
    return get(path, BASEHEADER);
  }
};
export const paxWatchListLink = {
  get: (id, params) => {
    const path = `${PAX}/getwatchlistlink?paxId=`;
    return get(path, BASEHEADER, id, params);
  }
};
export const flightpaxHitSummary = {
  get: (flightId, paxId) => {
    const path = `${FLIGHTPAXHITSUMMARY}?passengerId=${paxId}&flightId=${flightId}`;
    return get(path, BASEHEADER);
  }
};
export const paxEventNotesHistory = {
  get: (paxId, historicalNotes) => {
    const path = `${PAX}/notes?paxId=${paxId}&historicalNotes=${historicalNotes}`;
    return get(path, BASEHEADER);
  },
  post: (paxId, body) => {
    const tempBody = {
      ...body,
      noteType: [body.noteType],
      rtfNote: `<div><!--block -->${body.plainTextNote}</div>`, //this should be fixed
      passengerId: paxId
    };
    return post(`${PAX}/note`, BASEHEADER, postBodyWrapper(tempBody));
  }
};

export const paxdetailsReport = {
  get: (paxId, flightId) => {
    const path = `${PAXDETAILSREPORT}?paxId=${paxId}&flightId=${flightId}`;
    return get(path, BASEHEADER);
  }
};
export const flightPassengers = { get: id => get(FLIGHTPAX, BASEHEADER, id) };
export const loaderStats = { get: (id, params) => get(LOADERSTATISTICS, BASEHEADER) };
export const notetypes = {
  get: (id, params) => get(NOTE_TYPES, BASEHEADER),
  post: body => post(NOTE_TYPESPOST, BASEHEADER, postBodyWrapper(body))
};
export const loggedinUser = { get: (id, params) => get(LOGGEDIN_USER, BASEHEADER) };
export const roles = { get: get(ROLES, BASEHEADER) };
export const codeEditor = {
  get: {
    carrierCodes: (id, params) => get(CODES_CARRIER, BASEHEADER),
    countryCodes: (id, params) => get(CODES_COUNTRY, BASEHEADER),
    airportCodes: (id, params) => get(CODES_AIRPORT, BASEHEADER)
  },
  put: {
    updateCarrier: body => put(CODES_CARRIER, BASEHEADER, body),
    updateCountry: body => put(CODES_COUNTRY, BASEHEADER, body),
    updateAirport: body => put(CODES_AIRPORT, BASEHEADER, body),
    restoreCarriersAll: body => putNoId(CODES_RESTOREALL_CARRIER, BASEHEADER, body),
    restoreCountriesAll: body => putNoId(CODES_RESTOREALL_COUNTRY, BASEHEADER, body),
    restoreAirportsAll: body => putNoId(CODES_RESTOREALL_AIRPORT, BASEHEADER, body),
    restoreCarrier: body => putNoId(CODES_RESTOREALL_AIRPORT, BASEHEADER, body),
    restoreCountry: body => putNoId(CODES_RESTOREALL_AIRPORT, BASEHEADER, body),
    restoreAirport: body => putNoId(CODES_RESTOREALL_AIRPORT, BASEHEADER, body)
  },
  post: {
    createCarrier: body => post(CODES_CARRIER, BASEHEADER, postBodyWrapper(body)),
    createCountry: body => post(CODES_COUNTRY, BASEHEADER, postBodyWrapper(body)),
    createAirport: body => post(CODES_AIRPORT, BASEHEADER, postBodyWrapper(body))
  },
  delete: {
    deleteCarrier: id => del(CODES_CARRIER, id),
    deleteCountry: id => del(CODES_COUNTRY, id),
    deleteAirport: id => del(CODES_AIRPORT, id)
  }
};

export const login = {
  post: body => {
    const username = body["username"].toUpperCase();
    const password = encodeURIComponent(body["password"]);
    const creds = new URLSearchParams(`username=${username}&password=${password}`);

    return post(LOGIN, LOGINHEADER, creds).then(res => {
      if (!res.ok) return res;

      return get(LOGGEDIN_USER, BASEHEADER);
    });
  }
};
