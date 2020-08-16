import { asArray } from "../utils/utils";
import * as URL from "./svcConstants.js";
import { get, post, put, putNoId, del } from "./CommonService";

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
const SUCCESS = "SUCCESS";

function stringify(body) {
  return JSON.stringify({ ...body });
}

// ENTITY METHODS
export const users = {
  get: {
    getAll: (id, params) => get(URL.USERS + "/", BASEHEADER, id, params),
    getAllNonArchived: (id, params) => get(URL.USERSNONARCHIVED, BASEHEADER, id, params)
  },
  put: body => {
    const id = body.userId;
    return put(URL.MANAGEUSERS, BASEHEADER, id, stringify(body));
  },
  post: body => post(URL.USERS + "/1", BASEHEADER, stringify(body)),
  del: id => del(URL.USERS, BASEHEADER, id)
};
export const usersemails = {
  get: () => get(URL.USERSEMAIL, BASEHEADER)
};
export const watchlistcats = {
  get: (id, params) => get(URL.WLCATS, BASEHEADER, id, params),
  post: body => post(URL.WLCATS, BASEHEADER, body)
};

export const watchlistcatspost = {
  post: body => {
    return post(URL.WLCATSPOST, BASEHEADER, stringify(body));
  }
};
export const userService = {
  get: (id, params) => get(URL.USERS, BASEHEADER),
  post: body => {
    return post(URL.USERS, BASEHEADER, stringify(body));
  }
};

export const flights = { get: params => get(URL.FLIGHTS, BASEHEADER, undefined, params) };
export const auditlog = {
  get: params => get(URL.AUDITLOG, BASEHEADER, undefined, params)
};
export const errorlog = {
  get: params => get(URL.ERRORLOG, BASEHEADER, undefined, params)
};
export const cases = {
  get: (id, params) => get(URL.CASES, BASEHEADER, undefined, params),
  updateStatus: (paxId, status) => {
    const body = { passengerId: paxId, status: status };
    return post(URL.CASES, BASEHEADER, stringify(body));
  }
};
export const ruleCats = { get: (id, params) => get(URL.RULE_CATS, BASEHEADER) };
export const settingsinfo = {
  get: (id, params) => get(URL.SETTINGSINFO, BASEHEADER),
  put: body => putNoId(URL.SETTINGSINFO, BASEHEADER, stringify(body))
};
export const getrulecats = { get: (id, params) => get(URL.GETRULECATS, BASEHEADER) };
export const paxdetails = {
  get: (flightId, paxId) => {
    const path = `${URL.PAX}/${paxId}/details?flightId=${flightId}`;
    return get(path, BASEHEADER);
  }
};
export const paxFlightHistory = {
  get: (flightId, paxId) => {
    const path = `${URL.PAX}/flighthistory?paxId=${paxId}&flightId=${flightId}`;
    return get(path, BASEHEADER);
  }
};
export const paxFullTravelHistory = {
  get: (flightId, paxId) => {
    const path = `${URL.PAX}/bookingdetailhistory?paxId=${paxId}&flightId=${flightId}`;
    return get(path, BASEHEADER);
  }
};
export const paxWatchListLink = {
  get: (id, params) => {
    const path = `${URL.PAX}/getwatchlistlink?paxId=`;
    return get(path, BASEHEADER, id, params);
  }
};
export const flightpaxHitSummary = {
  get: (flightId, paxId) => {
    const path = `${URL.FLIGHTPAXHITSUMMARY}?passengerId=${paxId}&flightId=${flightId}`;
    return get(path, BASEHEADER);
  }
};
export const paxEventNotesHistory = {
  get: (paxId, historicalNotes) => {
    const path = `${URL.PAX}/notes?paxId=${paxId}&historicalNotes=${historicalNotes}`;
    return get(path, BASEHEADER);
  },
  post: (paxId, body) => {
    const tempBody = {
      ...body,
      noteType: [body.noteType],
      rtfNote: `<div><!--block -->${body.plainTextNote}</div>`, //this should be fixed
      passengerId: paxId
    };
    return post(`${URL.PAX}/note`, BASEHEADER, stringify(tempBody));
  }
};

