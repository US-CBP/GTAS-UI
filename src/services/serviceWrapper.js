import { get, put, post, del, putNoId } from "./genericService";

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
const SIGNUPHEADER = {
  "X-Login-Ajax-call": "true",
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
  Accept: AJSON
};

const BASEHEADER = { "Content-Type": JSONUTF8, Accept: AJSON };
const BASE_URL = process.env.REACT_APP_BASE_URL;

const LOGIN = `${BASE_URL}gtas/authenticate`;
const USERS = `${BASE_URL}gtas/users`;
const MANAGEUSERS = `${BASE_URL}gtas/manageuser`;
const USERSNONARCHIVED = `${USERS}/nonarchived`;
const USERSEMAIL = `${BASE_URL}gtas/users/emails`;
const CHANGEPASSWORD = `${BASE_URL}gtas/user/change-password`;
const HITCATSPOST = `${BASE_URL}gtas/wlput/wlcat/`;
const FLIGHTS = `${BASE_URL}gtas/api/flights`;
const AUDITLOG = `${BASE_URL}gtas/api/auditlog`;
const AUDITLOGACTIONS = `${BASE_URL}gtas/api/auditlog/actions`;
const ERRORLOG = `${BASE_URL}gtas/api/errorlog`;
const ERRORLOGCODES = `${BASE_URL}gtas/api/errorlog/codes`;
const CASES = `${BASE_URL}gtas/hits`;
const SETTINGSINFO = `${BASE_URL}gtas/settingsinfo`;
const PAX = `${BASE_URL}gtas/passengers/passenger`;
const FLIGHTPAXHITSUMMARY = `${BASE_URL}gtas/hit/flightpassenger`;
const HISTORICALHITS = `${PAX}/hitdetailhistory`;
const FLIGHTPAX = `${BASE_URL}gtas/api/flights/flightpax`;
const QUERIES = `${BASE_URL}gtas/query`;
const QUERYPAX = `${BASE_URL}gtas/query/queryPassengers`;
const RULES = `${BASE_URL}gtas/udr`;
const RULESALL = `${BASE_URL}gtas/all_udr`;
const LOADERSTATISTICS = `${BASE_URL}gtas/api/application/statistics`;
const NOTE_TYPESNONARCHIVED = `${BASE_URL}gtas/api/noteType/nonarchived`;
const LOGGEDIN_USER = `${BASE_URL}gtas/user`;
const NOTETYPE = `${BASE_URL}gtas/api/noteType`;
// const ROLES = `${BASE_URL}gtas/roles/`;
// const CODES_AIRPORT_LK = `${BASE_URL}gtas/api/airportLookup`;
// const CODES_COUNTRY_LK = `${BASE_URL}gtas/api/countryLookup`;
// const CODES_CARRIER_LK = `${BASE_URL}gtas/api/carrierLookup`;

const WLDOCS = `${BASE_URL}gtas/wl/DOCUMENT/Document`;
const WLDOCSPOST = `${BASE_URL}gtas/wl/document`;
const WLPAX = `${BASE_URL}gtas/wl/PASSENGER/Passenger`;
const WLPAXPOST = `${BASE_URL}gtas/wl/passenger`;
const WLITEM = `${BASE_URL}gtas/wl/watchlistItem`;

const PAXDETAILSREPORT = `${BASE_URL}gtas/paxdetailreport`;
const NOTIFICATION = `${BASE_URL}gtas/users/notify`;
const HOST = `${BASE_URL}gtas/config/`;
const CYPHER = HOST + "cypherUrl";
const CYPHERAUTH = HOST + "cypherAuth";
const NEO4JURL = HOST + "/neo4j/";
const KIBANAURL = HOST + "/kibanaUrl/";
const MANUALHIT = `${BASE_URL}gtas/createmanualpvl`;
const LOGFILE = `${BASE_URL}gtas/api/logs/`;
const SIGNUP = `${BASE_URL}gtas/user/signup/new`;
const PHYSICALLOCATIONS = `${BASE_URL}gtas/user/signup/physiclLocations`;
const SIGNUPREQUESTS = `${BASE_URL}gtas/api/signup-requests`;
const SIGNUPREQUESTAPPROVE = `${BASE_URL}gtas/signupRequest/approve`;
const SIGNUPREQUESTSREJECT = `${BASE_URL}gtas/signupRequest/reject`;
const FORGOTPASSWORD = `${BASE_URL}gtas/forgot-password`;
const RESETPASSWORD = `${BASE_URL}gtas/reset-password`;
const SEARCH = `${BASE_URL}gtas/search`;
const SEATS = `${BASE_URL}gtas/seats`;
const ATTACHMENTS = `${BASE_URL}gtas/attachments`;
const ATTACHMENTSMETA = `${BASE_URL}gtas/attachmentsmeta`;
const DOWNLOADATTACHMENT = `${BASE_URL}gtas/attachment`;
const TRANSLATIONS = `${BASE_URL}gtas/api/translation`;

