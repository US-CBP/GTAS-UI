import { hasData } from "../utils/utils";
import Cookies from "js-cookie";

const GET = "get";
const DELETE = "delete";
const POST = "post";
const PUT = "put";

const MISSINGURI = "The fetch requires a valid URI parameter";
// const PUTBODY = "The put method requires a valid body parameter.";
// const POSTBODY = "The post method requires a valid body or data parameter.";
// const PUTID = "The put method requires a valid id parameter.";
// const PUTPARAMS = "The put method requires parameters.";
const DELETEID = "The delete method requires a valid id parameter.";

const execFetch = async props => {
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

export function get(uri, headers, id, params) {
  if (!hasData(uri)) throw new TypeError(MISSINGURI);

  let uricomplete = `${uri}${hasData(id) ? `/${id}` : ""}${
    hasData(params) ? params : ""
  }`;

  return execFetch({ uri: uricomplete, method: GET, headers: headers });
}

export function post(uri, headers, body) {
  if (!hasData(uri)) throw new TypeError(MISSINGURI);

  return execFetch({
    uri: uri,
    method: POST,
    headers: headers,
    body: body
  });
}

export function put(uri, headers, id, body) {
  if (!hasData(uri)) throw new TypeError(MISSINGURI);

  let uricomplete = `${uri}${hasData(id) ? `/${id}` : ""}`;

  return execFetch({
    uri: uricomplete,
    method: PUT,
    body: body,
    headers: headers
  });
}

export function putNoId(uri, headers, body) {
  if (!hasData(uri)) throw new TypeError(MISSINGURI);

  return put(uri, headers, undefined, body);
}

export function del(uri, headers, id) {
  if (!hasData(uri)) throw new TypeError(MISSINGURI);
  if (!hasData(id)) throw new TypeError(DELETEID);

  let uricomplete = `${uri}${hasData(id) ? `/${id}` : ""}`;

  return execFetch({
    uri: uricomplete,
    method: DELETE,
    headers: headers
  });
}

// GenericService.propTypes = {
//   uri: PropTypes.string.isRequired,
//   method: PropTypes.oneOf(['get', 'delete', 'post', 'put']).isRequired,
//   body: PropTypes.object,
//   contentTypeReceive: PropTypes.string,
//   mode: PropTypes.string,
//   headers: PropTypes.object,
//   contentTypeServer: PropTypes.string
// };
