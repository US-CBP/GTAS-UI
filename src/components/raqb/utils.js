// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import { Utils as QbUtils } from "react-awesome-query-builder";
import { hasData, asHash53 } from "../../utils/utils";
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
  const types = getEntityProps(raw.entity, raw.field, raw.operator, undefined, true);
  const op = operatorMap[types?.operator || raw.operator];
  const isMulti = isMultivalueOperator(op);

  let type = valueTypeMap[types?.type] || "NOT_FOUND";

  if (type === "multiselect" && !isMulti) type = "select";

  const value = getValue(type, raw.value, op);

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
      valueSrc: isMulti ? ["value", "value"] : ["value"],
      valueType: isMulti ? [type, type] : [type]
    }
  };

  rule.children1 = children1;
  return rule;
};

export const exportToQueryObject = (obj, isFirstLevel = false) => {
  if (!obj) return {};

  if (obj.type === QB.GROUP) {
    return exportGroup(obj, isFirstLevel);
  }
  return exportRule(obj);
};

const exportGroup = (raw, isFirstLevel) => {
  let group = {};
  let invalid = [];
  const rulesMap = new Map(Object.entries(raw.children1));

  group[QB.CLASS] = isFirstLevel ? QB.QOTYPEFULL : QB.QUERYOBJECT;
  group.condition = raw.properties?.conjunction || QB.AND; // the raqb component leaves the conjunction null when there's only a single clause
  group.rules = [];

  rulesMap.forEach((rule, key) => {
    const exported = exportToQueryObject(rule);
    if (exported.invalid) {
      const keyofInvalidRule =
        exported.invalid === true ? [key] : [...exported.invalid, key];
      invalid.push(...keyofInvalidRule);
    }
    group.rules.push(exported);
  });

  if (hasData(invalid)) group.invalid = [...invalid];

  return group;
};

const exportRule = raw => {
  let terms = {};
  let invalid = false;

  try {
    // refac. Need a cleaner way to nav the object
    terms = Object.entries(Object.entries(raw)[2][1])[0][1].properties;
  } catch {}

  if (!hasData(terms)) return { invalid: true };

  const entity = raw.properties?.field;
  const field = getFieldPart(terms?.field);
  const operator = operatorMap[terms?.operator];
  const entProps = getEntityProps(entity, field, operator, terms, false) || {};
  const value = getValue(entProps.type, terms?.value, operator, false);

  const value0 = Array.isArray(value[0]) ? value[0] : value;

  if (!field || !operator) invalid = true;
  if (operator !== "IS_NULL" && operator !== "NULL" && !hasData(value0)) invalid = true;
  if ((operator === "BETWEEN" || operator === "NOT_BETWEEN") && !hasData(value[1]))
    invalid = true;

  let rule = {
    entity: entity,
    field: field,
    operator: operator,
    value: value,
    uuid: null,
    type: entProps.type
  };

  if (invalid) rule.invalid = true;

  rule[QB.CLASS] = QB.QUERYTERM;

  return rule;
};

// convert value representations to and from the raqb object and the queryobject
// TODO: refac, maybe restructure with a map of functions so we can drop the if statements.
const getValue = (type, val, op, isImporting = true) => {
  if (!hasData(val)) return val;

  let convertedVal = val;

  if (type === "boolean") {
    return isImporting ? [!!+val[0]] : [(+val[0]).toString()]; // convert to t/f if importing, "0"/"1" if exporting
  }

  if (type === "number") return val.map(item => +item);

  if (isMultivalueOperator(op)) {
    if (isImporting) return [convertedVal];
    return convertedVal;
  }

  if (!isImporting && Array.isArray(convertedVal) && Array.isArray(convertedVal[0])) {
    return convertedVal[0];
  }

  if (
    op &&
    (op.toString().toLowerCase() === "in" || op.toString().toLowerCase() === "not_in")
  ) {
    if (isImporting) {
      return [convertedVal.join(", ")];
    } else {
      return (convertedVal[0] || "")
        .split(",")
        .map(item => item.trim().toUpperCase())
        .filter(Boolean);
    }
  }

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

// determine whether the valuesrc and value fields are multival
const isMultivalueOperator = op => {
  const multivalueOperators = [
    "not_between",
    "between",
    "select_not_any_in",
    "select_any_in",
    "any_in",
    "any_not_in"
  ];
  return multivalueOperators.includes(op);
};

const getEntityProps = (entpart, fieldpart, op, terms, isImporting = false) => {
  let externalField = {
    ...ENTITIESEXT[`${entpart}`].find(item => {
      return item.id === fieldpart;
    })
  };

  if (isImporting && externalField?.select) externalField.type = ["multiselect"];
  if (isImporting && externalField?.multival) {
    if (op === "IN") externalField.operator = "to_select_any_in";
    if (op === "not_in") externalField.operator = "to_select_not_any_in";
    if (op === "EQUAL") externalField.operator = "to_select_equals";
    if (op === "NOT_EQUAL") externalField.operator = "to_select_not_equals";
  }
  return externalField;
};