const stringify = body => {
  return JSON.stringify({ ...body });
};

// ENTITY METHODS

export const translations = {
  get: id => get(TRANSLATIONS, BASEHEADER, id),
  post: body => post(TRANSLATIONS, BASEHEADER, stringify(body))
};

export const users = {
  get: {
    getAll: (id, params) => get(USERS + "/", BASEHEADER, id, params),
    getAllNonArchived: (id, params) => get(USERSNONARCHIVED, BASEHEADER, id, params)
  },
  put: body => {
    const id = body.userId;
    return put(MANAGEUSERS, BASEHEADER, id, stringify(body));
  },
  post: body => post(USERS + "/1", BASEHEADER, stringify(body)),
  del: id => del(USERS, BASEHEADER, id)
};
export const usersemails = {
  get: () => get(USERSEMAIL, BASEHEADER)
};

export const hitcatspost = {
  post: body => {
    return post(HITCATSPOST, BASEHEADER, stringify(body));
  },
  put: body => {
    return putNoId(HITCATSPOST, BASEHEADER, stringify(body));
  }
};

export const flights = { get: params => get(FLIGHTS, BASEHEADER, undefined, params) };
export const auditlog = {
  get: {
    logs: params => get(AUDITLOG, BASEHEADER, undefined, params),
    actions: params => get(AUDITLOGACTIONS, BASEHEADER, undefined, params)
  }
};
export const errorlog = {
  get: {
    logs: params => get(ERRORLOG, BASEHEADER, undefined, params),
    codes: params => get(ERRORLOGCODES, BASEHEADER, undefined, params)
  }
};
export const cases = {
  get: params => {
    return get(CASES, BASEHEADER, undefined, params);
  },
  updateStatus: (paxId, status) => {
    const body = { passengerId: paxId, status: status };
    return post(CASES, BASEHEADER, stringify(body));
  }
};
export const settingsinfo = {
  get: () => get(SETTINGSINFO, BASEHEADER),
  put: body => {
    return putNoId(SETTINGSINFO, BASEHEADER, stringify(body));
  }
};
export const paxdetails = {
  get: (flightId, paxId) => {
    const path = `${PAX}/${paxId}/details?flightId=${flightId}`;
    return get(path, BASEHEADER);
  }
};
export const paxFlightHistory = {
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

export const historicalHits = {
  get: paxId => get(`${HISTORICALHITS}?paxId=${paxId}`, BASEHEADER)
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
    return post(`${PAX}/note`, BASEHEADER, stringify(tempBody));
  }
};

export const paxdetailsReport = {
  get: (paxId, flightId) => {
    const path = `${PAXDETAILSREPORT}?paxId=${paxId}&flightId=${flightId}`;
    return get(path, BASEHEADER);
  }
};
export const notification = {
  post: body => post(NOTIFICATION, BASEHEADER, stringify(body))
};
export const flightPassengers = { get: id => get(FLIGHTPAX, BASEHEADER, id) };
export const loaderStats = { get: () => get(LOADERSTATISTICS, BASEHEADER) };
export const notetypes = {
  post: body => post(NOTETYPE, BASEHEADER, stringify(body)),
  put: body => putNoId(NOTETYPE, BASEHEADER, stringify(body)),
  del: id => del(NOTETYPE, BASEHEADER, id)
};
export const loggedinUser = { get: () => get(LOGGEDIN_USER, BASEHEADER) };

export const attachment = {
  get: {
    getAllFullAttachments: paxId => {
      const path = ATTACHMENTS + `?paxId=${paxId}`;
      return get(path, BASEHEADER);
    },
    getAllAttachmentsMeta: paxId => {
      const path = ATTACHMENTSMETA + `?paxId=${paxId}`;
      return get(path, BASEHEADER);
    },
    download: attachmentId => {
      const path = DOWNLOADATTACHMENT + `?attachmentId=${attachmentId}`;
      window.open(path, "_self");
    }
  },
  post: body => post(ATTACHMENTS, "", body),
  del: attachmentId => {
    return del(ATTACHMENTS, BASEHEADER, attachmentId);
  }
};

// export const airportLookup = { get: () => get(CODES_AIRPORT_LK, BASEHEADER) };
// export const countryLookup = { get: () => get(CODES_COUNTRY_LK, BASEHEADER) };
// export const carrierLookup = { get: () => get(CODES_CARRIER_LK, BASEHEADER) };

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

