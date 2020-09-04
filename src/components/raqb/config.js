import React from "react";
import * as Widgets from "../components/widgets";
import * as Operators from "../components/operators";
import { SqlString } from "../utils/sql";
import { escapeRegExp, getTitleInListValues } from "../utils/stuff";
import moment from "moment";
import { settings as defaultSettings } from "../config/default";

const {
  //vanilla
  VanillaBooleanWidget,
  VanillaTextWidget,
  VanillaDateWidget,
  VanillaTimeWidget,
  VanillaDateTimeWidget,
  VanillaMultiSelectWidget,
  VanillaSelectWidget,
  VanillaNumberWidget,
  VanillaSliderWidget,

  //common
  ValueFieldWidget,
  FuncWidget
} = Widgets;
const { ProximityOperator } = Operators;

//----------------------------  operators

const operators = {
  equal: {
    label: "==",
    labelForFormat: "==",
    sqlOp: "=",
    reversedOp: "not_equal",
    formatOp: (
      field,
      op,
      value,
      valueSrcs,
      valueTypes,
      opDef,
      operatorOptions,
      isForDisplay,
      fieldDef
    ) => {
      if (valueTypes == "boolean" && isForDisplay)
        return value == "No" ? `NOT ${field}` : `${field}`;
      else return `${field} ${opDef.label} ${value}`;
    },
    mongoFormatOp: mongoFormatOp1.bind(null, "$eq", v => v, false),
    jsonLogic: "=="
  },
  not_equal: {
    label: "!=",
    labelForFormat: "!=",
    sqlOp: "<>",
    reversedOp: "equal",
    formatOp: (
      field,
      op,
      value,
      valueSrcs,
      valueTypes,
      opDef,
      operatorOptions,
      isForDisplay,
      fieldDef
    ) => {
      if (valueTypes == "boolean" && isForDisplay)
        return value == "No" ? `${field}` : `NOT ${field}`;
      else return `${field} ${opDef.label} ${value}`;
    },
    mongoFormatOp: mongoFormatOp1.bind(null, "$ne", v => v, false),
    jsonLogic: "!="
  },
  less: {
    label: "<",
    labelForFormat: "<",
    sqlOp: "<",
    reversedOp: "greater_or_equal",
    mongoFormatOp: mongoFormatOp1.bind(null, "$lt", v => v, false),
    jsonLogic: "<"
  },
  less_or_equal: {
    label: "<=",
    labelForFormat: "<=",
    sqlOp: "<=",
    reversedOp: "greater",
    mongoFormatOp: mongoFormatOp1.bind(null, "$lte", v => v, false),
    jsonLogic: "<="
  },
  greater: {
    label: ">",
    labelForFormat: ">",
    sqlOp: ">",
    reversedOp: "less_or_equal",
    mongoFormatOp: mongoFormatOp1.bind(null, "$gt", v => v, false),
    jsonLogic: ">"
  },
  greater_or_equal: {
    label: ">=",
    labelForFormat: ">=",
    sqlOp: ">=",
    reversedOp: "less",
    mongoFormatOp: mongoFormatOp1.bind(null, "$gte", v => v, false),
    jsonLogic: ">="
  },
  like: {
    label: "Like",
    labelForFormat: "Like",
    reversedOp: "not_like",
    sqlOp: "LIKE",
    sqlFormatOp: (field, op, values, valueSrc, valueType, opDef, operatorOptions) => {
      if (valueSrc == "value") {
        return `${field} LIKE ${values}`;
      } else return undefined; // not supported
    },
    mongoFormatOp: mongoFormatOp1.bind(
      null,
      "$regex",
      v => (typeof v == "string" ? escapeRegExp(v) : undefined),
      false
    ),
    //jsonLogic: (field, op, val) => ({ "in": [val, field] }),
    jsonLogic: "in",
    _jsonLogicIsRevArgs: true,
    valueSources: ["value"]
  },
  not_like: {
    label: "Not like",
    reversedOp: "like",
    labelForFormat: "Not Like",
    sqlOp: "NOT LIKE",
    sqlFormatOp: (field, op, values, valueSrc, valueType, opDef, operatorOptions) => {
      if (valueSrc == "value") {
        return `${field} NOT LIKE ${values}`;
      } else return undefined; // not supported
    },
    mongoFormatOp: mongoFormatOp1.bind(
      null,
      "$regex",
      v => (typeof v == "string" ? escapeRegExp(v) : undefined),
      true
    ),
    valueSources: ["value"]
  },
  starts_with: {
    label: "Starts with",
    labelForFormat: "Starts with",
    sqlOp: "LIKE",
    sqlFormatOp: (field, op, values, valueSrc, valueType, opDef, operatorOptions) => {
      if (valueSrc == "value") {
        return `${field} LIKE ${values}`;
      } else return undefined; // not supported
    },
    mongoFormatOp: mongoFormatOp1.bind(
      null,
      "$regex",
      v => (typeof v == "string" ? "^" + escapeRegExp(v) : undefined),
      false
    ),
    jsonLogic: undefined, // not supported
    valueSources: ["value"]
  },
  ends_with: {
    label: "Ends with",
    labelForFormat: "Ends with",
    sqlOp: "LIKE",
    sqlFormatOp: (field, op, values, valueSrc, valueType, opDef, operatorOptions) => {
      if (valueSrc == "value") {
        return `${field} LIKE ${values}`;
      } else return undefined; // not supported
    },
    mongoFormatOp: mongoFormatOp1.bind(
      null,
      "$regex",
      v => (typeof v == "string" ? escapeRegExp(v) + "$" : undefined),
      false
    ),
    jsonLogic: undefined, // not supported
    valueSources: ["value"]
  },
  is_empty: {
    label: "Is empty",
    labelForFormat: "IS EMPTY",
    sqlOp: "IS EMPTY",
    cardinality: 0,
    reversedOp: "is_not_empty",
    formatOp: (
      field,
      op,
      value,
      valueSrc,
      valueType,
      opDef,
      operatorOptions,
      isForDisplay
    ) => {
      return isForDisplay ? `${field} IS EMPTY` : `!${field}`;
    },
    mongoFormatOp: mongoFormatOp1.bind(null, "$exists", v => false, false),
    jsonLogic: "!"
  },
  is_not_empty: {
    label: "Is not empty",
    labelForFormat: "IS NOT EMPTY",
    sqlOp: "IS NOT EMPTY",
    cardinality: 0,
    reversedOp: "is_empty",
    formatOp: (
      field,
      op,
      value,
      valueSrc,
      valueType,
      opDef,
      operatorOptions,
      isForDisplay
    ) => {
      return isForDisplay ? `${field} IS NOT EMPTY` : `!!${field}`;
    },
    mongoFormatOp: mongoFormatOp1.bind(null, "$exists", v => true, false),
    jsonLogic: "!!"
  },
  select_any_in: {
    label: "Any in",
    labelForFormat: "IN",
    sqlOp: "IN",
    formatOp: (
      field,
      op,
      values,
      valueSrc,
      valueType,
      opDef,
      operatorOptions,
      isForDisplay
    ) => {
      if (valueSrc == "value") return `${field} IN (${values.join(", ")})`;
      else return `${field} IN (${values})`;
    },
    sqlFormatOp: (field, op, values, valueSrc, valueType, opDef, operatorOptions) => {
      return `${field} IN (${values.join(", ")})`;
    },
    mongoFormatOp: mongoFormatOp1.bind(null, "$in", v => v, false),
    reversedOp: "select_not_any_in",
    jsonLogic: "in"
  },
  select_not_any_in: {
    label: "Not in",
    labelForFormat: "NOT IN",
    sqlOp: "NOT IN",
    formatOp: (
      field,
      op,
      values,
      valueSrc,
      valueType,
      opDef,
      operatorOptions,
      isForDisplay
    ) => {
      if (valueSrc == "value") return `${field} NOT IN (${values.join(", ")})`;
      else return `${field} NOT IN (${values})`;
    },
    sqlFormatOp: (field, op, values, valueSrc, valueType, opDef, operatorOptions) => {
      return `${field} NOT IN (${values.join(", ")})`;
    },
    mongoFormatOp: mongoFormatOp1.bind(null, "$nin", v => v, false),
    reversedOp: "select_any_in"
  },
  multiselect_equals: {
    label: "Equals",
    labelForFormat: "==",
    sqlOp: "=",
    formatOp: (
      field,
      op,
      values,
      valueSrc,
      valueType,
      opDef,
      operatorOptions,
      isForDisplay
    ) => {
      if (valueSrc == "value") return `${field} == [${values.join(", ")}]`;
      else return `${field} == ${values}`;
    },
    sqlFormatOp: (field, op, values, valueSrc, valueType, opDef, operatorOptions) => {
      if (valueSrc == "value")
        // set
        return `${field} = '${values.map(v => SqlString.trim(v)).join(",")}'`;
      else return undefined; //not supported
    },
    mongoFormatOp: mongoFormatOp1.bind(null, "$eq", v => v, false),
    reversedOp: "multiselect_not_equals",
    jsonLogic2: "all-in",
    jsonLogic: (field, op, vals) => ({
      // it's not "equals", but "includes" operator - just for example
      all: [field, { in: [{ var: "" }, vals] }]
    })
  },
  multiselect_not_equals: {
    label: "Not equals",
    labelForFormat: "!=",
    sqlOp: "<>",
    formatOp: (
      field,
      op,
      values,
      valueSrc,
      valueType,
      opDef,
      operatorOptions,
      isForDisplay
    ) => {
      if (valueSrc == "value") return `${field} != [${values.join(", ")}]`;
      else return `${field} != ${values}`;
    },
    sqlFormatOp: (field, op, values, valueSrc, valueType, opDef, operatorOptions) => {
      if (valueSrc == "value")
        // set
        return `${field} != '${values.map(v => SqlString.trim(v)).join(",")}'`;
      else return undefined; //not supported
    },
    mongoFormatOp: mongoFormatOp1.bind(null, "$ne", v => v, false),
    reversedOp: "multiselect_equals"
  }
};