export const paxdetailsReport = {
  get: (paxId, flightId) => {
    const path = `${URL.PAXDETAILSREPORT}?paxId=${paxId}&flightId=${flightId}`;
    return get(path, BASEHEADER);
  }
};
export const notification = {
  post: (paxId, body) => {
    const selectedEmail = asArray(body.to)
      .filter(email => email.checked === true)
      .map(email => email.key);

    if (body.externalUsersEmail) {
      selectedEmail.push(body.externalUsersEmail);
    }

    const bodyWithPaxId = {
      note: body.note ? body.note : "",
      paxId: paxId,
      to: selectedEmail
    };
    return post(URL.NOTIFICATION, BASEHEADER, stringify(bodyWithPaxId));
  }
};
export const flightPassengers = { get: id => get(URL.FLIGHTPAX, BASEHEADER, id) };
export const loaderStats = { get: (id, params) => get(URL.LOADERSTATISTICS, BASEHEADER) };
export const notetypes = {
  get: (id, params) => get(URL.NOTE_TYPES, BASEHEADER),
  post: body => post(URL.NOTE_TYPESPOST, BASEHEADER, stringify(body))
};
export const loggedinUser = { get: (id, params) => get(URL.LOGGEDIN_USER, BASEHEADER) };
export const roles = { get: () => get(URL.ROLES, BASEHEADER) };
export const codeEditor = {
  get: {
    carrierCodes: () => get(URL.CODES_CARRIER, BASEHEADER),
    countryCodes: () => get(URL.CODES_COUNTRY, BASEHEADER),
    airportCodes: () => get(URL.CODES_AIRPORT, BASEHEADER)
  },
  put: {
    updateCarrier: body => putNoId(URL.CODES_CARRIER, BASEHEADER, stringify(body)),
    updateCountry: body => putNoId(URL.CODES_COUNTRY, BASEHEADER, stringify(body)),
    updateAirport: body => putNoId(URL.CODES_AIRPORT, BASEHEADER, stringify(body)),
    restoreCarriersAll: body => putNoId(URL.CODES_RESTOREALL_CARRIER, BASEHEADER, body),
    restoreCountriesAll: body => putNoId(URL.CODES_RESTOREALL_COUNTRY, BASEHEADER, body),
    restoreAirportsAll: body => putNoId(URL.CODES_RESTOREALL_AIRPORT, BASEHEADER, body),
    restoreCarrier: body =>
      putNoId(URL.CODES_RESTORE_CARRIER, BASEHEADER, stringify(body)),
    restoreCountry: body =>
      putNoId(URL.CODES_RESTORE_COUNTRY, BASEHEADER, stringify(body)),
    restoreAirport: body =>
      putNoId(URL.CODES_RESTORE_AIRPORT, BASEHEADER, stringify(body))
  },
  post: {
    createCarrier: body => post(URL.CODES_CARRIER, BASEHEADER, stringify(body)),
    createCountry: body => post(URL.CODES_COUNTRY, BASEHEADER, stringify(body)),
    createAirport: body => post(URL.CODES_AIRPORT, BASEHEADER, stringify(body))
  },
  delete: {
    deleteCarrier: id => del(URL.CODES_CARRIER, BASEHEADER, id),
    deleteCountry: id => del(URL.CODES_COUNTRY, BASEHEADER, id),
    deleteAirport: id => del(URL.CODES_AIRPORT, BASEHEADER, id)
  }
};

export const login = {
  post: body => {
    const username = body["username"].toUpperCase();
    const password = encodeURIComponent(body["password"]);
    const creds = new URLSearchParams(`username=${username}&password=${password}`);

    return post(URL.LOGIN, LOGINHEADER, creds).then(res => {
      if (!res.ok) return res;

      return get(URL.LOGGEDIN_USER, BASEHEADER);
    });
  }
};

export const query = {
  get: () => {
    return get(URL.QUERIES, BASEHEADER).then(res => {
      if (res.status === SUCCESS) return res.result;
      return [];
    });
  },
  put: (id, body) => put(URL.QUERIES, BASEHEADER, id, stringify(body)),
  post: body => post(URL.QUERIES, BASEHEADER, stringify(body)),
  del: id => del(URL.QUERIES, BASEHEADER, id)
};

