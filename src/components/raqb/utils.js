import { Utils as QbUtils } from "react-awesome-query-builder";
import { hasData } from "../../utils/utils";
import { operatorMap, valueTypeMap, ENTITIESEXT, QB } from "./constants";

// import raw QueryObject from the DB and convert it to a jsontree object for the RAQB component.
export const importToTreeObject = raw => {
  if (!hasData(raw)) return {};

  if (isImportGroup(raw)) return importGroup(raw);

  return importRule(raw);
};

const isImportGroup = raw => {
  return raw.hasOwnProperty(QB.CLASS) && raw[QB.CLASS].endsWith(QB.QUERYOBJECT);
};

const importGroup = raw => {
  let group = {};
  let resultObj = {};

  if (raw[QB.CLASS] === QB.QOTYPEFULL) group.id = QbUtils.uuid();
  group.type = QB.GROUP;
  group.properties = { conjunction: raw.condition };

  const rules = raw.rules.map(item => importToTreeObject(item)); //recurse back to the parent fxn

  rules.forEach(item => (resultObj[QbUtils.uuid()] = item));

  group.children1 = resultObj;
  return group;
};

/**
 * Import the rule part of a raw QueryObject
 */
const importRule = raw => {
  const types = getEntityProps(raw.entity, raw.field, undefined, true);
  const op = operatorMap[types?.operator || raw.operator];
  const type = valueTypeMap[types?.type] || "NOT_FOUND";
  const value = getValue(type, raw.value);
  let rule = {};
  let children1 = {};

  rule.type = QB.RULEGROUP;
  rule.properties = { conjunction: QB.AND, field: raw.entity };
  children1[QbUtils.uuid()] = {
    type: QB.RULE,
    properties: {
      field: `${raw.entity}.${raw.field}`,
      operator: op,
      value: value,
      valueSrc: isMultivalueOperator(op) ? ["value", "value"] : ["value"],
      valueType: isMultivalueOperator(op) ? [type, type] : [type]
    }
  };

  if (op === "not_between") {
    // console.log("RAW, TYPES, TYPE, VALUE OP, CHILDREN1");
    // console.log(raw, types, type, value, op, children1);
  }

  rule.children1 = children1;
  return rule;
};

export const exportToQueryObject = (obj, isFirstLevel = false) => {
  if (!obj) return {};

  if (obj.type === QB.GROUP) return exportGroup(obj, isFirstLevel);

  return exportRule(obj);
};

const exportGroup = (raw, isFirstLevel) => {
  let group = {};
  const rulesMap = new Map(Object.entries(raw.children1));

  group[QB.CLASS] = isFirstLevel ? QB.QOTYPEFULL : QB.QUERYOBJECT;
  group.condition = raw.properties?.conjunction || QB.ALL; // the raqb component leaves the conjunction null when there's only a single clause
  group.rules = [];
  rulesMap.forEach(rule => group.rules.push(exportToQueryObject(rule)));

  return group;
};

const exportRule = raw => {
  let terms = {};

  try {
    // refac. Need a cleaner way to nav the object
    terms = Object.entries(Object.entries(raw)[2][1])[0][1].properties;
  } catch {}

  if (!hasData(terms)) return {};

  const entity = raw.properties?.field;
  const field = getFieldPart(terms?.field);
  const entProps = getEntityProps(entity, field, terms, false) || {};

  let rule = {
    entity: entity,
    field: field,
    operator: operatorMap[terms?.operator],
    value: getValue(entProps.type, terms?.value, false),
    uuid: null,
    type: entProps.type
  };

  rule[QB.CLASS] = QB.QUERYTERM;

  return rule;
};

// convert value representations to and from the raqb object and the queryobject
const getValue = (type, val, isImporting = true) => {
  let convertedVal = val;
  if (type === "boolean") {
    convertedVal = isImporting ? [!!val[0]] : [(+val[0]).toString()]; // convert to t/f if importing, "0"/"1" if exporting
  }

  if (type === "number") convertedVal = val.map(item => +item);

  return convertedVal;
};

export const getEntityPart = str => {
  return (str || "").split(".")[0];
};

export const getFieldPart = str => {
  let strarray = (str || "").split(".");
  delete strarray[0];

  return strarray.filter(Boolean).join(".");
};

// determine whether the operator param can act on multiple value fields, eg, "between", "select_any"
const isMultivalueOperator = op => {
  const multivalueOperators = [
    "not_between",
    "between",
    "select_any_in",
    "select_any_not_in",
    "any_in",
    "any_not_in",
    "in",
    "not_in"
  ];
  return multivalueOperators.includes(op);
};

const getEntityProps = (entpart, fieldpart, terms, isImporting = false) => {
  let externalField = {
    ...ENTITIESEXT[`${entpart}`].find(item => {
      return item.id === fieldpart;
    })
  };

  if (isImporting && externalField?.select) externalField.type = ["multiselect"];
  if (isImporting && externalField?.multival) externalField.operator = "to_select_any_in";

  return externalField;
};
