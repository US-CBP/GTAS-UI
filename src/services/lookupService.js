import { get, put, post, del, putNoId } from "./genericService";
import * as b from "./baseService";
import Dexie from "dexie";

const GETRULECATS = `${b.BASE_URL}getRuleCats`;
const RULE_CATS = `${b.BASE_URL}gtas/getRuleCats`;
const NOTE_TYPESPOST = `${b.BASE_URL}gtas/api/noteType`;
const ROLES = `${b.BASE_URL}gtas/roles/`;
const APIBASE = `${b.BASE_URL}gtas/api/`;
const CODES_AIRPORT_LK = `${b.BASE_URL}gtas/api/airportLookup`;
const CODES_COUNTRY_LK = `${b.BASE_URL}gtas/api/countryLookup`;
const CODES_CARRIER_LK = `${b.BASE_URL}gtas/api/carrierLookup`;
const HITCATS = `${b.BASE_URL}gtas/wl/watchlistCategories`;
const HITCATSNONARCHIVED = `${b.BASE_URL}gtas/wl/watchlistCategories/nonarchived`;

const createDb = (name, data) => {
  const db = new Dexie("FriendDatabase");
  db.version(1).stores({ friends: "++id,name,age" });
};

const transaction = () => {
  // db.transaction("rw", db.friends, async () => {
  //   // Make sure we have something in DB:
  //   if ((await db.friends.where({ name: "Josephine" }).count()) === 0) {
  //     const id = await db.friends.add({ name: "Josephine", age: 21 });
  //     alert(`Addded friend with id ${id}`);
  //   }
  //   // Query:
  //   const youngFriends = await db.friends
  //     .where("age")
  //     .below(25)
  //     .toArray();
  //   // Show result:
  //   alert("My young friends: " + JSON.stringify(youngFriends));
  // }).catch(e => {
  //   alert(e.stack || e);
  // });
};
export const ruleCats = { get: () => get(RULE_CATS, b.BASEHEADER) };
export const getrulecats = { get: () => get(GETRULECATS, b.BASEHEADER) };
export const notetypes = {
  post: body => post(NOTE_TYPESPOST, b.BASEHEADER, b.stringify(body)),
  put: body => putNoId(NOTE_TYPESPOST, b.BASEHEADER, b.stringify(body)),
  del: id => del(NOTE_TYPESPOST, b.BASEHEADER, id)
};
export const roles = { get: () => get(ROLES, b.BASEHEADER) };

export const codeEditor = {
  get: type => get(APIBASE + type, b.BASEHEADER),
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

export const airportLookup = { get: () => get(CODES_AIRPORT_LK, b.BASEHEADER) };
export const countryLookup = { get: () => get(CODES_COUNTRY_LK, b.BASEHEADER) };
export const carrierLookup = { get: () => get(CODES_CARRIER_LK, b.BASEHEADER) };

export const hitcats = {
  get: (id, params) => get(HITCATSNONARCHIVED, b.BASEHEADER, id, params),
  post: body => post(HITCATS, b.BASEHEADER, body),
  del: id => del(HITCATS, b.BASEHEADER, id)
};