export const query = {
  get: () => {
    return get(QUERIES, BASEHEADER).then(res => {
      if (res.status === "SUCCESS") return res.result;
      return [];
    });
  },
  put: (id, body) => put(QUERIES, BASEHEADER, id, stringify(body)),
  post: body => post(QUERIES, BASEHEADER, stringify(body)),
  del: id => del(QUERIES, BASEHEADER, id)
};

export const rule = {
  get: id => {
    return get(RULES, BASEHEADER, id).then(res => {
      if (res.status === "SUCCESS") return res.result;
      return [];
    });
  },
  put: (id, body) => put(RULES, BASEHEADER, id, stringify(body)),
  post: body => post(RULES, BASEHEADER, stringify(body)),
  del: id => del(RULES, BASEHEADER, id)
};

export const rulesall = {
  get: id => {
    return get(RULESALL, BASEHEADER, id).then(res => {
      if (res.status === "SUCCESS") return res.result;
      return [];
    });
  }
};

export const querypax = {
  get: () => {
    return get(QUERYPAX, BASEHEADER).then(res => {
      if (res.status === "SUCCESS") return res.result;
      return [];
    });
  },
  post: body => post(QUERYPAX, BASEHEADER, stringify(body))
};

export const wldocs = {
  get: () => {
    return get(WLDOCS, BASEHEADER).then(res => {
      if (res.status === "SUCCESS") return res.result?.watchlistItems;
      return [];
    });
  },
  post: body => post(WLDOCSPOST, BASEHEADER, stringify(body)),
  put: body => put(WLDOCSPOST, BASEHEADER, undefined, stringify(body)),
  del: id => del(WLITEM, BASEHEADER, id)
};

export const wlpax = {
  get: () => {
    return get(WLPAX, BASEHEADER).then(res => {
      if (res.status === "SUCCESS") return res.result?.watchlistItems;
      return [];
    });
  },
  post: body => {
    return post(WLPAXPOST, BASEHEADER, stringify(body));
  },
  put: body => put(WLPAXPOST, BASEHEADER, undefined, stringify(body)),
  del: id => del(WLITEM, BASEHEADER, id)
};

export const addWLItems = {
  post: body => {
    return post(WLPAXPOST, BASEHEADER, stringify(body.passenger)).then(
      post(WLDOCSPOST, BASEHEADER, stringify(body.documents))
    );
  }
};
export const cypher = { get: () => get(CYPHER, BASEHEADER) };
export const cypherAuth = { get: () => get(CYPHERAUTH, BASEHEADER) };
export const manualHit = {
  post: body => {
    const path = `${MANUALHIT}?paxId=${body.paxId}&flightId=${body.flightId}&hitCategoryId=${body.hitCategoryId}&desc=${body.description}`;
    return post(path, BASEHEADER);
  }
};

export const logfile = {
  get: (id, params) => get(LOGFILE, BASEHEADER, id, params),
  download: params => window.open(LOGFILE + params, "_self")
};

export const changePassword = {
  byloggedInUser: body => put(CHANGEPASSWORD, BASEHEADER, undefined, stringify(body)),
  byAdmin: (id, body) => {
    return put(CHANGEPASSWORD, BASEHEADER, id, stringify(body));
  }
};

export const signup = {
  post: body => post(SIGNUP, SIGNUPHEADER, stringify(body))
};
export const physicalLocations = {
  get: () => get(PHYSICALLOCATIONS, SIGNUPHEADER)
};

export const signuprequests = {
  get: params => get(SIGNUPREQUESTS, BASEHEADER, undefined, params),
  approve: body => post(SIGNUPREQUESTAPPROVE, BASEHEADER, stringify(body)),
  reject: id => put(SIGNUPREQUESTSREJECT, BASEHEADER, id)
};

export const forgotPassword = {
  post: body => {
    const header = `${FORGOTPASSWORD}?userId=${body.userId}`;
    return post(header, SIGNUPHEADER, stringify(body));
  }
};

export const resetPassword = {
  post: body => post(RESETPASSWORD, SIGNUPHEADER, stringify(body)),
  isValidToken: token => get(RESETPASSWORD, SIGNUPHEADER, undefined, token)
};

export const search = {
  passengers: params => {
    const url = `${SEARCH}/queryPassengers`;
    return get(url, BASEHEADER, undefined, params);
  }
};
export const seats = {
  get: flightId => get(SEATS, BASEHEADER, flightId)
};

export const neo4jUrl = {
  get: () => get(NEO4JURL, BASEHEADER)
};
export const kibanaUrl = {
  get: () => get(KIBANAURL, BASEHEADER)
};
