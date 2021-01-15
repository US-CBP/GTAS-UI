// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import { hasData } from "../utils/utils";
import Cookies from "js-cookie";

const DELETEID = "The delete method requires a valid id parameter.";
const GET = "get";
const DELETE = "delete";
const POST = "post";
const PUT = "put";

export const GenericService = async props => {
  let param = {
    method: props.method,
    headers: {
      ...props.headers,
      Cookie: `JSESSIONID: ${Cookies.get("JSESSIONID")}`
    },
    credentials: "include"
  };

  param.body = props.body;

  return fetch(props.uri, param)
    .then(response => {
      if (response === undefined) {
        return [];
      }
      if (response.ok) {
        if (response.url.endsWith("/authenticate")) return response;
        if (response.url.includes("paxdetailreport")) return response.arrayBuffer();
        return response.json().then(res => res.data || res || response);
      } else {
        return response;
      }
    })
    .catch(error => {
      return error;
    });
};

export const get = (uri, headers, id, params) => {
  let uricomplete = `${uri}${hasData(id) ? `/${id}` : ""}${
    hasData(params) ? params : ""
  }`;

  return GenericService({ uri: uricomplete, method: GET, headers: headers });
};

export const post = (uri, headers, body) => {
  return GenericService({
    uri: uri,
    method: POST,
    headers: headers,
    body: body
  });
};

export const put = (uri, headers, id, body) => {
  let uricomplete = `${uri}${hasData(id) ? `/${id}` : ""}`;

  return GenericService({
    uri: uricomplete,
    method: PUT,
    body: body,
    headers: headers
  });
};

export const putNoId = (uri, headers, body) => {
  return put(uri, headers, undefined, body);
};

export const del = (uri, headers, id) => {
  if (!hasData(id)) throw new TypeError(DELETEID);

  let uricomplete = `${uri}${hasData(id) ? `/${id}` : ""}`;

  return GenericService({
    uri: uricomplete,
    method: DELETE,
    headers: headers
  });
};
