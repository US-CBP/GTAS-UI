import { GenericService, get, post, putNoId, del } from "./genericService";
import * as b from "./baseService";
import { hasData } from "../utils/utils";

const NOTETYPE = `${b.BASE_URL}gtas/api/noteType`;
const ROLES = `${b.BASE_URL}gtas/roles`;
const APIBASE = `${b.BASE_URL}gtas/api/`;
const HITCATS = `${b.BASE_URL}gtas/wl/watchlistCategories`;
// const HITCATSNONARCHIVED = `${b.BASE_URL}gtas/wl/watchlistCategories/nonarchived`;

const GET = "get";

const getCache = (uri, headers, id, params) => {
  let uricomplete = `${uri}${hasData(id) ? `/${id}` : ""}${
    hasData(params) ? params : ""
  }`;

  return GenericService({ uri: uricomplete, method: GET, headers: headers });
};

export const notetype = {
  get: () => get(NOTETYPE, b.BASEHEADER),
  getUpdated: () => get(NOTETYPE, b.BASEHEADER)
};

export const roles = {
  get: () => get(ROLES, b.BASEHEADER),
  getUpdated: () => get(ROLES, b.BASEHEADER)
};

export const codeEditor = {
  get: type => get(APIBASE + type, b.BASEHEADER),
  getUpdated: (type, dt) => getCache(`${APIBASE}${type}updated/${dt}`, b.BASEHEADER),
  put: {
    update: (type, body) => putNoId(APIBASE + type, b.BASEHEADER, b.stringify(body)),
    restore: (type, body) =>
      putNoId(`${APIBASE}${type}/restore`, b.BASEHEADER, b.stringify(body)),
    restoreAll: (type, body) =>
      putNoId(`${APIBASE}${type}/restoreAll`, b.BASEHEADER, b.stringify(body))
  },
  post: (type, body) => post(APIBASE + type, b.BASEHEADER, b.stringify(body)),
  del: (type, id) => del(APIBASE + type, b.BASEHEADER, id)
};

export const hitcats = {
  get: () => get(HITCATS, b.BASEHEADER),
  getUpdated: () => get(HITCATS, b.BASEHEADER),
  post: body => post(HITCATS, b.BASEHEADER, body),
  del: id => del(HITCATS, b.BASEHEADER, id)
};