export const rule = {
  get: id => {
    return get(URL.RULES, BASEHEADER, id).then(res => {
      if (res.status === SUCCESS) return res.result;
      return [];
    });
  },
  put: (id, body) => put(URL.RULES, BASEHEADER, id, stringify(body)),
  post: body => post(URL.RULES, BASEHEADER, stringify(body)),
  del: id => del(URL.RULES, BASEHEADER, id)
};

export const rulesall = {
  get: id => {
    return get(URL.RULESALL, BASEHEADER, id).then(res => {
      if (res.status === SUCCESS) return res.result;
      return [];
    });
  }
};

export const querypax = {
  get: () => {
    return get(URL.QUERYPAX, BASEHEADER).then(res => {
      if (res.status === SUCCESS) return res.result;
      return [];
    });
  },
  post: body => post(URL.QUERYPAX, BASEHEADER, stringify(body))
};

export const wldocs = {
  get: () => {
    return get(URL.WLDOCS, BASEHEADER).then(res => {
      if (res.status === SUCCESS) return res.result?.watchlistItems;
      return [];
    });
  },
  post: body => post(URL.WLDOCSPOST, BASEHEADER, stringify(body)),
  put: body => put(URL.WLDOCSPOST, BASEHEADER, undefined, stringify(body)),
  del: id => del(URL.WLITEM, BASEHEADER, id)
};

export const wlpax = {
  get: () => {
    return get(URL.WLPAX, BASEHEADER).then(res => {
      if (res.status === SUCCESS) return res.result?.watchlistItems;
      return [];
    });
  },
  post: body => post(URL.WLPAXPOST, BASEHEADER, stringify(body)),
  put: body => put(URL.WLPAXPOST, BASEHEADER, undefined, stringify(body)),
  del: id => del(URL.WLITEM, BASEHEADER, id)
};

export const addWLItems = {
  post: body => {
    // TODO find a cleaner way to handle the respone.
    //Change the backend to accept a list of watchlist items?
    const responses = [];
    const paxItem = JSON.parse(body.passenger.replace("{categoryId}", body.categoryId));
    return post(URL.WLPAXPOST, BASEHEADER, stringify(paxItem)).then(
      asArray(body.documents).forEach(doc => {
        const docItem = JSON.parse(doc.replace("{categoryId}", body.categoryId));
        return post(URL.WLDOCSPOST, BASEHEADER, stringify(docItem)).then(
          res => responses.push[res]
        );
      })
    );
  }
};
export const cypher = { get: () => get(URL.CYPHER, BASEHEADER) };
export const cypherAuth = { get: () => get(URL.CYPHERAUTH, BASEHEADER) };
export const manualHit = {
  post: body => {
    const path = `${URL.MANUALHIT}?paxId=${body.paxId}&flightId=${body.flightId}&hitCategoryId=${body.hitCategoryId}&desc=${body.description}`;
    return post(path, BASEHEADER);
  }
};

export const logfile = {
  get: (id, params) => get(URL.LOGFILE, BASEHEADER, id, params),
  download: params => window.open(URL.LOGFILE + params, "_self")
};

export const changePassword = {
  put: body => put(URL.CHANGEPASSWORD, BASEHEADER, undefined, stringify(body))
};

export const signup = {
  post: body => post(URL.SIGNUP, SIGNUPHEADER, stringify(body))
};
export const physicalLocations = {
  get: () => get(URL.PHYSICALLOCATIONS, SIGNUPHEADER)
};

export const signuprequests = {
  get: params => get(URL.SIGNUPREQUESTS, BASEHEADER, undefined, params),
  approve: id => put(URL.SIGNUPREQUESTAPPROVE, BASEHEADER, id),
  reject: id => put(URL.SIGNUPREQUESTSREJECT, BASEHEADER, id)
};

export const forgotPassword = {
  post: body => {
    const header = `${URL.FORGOTPASSWORD}?userId=${body.userId}`;
    return post(header, SIGNUPHEADER, stringify(body));
  }
};

export const resetPassword = {
  post: body => post(URL.RESETPASSWORD, SIGNUPHEADER, stringify(body)),
  isValidToken: token => get(URL.RESETPASSWORD, SIGNUPHEADER, undefined, token)
};
