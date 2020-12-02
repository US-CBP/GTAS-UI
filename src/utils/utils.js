import { NO_URI } from "./constants";
// import i18n from "../i18n";

// APB - shd add handling for other naming patterns like underscores and dashes, and maybe
// reference an enum of well-know acronyms to preserve casing there.
export function titleCase(input) {
  if (!hasData(input)) return undefined;

  let result = input
    .replace(/_|-/g, " ")
    .replace(/(\b[a-z](?!\s))/g, x => x.toLocaleUpperCase())
    .replace(/^[a-z]|[^\sA-Z][A-Z]/g, function(str2, idx) {
      return idx === 0
        ? str2.toLocaleUpperCase()
        : `${str2.substr(0, 1)} ${str2.substr(1).toLocaleUpperCase()}`;
    })
    .replace(/^\s*/, "");
  return result;
}

export function hasData(obj) {
  if (typeof obj === "object" || typeof obj === "undefined")
    return Object.keys(obj || {}).length > 0;
  else return String(obj).trim().length > 0;
}

export function asArray(data) {
  return !hasData(data) ? [] : Array.isArray(data) ? data : [data];
}

export function asCasedArray(data) {
  return !hasData(data)
    ? []
    : Array.isArray(data)
    ? data.map(item => titleCase(item))
    : [data];
}

export function asSpreadArray(data) {
  return !hasData(data) ? [] : Array.isArray(data) ? data : [...data];
}

export function isObject(data) {
  return data instanceof Object && data.constructor === Object;
}

export function getEndpoint(str) {
  return str
    .split("/")
    .pop()
    .split("\\")
    .filter(Boolean)
    .pop();
}

// returns a random int with "length" digits
export function randomIntOfLength(length) {
  let digits = rerunArray(length, randomInt, 0, 10);

  return Number(digits.join(""));
}

export function randomInt(min = 0, max = 10) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// Function repeater. Outer fxn returns an array of the results.
export function rerunArray(count, cb, ...params) {
  let resultArray = [];
  rerun(count, cb);

  // APB - play
  function rerun(count, cb) {
    if (count) {
      resultArray.push(cb(...params));
      return rerun(--count, cb);
    }
  }
  return resultArray;
}

export function getCrumbs(uri) {
  if (uri === undefined) return [NO_URI];

  //return the positive array (falsy values excluded)
  return uri.split("/").filter(Boolean);
}

// Return a hash value for a given input. Stringifies the input for numbers, arrays, etc.
export function asHash(str) {
  return str
    .toString()
    .split("")
    .reduce((acc, curr) => ((acc << 5) - acc + curr.charCodeAt(0)) | 0, 0);
}