//----------------------------  widgets

const widgets = {
  text: {
    type: "text",
    jsType: "string",
    valueSrc: "value",
    valueLabel: "String",
    valuePlaceholder: "Enter string",
    factory: props => <VanillaTextWidget {...props} />,
    formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
      return isForDisplay ? '"' + val + '"' : JSON.stringify(val);
    },
    sqlFormatValue: (val, fieldDef, wgtDef, op, opDef) => {
      if (opDef.sqlOp == "LIKE" || opDef.sqlOp == "NOT LIKE") {
        return SqlString.escapeLike(val, op != "starts_with", op != "ends_with");
      } else {
        return SqlString.escape(val);
      }
    },
    toJS: (val, fieldSettings) => val
  }
};

//----------------------------  types

const types = {
  text: {
    defaultOperator: "equal",
    widgets: {
      text: {
        operators: [
          "equal",
          "not_equal",
          "is_empty",
          "is_not_empty",
          "like",
          "not_like",
          "in",
          "not_in",
          "starts_with",
          "not_starts_with",
          "ends_with",
          "not_ends_with"
        ],
        widgetProps: {},
        opProps: {}
      },
      field: {
        operators: [
          //unary ops (like `is_empty`) will be excluded anyway, see getWidgetsForFieldOp()
          "equal",
          "not_equal"
        ]
      }
    }
  },
  number: {
    defaultOperator: "equal",
    mainWidget: "number",
    widgets: {
      number: {
        operators: [
          "equal",
          "not_equal",
          "less",
          "less_or_equal",
          "greater",
          "greater_or_equal",
          "between",
          "not_between",
          "is_empty",
          "is_not_empty",
          "in",
          "not_in"
        ]
      }
    }
  }
};

//----------------------------  settings

const settings = {
  ...defaultSettings,

  formatField: (field, parts, label2, fieldDefinition, config, isForDisplay) => {
    if (isForDisplay) return label2;
    else return field;
  },
  sqlFormatReverse: (
    q,
    operator,
    reversedOp,
    operatorDefinition,
    revOperatorDefinition
  ) => {
    if (q == undefined) return undefined;
    return "NOT(" + q + ")";
  },
  formatReverse: (
    q,
    operator,
    reversedOp,
    operatorDefinition,
    revOperatorDefinition,
    isForDisplay
  ) => {
    if (q == undefined) return undefined;
    if (isForDisplay) return "NOT(" + q + ")";
    else return "!(" + q + ")";
  },
  canCompareFieldWithField: (
    leftField,
    leftFieldConfig,
    rightField,
    rightFieldConfig
  ) => {
    //for type == 'select'/'multiselect' you can check listValues
    return true;
  },

  // enable compare fields
  valueSourcesInfo: {
    value: {
      label: "Value"
    },
    field: {
      label: "Field",
      widget: "field"
    },
    func: {
      label: "Function",
      widget: "func"
    }
  },
  customFieldSelectProps: {
    showSearch: true
  }
};
