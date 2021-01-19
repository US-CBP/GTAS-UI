import { GenericService, get, post, putNoId, del } from "./genericService";
import BASE_URL, { BASEHEADER, stringify } from "./baseService";
import { hasData } from "../utils/utils";

const NOTETYPE = `${BASE_URL}gtas/api/noteType`;
const ROLES = `${BASE_URL}gtas/roles`;
const APIBASE = `${BASE_URL}gtas/api/`;
const HITCATS = `${BASE_URL}gtas/wl/watchlistCategories`;
// const HITCATSNONARCHIVED = `${BASE_URL}gtas/wl/watchlistCategories/nonarchived`;

const GET = "get";

const getCache = (uri, headers, id, params) => {
  let uricomplete = `${uri}${hasData(id) ? `/${id}` : ""}${
    hasData(params) ? params : ""
  }`;

  return GenericService({ uri: uricomplete, method: GET, headers: headers });
};

export const notetype = {
  get: () => get(NOTETYPE, BASEHEADER),
  getUpdated: () => get(NOTETYPE, BASEHEADER)
};

export const roles = {
  get: () => get(ROLES, BASEHEADER),
  getUpdated: () => get(ROLES, BASEHEADER)
};

export const codeEditor = {
  get: type => get(APIBASE + type, BASEHEADER),
  getUpdated: (type, dt) => getCache(`${APIBASE}${type}updated/${dt}`, BASEHEADER),
  put: {
    update: (type, body) => putNoId(APIBASE + type, BASEHEADER, stringify(body)),
    restore: (type, body) =>
      putNoId(`${APIBASE}${type}/restore`, BASEHEADER, stringify(body)),
    restoreAll: (type, body) =>
      putNoId(`${APIBASE}${type}/restoreAll`, BASEHEADER, stringify(body))
  },
  post: (type, body) => post(APIBASE + type, BASEHEADER, stringify(body)),
  del: (type, id) => del(APIBASE + type, BASEHEADER, id)
};

export const hitcats = {
  get: () => get(HITCATS, BASEHEADER),
  getUpdated: () => get(HITCATS, BASEHEADER),
  post: body => post(HITCATS, BASEHEADER, body),
  del: id => del(HITCATS, BASEHEADER, id)
};