// more robust hash fxn than asHash from https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript,
// has reduced collisions, bigger bits, better math, more flavor, etc.
// NOTE: the raw int/hex values here are commonly used multipliers in hash functions to generate even distributions.
// Changing them will increase the collision rate
export function asHash53(origStr, seed = 0) {
  const str = origStr.toString();
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

// TBD - takes an array of key value pairs and sorts them before hashing so we can get
// a deterministic hash for equivalent disordered datasets. Might not end up needing this.
export function asOrderedHash(value) {
  return value;
}

// Locale Date formatter
// Keeping this separate from localeDateOnly in case we need to bring back time parts.
// Using localeDateOnly for fields like DOB that will never need time parts and localeDate
// for fields that might.
export function localeDate(val) {
  if (!hasData(val)) return "";
  const locale = window.navigator.language;
  const options = {
    // localeMatcher: "lookup",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  };
  return new Date(val).toLocaleString(locale, options);
}

//TODO: !!! IMPLEMENT localestring validator!! syntax is not supported in all browsers
// function toLocaleStringSupportsLocales() {
//   try {
//     new Date().toLocaleString('i');
//   } catch (e) {
//     return e instanceof RangeError;
//   }
//   return false;
// }

// Locale Date-only formatter
export function localeDateOnly(val) {
  if (!hasData(val)) return "";

  const locale = window.navigator.language;
  const options = {
    // localeMatcher: "lookup",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  };
  return new Date(val).toLocaleString(locale, options);
}

export function localeMonthDayTime(val) {
  if (!hasData(val)) return "";

  const locale = window.navigator.language;
  const options = {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  };
  return new Date(val).toLocaleString(locale, options);
}

// Locale Month Year format (creditcard expiration dates)
export const localeMonthYear = val => {
  if (!hasData(val)) return "";

  const locale = window.navigator.language;
  const options = {
    month: "2-digit",
    year: "2-digit"
  };
  return new Date(val).toLocaleString(locale, options);
};

// sortable date string - not for display as it is not locale specific
export const sortableDate = val => {
  if (isNaN(Date.parse(val))) return "";

  const padDigit = num => {
    return num.toString().padStart(2, "0");
  };

  return (
    val.getFullYear() +
    padDigit(val.getMonth() + 1) +
    padDigit(val.getDate()) +
    padDigit(val.getHours()) +
    padDigit(val.getMinutes()) +
    padDigit(val.getSeconds())
  );
};

// Returns the day of the week for a given date string
// WARNING: dates in the format yyyy-mm-dd with no timezone indicated are interpreted
// as UTC dates, which will NOT equal the locale date for the hours where the UTC timezone
// has passed midnight, but the locale timezone has not.
export function dayOf(dateStr) {
  // const locale = i18n.language;
  const locale = window.navigator.language;
  return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(new Date(dateStr));
  // return (new Date(dateStr)).toLocaleDateString(locale, {weekday: 'short'});
}

export function getParamList(fields) {
  let params;
  params = "?";
  for (let field in fields) {
    if (hasData(fields[field])) params += `${field}=${fields[field]}&`;
  }
  return params;
}

export const alt = (str, fallback) => {
  return hasData(str) && str !== "Invalid Date" ? str : fallback || "";
};

export const altStr = (str, fallback) => {
  const _str = typeof str !== "string" || !hasData(str) ? fallback : str;

  const regex = /null|Invalid Date/gi;
  const cleanAndTrimmed = (_str || "").replace(regex, "").trim();
  return hasData(cleanAndTrimmed) ? cleanAndTrimmed : fallback || "";
};

export const altDash = str => alt(str, "---");

export const altObj = str => alt(str, {});

export const altNull = str => alt(str, null);

export const altData = data => {
  let safeResults = data;
  if (isObject(data) && hasData(data.error)) {
    safeResults = [];
  } else if (!hasData(data)) safeResults = [];

  return safeResults;
};

export function objToArray(data) {
  if (!isObject(data)) return [];

  const clean = [...Object.values(data)];

  return clean.sort().map(item => titleCase(item));
}

export function getAge(dob) {
  if (!hasData(dob)) return null;

  const yearInMillisecs = 365.25 * 24 * 60 * 60 * 1000;

  return Math.floor((new Date() - new Date(dob).getTime()) / yearInMillisecs);
}

export function getRoleNamesArray(rolesObjects) {
  if (!Array.isArray(rolesObjects)) return [];

  const rolesArray = rolesObjects.reduce((acc, cur) => {
    acc.push(titleCase(cur.name));
    return acc;
  }, []);

  return rolesArray;
}

export function maxDate(...dates) {
  return dates
    .filter(Boolean)
    .sort()
    .slice(-1)
    .toString();
}

export function sortValues(key, desc) {
  return (a, b) => {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;
    let output;
    const akey = a[key] || "";
    const bkey = b[key] || "";

    try {
      output = akey.toLocaleUpperCase().localeCompare(bkey.toLocaleUpperCase());
    } catch {
      output = akey - bkey;
    }

    return desc === false ? output : output * -1;
  };
}

export function routes() {}

export function passengerTypeMapper(type) {
  const passengerTypesMap = {
    P: "Passenger",
    C: "Crew",
    I: "Intransit"
  };
  return passengerTypesMap[type];
}

//if lengthToCompare is not passed, set default to 50
export function isShortText(text, lengthToCompare = 50) {
  return !hasData(text) || text.toString().length <= lengthToCompare ? true : false;
}

//if shortTextLength is not passed, set default to 50
export function getShortText(text, shortTextLength = 50) {
  if (isShortText(text, shortTextLength)) return text;

  return `${text.toString().substr(0, shortTextLength - 4)} ...`;
}

export const isValidPassword = password => {
  const passwordConstraint = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&?*])(?=.{10,20})"
  );
  return passwordConstraint.test(password);
};

export function formatRuleConditions(conditions) {
  if (!hasData(conditions)) return "";

  return conditions.split("$$$").join("\n");
}

export const watchlistDateFormat = input => {
  const stringDate = new Date(input);
  if (stringDate === "Invalid Date") return "Invalid Date";
  const day = stringDate.getDate(); // use getDate(). getDay() returns the day of the week
  const month = stringDate.getMonth() + 1; // 0 based
  const year = stringDate.getFullYear();

  return `${year}-${month}-${day}`;
};
