export const AJSON = "application/json, text/plain, */*";
export const JSONUTF8 = "application/json;charset=UTF-8";
export const FORM = "application/x-www-form-urlencoded";

export const LOGINHEADER = {
  "X-Login-Ajax-call": "true",
  "Content-Type": FORM,
  "X-Requested-With": "XMLHttpRequest",
  Router: "api",
  Accept: AJSON,
  "Accept-Encoding": "gzip, deflate, br"
};

export const SIGNUPHEADER = {
  "X-Login-Ajax-call": "true",
  Router: "api",
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
  Accept: AJSON
};

const BASE_URL = window?._env_
  ? window._env_.REACT_APP_BASE_URL
  : process.env.REACT_APP_BASE_URL;

export const BASEHEADER = { "Content-Type": JSONUTF8, Router: "api", Accept: AJSON };
export const BASEFILEHEADER = { Router: "api", Accept: AJSON}

export const stringify = body => {
  return JSON.stringify({ ...body });
};

export default BASE_URL;
