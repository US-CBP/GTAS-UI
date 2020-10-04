export const operators = {
  equal: {
    label: "Equals",
    labelForFormat: "Equals",
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
      if (valueTypes === "boolean" && isForDisplay)
        return value === "No" ? `NOT ${field}` : `${field}`;
      else return `${field} ${opDef.label} ${value}`;
    },
    jsonLogic: "=="
  },
  not_equal: {
    label: "Not Equals",
    labelForFormat: "Not Equals",
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
      if (valueTypes === "boolean" && isForDisplay)
        return value === "No" ? `${field}` : `NOT ${field}`;
      else return `${field} ${opDef.label} ${value}`;
    },
    jsonLogic: "!="
  },
  less: {
    label: "<",
    labelForFormat: "<",
    sqlOp: "<",
    reversedOp: "greater_or_equal",
    jsonLogic: "<"
  },
  less_or_equal: {
    label: "<=",
    labelForFormat: "<=",
    sqlOp: "<=",
    reversedOp: "greater",
    jsonLogic: "<="
  },
  greater: {
    label: ">",
    labelForFormat: ">",
    sqlOp: ">",
    reversedOp: "less_or_equal",
    jsonLogic: ">"
  },
  greater_or_equal: {
    label: ">=",
    labelForFormat: ">=",
    sqlOp: ">=",
    reversedOp: "less",
    jsonLogic: ">="
  },
  like: {
    label: "Contains",
    labelForFormat: "Like",
    reversedOp: "not_like",
    sqlOp: "LIKE",
    sqlFormatOp: (field, op, values, valueSrc, valueType, opDef, operatorOptions) => {
      if (valueSrc === "value") {
        return `${field} LIKE ${values}`;
      } else return undefined; // not supported
    },
    //jsonLogic: (field, op, val) => ({ "in": [val, field] }),
    jsonLogic: "in",
    _jsonLogicIsRevArgs: true,
    valueSources: ["value"]
  },
  not_like: {
    label: "Doesn't contain",
    reversedOp: "like",
    labelForFormat: "Not Like",
    sqlOp: "NOT LIKE",
    sqlFormatOp: (field, op, values, valueSrc, valueType, opDef, operatorOptions) => {
      if (valueSrc === "value") {
        return `${field} NOT LIKE ${values}`;
      } else return undefined; // not supported
    },
    valueSources: ["value"]
  },
  in: {
    label: "In",
    labelForFormat: "In",
    sqlOp: "IN",
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
    ) => `${field} ${opDef.label} ${value}`,
    sqlFormatOp: (field, op, values, valueSrc) => {
      return `${field} IN ${values}`;
    },
    jsonLogic: undefined,
    valueSources: ["value"]
  },
  not_in: {
    label: "Not In",
    labelForFormat: "Not In",
    sqlOp: "NOT IN",
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
    ) => `${field} ${opDef.label} ${value}`,
    sqlFormatOp: (field, op, values, valueSrc) => {
      return `${field} NOT IN ${values}`;
    },
    jsonLogic: undefined,
    valueSources: ["value"]
  },
  starts_with: {
    label: "Starts with",
    labelForFormat: "Starts with",
    sqlOp: "LIKE",
    sqlFormatOp: (field, op, values, valueSrc, valueType, opDef, operatorOptions) => {
      if (valueSrc === "value") {
        return `${field} LIKE ${values}`;
      } else return undefined; // not supported
    },
    jsonLogic: undefined, // not supported
    valueSources: ["value"]
  },
  not_starts_with: {
    label: "Doesn't start with",
    labelForFormat: "Doesn't start with",
    cardinality: 1,
    sqlOp: "NOT LIKE",
    sqlFormatOp: (field, op, values) => `${field} NOT LIKE ${values}`,
    jsonLogic: undefined,
    valueSources: ["value"]
  },
  ends_with: {
    label: "Ends with",
    labelForFormat: "Ends with",
    sqlOp: "LIKE",
    sqlFormatOp: (field, op, values, valueSrc, valueType, opDef, operatorOptions) => {
      if (valueSrc === "value") {
        return `${field} LIKE ${values}`;
      } else return undefined; // not supported
    },
    jsonLogic: undefined, // not supported
    valueSources: ["value"]
  },
  not_ends_with: {
    label: "Doesn't end with",
    labelForFormat: "Doesn't end with",
    sqlOp: "NOT LIKE",
    sqlFormatOp: (field, op, values) => `${field} NOT LIKE ${values}`,
    jsonLogic: undefined,
    valueSources: ["value"]
  },
  between: {
    label: "Between",
    labelForFormat: "BETWEEN",
    sqlOp: "BETWEEN",
    cardinality: 2,
    formatOp: (
      field,
      op,
      values,
      valueSrcs,
      valueTypes,
      opDef,
      operatorOptions,
      isForDisplay
    ) => {
      let valFrom = values.first();
      let valTo = values.get(1);
      if (isForDisplay) return `${field} >= ${valFrom} AND ${field} <= ${valTo}`;
      else return `${field} >= ${valFrom} && ${field} <= ${valTo}`;
    },
    valueLabels: ["Value from", "Value to"],
    textSeparators: [null, "and"],
    reversedOp: "not_between",
    jsonLogic: "<=",
    validateValues: values => {
      if (values[0] !== undefined && values[1] !== undefined) {
        return values[0] <= values[1] ? null : "Invalid range";
      }
      return null;
    }
  },
  not_between: {
    label: "Not between",
    labelForFormat: "NOT BETWEEN",
    sqlOp: "NOT BETWEEN",
    cardinality: 2,
    valueLabels: ["Value from", "Value to"],
    textSeparators: [null, "and"],
    reversedOp: "between",
    validateValues: values => {
      if (values[0] !== undefined && values[1] !== undefined) {
        return values[0] <= values[1] ? null : "Invalid range";
      }
      return null;
    }
  },
  is_empty: {
    label: "Is null",
    labelForFormat: "IS NULL",
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
      return isForDisplay ? `${field} IS NULL` : `!${field}`;
    },
    jsonLogic: "!"
  },
  is_not_empty: {
    label: "Is not null",
    labelForFormat: "IS NOT NULL",
    sqlOp: "IS NOT NULL",
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
      return isForDisplay ? `${field} IS NOT NULL` : `!!${field}`;
    },
    jsonLogic: "!!"
  },
  select_equals: {
    label: "==",
    labelForFormat: "==",
    sqlOp: "=", // enum/set
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
      return `${field} == ${value}`;
    },
    reversedOp: "select_not_equals",
    jsonLogic: "=="
  },
  select_not_equals: {
    label: "!=",
    labelForFormat: "!=",
    sqlOp: "<>", // enum/set
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
      return `${field} != ${value}`;
    },
    reversedOp: "select_equals",
    jsonLogic: "!="
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
      if (valueSrc === "value") return `${field} NOT IN (${values.join(", ")})`;
      else return `${field} NOT IN (${values})`;
    },
    sqlFormatOp: (field, op, values, valueSrc, valueType, opDef, operatorOptions) => {
      return `${field} NOT IN (${values.join(", ")})`;
    },
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
      if (valueSrc === "value") return `${field} == [${values.join(", ")}]`;
      else return `${field} == ${values}`;
    },
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
      if (valueSrc === "value") return `${field} != [${values.join(", ")}]`;
      else return `${field} != ${values}`;
    },
    reversedOp: "multiselect_equals"
  }
};
